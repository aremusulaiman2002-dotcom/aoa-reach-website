import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { SYSTEM_PROMPT } from '@/lib/chatbot/systemPrompt'
import { AOA_CONTACT } from '@/lib/chatbot/knowledgeBase'

const CONTACT_LINE = `${AOA_CONTACT.phone} or ${AOA_CONTACT.email}`

// Haiku 4.5 — lowest cost, fast, ideal for FAQ bots. Upgrade path: claude-sonnet-4-6 → claude-opus-4-8.
const CLAUDE_MODEL = 'claude-haiku-4-5'

const client = process.env.ANTHROPIC_API_KEY
  ? new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
  : null

// ─── Rate limiting ─────────────────────────────────────────────────────────
// Simple in-memory limiter keyed by client IP.
// Note: on serverless (Vercel) this is best-effort per cold-start instance.
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT_MAX = 15
const RATE_LIMIT_WINDOW_MS = 60_000

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS })
    return true
  }
  if (entry.count >= RATE_LIMIT_MAX) return false
  entry.count++
  return true
}

// ─── Capture block parsing ─────────────────────────────────────────────────
function parseCaptureBlock(text: string): Record<string, string> | null {
  const match = text.match(/<<<CAPTURE([\s\S]*?)>>>/)
  if (!match) return null
  const data: Record<string, string> = {}
  for (const line of match[1].trim().split('\n')) {
    const idx = line.indexOf(':')
    if (idx === -1) continue
    const key = line.slice(0, idx).trim()
    const value = line.slice(idx + 1).trim()
    if (key && value) data[key] = value
  }
  return Object.keys(data).length > 0 ? data : null
}

// ─── Phase 2 lead-capture stub ─────────────────────────────────────────────
// TODO Phase 2: route captured lead to AOA via Resend (email) or a secure store.
// The block is always stripped before the reply reaches the user.
async function handleLeadCapture(data: Record<string, string>): Promise<void> {
  console.log('[AOA Chatbot] Lead captured (Phase 2: wire to Resend/store):', JSON.stringify(data))
}

// ─── Route handler ─────────────────────────────────────────────────────────
export async function POST(req: NextRequest): Promise<NextResponse> {
  if (!client) {
    console.error('[AOA Chatbot] ANTHROPIC_API_KEY is not set')
    return NextResponse.json(
      { reply: `The chat service isn't available right now. Please reach us at ${CONTACT_LINE}.` },
      { status: 500 }
    )
  }

  // Rate limiting
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { reply: 'Too many messages — please wait a minute and try again.' },
      { status: 429 }
    )
  }

  // Parse body
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const messages = (body as { messages?: unknown }).messages
  if (!Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json(
      { error: 'messages must be a non-empty array' },
      { status: 400 }
    )
  }

  // Validate each message
  for (const msg of messages) {
    const m = msg as { role?: unknown; content?: unknown }
    if (
      typeof m !== 'object' ||
      m === null ||
      !['user', 'assistant'].includes(String(m.role ?? '')) ||
      typeof m.content !== 'string' ||
      m.content.trim().length === 0 ||
      m.content.length > 4000
    ) {
      return NextResponse.json({ error: 'Invalid message in array' }, { status: 400 })
    }
  }

  type ClientMessage = { role: 'user' | 'assistant'; content: string }
  const validated = messages as ClientMessage[]

  // Cap history to last 20 messages
  const capped = validated.slice(-20)

  // Anthropic also requires conversations to start with a 'user' turn
  const firstUserIdx = capped.findIndex(m => m.role === 'user')
  if (firstUserIdx === -1) {
    return NextResponse.json({ error: 'No user message found' }, { status: 400 })
  }
  const history = capped.slice(firstUserIdx)

  // Call Anthropic — system prompt is a top-level param, not part of messages
  try {
    const response = await client.messages.create({
      model: CLAUDE_MODEL,
      max_tokens: 800,
      system: SYSTEM_PROMPT,
      messages: history,
    })

    // Extract all text blocks (handles thinking blocks gracefully if ever enabled)
    const raw = response.content
      .filter((b): b is Anthropic.TextBlock => b.type === 'text')
      .map(b => b.text)
      .join('')

    // Strip capture block — the user must never see it
    const captureData = parseCaptureBlock(raw)
    if (captureData) {
      await handleLeadCapture(captureData)
    }
    const reply = raw.replace(/<<<CAPTURE[\s\S]*?>>>/g, '').trim()

    return NextResponse.json({ reply })
  } catch (err) {
    console.error('[AOA Chatbot] Anthropic error:', err)
    return NextResponse.json(
      {
        reply: `I'm having some trouble right now. Please try again shortly or contact us at ${CONTACT_LINE}.`,
      },
      { status: 500 }
    )
  }
}

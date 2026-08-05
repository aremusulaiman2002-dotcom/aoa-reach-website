# AOA Reach Chatbot — Implementation Reference

> **Purpose:** Accurate technical reference for the Methodology / Implementation chapter of an MSc dissertation.
> **Scope:** Describes the code as it actually exists. Gaps and unfinished sections are explicitly called out.
> **Secrets:** All API keys, tokens, and project IDs are redacted. Variable names are preserved.

---

## 1. Technology Stack & Versions

From `package.json` (all version strings are npm range specifiers — the exact installed version may be higher within that range):

| Package | Declared version | Role in chatbot |
|---|---|---|
| `next` | `^16.2.10` | App Router framework, API route hosting |
| `react` | `^19.2.7` | Widget component rendering |
| `react-dom` | `^19.2.7` | DOM rendering |
| `typescript` | `^5` | Type safety across all chatbot files |
| `tailwindcss` | `^4` | Widget styling |
| `@anthropic-ai/sdk` | `^0.109.1` | Anthropic API client |
| `lucide-react` | `^0.552.0` | Icons in the widget (MessageCircle, X, Send, Loader2) |
| `next/navigation` | (bundled with Next.js) | `usePathname` hook used in widget |

No Node version is specified in `package.json` (no `engines` field). The project uses `@types/node: ^20`, implying Node 20 compatibility.

**Dev tooling relevant to the chatbot:**
- `babel-plugin-react-compiler: 1.0.0` — React Compiler is enabled (`reactCompiler: true` in `next.config.ts`), which means React automatically optimises re-renders without manual `useMemo`/`useCallback`. However, `useCallback` is still explicitly used in the widget (see Section 6).

---

## 2. File Structure

All files that constitute the chatbot feature:

```
src/
├── app/
│   └── api/
│       └── chat/
│           └── route.ts          # Next.js App Router POST handler — the only server-side entry point
└── lib/
│   └── chatbot/
│       ├── knowledgeBase.ts      # Exported constants: AOA_CONTACT, DONATION_INFO, KNOWLEDGE_BASE string
│       └── systemPrompt.ts       # Assembles and exports SYSTEM_PROMPT by interpolating knowledgeBase
└── components/
    └── chatbot/
        └── ChatWidget.tsx        # 'use client' React component — the entire visible UI
```

No additional helper files, type definition files, or test files exist for the chatbot.

---

## 3. API Route — `src/app/api/chat/route.ts`

### 3.1 Verbatim Code

```typescript
import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { SYSTEM_PROMPT } from '@/lib/chatbot/systemPrompt'
import { AOA_CONTACT } from '@/lib/chatbot/knowledgeBase'

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
      { reply: `The chat service isn't available right now. Please reach us at ${AOA_CONTACT}.` },
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
        reply: `I'm having some trouble right now. Please try again shortly or contact us at ${AOA_CONTACT}.`,
      },
      { status: 500 }
    )
  }
}
```

### 3.2 Step-by-Step Explanation

**Client initialisation (module level):** The Anthropic SDK client is instantiated once at module load time, outside the request handler. If `ANTHROPIC_API_KEY` is absent from the environment, `client` is set to `null`. This means the client is created on cold start and reused across warm invocations (Vercel serverless warm instances).

**Guard — API key missing:** If `client` is `null`, the handler immediately returns HTTP 500 with a human-readable reply pointing to the AOA contact address. It never attempts an API call.

**Rate limiting check:** The client IP is extracted from the `x-forwarded-for` header (first value, split on comma). If the IP cannot be determined, the string `"unknown"` is used as the key. The in-memory `rateLimitMap` is checked; if the IP has exceeded 15 requests in the last 60 seconds, HTTP 429 is returned with a human-readable message. Otherwise the counter is incremented.

**Body parsing:** The request body is parsed as JSON. If parsing fails, HTTP 400 is returned.

**Input validation:** The `messages` field must be a non-empty array. Each element is then individually validated:
- Must be a non-null object
- `role` must be exactly `"user"` or `"assistant"`
- `content` must be a non-empty string
- `content` must not exceed 4,000 characters per message

Any violation returns HTTP 400.

**History capping:** The validated messages array is sliced to the last 20 items (`slice(-20)`). Then the first `user`-role message within that slice is found, and everything before it is discarded. This ensures the history always starts with a user turn, as required by the Anthropic Messages API. The effective maximum history sent to the API is therefore 20 messages, but may be fewer if there are leading assistant turns.

**Anthropic API call:** `client.messages.create()` is called with:
- `model`: `"claude-haiku-4-5"` (constant, not configurable at runtime)
- `max_tokens`: `800`
- `system`: the full `SYSTEM_PROMPT` string (passed as a top-level parameter, **not** as a message in the array)
- `messages`: the trimmed history array

**Parameters not set:** `temperature`, `top_p`, `top_k`, `stop_sequences`, and `stream` are **not** passed. The Anthropic API defaults apply (temperature defaults to 1.0 for standard models).

**Response parsing:** The response `content` array is filtered for blocks where `type === 'text'`, and their `.text` values are concatenated. This handles the case where the model might return multiple content blocks (e.g. if extended thinking were ever enabled — it is not currently).

**Capture block stripping:** The concatenated raw text is searched for a `<<<CAPTURE ... >>>` block using the regex `/<<<CAPTURE([\s\S]*?)>>>/`. If found, it is parsed into a key-value object (colon-delimited lines) and passed to `handleLeadCapture()`. The block is then removed from the reply string using a global regex replace before the response is sent to the client.

**Error handling:** Any exception from the Anthropic API call is caught, logged to the server console with `console.error`, and the user receives HTTP 500 with a friendly message. The exception detail is never exposed to the client.

### 3.3 Model and Parameters

| Parameter | Value |
|---|---|
| Model | `claude-haiku-4-5` |
| `max_tokens` | `800` |
| `temperature` | Not set (API default: 1.0) |
| `top_p` | Not set |
| `top_k` | Not set |
| `stream` | Not set — responses are **not** streamed |
| `stop_sequences` | Not set |

### 3.4 Rate Limiting

- **Mechanism:** In-memory JavaScript `Map` keyed by client IP string, stored at module scope.
- **Limit:** 15 requests per IP per 60-second rolling window.
- **Window behaviour:** The window is fixed from first request, not sliding. When a new IP is seen, or when the stored `resetAt` timestamp has passed, the counter resets to 1.
- **Exceeded response:** HTTP 429 JSON `{ reply: "Too many messages — please wait a minute and try again." }`.
- **Important limitation:** Because this is in-memory, the counter is per serverless instance. On Vercel, multiple warm instances can run in parallel, meaning the effective per-user rate limit is `15 × (number of active instances)`, not a hard global 15.

### 3.5 Lead Capture

The system prompt instructs the model to append a `<<<CAPTURE ... >>>` block to its reply when a user consents to share contact details. The block format is:

```
<<<CAPTURE
type: volunteer | donor
name: ...
contact: ...
interests: ...
availability: ...
consent: true
>>>
```

The route's `parseCaptureBlock()` function detects this via regex and parses each line into a `Record<string, string>`. The data is then passed to `handleLeadCapture()`.

**Current implementation of `handleLeadCapture`:** It is a stub that calls `console.log()` only. No email is sent, no database record is written, and no third-party service (e.g. Resend) is called. The captured data appears only in Vercel's function logs and is not persisted anywhere. The comment in the code marks this as "Phase 2" work.

The `<<<CAPTURE ... >>>` block is always stripped from the reply before it is sent to the client, regardless of whether parsing succeeded.

### 3.6 Error Handling Summary

| Scenario | HTTP status | User-visible reply | Server log |
|---|---|---|---|
| `ANTHROPIC_API_KEY` not set | 500 | Contact AOA message | `console.error` |
| Rate limit exceeded | 429 | "Too many messages…" | None |
| Invalid JSON body | 400 | `{ error: "Invalid JSON" }` | None |
| Empty or missing messages array | 400 | `{ error: "messages must be a non-empty array" }` | None |
| Invalid message object | 400 | `{ error: "Invalid message in array" }` | None |
| No user message in history | 400 | `{ error: "No user message found" }` | None |
| Anthropic API error | 500 | "I'm having some trouble…" | `console.error` with full error |

---

## 4. System Prompt — `src/lib/chatbot/systemPrompt.ts`

### 4.1 Verbatim Contents

```typescript
import { KNOWLEDGE_BASE, AOA_CONTACT, DONATION_INFO } from './knowledgeBase'

// Exact text from the AOA Reach Chatbot Behaviour Spec (Part B).
// AOA_CONTACT and DONATION_INFO are imported so updates propagate automatically.
export const SYSTEM_PROMPT = `You are the digital assistant for AOA Reach Charity Foundation, a registered Nigerian non-profit (Reg. RN 8056929). You appear as a chat assistant on the Foundation's website and speak on its behalf to visitors — potential donors, volunteers, and people seeking information.

# WHAT YOU KNOW
You answer using ONLY the information in the KNOWLEDGE BASE below. Treat it as your single source of truth.
- If a question isn't covered, say so plainly and point the person to AOA's official contact: ${AOA_CONTACT}.
- Never invent or estimate facts, statistics, impact numbers, programme details, dates, or financial figures. If a number isn't in the knowledge base, you don't have it.

# YOUR GOALS, IN ORDER
1. Help the visitor understand AOA Reach's mission, programmes, and impact.
2. Warmly and honestly encourage them to support the Foundation's work.
3. If they want to give, guide them to the official donation method below.
4. If they're interested in volunteering, capture their details — but only with clear consent.
5. Answer questions; route anything you can't handle to AOA's contact.

# HOW TO TALK ABOUT DONATIONS
- Encourage giving by connecting it to AOA's real, named programmes and the difference they make — using only what's in the knowledge base.
- Be warm and inviting, never pushy. No pressure tactics, no false urgency, no made-up impact claims.
- When someone wants to donate, share the official donation method exactly as written in the knowledge base: ${DONATION_INFO}.
- All donations go to AOA Reach's own official account/gateway. Never share or suggest any other account.
- You CANNOT see or confirm payments. Never tell anyone their payment was received or successful unless the system explicitly gives you a verified confirmation to relay. If unsure, tell them their confirmation/receipt will come through the official payment process.

# DONOR PRIVACY — ANONYMOUS OR IDENTIFIED
- Nobody ever has to share personal details to donate.
- If a donor wants to be acknowledged or kept updated, FIRST ask: "Would you like to share your details so we can thank you and keep you updated, or would you prefer to give anonymously?"
- Only if they choose to share, collect what's needed (e.g. name, email), and state plainly: "AOA will store these details only to [acknowledge your gift / send updates], in line with its privacy commitments." Respect anonymity completely if chosen.

# VOLUNTEER INTEREST
- If someone wants to volunteer, tell them what you'll collect and why BEFORE collecting it: "I can pass your details to the AOA team to follow up. I'll note your name, contact, areas of interest, and availability — is that okay?"
- Only proceed on a clear yes. Collect: name, contact (email/phone), areas of interest, availability.
- Never pressure anyone to share more than they want.

# DATA & SAFETY RULES
- Never ask for or accept: card numbers, CVV, bank passwords, OTPs/verification codes, or government ID numbers. If a user starts typing these, stop them and explain they should never share that in a chat.
- Collect the minimum needed. Don't repeat back full personal details unnecessarily.
- If someone appears to be in distress or crisis, respond with care and gently point them to appropriate local support and AOA's human contact — you are not a counsellor.

# STAYING IN SCOPE
- Only discuss AOA Reach and how to support or get involved with it.
- Politely decline requests that are off-topic, harmful, or outside your role (legal/medical/financial advice, anything unrelated to the Foundation).
- Don't make promises on AOA's behalf beyond what's in the knowledge base. For partnerships, complaints, media, or specific financial questions, direct people to ${AOA_CONTACT}.

# STYLE
- Warm, sincere, hopeful, and clear. Short sentences, plain language.
- Speak as "we"/"AOA Reach". Be concise — a few sentences per reply unless more is asked.
- Sound like a caring charity, never a salesperson.

# CAPTURING A LEAD (for the system, not shown to the user)
When — and only when — a user has CONSENTED to share volunteer or donor-contact details, end your reply with a single hidden data block in exactly this format, on its own lines:

<<<CAPTURE
type: volunteer | donor
name: ...
contact: ...
interests: ...        (volunteers only; omit if donor)
availability: ...      (volunteers only; omit if donor)
consent: true
>>>

Only emit this block after explicit consent. Never show or mention it to the user. If there's no consented capture, don't emit it.

# KNOWLEDGE BASE
${KNOWLEDGE_BASE}`
```

### 4.2 Composition

The system prompt is a TypeScript template literal string. It imports three named exports from `knowledgeBase.ts`:

- `KNOWLEDGE_BASE` — interpolated at the very end of the prompt under the `# KNOWLEDGE BASE` heading
- `AOA_CONTACT` — interpolated at two points: in the `# WHAT YOU KNOW` section and in `# STAYING IN SCOPE`
- `DONATION_INFO` — interpolated once in `# HOW TO TALK ABOUT DONATIONS`

The interpolation is standard JavaScript template literal substitution (`${variable}`), evaluated at module load time. The assembled string is a single static export `SYSTEM_PROMPT`.

### 4.3 Behavioural Guardrails

The system prompt contains the following explicit rules:

| Category | Rule |
|---|---|
| Knowledge boundary | Answer only from the knowledge base; never invent facts, statistics, or financial figures |
| Payment confirmation | Never confirm a payment was received or successful |
| Sensitive data | Never request card numbers, CVV, bank passwords, OTPs, or government IDs; actively stop users who begin sharing them |
| Consent before data collection | For volunteers: ask permission and explain what will be collected before collecting it; for donors: offer anonymous giving first |
| Data minimisation | Collect the minimum needed; do not repeat back personal details unnecessarily |
| Off-topic deflection | Decline legal, medical, financial advice, and anything unrelated to AOA Reach |
| No fabricated promises | Do not make commitments on AOA's behalf beyond the knowledge base |
| Crisis handling | Respond with care to distressed users; direct to local support; do not act as a counsellor |
| Donation routing | Only reference the official account/gateway; never suggest alternative accounts |

### 4.4 How the Prompt is Passed to the Model

The system prompt is passed as the top-level `system` parameter in `client.messages.create()`. It is **not** included as a message object within the `messages` array. This is the correct usage per the Anthropic Messages API specification for system instructions.

---

## 5. Knowledge Base — `src/lib/chatbot/knowledgeBase.ts`

### 5.1 Structure and Content

The file exports three named constants:

```typescript
export const AOA_CONTACT = '[info@aoareach.org / +234-XXX-XXX-XXXX]'
export const DONATION_INFO =
  '[Bank transfer: AOA Reach Charity Foundation · Bank Name · Account No. XXXXXXXXXX — or via the online gateway at aoareach.org/donate]'
export const KNOWLEDGE_BASE = `...`
```

The `KNOWLEDGE_BASE` string is a Markdown-formatted document with the following sections:

```
## About AOA Reach
- Full name, registration number, operating locations
- Mission: [PLACEHOLDER]
- What we do: [PLACEHOLDER]

## Programmes
- [Programme 1 name]: [PLACEHOLDER description]
- [Programme 2 name]: [PLACEHOLDER description]
- [Add more programmes as needed]

## Impact
- [Impact point 1]: [PLACEHOLDER]
- [Impact point 2]: [PLACEHOLDER]

## How Donations Are Used
[PLACEHOLDER]

## How to Donate
- Official donation method: ${DONATION_INFO}   ← interpolated from constant
- What to expect after giving: [PLACEHOLDER]
- Warning: never transfer to personal accounts

## Volunteering
- Areas where volunteers can help: [PLACEHOLDER]
- Typical commitment / expectations: [PLACEHOLDER]
- What happens after expressing interest: [one real sentence — team follows up personally]

## Frequently Asked Questions
- Q: Is AOA Reach a registered charity?
  A: Yes — registration number RN 8056929.       ← real, verified content
- Q: How do I know my donation is safe?
  A: [real answer about official account only]   ← real content
- Q: Can I volunteer if I live outside Nigeria?
  A: [PLACEHOLDER]
- Q: [PLACEHOLDER additional questions]

## Contact
- General enquiries: ${AOA_CONTACT}              ← interpolated from constant
- Partnerships, media, complaints: ${AOA_CONTACT}
- Social media: [PLACEHOLDER]
```

### 5.2 Size

The file is approximately **57 lines** and roughly **300–350 words** including placeholder labels.

### 5.3 How it is Delivered to the Model

The entire `KNOWLEDGE_BASE` string is concatenated into `SYSTEM_PROMPT` at module load time and sent as the `system` parameter on **every single API request**. There is:

- **No retrieval-augmented generation (RAG)** — no vector database, no embedding search, no semantic retrieval step.
- **No prompt caching** — the Anthropic `cache_control` parameter is not used; the full system prompt (including the knowledge base) is sent and billed on every call.
- **No chunking or selective injection** — the entire knowledge base is always present regardless of what the user asks.

This is the simplest possible delivery mechanism: a static string in a system prompt.

### 5.4 Placeholder vs Real Content

| Field | Status |
|---|---|
| Organisation name | ✅ Real — "AOA Reach Charity Foundation" |
| Registration number | ✅ Real — RN 8056929 |
| Operating locations | ✅ Real — Kwara State and FCT Abuja |
| Mission statement | ❌ Placeholder |
| Overview of work | ❌ Placeholder |
| All programme descriptions | ❌ Placeholder (names and descriptions) |
| Impact statistics/outcomes | ❌ Placeholder |
| How donations are used | ❌ Placeholder |
| Bank account / payment gateway | ❌ Placeholder — `Account No. XXXXXXXXXX` |
| Post-donation recipient experience | ❌ Placeholder |
| Volunteer areas and commitment | ❌ Placeholder |
| Remote volunteer policy | ❌ Placeholder |
| Additional FAQs | ❌ Placeholder |
| Social media handles | ❌ Placeholder |
| Contact phone number | ❌ Placeholder — `+234-XXX-XXX-XXXX` |
| Contact email | ✅ Real — `info@aoareach.org` (used in `AOA_CONTACT`) |

**Consequence:** With the majority of the knowledge base still placeholder, the chatbot cannot accurately answer questions about AOA's specific programmes, impact figures, donation process, or volunteer opportunities. It can only confirm the organisation's name, registration number, and locations from real data.

---

## 6. Chat Widget — `src/components/chatbot/ChatWidget.tsx`

### 6.1 Verbatim Code

```tsx
'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { usePathname } from 'next/navigation'
import { MessageCircle, X, Send, Loader2 } from 'lucide-react'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const INITIAL_MESSAGE: Message = {
  role: 'assistant',
  content:
    "Hi! I'm here to help you learn about AOA Reach and how to get involved. What would you like to know?",
}

function TypingDots() {
  return (
    <div className="flex justify-start" aria-hidden="true">
      <div className="bg-gray-100 rounded-2xl rounded-bl-sm px-3 py-2.5">
        <div className="flex gap-1 items-center h-4">
          {[0, 150, 300].map((delay) => (
            <span
              key={delay}
              className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"
              style={{ animationDelay: `${delay}ms` }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default function ChatWidget() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const inputRef = useRef<HTMLInputElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const toggleBtnRef = useRef<HTMLButtonElement>(null)

  // Focus the input when panel opens; restore focus to launcher on close
  useEffect(() => {
    if (isOpen) {
      const t = setTimeout(() => inputRef.current?.focus(), 80)
      return () => clearTimeout(t)
    } else {
      toggleBtnRef.current?.focus()
    }
  }, [isOpen])

  // Scroll to latest message; honour prefers-reduced-motion
  useEffect(() => {
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    messagesEndRef.current?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' })
  }, [messages, isLoading])

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) setIsOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [isOpen])

  // Lock body scroll while the panel is open (prevents background scroll on mobile)
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const sendMessage = useCallback(async () => {
    const text = input.trim()
    if (!text || isLoading) return

    const userMsg: Message = { role: 'user', content: text }
    const nextMessages = [...messages, userMsg]

    setMessages(nextMessages)
    setInput('')
    setIsLoading(true)
    setErrorMsg(null)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: nextMessages }),
      })

      const data = (await res.json()) as { reply?: string; error?: string }

      if (!res.ok) {
        throw new Error(data.reply ?? data.error ?? 'Something went wrong.')
      }

      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: data.reply ?? '' },
      ])
    } catch (err) {
      const msg =
        err instanceof Error
          ? err.message
          : 'Unable to get a response. Please try again.'
      setErrorMsg(msg)
    } finally {
      setIsLoading(false)
    }
  }, [input, messages, isLoading])

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  // Must be after all hooks — Rules of Hooks forbid early returns before hooks
  if (pathname.startsWith('/studio')) return null

  return (
    <>
      {/* ── Chat panel ───────────────────────────────────────────────────────
          Mobile  (< sm): fixed full-screen overlay (inset-0, 100dvh)
          Desktop (≥ sm): compact bottom-right card, fully inside the viewport
      ──────────────────────────────────────────────────────────────────── */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="AOA Reach chat assistant"
          aria-modal="false"
          className={[
            // --- shared ---
            'fixed z-[70] flex flex-col bg-white',
            // --- mobile: full-screen overlay ---
            'inset-0',
            // --- desktop: anchored bottom-right card ---
            'sm:inset-auto sm:bottom-4 sm:right-4',
            'sm:w-[380px] sm:max-w-[calc(100vw-2rem)]',
            'sm:rounded-2xl sm:shadow-2xl sm:border sm:border-gray-100',
            // Height: target 600px, but never exceed the viewport on short screens
            'sm:h-[600px] sm:max-h-[calc(100vh-6rem)]',
          ].join(' ')}
        >
          {/* Header — close button lives here, not in the launcher */}
          <div className="bg-[#08361d] px-4 py-3 flex items-center justify-between shrink-0 sm:rounded-t-2xl">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/15 rounded-full flex items-center justify-center">
                <MessageCircle className="w-4 h-4 text-white" aria-hidden="true" />
              </div>
              <div>
                <p className="font-elegant text-white font-semibold text-sm leading-tight">
                  AOA Reach Assistant
                </p>
                <p className="font-sans text-white/60 text-xs">Ask about our programmes</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
              className="text-white/60 hover:text-white transition-colors p-1 rounded-md hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/40"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>

          {/* Message list — scrolls internally, never overflows the card */}
          <div
            className="flex-1 overflow-y-auto p-4 space-y-3"
            aria-live="polite"
            aria-atomic="false"
            aria-relevant="additions"
            aria-label="Chat messages"
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[82%] rounded-2xl px-3.5 py-2 text-sm font-sans leading-relaxed whitespace-pre-wrap ${
                    msg.role === 'user'
                      ? 'bg-[#08361d] text-white rounded-br-sm'
                      : 'bg-gray-100 text-gray-800 rounded-bl-sm'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {isLoading && <TypingDots />}

            {errorMsg && (
              <div className="flex justify-start">
                <div className="max-w-[82%] bg-red-50 border border-red-100 text-red-700 rounded-2xl rounded-bl-sm px-3.5 py-2 text-sm font-sans leading-relaxed">
                  {errorMsg}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} aria-hidden="true" />
          </div>

          {/* Disclaimer */}
          <p className="font-sans text-[10px] text-gray-400 text-center px-4 pt-1 shrink-0">
            This assistant answers based on AOA's knowledge base only.
          </p>

          {/* Input — safe-area-inset-bottom keeps it above the mobile browser bar */}
          <div
            className="border-t border-gray-100 px-3 py-2.5 shrink-0"
            style={{ paddingBottom: 'max(0.625rem, env(safe-area-inset-bottom, 0.625rem))' }}
          >
            <div className="flex items-center gap-2">
              <label htmlFor="chat-input" className="sr-only">
                Message
              </label>
              <input
                id="chat-input"
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => {
                  setInput(e.target.value)
                  if (errorMsg) setErrorMsg(null)
                }}
                onKeyDown={handleInputKeyDown}
                placeholder="Type your message…"
                disabled={isLoading}
                maxLength={1000}
                className="flex-1 text-sm font-sans bg-gray-50 border border-gray-200 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#08361d]/30 focus:border-[#08361d] placeholder-gray-400 disabled:opacity-50 transition-colors"
              />
              <button
                onClick={sendMessage}
                disabled={isLoading || !input.trim()}
                aria-label="Send message"
                className="w-9 h-9 bg-[#08361d] text-white rounded-full flex items-center justify-center hover:bg-[#062814] disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 shrink-0 focus:outline-none focus:ring-2 focus:ring-[#08361d]/40 focus:ring-offset-1"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                ) : (
                  <Send className="w-4 h-4" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Launcher bubble ──────────────────────────────────────────────────
          Independent fixed element — NOT a sibling of the panel in a flex
          column, so it can never appear as a detached close button.
          Hidden on mobile while the full-screen overlay is open.
      ──────────────────────────────────────────────────────────────────── */}
      <button
        ref={toggleBtnRef}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? 'Close chat assistant' : 'Open chat assistant'}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        className={[
          'fixed bottom-4 right-4 z-[60]',
          'w-14 h-14 bg-[#08361d] text-white rounded-full shadow-2xl',
          'flex items-center justify-center',
          'hover:bg-[#062814] transition-all duration-300 hover:scale-105',
          'focus:outline-none focus:ring-2 focus:ring-[#08361d] focus:ring-offset-2',
          // On mobile, the full-screen panel covers everything — hide the launcher
          isOpen ? 'hidden sm:flex' : 'flex',
        ].join(' ')}
      >
        {isOpen
          ? <X className="w-6 h-6" aria-hidden="true" />
          : <MessageCircle className="w-6 h-6" aria-hidden="true" />
        }
      </button>
    </>
  )
}
```

### 6.2 State Management

All state is local React component state (no global store, no Context, no external state library):

| State variable | Type | Purpose |
|---|---|---|
| `isOpen` | `boolean` | Whether the chat panel is visible |
| `messages` | `Message[]` | Full conversation history including the initial bot message |
| `input` | `string` | Controlled value of the text input field |
| `isLoading` | `boolean` | Whether a request is in-flight |
| `errorMsg` | `string \| null` | Last error message to show inline (null when none) |

Three DOM refs are used: `inputRef` (focus management), `messagesEndRef` (scroll target), `toggleBtnRef` (focus restoration on close).

### 6.3 How Conversation History is Sent

On every `sendMessage()` call, the component builds `nextMessages` by spreading the current `messages` array and appending the new user message. This **entire array** — including all prior turns — is serialised as JSON and sent in the `POST /api/chat` request body as `{ messages: nextMessages }`. There is no session token, cookie, or server-side session; the client owns and transmits the full history on every request. The API route then applies its own 20-message cap server-side.

### 6.4 Loading / Typing Indicator

While `isLoading` is `true`, the `<TypingDots />` component is rendered in the message list. This is an `aria-hidden="true"` div containing three grey circles animated with Tailwind's `animate-bounce` class, each with a CSS `animationDelay` of 0ms, 150ms, and 300ms respectively, creating a staggered bounce effect. No streaming of tokens is implemented — the indicator shows until the full response arrives.

### 6.5 Error Handling in the UI

If `fetch` throws (network failure) or `res.ok` is false, the caught error message is stored in `errorMsg` and rendered as a red-tinted message bubble in the message list (below the conversation). The error is not added to the `messages` array, so it is not sent to the API on the next request. Typing a new character in the input clears the error: `if (errorMsg) setErrorMsg(null)` in the `onChange` handler.

### 6.6 Layout Behaviour

The widget consists of two independent `position: fixed` elements rendered as React fragments (not nested in a shared wrapper):

**Launcher button (always rendered unless returning null for /studio):**
- Position: `bottom: 1rem; right: 1rem` (Tailwind `bottom-4 right-4`)
- Size: 56×56px (Tailwind `w-14 h-14`)
- z-index: 60
- Hidden on mobile (`< sm`) while the panel is open via `hidden sm:flex`
- Shows `MessageCircle` icon when closed, `X` icon when open

**Chat panel (conditionally rendered when `isOpen` is true):**

| Breakpoint | Layout |
|---|---|
| Mobile (< 640px / `sm`) | `position: fixed; inset: 0` — full-screen overlay filling the entire viewport |
| Desktop (≥ 640px) | `position: fixed; bottom: 1rem; right: 1rem; width: 380px; max-width: calc(100vw - 2rem); height: 600px; max-height: calc(100vh - 6rem)` |

- z-index: 70 (above launcher)
- Internal layout: flex column — header (`shrink-0`) → scrollable message list (`flex: 1; overflow-y: auto`) → disclaimer (`shrink-0`) → input row (`shrink-0`)
- Mobile browser chrome: the input row bottom padding uses `env(safe-area-inset-bottom, 0.625rem)` via inline `style` to avoid being obscured by iOS/Android UI chrome

**Note:** The code comment says "100dvh" but the actual implementation uses `inset: 0` on a `position: fixed` element, which achieves an equivalent result (the element spans the full visual viewport). `height: 100dvh` is not literally in the code.

**Body scroll lock:** When the panel opens, `document.body.style.overflow = 'hidden'` is set directly. When it closes (or the component unmounts), `document.body.style.overflow = ''` is restored via the `useEffect` cleanup.

### 6.7 Accessibility Features

| Feature | Implementation |
|---|---|
| ARIA role | `role="dialog"` on the panel element |
| ARIA label | `aria-label="AOA Reach chat assistant"` on the panel |
| `aria-modal` | Set to `"false"` — note: this is a deviation from standard modal patterns where `aria-modal="true"` is expected for dialogs that obscure background content |
| Live region | `aria-live="polite"`, `aria-atomic="false"`, `aria-relevant="additions"` on the message list div |
| Close button label | `aria-label="Close chat"` |
| Launcher button label | `aria-label` toggled between `"Open chat assistant"` / `"Close chat assistant"` |
| `aria-expanded` | Applied to launcher button, reflects `isOpen` state |
| `aria-haspopup` | `"dialog"` on the launcher button |
| Screen-reader-only label | `<label htmlFor="chat-input" className="sr-only">Message</label>` |
| Keyboard — send | Enter key (without Shift) submits the message |
| Keyboard — close | Escape key closes the panel via a `keydown` document listener |
| Focus on open | Input field focused after 80ms delay via `setTimeout` |
| Focus on close | Launcher button receives focus via `toggleBtnRef.current?.focus()` |
| Reduced motion | `scrollIntoView` uses `behavior: 'auto'` instead of `'smooth'` when `prefers-reduced-motion: reduce` matches |
| Icon decorative | All Lucide icons carry `aria-hidden="true"` |
| Typing indicator | `<TypingDots>` carries `aria-hidden="true"` |

### 6.8 Text Shown to Users

**Initial greeting (pre-loaded into `messages` state, not fetched from API):**
> "Hi! I'm here to help you learn about AOA Reach and how to get involved. What would you like to know?"

**Disclaimer (shown at all times when panel is open, above the input):**
> "This assistant answers based on AOA's knowledge base only."

**Input placeholder:**
> "Type your message…"

---

## 7. Integration into the Site

### 7.1 Mount Point

`<ChatWidget />` is imported and rendered in `src/app/layout.tsx` — the root layout that wraps every page in the application. This means the widget mounts on every route except `/studio/*`, where the component itself returns `null` after checking `usePathname()`.

Relevant excerpt from `src/app/layout.tsx`:
```tsx
<ChatWidget />
<div className="hidden fixed bottom-4 right-4 z-50">
  {/* Developer badge — currently hidden via 'hidden' class */}
</div>
```

The developer badge div (z-index 50, `bottom-4 right-4`) is currently hidden with Tailwind's `hidden` class. The chatbot launcher (z-index 60) and panel (z-index 70) sit above it in the stacking context.

### 7.2 `next.config.ts` — Relevant Settings

```typescript
const securityHeaders = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
]

async headers() {
  return [
    {
      source: "/((?!studio).*)",
      headers: securityHeaders,
    },
  ]
}
```

The security headers are applied to all routes **except** `/studio`. Notably:
- **No `X-Robots-Tag` header is set**, so the headers do not accidentally block crawlers.
- **No `Content-Security-Policy` is set**, so the `POST /api/chat` route has no CSP restriction.
- **`serverExternalPackages` is not set.** The `@anthropic-ai/sdk` runs in the API route (Node.js edge/serverless environment) without needing explicit externalisation because Next.js API routes run in the Node.js runtime by default.
- `reactCompiler: true` is set, enabling the React Compiler optimisation.

---

## 8. Environment & Deployment

### 8.1 Environment Variables Used by the Chatbot

| Variable | Value | Read in |
|---|---|---|
| `ANTHROPIC_API_KEY` | `<REDACTED>` | `src/app/api/chat/route.ts` — `process.env.ANTHROPIC_API_KEY` |

No other environment variables are read by the chatbot code. (`NEXT_PUBLIC_SITE_URL` is used for SEO/URLs elsewhere but not by the chatbot.)

### 8.2 Why the API Key Never Reaches the Browser

`ANTHROPIC_API_KEY` does **not** have the `NEXT_PUBLIC_` prefix. In Next.js, only variables prefixed with `NEXT_PUBLIC_` are bundled into the client-side JavaScript. Variables without that prefix are available only in the Node.js server runtime (API routes, server components, `getServerSideProps`, etc.) and are entirely absent from any code shipped to the browser.

The API key is read exclusively in `src/app/api/chat/route.ts`, which is a Next.js App Router Route Handler — it runs only on the server, never in the browser bundle. There is no mechanism by which the key could be sent to the client.

### 8.3 Deployment

- **Platform:** Vercel
- **Domain:** `https://aoareach.org`
- **Route type:** The `POST /api/chat` endpoint is a Next.js App Router Route Handler. On Vercel, this compiles to a **serverless function** (AWS Lambda under the hood). It is not an Edge Function — no `export const runtime = 'edge'` declaration exists in the route file, so it defaults to the Node.js serverless runtime.
- **Cold start implication:** The in-memory rate-limit `Map` is reset on each cold start and is not shared between concurrent instances.

---

## 9. Data Flow (End to End)

The following describes exactly what happens from a user typing a message to seeing a reply:

**Step 1 — User types and submits (browser, `ChatWidget.tsx`)**
The user types in the `<input id="chat-input">` field and either presses Enter or clicks the Send button. The `sendMessage()` function is called.

**Step 2 — State update (browser, `ChatWidget.tsx`)**
`sendMessage()` immediately: appends the new user message to the `messages` state array, clears the input field, sets `isLoading = true`, and clears any prior `errorMsg`. The UI re-renders, showing the user's message in a green bubble and the animated `<TypingDots />` indicator.

**Step 3 — HTTP request (browser → server)**
`fetch('/api/chat', { method: 'POST', ... })` is called with the full updated `messages` array serialised as JSON in the request body. The request goes to the same Vercel deployment.

**Step 4 — Route handler receives request (server, `src/app/api/chat/route.ts`)**
The Next.js serverless function wakes (or reuses a warm instance). The `POST` export runs:
1. Checks `client` is not null (API key present)
2. Extracts client IP and checks rate limit
3. Parses and validates the JSON body
4. Caps history to last 20 messages; finds first user turn

**Step 5 — Anthropic API call (server → Anthropic)**
`client.messages.create()` makes an HTTPS POST to `https://api.anthropic.com/v1/messages` with the `claude-haiku-4-5` model, the full `SYSTEM_PROMPT` (including the entire knowledge base), and the conversation history. This is a synchronous (non-streaming) call; the route handler awaits the complete response.

**Step 6 — Anthropic processes and responds (Anthropic → server)**
The Anthropic API returns a `Message` object. The response is received by the route handler.

**Step 7 — Response processing (server, `src/app/api/chat/route.ts`)**
The route handler:
1. Extracts text from content blocks
2. Checks for and parses a `<<<CAPTURE ... >>>` block (if present, logs it to console)
3. Strips the capture block from the reply string
4. Returns `NextResponse.json({ reply })` with HTTP 200

**Step 8 — Response received (browser, `ChatWidget.tsx`)**
The `fetch` promise resolves. The component checks `res.ok`, extracts `data.reply`, and appends a new `assistant` message to the `messages` state. `isLoading` is set to `false`. The UI re-renders showing the reply in a grey bubble. The `messagesEndRef` scroll target is scrolled into view.

**Boundary summary:**

```
[Browser]                    [Vercel Serverless]          [Anthropic API]
ChatWidget.tsx
  sendMessage()
    → fetch POST /api/chat ──► route.ts POST handler
                                 checkRateLimit()
                                 validate input
                                 client.messages.create() ──► api.anthropic.com
                                                          ◄── Message response
                                 parseCaptureBlock()
                                 console.log (lead stub)
                                 strip CAPTURE block
                               ◄── { reply: string }
  setMessages([...reply])
  setIsLoading(false)
```

---

## 10. Data Protection / Privacy Measures Actually Implemented

### 10.1 What Personal Data the Chatbot Can Collect

The chatbot can collect the following if a user volunteers it:
- **For volunteers:** name, contact (email or phone number), areas of interest, availability
- **For identified donors:** name and email (if they opt out of anonymous giving)

The system prompt's lead-capture mechanism (`<<<CAPTURE>>>`) is designed to receive this data from the model.

### 10.2 Consent Mechanism

Consent is enforced entirely through the **system prompt instructions** — there is no separate consent UI, checkbox, or explicit consent record in the front end. The system prompt specifies:
- For volunteers: the bot must explain what will be collected and ask "is that okay?" before collecting anything; it must "only proceed on a clear yes"
- For donors: the bot must offer anonymous giving first and only collect details if the user explicitly opts for acknowledgement

Whether the model actually honours these instructions on every invocation depends on Claude's instruction-following behaviour; it is not enforced by application code.

The `<<<CAPTURE>>>` block includes `consent: true` as a field, written by the model, but this field is not validated server-side — it is simply parsed and logged alongside the other fields.

### 10.3 Where Captured Data Actually Goes

**Currently: nowhere persistent.** `handleLeadCapture()` calls `console.log()` only:

```typescript
async function handleLeadCapture(data: Record<string, string>): Promise<void> {
  console.log('[AOA Chatbot] Lead captured (Phase 2: wire to Resend/store):', JSON.stringify(data))
}
```

On Vercel, `console.log` output appears in the function logs accessible via the Vercel dashboard. These logs have a retention period set by Vercel's plan tier. No email is sent, no database record is created, and no third-party data processor receives the data.

### 10.4 Conversation History Storage

- **Server-side:** No conversation history is stored server-side at any point. The route handler is stateless; each request is self-contained. No database, cache, or session store is used.
- **Browser-side:** The full conversation history lives in React component state (`useState`) in `ChatWidget.tsx`. It exists only in memory for the duration of the browser session. Closing the tab, refreshing the page, or navigating away destroys the history. No `localStorage`, `sessionStorage`, or cookies are used.

### 10.5 What the Bot is Instructed Never to Request

From the system prompt's `# DATA & SAFETY RULES` section:

> "Never ask for or accept: card numbers, CVV, bank passwords, OTPs/verification codes, or government ID numbers. If a user starts typing these, stop them and explain they should never share that in a chat."

This is a model-level instruction. There is no application-level filtering or detection of these data types.

---

## 11. Honest Limitations / Known Gaps

The following are factual gaps in the current implementation, described honestly for academic accuracy:

1. **Knowledge base is almost entirely placeholder.** The majority of `knowledgeBase.ts` is `[PLACEHOLDER]` text. The chatbot cannot answer questions about AOA's specific programmes, impact figures, donation bank details, volunteer areas, or social media accounts using real data. The bank account number is `XXXXXXXXXX` and the phone number is `+234-XXX-XXX-XXXX`.

2. **Lead capture does nothing.** `handleLeadCapture()` is a `console.log` stub. Volunteer and donor contact details collected in conversation are logged to Vercel's function console and then lost. No email delivery, database persistence, or notification system is wired up.

3. **Rate limiting is best-effort on serverless.** The in-memory `Map` is per-serverless-instance. Vercel can and does run multiple concurrent instances of the same function, so the effective rate limit per user is `15 × (number of warm instances)`, not a hard global 15. Under load, this provides no meaningful protection.

4. **No response streaming.** The Anthropic API is called with a standard blocking request (`messages.create()`, not `stream()`). The user sees nothing until the full response arrives, which can take several seconds for longer replies. The typing animation runs during this wait but does not reflect actual token generation.

5. **No prompt caching.** The `cache_control` parameter is not used. The full system prompt (and the full knowledge base) is sent to Anthropic on every request and billed accordingly. As the knowledge base grows, per-request token costs will rise proportionally.

6. **No persistent conversation history.** Refreshing the page or navigating away resets the conversation. There is no way to resume a session.

7. **Consent enforced only by model instructions, not by code.** The data-collection consent flow depends entirely on the language model following the system prompt. There is no application-level gate that prevents the `<<<CAPTURE>>>` block from being emitted without a genuine prior consent signal from the user.

8. **`aria-modal="false"` on a full-screen mobile overlay.** On mobile the panel covers the entire viewport, but `aria-modal` is set to `"false"`. Screen readers may therefore allow users to interact with background content that is visually inaccessible, which is non-standard for a covering dialog.

9. **No input sanitisation beyond length.** Message content is validated for type and length (max 4,000 characters) but is not sanitised for HTML, script injection, or prompt injection patterns before being sent to the model. The model itself is the only defence against adversarial prompts.

10. **No error retry logic.** If the Anthropic API returns a transient error (e.g. HTTP 529 overload), the user sees a generic error message and must manually resend their message. No automatic retry or exponential backoff is implemented.

11. **No telemetry or conversation analytics.** There is no logging of conversation turns, topics, or outcomes (beyond the `console.log` lead capture stub). It is not possible to measure chatbot effectiveness, common questions, or drop-off points.

12. **Studio exclusion relies on `usePathname()`** This means the chatbot code still loads in the JavaScript bundle for the `/studio` route; it simply returns `null`. It does not prevent the SDK or state from initialising on the client — it only suppresses rendering.

---

*End of document. Generated from a read-only analysis of the codebase at the time of writing.*

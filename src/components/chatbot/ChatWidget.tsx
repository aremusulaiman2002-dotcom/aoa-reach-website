'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
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
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const inputRef = useRef<HTMLInputElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const toggleBtnRef = useRef<HTMLButtonElement>(null)

  // Focus the input when panel opens
  useEffect(() => {
    if (isOpen) {
      const t = setTimeout(() => inputRef.current?.focus(), 80)
      return () => clearTimeout(t)
    } else {
      // Return focus to the toggle button when panel closes
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

  return (
    // Sits above the existing developer badge (bottom-4 right-4)
    <div className="fixed bottom-20 right-4 z-[60] flex flex-col items-end gap-3">

      {/* ── Chat panel ───────────────────────────────────────────────── */}
      {isOpen && (
        <div
          ref={panelRef}
          role="dialog"
          aria-label="AOA Reach chat assistant"
          aria-modal="false"
          className="w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden"
          style={{ height: '480px' }}
        >
          {/* Header */}
          <div className="bg-[#08361d] px-4 py-3 flex items-center justify-between shrink-0">
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
              <X className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>

          {/* Message list */}
          <div
            className="flex-1 overflow-y-auto p-4 space-y-3 scroll-smooth"
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

          {/* Input area */}
          <div className="border-t border-gray-100 px-3 py-2.5 shrink-0">
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

      {/* ── Toggle button ────────────────────────────────────────────── */}
      <button
        ref={toggleBtnRef}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? 'Close chat assistant' : 'Open chat assistant'}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        className="w-14 h-14 bg-[#08361d] text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-[#062814] transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#08361d] focus:ring-offset-2"
      >
        {isOpen ? (
          <X className="w-6 h-6" aria-hidden="true" />
        ) : (
          <MessageCircle className="w-6 h-6" aria-hidden="true" />
        )}
      </button>
    </div>
  )
}

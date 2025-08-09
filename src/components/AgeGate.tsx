'use client'

import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'

const OK_COOKIE = 'ze_age_ok'
const REQ_COOKIE = 'ze_required_age'
const REGION_COOKIE = 'ze_region'
const DAYS_OK = 90

function getCookie(name: string): string {
  if (typeof document === 'undefined') return ''
  return document.cookie
    .split('; ')
    .find(row => row.startsWith(name + '='))
    ?.split('=')[1] || ''
}

function setCookie(name: string, value: string, days: number) {
  const d = new Date()
  d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000)
  document.cookie = `${name}=${value};expires=${d.toUTCString()};path=/;SameSite=Lax`
}

export default function AgeGate() {
  const [show, setShow] = useState(false)
  const [requiredAge, setRequiredAge] = useState<number>(18)
  const [region, setRegion] = useState<string>('')

  const reduced = useReducedMotion()

  useEffect(() => {
    const ok = getCookie(OK_COOKIE)
    const ageStr = getCookie(REQ_COOKIE)
    const regionStr = getCookie(REGION_COOKIE)
    if (ageStr) setRequiredAge(Number(ageStr) || 18)
    if (regionStr) setRegion(decodeURIComponent(regionStr))

    if (!ok) {
      setShow(true)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  const accept = () => {
    setCookie(OK_COOKIE, '1', DAYS_OK)
    setShow(false)
    document.body.style.overflow = ''
  }

  if (!show) return null

  return (
    <div aria-modal="true" role="dialog" className="fixed inset-0 z-[9999] flex items-center justify-center">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: reduced ? 0.5 : 0.6 }}
        className="absolute inset-0 bg-black"
      />
      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: reduced ? 0 : 16, scale: reduced ? 1 : 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.25 }}
        className="relative mx-4 w-full max-w-md rounded-2xl border p-6 md:p-8
                   bg-[color:var(--bg)] border-[color:var(--muted)]/20 shadow-2xl"
      >
        <h2 className="text-2xl md:text-3xl font-extrabold text-[color:var(--text)] text-center">{requiredAge}+ Only</h2>
        <p className="mt-3 text-center text-[color:var(--muted)]">
          We create casino games exclusively for the Stake ecosystem. By entering, you confirm you meet the legal gambling
          age for your location{region ? ` (${region})` : ''}.
        </p>

        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <button
            onClick={accept}
            className="flex-1 rounded-xl px-4 py-3 font-semibold
                       bg-[color:var(--primary)] text-white hover:opacity-95
                       focus:outline-none focus:ring-2 focus:ring-[color:var(--primary)]/60"
          >
            I'm {requiredAge}+ — Enter
          </button>
          <Link
            href="/about"
            className="flex-1 rounded-xl px-4 py-3 text-center font-semibold
                       border bg-transparent
                       border-[color:var(--muted)]/30 text-[color:var(--text)]
                       hover:border-[color:var(--primary)]/50"
          >
            Learn More
          </Link>
        </div>

        <p className="mt-4 text-center text-xs text-[color:var(--muted)]/70">
          Please gamble responsibly. Local rules may vary. This notice is informational and not legal advice.
        </p>
      </motion.div>
    </div>
  )
}

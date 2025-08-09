import Link from 'next/link'
import { Container } from '@/components/ui/container'

export function Footer() {
  return (
    <footer className="bg-[color:var(--bg)] border-t border-[color:var(--muted)]/20">
      <Container>
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="col-span-1 md:col-span-2">
              <Link href="/" className="inline-block">
                <div className="text-2xl font-bold text-[color:var(--text)] mb-4">
                  ZeroEdge Studios
                </div>
              </Link>
              <p className="text-[color:var(--muted)] max-w-md">
                A Stake-exclusive game studio creating unique slot games built on Stake Engine 
                for the world's leading crypto casino.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-[color:var(--text)] font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/games" className="text-[color:var(--muted)] hover:text-[color:var(--text)] transition-colors">
                    Games
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-[color:var(--muted)] hover:text-[color:var(--text)] transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/news" className="text-[color:var(--muted)] hover:text-[color:var(--text)] transition-colors">
                    News
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="text-[color:var(--muted)] hover:text-[color:var(--text)] transition-colors">
                    Careers
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-[color:var(--text)] font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/legal" className="text-[color:var(--muted)] hover:text-[color:var(--text)] transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/legal#privacy" className="text-[color:var(--muted)] hover:text-[color:var(--text)] transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/legal#responsible-gaming" className="text-[color:var(--muted)] hover:text-[color:var(--text)] transition-colors">
                    Responsible Gaming
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-[color:var(--muted)]/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-[color:var(--muted)]/60 text-sm">
              © 2025 ZeroEdge Studios. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <div className="flex items-center gap-2 text-xs text-[color:var(--muted)]/60">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/><path d="M7 12h10M12 7v10" stroke="currentColor" strokeWidth="1.5"/></svg>
                <span>Fair Play</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[color:var(--muted)]/60">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M7 12h10" stroke="currentColor" strokeWidth="1.5"/></svg>
                <span>RNG</span>
              </div>
              <a
                href="#"
                className="text-[color:var(--muted)]/60 hover:text-[color:var(--text)] transition-colors"
                aria-label="LinkedIn"
              >
                LinkedIn
              </a>
              <a
                href="#"
                className="text-[color:var(--muted)]/60 hover:text-[color:var(--text)] transition-colors"
                aria-label="Twitter"
              >
                Twitter
              </a>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  )
}

'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Container } from '@/components/ui/container'
import { Card } from '@/components/ui/card'
import { getNews } from '@/lib/data'
import { formatDate } from '@/lib/utils'

export default function NewsPage() {
  const news = getNews()

  return (
    <div className="min-h-screen py-20">
      <Container>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[color:var(--text)]">News & Updates</h1>
          <p className="text-[color:var(--muted)] max-w-2xl mx-auto">
            Stay updated with our latest announcements, industry insights, and studio news
          </p>
        </motion.div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.map((post, index) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={`/news/${post.slug}`}>
                <Card className="h-full group overflow-hidden bg-[color:var(--bg)] border border-[color:var(--muted)]/20">
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      src={post.cover}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-[color:var(--primary)]/20 group-hover:scale-[1.03] transition-transform duration-300" />
                  </div>
                  <div className="p-6">
                    <div className="text-xs tracking-wide uppercase text-[color:var(--muted)]/60 mb-2">
                      {formatDate(post.date)}
                    </div>
                    <h3 className="font-bold text-lg leading-tight mb-2 group-hover:text-[color:var(--primary)] transition-colors text-[color:var(--text)]">
                      {post.title}
                    </h3>
                    <p className="text-[color:var(--muted)] text-sm leading-snug mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <span className="text-[color:var(--primary)] inline-flex items-center gap-1 group-hover:text-[color:var(--accent)] transition-colors font-medium">
                      Read
                      <span className="inline-block transition-transform duration-300 group-hover:translate-x-0.5">→</span>
                    </span>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </div>
  )
}

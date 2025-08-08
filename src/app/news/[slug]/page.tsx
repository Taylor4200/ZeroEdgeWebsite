'use client'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Container } from '@/components/ui/container'
import { Card } from '@/components/ui/card'
import { getNewsBySlug, getLatestNews } from '@/lib/data'
import { formatDate } from '@/lib/utils'

interface NewsPageProps {
  params: { slug: string }
}

export default function NewsPage({ params }: NewsPageProps) {
  const post = getNewsBySlug(params.slug)
  
  if (!post) {
    notFound()
  }

  const latestNews = getLatestNews(3).filter(p => p.slug !== params.slug)

  return (
    <div className="min-h-screen py-20">
      <Container>
        {/* Article Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto mb-12"
        >
          <div className="text-center mb-8">
            <div className="text-sm text-[color:var(--muted)]/60 mb-4">
              {formatDate(post.date)}
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-6 text-[color:var(--text)]">{post.title}</h1>
            <p className="text-xl text-[color:var(--muted)] max-w-2xl mx-auto">
              {post.excerpt}
            </p>
          </div>
        </motion.div>

        {/* Article Content */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto mb-16"
        >
          <Card className="p-8 md:p-12">
            <div 
              className="prose prose-invert prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: post.contentHtml }}
            />
          </Card>
        </motion.div>

        {/* Related News */}
        {latestNews.length > 0 && (
          <section className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-8"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[color:var(--text)]">More News</h2>
              <p className="text-[color:var(--muted)]">
                Stay updated with our latest announcements
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {latestNews.map((relatedPost, index) => (
                <motion.div
                  key={relatedPost.slug}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link href={`/news/${relatedPost.slug}`}>
                    <Card className="h-full group bg-[color:var(--bg)] border border-[color:var(--muted)]/20">
                      <div className="relative aspect-video overflow-hidden rounded-t-2xl">
                        <div className="absolute inset-0 bg-[color:var(--primary)]/20" />
                      </div>
                      <div className="p-4">
                        <div className="text-xs text-[color:var(--muted)]/60 mb-2">
                          {formatDate(relatedPost.date)}
                        </div>
                        <h3 className="font-bold text-sm mb-2 group-hover:text-[color:var(--primary)] transition-colors text-[color:var(--text)]">
                          {relatedPost.title}
                        </h3>
                        <p className="text-[color:var(--muted)] text-xs line-clamp-2">
                          {relatedPost.excerpt}
                        </p>
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* Back to News */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link
            href="/news"
            className="inline-flex items-center text-[color:var(--primary)] hover:text-[color:var(--accent)] transition-colors font-medium"
          >
            ← Back to News
          </Link>
        </motion.div>
      </Container>
    </div>
  )
}

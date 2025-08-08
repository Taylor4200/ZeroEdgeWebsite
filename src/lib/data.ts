import gamesData from '@/data/games.json'
import newsData from '@/data/news.json'
import partnersData from '@/data/partners.json'

export interface Game {
  slug: string
  title: string
  tagline: string
  thumb: string
  hero: string
  status: 'live' | 'coming-soon'
  mechanics: string[]
  rtp_range: string
  volatility: string
  max_win: string
  features: string[]
  demo_url: string
  presskit: string
  thumbYPosition?: string // Optional Y position for thumbnail (e.g., '25%', '75%', 'top', 'bottom')
}

export interface NewsPost {
  slug: string
  title: string
  date: string
  excerpt: string
  cover: string
  contentHtml: string
}

export interface Partner {
  name: string
  logo: string
  link: string
}

export function getGames(): Game[] {
  return gamesData as Game[]
}

export function getGameBySlug(slug: string): Game | undefined {
  return gamesData.find((game) => game.slug === slug) as Game | undefined
}

export function getLiveGames(): Game[] {
  return gamesData.filter((game) => game.status === 'live') as Game[]
}

export function getComingSoonGames(): Game[] {
  return gamesData.filter((game) => game.status === 'coming-soon') as Game[]
}

export function getNews(): NewsPost[] {
  return newsData as NewsPost[]
}

export function getNewsBySlug(slug: string): NewsPost | undefined {
  return newsData.find((post) => post.slug === slug) as NewsPost | undefined
}

export function getLatestNews(limit: number = 3): NewsPost[] {
  return newsData
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit) as NewsPost[]
}

export function getPartners(): Partner[] {
  return partnersData as Partner[]
}

export function getRelatedGames(currentSlug: string, limit: number = 3): Game[] {
  const currentGame = getGameBySlug(currentSlug)
  if (!currentGame) return []

  const allGames = getGames().filter((game) => game.slug !== currentSlug)
  
  // Simple related logic based on mechanics overlap
  const related = allGames
    .map((game) => ({
      game,
      score: game.mechanics.filter((m) => currentGame.mechanics.includes(m)).length
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.game)

  return related
}

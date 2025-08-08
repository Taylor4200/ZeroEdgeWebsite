import 'server-only'
import { notFound } from 'next/navigation'
import { GameDetailView } from '@/components/games/game-detail-view'
import { getGameBySlug, getRelatedGames } from '@/lib/data'

interface GamePageProps {
  params: { slug: string }
}

export default function GamePage({ params }: GamePageProps) {
  const game = getGameBySlug(params.slug)
  
  if (!game) {
    notFound()
  }

  const relatedGames = getRelatedGames(params.slug, 3)

  return (
    <GameDetailView game={game} relatedGames={relatedGames} />
  )
}

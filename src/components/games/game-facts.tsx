import { Badge } from '@/components/ui/badge'
import { Game } from '@/lib/data'

interface GameFactsProps {
  game: Game
}

export function GameFacts({ game }: GameFactsProps) {
  const facts = [
    { label: 'RTP Range', value: game.rtp_range },
    { label: 'Volatility', value: game.volatility },
    { label: 'Max Win', value: game.max_win },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-white font-semibold mb-3">Quick Facts</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {facts.map((fact) => (
            <div key={fact.label} className="bg-background-secondary/50 rounded-xl p-4 border border-border">
              <div className="text-white/60 text-sm">{fact.label}</div>
              <div className="text-white font-semibold">{fact.value}</div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-white font-semibold mb-3">Mechanics</h3>
        <div className="flex flex-wrap gap-2">
          {game.mechanics.map((mechanic) => (
            <Badge key={mechanic} variant="info">
              {mechanic}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  )
}

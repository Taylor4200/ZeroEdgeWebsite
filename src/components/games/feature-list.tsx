import { Star, Zap, Target } from 'lucide-react'

interface FeatureListProps {
  features: string[]
}

const icons = [Star, Zap, Target]

export function FeatureList({ features }: FeatureListProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-white font-semibold text-lg">Key Features</h3>
      <ul className="space-y-3">
        {features.map((feature, index) => {
          const Icon = icons[index % icons.length]
          return (
            <li key={feature} className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-neon-purple/20 flex items-center justify-center mt-0.5">
                <Icon className="w-3 h-3 text-neon-purple" />
              </div>
              <span className="text-white/80">{feature}</span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

import {
  Circle,
  CircleDot,
  Cog,
  CookingPot,
  Flame,
  LayoutGrid,
  Pizza,
  Popcorn,
  Sandwich,
  Scissors,
  Square,
  Zap,
  type LucideProps,
} from "lucide-react"

/**
 * Maps the category icon name stored in data to a real lucide component so
 * every category chip / card uses one consistent, semantically relevant
 * line-icon set (never emoji).
 */
const iconMap = {
  Circle,
  CircleDot,
  Cog,
  CookingPot,
  Flame,
  LayoutGrid,
  Pizza,
  Popcorn,
  Sandwich,
  Scissors,
  Square,
  Zap,
} as const

export type CategoryIconName = keyof typeof iconMap

export function CategoryIcon({ name, ...props }: { name: string } & LucideProps) {
  const Icon = iconMap[name as CategoryIconName] ?? Cog
  return <Icon {...props} aria-hidden="true" />
}

export const outlineColorMap = {
  'red': 'outline-red-500',
  'orange': 'outline-orange-500',
  'amber': 'outline-amber-500',
  'yellow': 'outline-yellow-500',
  'lime': 'outline-lime-500',
  'green': 'outline-green-500',
  'emerald': 'outline-emerald-500',
  'teal': 'outline-teal-500',
  'cyan': 'outline-cyan-500',
  'sky': 'outline-sky-500',
  'blue': 'outline-blue-500',
  'indigo': 'outline-indigo-500',
  'violet': 'outline-violet-500',
  'purple': 'outline-purple-500',
  'fuchsia': 'outline-fuchsia-500',
  'pink': 'outline-pink-500',
  'rose': 'outline-rose-500',
  'none': 'outline-transparent',
} as const

export type OutlineColor = keyof typeof outlineColorMap
import type { BrandColor } from '~/utils/brand'

// TODO: reemplazar por fotos reales de trabajos (por ejemplo, /public/trabajos/*.jpg)
export const gallery: { title: string, tag: string, icon: string, color: BrandColor, image?: string }[] = [
  { title: 'Tazas sublimadas para egresados', tag: 'Sublimación', icon: 'lucide:coffee', color: 'cyan' },
  { title: 'Mates grabados con nombre', tag: 'Grabado láser', icon: 'lucide:cup-soda', color: 'magenta' },
  { title: 'Agendas con tapa personalizada', tag: 'Papelería', icon: 'lucide:notebook', color: 'yellow' },
]

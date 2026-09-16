import type { BrandColor } from '~/utils/brand'

export type CategoryId = 'sublimacion' | 'laser' | 'papeleria' | 'diseno'

export interface Category {
  id: CategoryId
  name: string
  description: string
  highlights: string[]
  icon: string
  color: BrandColor
}

export interface ProductOption {
  id: string
  label: string
  choices: { label: string, extra?: number }[]
}

export interface Product {
  slug: string
  name: string
  category: CategoryId
  description: string
  icon: string
  /** Ruta dentro de /public, por ejemplo "/productos/taza.jpg". Si no hay, se muestra una ilustración. */
  image?: string
  /** Precio unitario base en ARS */
  price: number
  minQty: number
  bestseller?: boolean
  badge?: string
  options: ProductOption[]
  allowsText: boolean
  allowsFile: boolean
}

// Descuentos por cantidad, de mayor a menor
export const quantityDiscounts = [
  { min: 50, off: 0.15 },
  { min: 20, off: 0.1 },
  { min: 10, off: 0.05 },
]

export const categories: Category[] = [
  {
    id: 'sublimacion',
    name: 'Sublimación',
    description: 'Tazas, remeras, almohadones y más con tus fotos, frases o logo.',
    highlights: ['Tazas', 'Remeras', 'Almohadones'],
    icon: 'lucide:coffee',
    color: 'cyan',
  },
  {
    id: 'laser',
    name: 'Grabado láser',
    description: 'Grabados en madera, MDF y metal con terminación prolija y duradera.',
    highlights: ['Mates', 'Tablas', 'Llaveros'],
    icon: 'lucide:flame',
    color: 'magenta',
  },
  {
    id: 'papeleria',
    name: 'Papelería creativa',
    description: 'Agendas, stickers, etiquetas e invitaciones para cada ocasión.',
    highlights: ['Agendas', 'Stickers', 'Invitaciones'],
    icon: 'lucide:notebook-pen',
    color: 'yellow',
  },
  {
    id: 'diseno',
    name: 'Diseño gráfico',
    description: 'Logos, identidad visual y piezas para redes de tu marca.',
    highlights: ['Logos', 'Flyers', 'Redes'],
    icon: 'lucide:pen-tool',
    color: 'ink',
  },
]

// TODO: precios y productos de ejemplo, reemplazar por los reales
export const products: Product[] = [
  {
    slug: 'taza-ceramica-sublimada',
    name: 'Taza de cerámica sublimada',
    category: 'sublimacion',
    description: 'Taza de cerámica de 325 ml con tu diseño a todo color. Ideal para regalos, egresados y empresas.',
    icon: 'lucide:coffee',
    price: 6500,
    minQty: 1,
    bestseller: true,
    options: [
      { id: 'modelo', label: 'Modelo', choices: [{ label: 'Blanca clásica' }, { label: 'Interior de color', extra: 1200 }, { label: 'Mágica (cambia con el calor)', extra: 2500 }] },
    ],
    allowsText: true,
    allowsFile: true,
  },
  {
    slug: 'remera-sublimada',
    name: 'Remera sublimada',
    category: 'sublimacion',
    description: 'Remera de poliéster con estampa sublimada que no se cuartea ni se despega.',
    icon: 'lucide:shirt',
    price: 12000,
    minQty: 1,
    bestseller: true,
    options: [
      { id: 'talle', label: 'Talle', choices: [{ label: 'S' }, { label: 'M' }, { label: 'L' }, { label: 'XL' }, { label: 'XXL', extra: 1500 }] },
      { id: 'estampa', label: 'Estampa', choices: [{ label: 'Frente' }, { label: 'Frente y espalda', extra: 3000 }] },
    ],
    allowsText: true,
    allowsFile: true,
  },
  {
    slug: 'almohadon-personalizado',
    name: 'Almohadón personalizado',
    category: 'sublimacion',
    description: 'Almohadón de 40 × 40 cm con funda sublimada y relleno incluido.',
    icon: 'lucide:sofa',
    price: 14500,
    minQty: 1,
    options: [
      { id: 'relleno', label: 'Relleno', choices: [{ label: 'Con relleno' }, { label: 'Solo funda', extra: -3500 }] },
    ],
    allowsText: true,
    allowsFile: true,
  },
  {
    slug: 'mousepad-sublimado',
    name: 'Mousepad sublimado',
    category: 'sublimacion',
    description: 'Mousepad con base antideslizante y tu diseño a todo color.',
    icon: 'lucide:mouse',
    price: 5500,
    minQty: 1,
    options: [
      { id: 'forma', label: 'Forma', choices: [{ label: 'Rectangular' }, { label: 'Redondo' }] },
    ],
    allowsText: true,
    allowsFile: true,
  },
  {
    slug: 'mate-grabado',
    name: 'Mate grabado a láser',
    category: 'laser',
    description: 'Mate de madera con nombre, frase o logo grabado a láser. Un regalo que dura.',
    icon: 'lucide:cup-soda',
    price: 9800,
    minQty: 1,
    bestseller: true,
    badge: 'Favorito',
    options: [
      { id: 'grabado', label: 'Grabado', choices: [{ label: 'Una cara' }, { label: 'Dos caras', extra: 2000 }] },
    ],
    allowsText: true,
    allowsFile: true,
  },
  {
    slug: 'tabla-de-picar-grabada',
    name: 'Tabla de picar grabada',
    category: 'laser',
    description: 'Tabla de madera con grabado personalizado. Perfecta para regalos y asadores.',
    icon: 'lucide:utensils',
    price: 16000,
    minQty: 1,
    options: [
      { id: 'tamano', label: 'Tamaño', choices: [{ label: 'Chica (30 cm)' }, { label: 'Grande (40 cm)', extra: 5000 }] },
    ],
    allowsText: true,
    allowsFile: true,
  },
  {
    slug: 'llaveros-mdf',
    name: 'Llaveros de MDF',
    category: 'laser',
    description: 'Llaveros cortados y grabados a láser con la forma y el diseño que quieras.',
    icon: 'lucide:key-round',
    price: 1500,
    minQty: 10,
    bestseller: true,
    options: [
      { id: 'terminacion', label: 'Terminación', choices: [{ label: 'Natural' }, { label: 'Pintado', extra: 600 }] },
    ],
    allowsText: true,
    allowsFile: true,
  },
  {
    slug: 'cuadro-mdf-grabado',
    name: 'Cuadro de MDF grabado',
    category: 'laser',
    description: 'Cuadro decorativo con grabado láser: nombres, fechas, mapas o ilustraciones.',
    icon: 'lucide:frame',
    price: 11000,
    minQty: 1,
    options: [
      { id: 'tamano', label: 'Tamaño', choices: [{ label: '20 × 20 cm' }, { label: '30 × 30 cm', extra: 4000 }] },
    ],
    allowsText: true,
    allowsFile: true,
  },
  {
    slug: 'agenda-personalizada',
    name: 'Agenda personalizada',
    category: 'papeleria',
    description: 'Agenda anillada con tapa diseñada a tu gusto, interior a elección.',
    icon: 'lucide:notebook',
    price: 15000,
    minQty: 1,
    bestseller: true,
    options: [
      { id: 'interior', label: 'Interior', choices: [{ label: 'Semanal' }, { label: 'Diaria', extra: 3500 }, { label: 'Docente', extra: 3500 }] },
    ],
    allowsText: true,
    allowsFile: true,
  },
  {
    slug: 'stickers-personalizados',
    name: 'Stickers personalizados',
    category: 'papeleria',
    description: 'Planchas de stickers troquelados para emprendimientos, packaging o útiles.',
    icon: 'lucide:sticker',
    price: 3500,
    minQty: 1,
    options: [
      { id: 'material', label: 'Material', choices: [{ label: 'Papel ilustración' }, { label: 'Vinilo resistente al agua', extra: 1500 }] },
    ],
    allowsText: true,
    allowsFile: true,
  },
  {
    slug: 'invitaciones-impresas',
    name: 'Invitaciones impresas',
    category: 'papeleria',
    description: 'Invitaciones para cumpleaños, casamientos y eventos, diseñadas e impresas.',
    icon: 'lucide:mail-open',
    price: 900,
    minQty: 20,
    options: [
      { id: 'papel', label: 'Papel', choices: [{ label: 'Opalina' }, { label: 'Papel texturado', extra: 350 }] },
    ],
    allowsText: true,
    allowsFile: false,
  },
  {
    slug: 'diseno-de-logo',
    name: 'Diseño de logo',
    category: 'diseno',
    description: 'Diseñamos el logo de tu emprendimiento con propuestas y ajustes incluidos.',
    icon: 'lucide:pen-tool',
    price: 45000,
    minQty: 1,
    options: [
      { id: 'pack', label: 'Pack', choices: [{ label: 'Logo' }, { label: 'Logo + paleta y tipografías', extra: 20000 }] },
    ],
    allowsText: true,
    allowsFile: false,
  },
  {
    slug: 'kit-redes-sociales',
    name: 'Kit para redes sociales',
    category: 'diseno',
    description: 'Plantillas de posteos e historias con la identidad de tu marca.',
    icon: 'lucide:layers',
    price: 30000,
    minQty: 1,
    options: [
      { id: 'cantidad', label: 'Plantillas', choices: [{ label: '6 plantillas' }, { label: '12 plantillas', extra: 18000 }] },
    ],
    allowsText: true,
    allowsFile: true,
  },
]

export function getCategory(id: CategoryId) {
  return categories.find(category => category.id === id)!
}

export function getProduct(slug: string) {
  return products.find(product => product.slug === slug)
}

export function discountFor(quantity: number) {
  return quantityDiscounts.find(tier => quantity >= tier.min)?.off ?? 0
}

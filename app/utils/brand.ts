export type BrandColor = 'cyan' | 'magenta' | 'yellow' | 'ink'

// Clases completas para que Tailwind las detecte al escanear el código
export const brandColors: Record<BrandColor, { bg: string, soft: string, text: string, border: string }> = {
  cyan: { bg: 'bg-ph-cyan', soft: 'bg-ph-cyan-soft', text: 'text-ph-cyan', border: 'border-ph-cyan' },
  magenta: { bg: 'bg-ph-magenta', soft: 'bg-ph-magenta-soft', text: 'text-ph-magenta', border: 'border-ph-magenta' },
  yellow: { bg: 'bg-ph-yellow', soft: 'bg-ph-yellow-soft', text: 'text-ph-yellow', border: 'border-ph-yellow' },
  ink: { bg: 'bg-ph-ink', soft: 'bg-ph-ink-soft', text: 'text-ph-ink', border: 'border-ph-ink' },
}

<script setup lang="ts">
import type { BrandColor } from '~/utils/brand'

const props = withDefaults(defineProps<{
  icon: string
  color?: BrandColor
  image?: string
  alt?: string
  size?: 'sm' | 'md' | 'lg'
  wide?: boolean
}>(), { color: 'cyan', image: undefined, alt: '', size: 'md', wide: false })

const palette = computed(() => brandColors[props.color])
const ratio = computed(() => (props.wide ? 'aspect-[4/3]' : 'aspect-square'))
const iconSize = computed(() => ({ sm: 'text-4xl', md: 'text-6xl', lg: 'text-8xl' })[props.size])
</script>

<template>
  <NuxtImg
    v-if="image"
    :src="image"
    :alt="alt"
    :class="ratio"
    class="w-full object-cover"
    sizes="sm:100vw md:50vw lg:400px"
  />
  <div
    v-else
    role="img"
    :aria-label="alt"
    class="relative flex w-full items-center justify-center overflow-hidden"
    :class="[ratio, palette.soft]"
  >
    <div class="halftone absolute inset-0 opacity-30" :class="color === 'yellow' ? 'text-amber-500' : palette.text" />
    <div class="absolute aspect-square h-3/5 translate-x-3 translate-y-3 rounded-full opacity-90" :class="palette.bg" />
    <div class="absolute aspect-square h-3/5 rounded-full bg-white shadow-sm" />
    <!-- Efecto de impresión desfasada (CMYK) -->
    <span class="relative inline-flex" :class="iconSize">
      <Icon :name="icon" class="absolute -translate-x-[3px] translate-y-[2px] text-ph-cyan mix-blend-multiply" />
      <Icon :name="icon" class="absolute translate-x-[3px] -translate-y-[2px] text-ph-magenta mix-blend-multiply" />
      <Icon :name="icon" class="relative text-ph-ink" />
    </span>
  </div>
</template>

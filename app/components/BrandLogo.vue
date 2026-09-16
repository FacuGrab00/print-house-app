<script setup lang="ts">
// Aproximación del logo en SVG. Cuando tengan el archivo original, reemplazar por <NuxtImg src="/logo.png" />
withDefaults(defineProps<{ withName?: boolean }>(), { withName: true })

const { business } = useAppConfig()
</script>

<template>
  <span class="inline-flex items-center gap-2.5">
    <svg viewBox="0 0 100 100" class="size-10 shrink-0" aria-hidden="true">
      <defs>
        <clipPath id="ph-logo-clip">
          <circle cx="50" cy="50" r="50" />
        </clipPath>
      </defs>
      <g clip-path="url(#ph-logo-clip)">
        <rect width="50" height="50" fill="#111111" />
        <rect x="50" width="50" height="50" fill="#ffd100" />
        <rect y="50" width="50" height="50" fill="#00a3e0" />
        <rect x="50" y="50" width="50" height="50" fill="#e5007d" />
      </g>
      <g font-family="'Archivo Black', sans-serif" font-size="21" text-anchor="middle" fill="#fff" stroke="#111" stroke-width="5" paint-order="stroke" stroke-linejoin="round">
        <text x="50" y="47">PRINT</text>
        <text x="50" y="69">HOUSE</text>
      </g>
    </svg>
    <span v-if="withName" class="leading-tight">
      <span class="block font-display text-lg tracking-tight">{{ business.name }}</span>
      <span class="block text-[11px] text-neutral-500">{{ business.tagline }}</span>
    </span>
  </span>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  eyebrow?: string
  description?: string
  align?: 'center' | 'left'
}>(), { eyebrow: undefined, description: undefined, align: 'center' })
</script>

<template>
  <div :class="align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'">
    <p v-if="eyebrow" class="mb-3 text-xs font-semibold tracking-[0.2em] text-ph-magenta uppercase">
      {{ eyebrow }}
    </p>
    <h2 class="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
      <slot />
    </h2>
    <p v-if="description" class="mt-4 text-neutral-500 text-pretty">
      {{ description }}
    </p>
  </div>
</template>

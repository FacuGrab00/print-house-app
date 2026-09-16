<script setup lang="ts">
import type { Category } from '~/data/catalog'

const props = defineProps<{ category: Category }>()
const palette = computed(() => brandColors[props.category.color])
</script>

<template>
  <NuxtLink
    :to="{ path: '/productos', query: { categoria: category.id } }"
    class="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-[0_2px_20px_-6px_rgb(0_0_0/0.12)] ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-[0_12px_32px_-8px_rgb(0_0_0/0.2)]"
  >
    <div class="flex items-center justify-between px-5 pt-5">
      <h3 class="text-sm font-semibold tracking-wide uppercase">
        {{ category.name }}
      </h3>
      <span class="size-2.5 rounded-full" :class="palette.bg" />
    </div>
    <div class="p-5">
      <div class="overflow-hidden rounded-xl">
        <ProductArt :icon="category.icon" :color="category.color" :alt="category.name" class="transition duration-500 group-hover:scale-105" />
      </div>
    </div>
    <div class="mt-auto px-5 pb-5">
      <p class="text-sm text-neutral-500">
        {{ category.highlights.join(' · ') }}
      </p>
      <span class="mt-3 inline-flex items-center gap-1 text-sm font-medium group-hover:text-ph-magenta">
        Ver productos
        <Icon name="lucide:arrow-up-right" class="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </span>
    </div>
  </NuxtLink>
</template>

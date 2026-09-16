<script setup lang="ts">
import { getCategory, type Product } from '~/data/catalog'

const props = defineProps<{ product: Product }>()
const category = computed(() => getCategory(props.product.category))
</script>

<template>
  <NuxtLink :to="`/productos/${product.slug}`" class="group block">
    <div class="relative overflow-hidden rounded-2xl ring-1 ring-black/5">
      <ProductArt
        :icon="product.icon"
        :image="product.image"
        :color="category.color"
        :alt="product.name"
        size="sm"
        class="transition duration-500 group-hover:scale-105"
      />
      <span
        v-if="product.badge"
        class="absolute top-3 left-3 rounded-full bg-ph-magenta px-2.5 py-1 text-[11px] font-semibold text-white"
      >
        {{ product.badge }}
      </span>
    </div>
    <div class="mt-3 text-center">
      <p class="text-xs text-neutral-400">
        {{ category.name }}
      </p>
      <h3 class="mt-0.5 text-sm font-medium group-hover:text-ph-magenta">
        {{ product.name }}
      </h3>
      <p class="mt-1 text-sm font-semibold">
        <span class="font-normal text-neutral-400">desde</span> {{ formatPrice(product.price) }}
      </p>
    </div>
  </NuxtLink>
</template>

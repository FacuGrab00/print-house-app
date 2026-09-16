<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()
const notFound = computed(() => props.error.statusCode === 404)
const digits = computed(() => String(props.error.statusCode || 500).split(''))
const digitColors = ['text-ph-cyan', 'text-ph-magenta', 'text-ph-yellow']

useSeoMeta({ title: () => (notFound.value ? 'Página no encontrada' : 'Error') })
</script>

<template>
  <NuxtLayout>
    <section class="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center">
      <p class="font-display text-8xl">
        <span v-for="(digit, index) in digits" :key="index" :class="digitColors[index % digitColors.length]">{{ digit }}</span>
      </p>
      <h1 class="mt-6 text-2xl font-semibold">
        {{ notFound ? 'No encontramos esta página' : 'Algo salió mal' }}
      </h1>
      <p class="mt-3 text-neutral-500">
        {{ notFound ? 'Puede que el producto ya no esté disponible o que el enlace esté mal escrito.' : error.message }}
      </p>
      <button
        type="button"
        class="mt-8 inline-flex h-12 items-center gap-2 rounded-full bg-ph-ink px-6 font-medium text-white hover:bg-ph-magenta"
        @click="clearError({ redirect: '/' })"
      >
        Volver al inicio
      </button>
    </section>
  </NuxtLayout>
</template>

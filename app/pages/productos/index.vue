<script setup lang="ts">
import { categories, products, type CategoryId } from '~/data/catalog'

const route = useRoute()
const router = useRouter()

const activeCategory = computed(() => {
  const value = route.query.categoria
  return categories.some(category => category.id === value) ? value as CategoryId : null
})

const search = ref(typeof route.query.q === 'string' ? route.query.q : '')
watch(() => route.query.q, (value) => {
  search.value = typeof value === 'string' ? value : ''
})

function updateQuery(changes: Record<string, string | undefined>) {
  router.replace({ query: { ...route.query, ...changes } })
}

function selectCategory(id: CategoryId | null) {
  updateQuery({ categoria: id ?? undefined })
}

function submitSearch() {
  updateQuery({ q: search.value.trim() || undefined })
}

const filteredProducts = computed(() => {
  const query = normalizeText(typeof route.query.q === 'string' ? route.query.q : '')
  return products.filter((product) => {
    if (activeCategory.value && product.category !== activeCategory.value) return false
    if (!query) return true
    return normalizeText(`${product.name} ${product.description}`).includes(query)
  })
})

const currentCategory = computed(() => categories.find(category => category.id === activeCategory.value))

useSeoMeta({
  title: () => currentCategory.value ? currentCategory.value.name : 'Productos',
  description: () => currentCategory.value?.description ?? 'Catálogo de productos personalizados: sublimación, grabado láser, papelería creativa y diseño gráfico.',
})
</script>

<template>
  <div>
    <section class="bg-ph-paper">
      <div class="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <p class="text-xs font-semibold tracking-[0.2em] text-ph-magenta uppercase">
          Catálogo
        </p>
        <h1 class="mt-3 font-display text-4xl tracking-tight sm:text-5xl">
          {{ currentCategory?.name ?? 'Todos los productos' }}
        </h1>
        <p class="mt-3 max-w-xl text-neutral-600">
          {{ currentCategory?.description ?? 'Elegí un producto, personalizalo y pedilo por WhatsApp.' }}
        </p>
      </div>
    </section>

    <section class="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div class="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
          <button
            type="button"
            class="h-10 shrink-0 rounded-full px-5 text-sm font-medium transition"
            :class="!activeCategory ? 'bg-ph-ink text-white' : 'bg-neutral-100 hover:bg-neutral-200'"
            @click="selectCategory(null)"
          >
            Todos
          </button>
          <button
            v-for="category in categories"
            :key="category.id"
            type="button"
            class="inline-flex h-10 shrink-0 items-center gap-2 rounded-full px-5 text-sm font-medium transition"
            :class="activeCategory === category.id ? 'bg-ph-ink text-white' : 'bg-neutral-100 hover:bg-neutral-200'"
            @click="selectCategory(category.id)"
          >
            <span class="size-2 rounded-full" :class="brandColors[category.color].bg" />
            {{ category.name }}
          </button>
        </div>

        <form class="relative w-full lg:w-72" role="search" @submit.prevent="submitSearch">
          <input
            v-model="search"
            type="search"
            placeholder="Buscar en el catálogo..."
            aria-label="Buscar en el catálogo"
            class="h-11 w-full rounded-full border border-neutral-200 pr-11 pl-4 text-sm outline-none transition focus:border-ph-cyan focus:ring-2 focus:ring-ph-cyan/20"
            @search="submitSearch"
          >
          <button type="submit" class="absolute top-1/2 right-4 -translate-y-1/2 text-neutral-400 hover:text-ph-ink" aria-label="Buscar">
            <Icon name="lucide:search" />
          </button>
        </form>
      </div>

      <p class="mt-6 text-sm text-neutral-500">
        {{ filteredProducts.length }} {{ filteredProducts.length === 1 ? 'producto' : 'productos' }}
        <template v-if="route.query.q">
          para “{{ route.query.q }}”
        </template>
      </p>

      <div v-if="filteredProducts.length" class="mt-6 grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
        <ProductCard v-for="product in filteredProducts" :key="product.slug" :product="product" />
      </div>

      <div v-else class="mt-10 rounded-3xl bg-ph-paper px-6 py-16 text-center">
        <Icon name="lucide:search" class="text-4xl text-neutral-400" />
        <h2 class="mt-4 text-xl font-semibold">
          No encontramos productos
        </h2>
        <p class="mx-auto mt-2 max-w-sm text-neutral-500">
          Probá con otra búsqueda o escribinos: si lo imaginás, seguro lo podemos hacer.
        </p>
        <button
          type="button"
          class="mt-6 inline-flex h-11 items-center rounded-full bg-ph-ink px-6 text-sm font-medium text-white hover:bg-ph-magenta"
          @click="router.replace({ query: {} })"
        >
          Ver todos los productos
        </button>
      </div>
    </section>
  </div>
</template>

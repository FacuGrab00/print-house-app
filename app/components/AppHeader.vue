<script setup lang="ts">
const { business } = useAppConfig()
const { whatsappLink } = useWhatsapp()
const route = useRoute()
const router = useRouter()

const menuOpen = ref(false)
const search = ref('')

const links = [
  { label: 'Inicio', to: '/' },
  { label: 'Productos', to: '/productos' },
  { label: 'Cómo pedir', to: '/#como-pedir' },
  { label: 'Trabajos', to: '/#trabajos' },
  { label: 'Contacto', to: '/#contacto' },
]

function isActive(to: string) {
  if (to.includes('#')) return false
  return to === '/' ? route.path === '/' : route.path.startsWith(to)
}

watch(() => route.fullPath, () => {
  menuOpen.value = false
})

function submitSearch() {
  const q = search.value.trim()
  router.push({ path: '/productos', query: q ? { q } : {} })
  search.value = ''
}
</script>

<template>
  <header class="sticky top-0 z-40">
    <div class="bg-ph-ink px-4 py-2 text-center text-xs text-white">
      <span class="text-ph-yellow">✨</span>
      Todo lo que imaginás, hecho a tu medida
      <span class="text-ph-yellow">✨</span>
    </div>

    <div class="border-b border-black/5 bg-white/90 backdrop-blur">
      <div class="mx-auto flex h-18 max-w-7xl items-center gap-6 px-4 sm:px-6">
        <NuxtLink to="/" :aria-label="`${business.name}, inicio`">
          <BrandLogo />
        </NuxtLink>

        <nav class="mx-auto hidden items-center gap-7 lg:flex">
          <NuxtLink
            v-for="link in links"
            :key="link.to"
            :to="link.to"
            class="text-sm font-medium whitespace-nowrap transition hover:text-ph-magenta"
            :class="isActive(link.to) ? 'text-ph-magenta' : 'text-neutral-600'"
          >
            {{ link.label }}
          </NuxtLink>
        </nav>

        <div class="ml-auto flex items-center gap-2 lg:ml-0">
          <form class="relative hidden xl:block" role="search" @submit.prevent="submitSearch">
            <input
              v-model="search"
              type="search"
              placeholder="Buscar productos..."
              aria-label="Buscar productos"
              class="h-10 w-52 rounded-full border border-neutral-200 bg-neutral-50 pr-10 pl-4 text-sm outline-none transition focus:border-ph-cyan focus:bg-white focus:ring-2 focus:ring-ph-cyan/20"
            >
            <button type="submit" class="absolute top-1/2 right-3 -translate-y-1/2 text-neutral-400 hover:text-ph-ink" aria-label="Buscar">
              <Icon name="lucide:search" class="text-base" />
            </button>
          </form>

          <a
            :href="whatsappLink()"
            target="_blank"
            rel="noopener"
            class="hidden h-10 items-center gap-2 rounded-full bg-ph-ink px-4 text-sm font-medium whitespace-nowrap text-white transition hover:bg-ph-magenta sm:inline-flex"
          >
            <Icon name="simple-icons:whatsapp" />
            Pedí tu presupuesto
          </a>

          <button
            type="button"
            class="inline-flex size-10 items-center justify-center rounded-full hover:bg-neutral-100 lg:hidden"
            :aria-expanded="menuOpen"
            aria-label="Abrir menú"
            @click="menuOpen = !menuOpen"
          >
            <Icon :name="menuOpen ? 'lucide:x' : 'lucide:menu'" class="text-xl" />
          </button>
        </div>
      </div>

      <div v-if="menuOpen" class="border-t border-black/5 px-4 pt-3 pb-5 lg:hidden">
        <form class="relative mb-3" role="search" @submit.prevent="submitSearch">
          <input
            v-model="search"
            type="search"
            placeholder="Buscar productos..."
            aria-label="Buscar productos"
            class="h-11 w-full rounded-full border border-neutral-200 bg-neutral-50 pr-10 pl-4 text-sm outline-none focus:border-ph-cyan"
          >
          <Icon name="lucide:search" class="absolute top-1/2 right-4 -translate-y-1/2 text-neutral-400" />
        </form>
        <NuxtLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="block rounded-lg px-3 py-2.5 font-medium hover:bg-neutral-100"
        >
          {{ link.label }}
        </NuxtLink>
        <a
          :href="whatsappLink()"
          target="_blank"
          rel="noopener"
          class="mt-3 flex h-11 items-center justify-center gap-2 rounded-full bg-ph-ink font-medium text-white"
        >
          <Icon name="simple-icons:whatsapp" />
          Pedí tu presupuesto
        </a>
      </div>
    </div>
  </header>
</template>

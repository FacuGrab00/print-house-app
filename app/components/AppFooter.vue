<script setup lang="ts">
import { categories } from '~/data/catalog'

const { business } = useAppConfig()
const { whatsappLink } = useWhatsapp()
const year = new Date().getFullYear()
</script>

<template>
  <footer id="contacto" class="scroll-mt-28 border-t border-black/5 bg-white">
    <div class="h-1.5 cmyk-gradient" />
    <div class="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4">
      <div>
        <BrandLogo />
        <p class="mt-4 text-sm text-neutral-500">
          {{ business.description }}
        </p>
        <div class="mt-5 flex gap-2">
          <a
            :href="`https://instagram.com/${business.instagram}`"
            target="_blank"
            rel="noopener"
            class="inline-flex size-9 items-center justify-center rounded-full bg-neutral-100 transition hover:bg-ph-magenta hover:text-white"
            aria-label="Instagram"
          >
            <Icon name="simple-icons:instagram" />
          </a>
          <a
            :href="whatsappLink()"
            target="_blank"
            rel="noopener"
            class="inline-flex size-9 items-center justify-center rounded-full bg-neutral-100 transition hover:bg-ph-cyan hover:text-white"
            aria-label="WhatsApp"
          >
            <Icon name="simple-icons:whatsapp" />
          </a>
        </div>
      </div>

      <div>
        <h3 class="font-semibold">
          Contacto
        </h3>
        <ul class="mt-4 space-y-3 text-sm text-neutral-500">
          <li>
            <a :href="whatsappLink()" target="_blank" rel="noopener" class="inline-flex items-center gap-2 hover:text-ph-ink">
              <Icon name="simple-icons:whatsapp" /> WhatsApp
            </a>
          </li>
          <li>
            <a :href="`https://instagram.com/${business.instagram}`" target="_blank" rel="noopener" class="inline-flex items-center gap-2 hover:text-ph-ink">
              <Icon name="simple-icons:instagram" /> @{{ business.instagram }}
            </a>
          </li>
          <li v-if="business.email" class="inline-flex items-center gap-2">
            <Icon name="lucide:mail" /> {{ business.email }}
          </li>
          <li v-if="business.location" class="flex items-center gap-2">
            <Icon name="lucide:map-pin" /> {{ business.location }}
          </li>
          <li class="flex items-center gap-2">
            <Icon name="lucide:clock" /> {{ business.hours }}
          </li>
        </ul>
      </div>

      <div>
        <h3 class="font-semibold">
          Productos
        </h3>
        <ul class="mt-4 space-y-3 text-sm text-neutral-500">
          <li v-for="category in categories" :key="category.id">
            <NuxtLink :to="{ path: '/productos', query: { categoria: category.id } }" class="hover:text-ph-ink">
              {{ category.name }}
            </NuxtLink>
          </li>
        </ul>
      </div>

      <div>
        <h3 class="font-semibold">
          Información
        </h3>
        <ul class="mt-4 space-y-3 text-sm text-neutral-500">
          <li><NuxtLink to="/#como-pedir" class="hover:text-ph-ink">Cómo pedir</NuxtLink></li>
          <li><NuxtLink to="/#trabajos" class="hover:text-ph-ink">Trabajos</NuxtLink></li>
          <li><NuxtLink to="/productos" class="hover:text-ph-ink">Catálogo completo</NuxtLink></li>
        </ul>
      </div>
    </div>

    <div class="border-t border-black/5">
      <p class="mx-auto max-w-7xl px-4 py-5 text-xs text-neutral-400 sm:px-6">
        © {{ year }} {{ business.name }}. Todos los derechos reservados.
      </p>
    </div>
  </footer>
</template>

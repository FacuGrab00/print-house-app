<script setup lang="ts">
import { categories, products } from '~/data/catalog'
import { gallery } from '~/data/gallery'

const { business } = useAppConfig()
const { whatsappLink } = useWhatsapp()

useSeoMeta({
  title: 'Impresiones, sublimación y grabado láser a medida',
  description: business.description,
})

const bestsellers = products.filter(product => product.bestseller).slice(0, 5)

const steps = [
  { title: 'Elegí tu producto', text: 'Recorré el catálogo y elegí lo que querés personalizar.', icon: 'lucide:search', color: 'cyan' },
  { title: 'Personalizalo', text: 'Contanos qué querés: texto, colores, logo o foto, y la cantidad.', icon: 'lucide:wand-sparkles', color: 'magenta' },
  { title: 'Aprobás el diseño', text: 'Te mandamos una vista previa para que la revises antes de producir.', icon: 'lucide:check', color: 'yellow' },
  { title: 'Lo hacemos realidad', text: 'Producimos tu pedido y coordinamos la entrega con vos.', icon: 'lucide:package', color: 'ink' },
] as const
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="relative overflow-hidden bg-ph-paper">
      <div class="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
        <div class="relative z-10">
          <p class="mb-4 text-xs font-semibold tracking-[0.2em] text-ph-magenta uppercase">
            {{ business.tagline }}
          </p>
          <h1 class="font-display text-4xl leading-[1.05] tracking-tight text-balance sm:text-6xl">
            Personalizamos todo lo que
            <span class="relative whitespace-nowrap">
              <span class="relative z-10">imaginás</span>
              <span class="absolute inset-x-0 bottom-1 -z-0 h-3 bg-ph-yellow sm:h-4" />
            </span>
          </h1>
          <p class="mt-6 max-w-md text-lg text-neutral-600 text-pretty">
            Papelería creativa, grabados láser, sublimación y diseño gráfico. Creamos piezas únicas para regalar, para tu marca o para tu evento.
          </p>
          <div class="mt-8 flex flex-wrap gap-3">
            <NuxtLink
              to="/productos"
              class="inline-flex h-12 items-center gap-2 rounded-full bg-ph-ink px-6 font-medium text-white transition hover:bg-ph-magenta"
            >
              Ver productos
              <Icon name="lucide:arrow-up-right" />
            </NuxtLink>
            <a
              :href="whatsappLink()"
              target="_blank"
              rel="noopener"
              class="inline-flex h-12 items-center gap-2 rounded-full border border-neutral-300 bg-white px-6 font-medium transition hover:border-ph-ink"
            >
              <Icon name="simple-icons:whatsapp" class="text-[#25d366]" />
              Consultar
            </a>
          </div>
        </div>

        <div class="relative mx-auto aspect-square w-full max-w-md lg:max-w-lg">
          <div class="absolute inset-[6%] rounded-full bg-ph-yellow" />
          <div class="halftone absolute -top-4 -right-4 size-32 text-ph-magenta opacity-60" />
          <div class="halftone absolute -bottom-2 -left-6 size-28 text-ph-cyan opacity-60" />
          <div class="absolute top-[8%] left-[4%] w-[46%] -rotate-6 overflow-hidden rounded-2xl bg-white p-2 shadow-xl">
            <ProductArt icon="lucide:coffee" color="cyan" alt="Taza sublimada" class="rounded-xl" />
          </div>
          <div class="absolute top-[22%] right-[2%] w-[44%] rotate-6 overflow-hidden rounded-2xl bg-white p-2 shadow-xl">
            <ProductArt icon="lucide:notebook" color="magenta" alt="Agenda personalizada" class="rounded-xl" />
          </div>
          <div class="absolute bottom-[4%] left-[22%] w-[42%] -rotate-2 overflow-hidden rounded-2xl bg-white p-2 shadow-xl">
            <ProductArt icon="lucide:cup-soda" color="ink" alt="Mate grabado" class="rounded-xl" />
          </div>
        </div>
      </div>
    </section>

    <!-- Categorías -->
    <section class="mx-auto max-w-7xl px-4 py-20 sm:px-6">
      <SectionHeading eyebrow="Lo que hacemos" description="Cuatro formas de darle tu toque a cada cosa.">
        Todo <span class="text-ph-cyan">personalizado</span>, todo a tu medida
      </SectionHeading>
      <div class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <CategoryCard v-for="category in categories" :key="category.id" :category="category" />
      </div>
    </section>

    <!-- Cómo pedir -->
    <section id="como-pedir" class="scroll-mt-28 bg-ph-paper py-20">
      <div class="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading eyebrow="Así de fácil" description="Sin vueltas: nos contás tu idea y nosotros nos encargamos del resto.">
          Cómo <span class="text-ph-magenta">pedir</span> tu producto
        </SectionHeading>
        <ol class="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <li v-for="(step, index) in steps" :key="step.title" class="relative text-center">
            <div
              v-if="index < steps.length - 1"
              class="absolute top-8 left-[calc(50%+3rem)] hidden w-[calc(100%-6rem)] border-t-2 border-dashed border-neutral-300 lg:block"
            />
            <div
              class="relative mx-auto flex size-16 items-center justify-center rounded-2xl text-2xl shadow-sm"
              :class="[brandColors[step.color].bg, step.color === 'yellow' ? 'text-ph-ink' : 'text-white']"
            >
              <Icon :name="step.icon" />
              <span class="absolute -top-2 -right-2 flex size-6 items-center justify-center rounded-full bg-white text-xs font-bold text-ph-ink shadow">
                {{ index + 1 }}
              </span>
            </div>
            <h3 class="mt-5 font-semibold">
              {{ step.title }}
            </h3>
            <p class="mx-auto mt-2 max-w-60 text-sm text-neutral-500">
              {{ step.text }}
            </p>
          </li>
        </ol>
      </div>
    </section>

    <!-- Banner empresas y eventos -->
    <section class="mx-auto max-w-7xl px-4 pt-20 sm:px-6">
      <div class="relative overflow-hidden rounded-3xl bg-ph-ink px-8 py-12 text-white sm:px-14 sm:py-16">
        <div class="halftone absolute inset-y-0 right-0 w-1/2 text-white opacity-10" />
        <div class="absolute -right-16 -bottom-24 size-80 rounded-full bg-ph-magenta opacity-90 blur-[2px]" />
        <div class="absolute right-40 -top-16 size-48 rounded-full bg-ph-cyan opacity-90" />
        <div class="absolute right-16 top-16 size-24 rounded-full bg-ph-yellow" />
        <div class="relative max-w-lg">
          <p class="mb-3 text-xs font-semibold tracking-[0.2em] text-ph-yellow uppercase">
            Empresas y eventos
          </p>
          <h2 class="font-display text-3xl leading-tight sm:text-4xl">
            Souvenirs y merchandising con tu marca
          </h2>
          <p class="mt-4 text-neutral-300">
            Kits corporativos, regalos para eventos, egresados y cumpleaños. Pedidos por cantidad con descuento.
          </p>
          <a
            :href="whatsappLink(`¡Hola ${business.name}! 👋 Quiero consultar por un pedido por cantidad para empresa o evento.`)"
            target="_blank"
            rel="noopener"
            class="mt-8 inline-flex h-12 items-center gap-2 rounded-full border border-white/30 px-6 font-medium transition hover:bg-white hover:text-ph-ink"
          >
            Pedí tu cotización
            <Icon name="lucide:arrow-up-right" />
          </a>
        </div>
      </div>
    </section>

    <!-- Más pedidos -->
    <section class="mx-auto max-w-7xl px-4 py-20 sm:px-6">
      <SectionHeading description="Los productos que más nos piden. Todos se pueden personalizar.">
        Los más <span class="text-ph-magenta">pedidos</span>
      </SectionHeading>
      <div class="mt-12 grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 lg:grid-cols-5">
        <ProductCard v-for="product in bestsellers" :key="product.slug" :product="product" />
      </div>
      <div class="mt-12 text-center">
        <NuxtLink
          to="/productos"
          class="inline-flex h-12 items-center gap-2 rounded-full border border-neutral-300 px-6 font-medium transition hover:border-ph-ink"
        >
          Ver todo el catálogo
          <Icon name="lucide:arrow-right" />
        </NuxtLink>
      </div>
    </section>

    <!-- Trabajos -->
    <section id="trabajos" class="scroll-mt-28 bg-ph-paper py-20">
      <div class="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading eyebrow="Trabajos recientes" description="Algunas de las cosas que hicimos para nuestros clientes.">
          Hecho en <span class="text-ph-cyan">PrintHouse</span>
        </SectionHeading>
        <div class="mt-12 grid gap-6 md:grid-cols-3">
          <article
            v-for="work in gallery"
            :key="work.title"
            class="group overflow-hidden rounded-2xl bg-white shadow-[0_2px_20px_-6px_rgb(0_0_0/0.12)] ring-1 ring-black/5"
          >
            <div class="relative overflow-hidden">
              <ProductArt
                :icon="work.icon"
                :image="work.image"
                :color="work.color"
                :alt="work.title"
                wide
                class="transition duration-500 group-hover:scale-105"
              />
              <span class="absolute top-4 left-4 rounded-full bg-white px-3 py-1 text-xs font-semibold shadow-sm" :class="brandColors[work.color === 'yellow' ? 'ink' : work.color].text">
                {{ work.tag }}
              </span>
            </div>
            <div class="p-5">
              <h3 class="font-semibold">
                {{ work.title }}
              </h3>
            </div>
          </article>
        </div>
        <div class="mt-12 text-center">
          <a
            :href="`https://instagram.com/${business.instagram}`"
            target="_blank"
            rel="noopener"
            class="inline-flex h-12 items-center gap-2 rounded-full bg-ph-ink px-6 font-medium text-white transition hover:bg-ph-magenta"
          >
            <Icon name="simple-icons:instagram" />
            Ver más en @{{ business.instagram }}
          </a>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="mx-auto max-w-7xl px-4 py-20 sm:px-6">
      <div class="cmyk-gradient relative overflow-hidden rounded-3xl px-8 py-14 sm:px-14">
        <div class="halftone absolute inset-0 text-white opacity-15" />
        <div class="relative flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <div class="max-w-xl text-white">
            <h2 class="font-display text-3xl leading-tight sm:text-4xl">
              ¿Tenés una idea? La hacemos realidad.
            </h2>
            <p class="mt-3 text-white/90">
              Escribinos por WhatsApp con lo que tenés en mente y te pasamos el presupuesto.
            </p>
          </div>
          <a
            :href="whatsappLink()"
            target="_blank"
            rel="noopener"
            class="inline-flex h-14 shrink-0 items-center gap-2 rounded-full bg-white px-7 font-semibold text-ph-ink shadow-lg transition hover:scale-[1.03]"
          >
            <Icon name="simple-icons:whatsapp" class="text-xl text-[#25d366]" />
            Escribinos por WhatsApp
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

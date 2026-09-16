<script setup lang="ts">
import { discountFor, getCategory, getProduct, products, quantityDiscounts } from '~/data/catalog'

definePageMeta({ key: route => route.fullPath })

const route = useRoute()
const { business } = useAppConfig()
const { whatsappLink } = useWhatsapp()
const requestUrl = useRequestURL()

const product = getProduct(route.params.slug as string)
if (!product) {
  throw createError({ statusCode: 404, statusMessage: 'Producto no encontrado', fatal: true })
}

const category = getCategory(product.category)
const related = products.filter(item => item.category === product.category && item.slug !== product.slug).slice(0, 4)

useSeoMeta({
  title: product.name,
  description: product.description,
})

// Configurador
const selections = reactive<Record<string, number>>(
  Object.fromEntries(product.options.map(option => [option.id, 0])),
)
const quantity = ref(product.minQty)
const notes = ref('')
const fileName = ref('')

const unitPrice = computed(() => product.options.reduce(
  (total, option) => total + (option.choices[selections[option.id] ?? 0]?.extra ?? 0),
  product.price,
))
const discount = computed(() => discountFor(quantity.value))
const subtotal = computed(() => unitPrice.value * quantity.value)
const total = computed(() => Math.round(subtotal.value * (1 - discount.value)))

function setQuantity(value: number) {
  quantity.value = Math.max(product!.minQty, Math.floor(Number.isFinite(value) ? value : product!.minQty))
}

function onFileChange(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0]
  fileName.value = file?.name ?? ''
}

function formatExtra(extra?: number) {
  if (!extra) return ''
  return `${extra > 0 ? '+' : '−'}${formatPrice(Math.abs(extra))}`
}

const orderLink = computed(() => {
  const lines = [
    `¡Hola ${business.name}! 👋 Quiero hacer este pedido:`,
    '',
    `*${product.name}*`,
    `• Cantidad: ${quantity.value}`,
    ...product.options.map(option => `• ${option.label}: ${option.choices[selections[option.id] ?? 0]?.label}`),
  ]
  if (notes.value.trim()) lines.push(`• Personalización: ${notes.value.trim()}`)
  if (fileName.value) lines.push(`• Archivo: ${fileName.value} (te lo mando por acá)`)
  lines.push('', `Total estimado: ${formatPrice(total.value)}`, `${requestUrl.origin}/productos/${product.slug}`)
  return whatsappLink(lines.join('\n'))
})
</script>

<template>
  <div v-if="product">
    <div class="mx-auto max-w-7xl px-4 pt-8 sm:px-6">
      <nav aria-label="Ruta de navegación" class="flex flex-wrap items-center gap-1.5 text-sm text-neutral-500">
        <NuxtLink to="/" class="hover:text-ph-ink">
          Inicio
        </NuxtLink>
        <Icon name="lucide:chevron-right" class="text-neutral-300" />
        <NuxtLink :to="{ path: '/productos', query: { categoria: category.id } }" class="hover:text-ph-ink">
          {{ category.name }}
        </NuxtLink>
        <Icon name="lucide:chevron-right" class="text-neutral-300" />
        <span class="text-ph-ink">{{ product.name }}</span>
      </nav>
    </div>

    <section class="mx-auto grid max-w-7xl gap-10 px-4 py-8 sm:px-6 lg:grid-cols-2 lg:gap-16">
      <div class="lg:sticky lg:top-32 lg:self-start">
        <div class="overflow-hidden rounded-3xl ring-1 ring-black/5">
          <ProductArt :icon="product.icon" :image="product.image" :color="category.color" :alt="product.name" size="lg" />
        </div>
      </div>

      <div>
        <span class="inline-flex items-center gap-2 rounded-full bg-neutral-100 px-3 py-1 text-xs font-semibold">
          <span class="size-2 rounded-full" :class="brandColors[category.color].bg" />
          {{ category.name }}
        </span>
        <h1 class="mt-4 font-display text-3xl leading-tight tracking-tight sm:text-4xl">
          {{ product.name }}
        </h1>
        <p class="mt-4 text-neutral-600">
          {{ product.description }}
        </p>
        <p class="mt-5 text-2xl font-semibold">
          {{ formatPrice(product.price) }}
          <span class="text-sm font-normal text-neutral-500">por unidad</span>
        </p>
        <p v-if="product.minQty > 1" class="mt-1 text-sm text-neutral-500">
          Pedido mínimo: {{ product.minQty }} unidades
        </p>

        <form class="mt-8 space-y-7 border-t border-black/5 pt-8" @submit.prevent>
          <fieldset v-for="option in product.options" :key="option.id">
            <legend class="mb-3 text-sm font-semibold">
              {{ option.label }}
            </legend>
            <div class="flex flex-wrap gap-2">
              <label
                v-for="(choice, index) in option.choices"
                :key="choice.label"
                class="cursor-pointer rounded-xl border px-4 py-2.5 text-sm transition has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ph-cyan"
                :class="selections[option.id] === index ? 'border-ph-ink bg-ph-ink text-white' : 'border-neutral-200 hover:border-neutral-400'"
              >
                <input v-model="selections[option.id]" type="radio" :name="option.id" :value="index" class="sr-only">
                {{ choice.label }}
                <span v-if="choice.extra" class="ml-1 opacity-60">{{ formatExtra(choice.extra) }}</span>
              </label>
            </div>
          </fieldset>

          <div>
            <label for="quantity" class="mb-3 block text-sm font-semibold">Cantidad</label>
            <div class="inline-flex items-center rounded-xl border border-neutral-200">
              <button
                type="button"
                class="flex size-11 items-center justify-center text-lg hover:text-ph-magenta disabled:opacity-30"
                :disabled="quantity <= product.minQty"
                aria-label="Restar uno"
                @click="setQuantity(quantity - 1)"
              >
                <Icon name="lucide:minus" />
              </button>
              <input
                id="quantity"
                :value="quantity"
                type="number"
                inputmode="numeric"
                :min="product.minQty"
                class="h-11 w-16 border-x border-neutral-200 text-center font-medium outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
                @change="setQuantity(Number(($event.target as HTMLInputElement).value))"
              >
              <button
                type="button"
                class="flex size-11 items-center justify-center text-lg hover:text-ph-magenta"
                aria-label="Sumar uno"
                @click="setQuantity(quantity + 1)"
              >
                <Icon name="lucide:plus" />
              </button>
            </div>
            <p class="mt-2 text-xs text-neutral-500">
              Descuentos por cantidad:
              <span v-for="(tier, index) in [...quantityDiscounts].reverse()" :key="tier.min">
                {{ tier.min }}+ unidades {{ tier.off * 100 }}%<template v-if="index < quantityDiscounts.length - 1"> · </template>
              </span>
            </p>
          </div>

          <div v-if="product.allowsText">
            <label for="notes" class="mb-3 block text-sm font-semibold">¿Cómo lo querés?</label>
            <textarea
              id="notes"
              v-model="notes"
              rows="3"
              placeholder="Nombre, frase, colores, fecha del evento..."
              class="w-full rounded-xl border border-neutral-200 px-4 py-3 text-sm outline-none transition focus:border-ph-cyan focus:ring-2 focus:ring-ph-cyan/20"
            />
          </div>

          <div v-if="product.allowsFile">
            <span class="mb-3 block text-sm font-semibold">Logo, foto o diseño</span>
            <label class="flex cursor-pointer items-center gap-4 rounded-xl border-2 border-dashed border-neutral-200 px-4 py-4 transition hover:border-ph-cyan has-[:focus-visible]:border-ph-cyan">
              <span class="flex size-11 shrink-0 items-center justify-center rounded-lg bg-ph-cyan-soft text-xl text-ph-cyan">
                <Icon :name="fileName ? 'lucide:file-image' : 'lucide:upload'" />
              </span>
              <span class="min-w-0 text-sm">
                <span class="block truncate font-medium">{{ fileName || 'Elegí un archivo' }}</span>
                <span class="block text-neutral-500">Lo vas a poder mandar por WhatsApp junto con el pedido</span>
              </span>
              <input type="file" accept="image/*,.pdf,.ai,.psd,.svg" class="sr-only" @change="onFileChange">
            </label>
          </div>

          <div class="rounded-2xl bg-ph-paper p-5">
            <dl class="space-y-2 text-sm">
              <div class="flex justify-between">
                <dt class="text-neutral-500">
                  {{ quantity }} × {{ formatPrice(unitPrice) }}
                </dt>
                <dd>{{ formatPrice(subtotal) }}</dd>
              </div>
              <div v-if="discount" class="flex justify-between text-ph-magenta">
                <dt>Descuento por cantidad ({{ discount * 100 }}%)</dt>
                <dd>−{{ formatPrice(subtotal - total) }}</dd>
              </div>
              <div class="flex justify-between border-t border-black/10 pt-3 text-base font-semibold">
                <dt>Total estimado</dt>
                <dd>{{ formatPrice(total) }}</dd>
              </div>
            </dl>
            <a
              :href="orderLink"
              target="_blank"
              rel="noopener"
              class="mt-5 flex h-13 items-center justify-center gap-2 rounded-full bg-[#25d366] font-semibold text-white transition hover:brightness-95"
            >
              <Icon name="simple-icons:whatsapp" class="text-xl" />
              Pedir por WhatsApp
            </a>
            <p class="mt-3 text-center text-xs text-neutral-500">
              El precio final se confirma por WhatsApp según el diseño.
            </p>
          </div>
        </form>
      </div>
    </section>

    <section v-if="related.length" class="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <SectionHeading align="left">
        También te puede <span class="text-ph-cyan">interesar</span>
      </SectionHeading>
      <div class="mt-10 grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-4">
        <ProductCard v-for="item in related" :key="item.slug" :product="item" />
      </div>
    </section>
  </div>
</template>

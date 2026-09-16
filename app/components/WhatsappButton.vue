<script setup lang="ts">
const { whatsappLink } = useWhatsapp()
</script>

<template>
  <a
    :href="whatsappLink()"
    target="_blank"
    rel="noopener"
    aria-label="Escribinos por WhatsApp"
    class="fixed right-5 bottom-5 z-50 inline-flex size-14 items-center justify-center rounded-full bg-[#25d366] text-3xl text-white shadow-lg transition hover:scale-105"
  >
    <Icon name="simple-icons:whatsapp" />
  </a>
</template>

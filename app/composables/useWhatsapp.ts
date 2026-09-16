export function useWhatsapp() {
  const { business } = useAppConfig()

  function whatsappLink(message = `¡Hola ${business.name}! 👋 Quiero hacer una consulta.`) {
    return `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(message)}`
  }

  return { whatsappLink }
}

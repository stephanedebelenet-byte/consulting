/** Conserve le programme dans les demandes, sans ajouter de données personnelles. */
export function trainingContactLink(destination: string, programme: string, locale = 'fr'): string {
  const message = locale === 'en'
    ? `Hello Nextinotech, I would like information about the training program "${programme}". Please confirm the next dates, price and availability.`
    : `Bonjour Nextinotech, je souhaite des informations sur la formation « ${programme} ». Merci de confirmer les prochaines dates, le tarif et les disponibilités.`
  if (destination.startsWith('https://wa.me/')) {
    const url = new URL(destination)
    url.searchParams.set('text', message)
    return url.toString()
  }
  if (destination.startsWith('mailto:')) {
    const url = new URL(destination)
    url.searchParams.set('subject', `${locale === 'en' ? 'Training' : 'Formation'} : ${programme}`)
    url.searchParams.set('body', message)
    return url.toString()
  }
  return destination
}

import PageHero from '../components/PageHero'
import Contact from '../components/Contact'
import { useLocale } from '../i18n/locale'

export default function ContactPage() {
  const { tr } = useLocale()
  return (
    <>
      <PageHero
        num="06"
        title={tr('Prendre', 'Get in')}
        titleItalic={tr('contact.', 'touch.')}
        subtitle={tr(
          'Un échange de 30 minutes suffit pour cadrer votre problématique. Gratuit, sans engagement.',
          'A 30-minute call is enough to scope your situation. Free, no obligation.'
        )}
        tag="CONTACT · TECHNOPARK CASABLANCA"
      />
      <Contact />
    </>
  )
}

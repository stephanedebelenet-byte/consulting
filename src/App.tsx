import './index.css'
import { useLenis } from './hooks/useLenis'
import { motion } from 'framer-motion'
import CustomCursor from './components/CustomCursor'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import Pourquoi from './components/Pourquoi'
import Impact from './components/Impact'
import Conseil from './components/Conseil'
import Systemes from './components/Systemes'
import References from './components/References'
import Methode from './components/Methode'
import Formation from './components/Formation'
import DSC from './components/DSC'
import Profil from './components/Profil'
import Engagement from './components/Engagement'
import Insights from './components/Insights'
import Contact from './components/Contact'
import Footer from './components/Footer'

function Statement({ text, bg = 'var(--ink)' }: { text: string; bg?: string }) {
  return (
    <div style={{ background: bg, padding: '5rem 4rem', overflow: 'hidden' }}>
      <div className="section-inner">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: 'Bodoni Moda, serif',
            fontSize: 'clamp(2rem, 5vw, 6.5rem)',
            fontWeight: 400,
            fontStyle: 'italic',
            lineHeight: 0.92,
            letterSpacing: '-0.025em',
            color: 'var(--gold)',
          }}
        >
          {text}
        </motion.div>
      </div>
    </div>
  )
}

export default function App() {
  useLenis()

  return (
    <div className="grain">
      <CustomCursor />
      <Nav />
      <Hero />
      <Marquee />
      <Pourquoi />
      <Impact />
      <Statement text="Le bon logiciel ne vaut rien sans la bonne méthode." bg="var(--paper)" />
      <Conseil />
      <Systemes />
      <References />
      <Methode />
      <Statement text="Votre Supply Chain est un avantage compétitif. Pas encore." bg="var(--dark)" />
      <Formation />
      <DSC />
      <Statement text="Indépendant. Pas parce que c'est tendance. Parce que c'est juste." bg="var(--paper)" />
      <Profil />
      <Engagement />
      <Insights />
      <Contact />
      <Footer />
    </div>
  )
}

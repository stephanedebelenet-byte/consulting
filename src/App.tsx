import './index.css'
import { useLenis } from './hooks/useLenis'
import CustomCursor from './components/CustomCursor'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import Pourquoi from './components/Pourquoi'
import Conseil from './components/Conseil'
import Systemes from './components/Systemes'
import Formation from './components/Formation'
import DSC from './components/DSC'
import Profil from './components/Profil'
import Engagement from './components/Engagement'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  useLenis()

  return (
    <div className="grain">
      <CustomCursor />
      <Nav />
      <Hero />
      <Marquee />
      <Pourquoi />
      <Conseil />
      <Systemes />
      <Formation />
      <DSC />
      <Profil />
      <Engagement />
      <Contact />
      <Footer />
    </div>
  )
}

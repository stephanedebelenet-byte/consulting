import './index.css'
import { useLenis } from './hooks/useLenis'
import Nav from './components/Nav'
import Hero from './components/Hero'
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
    <>
      <Nav />
      <Hero />
      <Pourquoi />
      <Conseil />
      <Systemes />
      <Formation />
      <DSC />
      <Profil />
      <Engagement />
      <Contact />
      <Footer />
    </>
  )
}

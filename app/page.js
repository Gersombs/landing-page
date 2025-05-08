'use client'

import Navbar from '../components/navbar'
import HeroSection from '../components/hero'
import EventInfo from '../components/info'
import RegisterSection from '../components/form'
import FooterSection from '../components/footer'

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <EventInfo />
      <RegisterSection />
      <FooterSection />
    </main>
  )
}

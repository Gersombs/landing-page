import HeroSection from '/components/hero';
import EventInfo from '/components/info';
import RegisterSection from '/components/form';
import FooterSection from '/components/footer';
import Navbar from '/components/navbar';
import { use } from 'react';


export default function HomePage() {
  return (
    <main>
      <Navbar/>
      <HeroSection />
      <EventInfo />
      <RegisterSection />
      <FooterSection />
    </main>
  );
}
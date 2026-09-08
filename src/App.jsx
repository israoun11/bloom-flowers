import { useState } from 'react'
import Loader from './components/Loader.jsx'
import Navbar from './components/Navbar.jsx'
import CustomCursor from './components/CustomCursor.jsx'
import Hero from './components/Hero.jsx'
import Bouquets from './components/Bouquets.jsx'
import Feelings from './components/Feelings.jsx'
import Story from './components/Story.jsx'
import FinalCTA from './components/FinalCTA.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  const [loading, setLoading] = useState(true)

  return (
    <>
      {loading && <Loader onFinish={() => setLoading(false)} />}
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <Bouquets />
        <Feelings />
        <Story />
        <FinalCTA />
      </main>
      <Footer />
    </>
  )
}
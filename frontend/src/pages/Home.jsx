import React from 'react'
import Hero from '../components/Hero'
import Events from '../components/Events'
import Timeline from '../components/Timeline'
import FAQ from '../components/FAQ'

export default function Home() {
  return (
    <div className="p-6 max-w-4xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold text-center border-b border-neutral-800 pb-2">Home Page</h1>
      <Hero />
      <Events />
      <Timeline />
      <FAQ />
    </div>
  )
}

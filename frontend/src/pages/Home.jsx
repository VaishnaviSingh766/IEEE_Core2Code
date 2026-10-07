import React from 'react'
import Hero from '../components/Hero'
import Events from '../components/Events'
import Prizes from '../components/Prizes'
import Timeline from '../components/Timeline'
import FAQ from '../components/FAQ'
import Rules from '../components/Rules'
import Separator from '../utils/Separator'

export default function Home() {
  return (
    <div className="flex-1 flex flex-col w-full">
      <Hero />
      <Events />
      <Separator />
      <Rules />
      <Separator className=''/>
      <Prizes />
      <Separator />
      <Timeline />
      <Separator />
      <FAQ />
    </div>
  )
}

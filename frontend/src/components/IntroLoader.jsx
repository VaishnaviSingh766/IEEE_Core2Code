import React, { useEffect } from 'react'

export default function IntroLoader({ onComplete }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete?.()
    }, 1500)
    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-4">
      <div className="text-xl font-medium">IntroLoader Component</div>
      <button
        onClick={onComplete}
        className="text-xs px-3 py-1 bg-neutral-800 rounded hover:bg-neutral-700 cursor-pointer"
      >
        Skip Intro
      </button>
    </div>
  )
}

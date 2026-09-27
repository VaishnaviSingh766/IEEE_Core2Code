import React from 'react'

export default function Footer() {
  return (
    <footer className="w-full p-6 border-t border-neutral-800 text-center text-sm text-neutral-400">
      © {new Date().getFullYear()} Core2Code. All rights reserved.
    </footer>
  )
}

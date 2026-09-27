import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="w-full px-8 py-4 border-b border-neutral-800 flex items-center justify-between bg-black/90 backdrop-blur sticky top-0 z-50">
      <span className="font-bold text-lg tracking-wider">Core2Code</span>
      <div className="flex gap-6 text-sm">
        <Link to="/" className="hover:text-blue-400 transition-colors">Home</Link>
        <Link to="/about" className="hover:text-blue-400 transition-colors">About Us</Link>
        <Link to="/contactUs" className="hover:text-blue-400 transition-colors">Contact Us</Link>
      </div>
    </nav>
  )
}

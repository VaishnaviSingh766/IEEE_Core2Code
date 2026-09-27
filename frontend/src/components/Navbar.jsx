import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="p-4 border-b border-neutral-800 flex items-center justify-between">
      <span className="font-semibold">Navbar</span>
      <div className="flex gap-4 text-sm">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/about" className="hover:underline">About Us</Link>
        <Link to="/contactUs" className="hover:underline">Contact Us</Link>
      </div>
    </nav>
  )
}

import React, { useState, useEffect } from 'react'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'

import Loader from './components/Loader'
import IntroLoader from "./components/IntroLoader";

import Home from './pages/Home'
import AboutUs from './pages/AboutUs'
import ContactUs from './pages/ContactUs'
import Timeline from './components/Timeline'
import Cursor from './utils/Cursor'

const Structure = () => {
  return (
    <div className='bg-black text-white select-none min-h-screen w-full flex flex-col'>
      <Header eventName="TECHSUMMIT" year="2026-27" />
      <main className='flex-1 w-full flex flex-col'>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Structure />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/about',
        element: <AboutUs />
      },
      {
        path: '/contactUs',
        element: <ContactUs />
      }
    ]
  }
])

const App = () => {

  const [loading, setLoading] = useState(true);
  if (loading) {
    return (
      <>
        <IntroLoader onComplete={() => setLoading(false)} />
        <Cursor />
      </>
    );
  }

  return (
    <div className="w-full min-h-screen flex flex-col bg-black text-white">
      <RouterProvider router={router} />
      <Cursor />
    </div>
  )
}

export default App

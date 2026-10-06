import React, { useState } from 'react'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

import Loader from './components/Loader'

import Home from './pages/Home'
import AboutUs from './pages/AboutUs'
import ContactUs from './pages/ContactUs'
import Timeline from './components/Timeline'
import Cursor from './utils/Cursor'

import NotFound from './pages/NotFound'
import Registration from './pages/Registration'

const Structure = () => {
  return (
    <div className='bg-black text-white select-none min-h-screen w-full flex flex-col'>
      <Navbar />
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
    errorElement: <NotFound />,
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
      },
      {
        path:'/registrations',
        element: <Registration />
      }
    ]
  }
])

const App = () => {

  const [loading, setLoading] = useState(true);
  if (loading) {
    return (
      <>
        <Loader onComplete={() => setLoading(false)} />
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

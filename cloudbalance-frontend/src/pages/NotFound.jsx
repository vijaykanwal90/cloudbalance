import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center px-4">

      <h1 className="text-5xl font-bold mb-6 text-gray-800">404 Page Not Found</h1>
      <Link 
        to="/" 
        className="bg-sky-500 hover:bg-sky-500 text-white text-2xl font-semibold py-4 px-8 rounded transition-colors duration-300"
      >
        Go to Home
      </Link>
    </div>
  )
}

export default NotFound

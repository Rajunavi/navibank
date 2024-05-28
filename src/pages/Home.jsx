import React from 'react'
import Typical from 'react-typical'

function Home() {
  return (
    <main>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <Typical
        steps={['Welcome to Navi Bank!..', 5000, 'Explore the features..', 5000, 'Get started now!..', 5000]}
        loop={Infinity}
        
        className="text-6xl text-center text-blue-800 font-bold mt-32"
      />
          </div>
        </main>
  )
}

export default Home
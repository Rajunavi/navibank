import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import NavBar from './component/NavBar'
import Home from './pages/Home'
import CreateAccout from './pages/CreateAccout'
import AllCustomers from './pages/AllCustomers'
import Transaction from './pages/Transaction'

const router = createBrowserRouter([
  {
    path:'/',
    element:<NavBar />,
    children:[
      {
        index:true,
        element:<Home />
      },
      {
        path:'new',
        element:<CreateAccout />
      },
      {
        path:"customers",
        element:<AllCustomers />
      },
      {
        path:"transaction",
        element:<Transaction />
      }
    ]
  }
])

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
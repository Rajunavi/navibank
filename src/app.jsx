import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import NavBar from './component/NavBar'
import Home from './pages/Home'
import CreateAccout from './pages/CreateAccout'
import AllCustomers from './pages/AllCustomers'
import Transaction from './pages/Transaction'
import CustomerDetails from './pages/CustomerDetails'
import About from './pages/About'
import LoginPage from './pages/LoginPage'
import Register from './pages/Register'

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
      },
      {
        path:"about",
        element:<About />
      }
    ]
  },
  {
    path:"login",
    element:<LoginPage/>
  },
  {
    path:"register",
    element:<Register/>
  }
])

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
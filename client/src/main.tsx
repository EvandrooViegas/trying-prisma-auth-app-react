import React from 'react'
import ReactDOM from 'react-dom/client'

import { createBrowserRouter, RouterProvider, Link } from "react-router-dom"
import Default from './layouts/default'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'

const user = localStorage.getItem("token")
const router = createBrowserRouter([
  {
    path: "/",
    element: <Default>
      <Home />
    </Default>
  },
  {
    path: "/login",
    element:<Default>
    <Login />
  </Default>
  },
  {
    path: "/register",
    element: <Default>
    <Register />
  </Default>
  }
])
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider  router={router} />
  </React.StrictMode>,
)

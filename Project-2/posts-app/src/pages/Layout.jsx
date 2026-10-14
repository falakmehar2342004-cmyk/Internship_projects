import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'

// Yaha parent layout ha, Navbar upar rehta ha aur current page Outlet mein dikhta ha
export default function Layout() {
  return (
    <>
      <Navbar />
      <main className="container">
        <Outlet />
      </main>
    </>
  )
}

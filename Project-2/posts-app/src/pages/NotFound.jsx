import { Link } from 'react-router-dom'

// Yaha 404 page ha, ye tab dikhta ha jab URL kisi route se match na kare
export default function NotFound() {
  return (
    <section className="hero">
      <h1>404</h1>
      <p>Page not found.</p>
      <Link to="/" className="btn">Go Home</Link>
    </section>
  )
}

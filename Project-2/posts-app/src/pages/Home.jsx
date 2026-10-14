import { Link } from 'react-router-dom'

// Yaha Home page ha, welcome message aur Posts page ka button
export default function Home() {
  return (
    <section className="hero">
      <h1>Welcome to the Posts App</h1>
      <p>Browse, search, and add posts using the JSONPlaceholder API.</p>
      <Link to="/posts" className="btn">Browse Posts</Link>
    </section>
  )
}

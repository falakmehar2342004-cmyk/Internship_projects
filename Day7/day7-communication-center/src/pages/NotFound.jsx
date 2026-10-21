
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="panel mx-auto max-w-lg p-10 text-center">
      <p className="text-5xl font-black text-indigo-300">404</p>
      <h2 className="mt-3 text-xl font-bold">Page not found</h2>
      <p className="my-3 text-sm muted">
        The page you requested does not exist.
      </p>
      <Link className="btn-primary" to="/">
        Back to dashboard
      </Link>
    </div>
  )
}

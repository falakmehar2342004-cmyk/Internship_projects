
import { useCallback, useEffect, useState } from 'react'
import { RefreshCw } from 'lucide-react'
import { fetchDashboardData } from '../services/api'
import { usePolling } from '../hooks/usePolling'
import { useToast } from '../hooks/useToast'
import UsersPanel from '../components/api-dashboard/UsersPanel'
import PostsPanel from '../components/api-dashboard/PostsPanel'
import CommentsPanel from '../components/api-dashboard/CommentsPanel'
import ErrorMessage from '../components/common/ErrorMessage'
import SkeletonLoader from '../components/common/SkeletonLoader'

export default function ApiDashboard() {
  const [data, setData] = useState({
    users: [],
    posts: [],
    comments: [],
  })
  const [loading, setLoading] = useState(true)
  const [errors, setErrors] = useState([])
  const { toast } = useToast()

  const refresh = useCallback(async (quiet = false) => {
    if (!quiet) setLoading(true)

    try {
      const result = await fetchDashboardData()
      setData(result)
      setErrors(result.errors)
    } catch {
      setErrors(['Could not load APIs. Check your connection.'])
      if (!quiet) toast('API request failed.', 'error')
    } finally {
      setLoading(false)
    }
  }, [toast])

  useEffect(() => {
    refresh()
  }, [refresh])

  usePolling(() => refresh(true), 10000)

  return (
    <div className="space-y-5 animate-in">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold">API gateway dashboard</h2>
          <p className="mt-1 text-sm muted">
            Three APIs aggregated into one screen.
          </p>
        </div>

        <button
          className="btn-secondary"
          onClick={() => refresh()}
          disabled={loading}
        >
          <RefreshCw size={15} />
          Refresh APIs
        </button>
      </div>

      {errors.map(error => (
        <ErrorMessage
          key={error}
          message={error}
          onRetry={() => refresh()}
        />
      ))}

      {loading && !data.users.length ? (
        <SkeletonLoader rows={7} />
      ) : (
        <div className="grid gap-5 xl:grid-cols-3">
          <UsersPanel users={data.users} />
          <PostsPanel posts={data.posts} />
          <CommentsPanel comments={data.comments} />
        </div>
      )}
    </div>
  )
}

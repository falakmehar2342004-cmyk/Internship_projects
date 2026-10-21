
import { useCallback, useEffect, useMemo, useState } from 'react'
import { fetchDashboardData } from '../services/api'
import { usePolling } from '../hooks/usePolling'
import { useToast } from '../hooks/useToast'
import ActivityFeed from '../components/activity/ActivityFeed'
import ErrorMessage from '../components/common/ErrorMessage'

export default function Activity() {
  const [data, setData] = useState({ posts: [], comments: [] })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [updatedAt, setUpdatedAt] = useState(null)
  const { toast } = useToast()

  const refresh = useCallback(async (quiet = false) => {
    if (!quiet) setLoading(true)

    try {
      const result = await fetchDashboardData()
      setData(result)
      setError(result.errors.join('. '))
      setUpdatedAt(new Date().toISOString())
    } catch {
      setError('Unable to refresh the activity feed.')
      if (!quiet) toast('Activity refresh failed.', 'error')
    } finally {
      setLoading(false)
    }
  }, [toast])

  useEffect(() => {
    refresh()
  }, [refresh])

  usePolling(() => refresh(true), 10000)

  const activities = useMemo(() => [
    ...data.posts.map(item => ({
      id: `post-${item.id}`,
      kind: 'Post',
      title: item.title,
      body: item.body,
    })),
    ...data.comments.map(item => ({
      id: `comment-${item.id}`,
      kind: 'Comment',
      title: item.user?.username || item.name || 'Comment',
      body: item.body,
    })),
  ], [data])

  return (
    <div className="space-y-4 animate-in">
      <div>
        <h2 className="text-2xl font-bold">Activity feed</h2>
        <p className="mt-1 text-sm muted">
          Activity data refreshes every 10 seconds using polling.
        </p>
      </div>

      <ErrorMessage
        message={error}
        onRetry={() => refresh()}
      />

      <ActivityFeed
        activities={activities}
        updatedAt={updatedAt}
        onRefresh={() => refresh()}
        loading={loading}
      />
    </div>
  )
}

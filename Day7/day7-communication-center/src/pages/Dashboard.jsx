
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, RefreshCw } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { setLastUpdated } from '../features/dashboard/dashboardSlice'
import { fetchDashboardData } from '../services/api'
import { usePolling } from '../hooks/usePolling'
import { useToast } from '../hooks/useToast'
import StatsCards from '../components/dashboard/StatsCards'
import AnalyticsDashboard from '../components/dashboard/AnalyticsDashboard'
import ActivityFeed from '../components/activity/ActivityFeed'
import SkeletonLoader from '../components/common/SkeletonLoader'
import ErrorMessage from '../components/common/ErrorMessage'

export default function Dashboard() {
  const dispatch = useDispatch()
  const emails = useSelector(state => state.emails.items)
  const notifications = useSelector(state => state.notifications.items)

  const [data, setData] = useState({
    users: [],
    posts: [],
    comments: [],
  })
  const [loading, setLoading] = useState(true)
  const [errors, setErrors] = useState([])
  const [updatedAt, setUpdatedAt] = useState(null)
  const { toast } = useToast()

  const refresh = useCallback(async (quiet = false) => {
    if (!quiet) setLoading(true)

    try {
      const result = await fetchDashboardData()
      setData(result)
      setErrors(result.errors)

      const now = new Date().toISOString()
      setUpdatedAt(now)
      dispatch(setLastUpdated(now))
    } catch {
      setErrors(['Unable to reach the APIs. Check your connection.'])
      if (!quiet) toast('Dashboard refresh failed.', 'error')
    } finally {
      setLoading(false)
    }
  }, [dispatch, toast])

  useEffect(() => {
    refresh()
  }, [refresh])

  usePolling(() => refresh(true), 10000)

  const activities = useMemo(() => [
    ...data.posts.slice(0, 10).map(item => ({
      id: `post-${item.id}`,
      kind: 'Post',
      title: item.title,
      body: item.body,
    })),
    ...data.comments.slice(0, 10).map(item => ({
      id: `comment-${item.id}`,
      kind: 'Comment',
      title: item.user?.username || item.name || 'New comment',
      body: item.body,
    })),
  ].slice(0, 12), [data])

  return (
    <div className="space-y-6 animate-in">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-sm muted">Your workspace</p>
          <h2 className="mt-1 text-2xl font-bold tracking-tight">
            Communication overview
          </h2>
          <p className="mt-1 text-sm muted">
            Email, notifications and activity at a glance.
          </p>
        </div>

        <button
          className="btn-secondary"
          onClick={() => refresh()}
          disabled={loading}
        >
          <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
          Refresh data
        </button>
      </div>

      <StatsCards
        emails={emails.length}
        notifications={notifications.length}
        activities={activities.length}
        users={data.users.length}
      />

      {errors.map(error => (
        <ErrorMessage
          key={error}
          message={error}
          onRetry={() => refresh()}
        />
      ))}

      <div className="grid gap-5 xl:grid-cols-2">
        <AnalyticsDashboard emails={emails} />
        <ActivityFeed
          activities={activities}
          updatedAt={updatedAt}
          onRefresh={() => refresh()}
          loading={loading}
        />
      </div>

      <section className="panel p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="font-semibold">API gateway overview</h2>
            <p className="mt-1 text-sm muted">
              Three public APIs aggregated into one dashboard.
            </p>
          </div>
          <Link className="btn-secondary text-sm" to="/apis">
            Explore APIs <ArrowRight size={15} />
          </Link>
        </div>

        {loading && !data.users.length ? (
          <div className="mt-5">
            <SkeletonLoader rows={4} />
          </div>
        ) : (
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {[
              ['Users', data.users.length],
              ['Posts', data.posts.length],
              ['Comments', data.comments.length],
            ].map(([name, value]) => (
              <div key={name} className="rounded-xl bg-[#0d1425] p-4">
                <p className="text-sm muted">{name}</p>
                <p className="mt-2 text-2xl font-bold">{value}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

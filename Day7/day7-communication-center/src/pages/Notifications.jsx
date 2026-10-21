
import { useDispatch, useSelector } from 'react-redux'
import {
  markAllRead,
  updatePreferences,
} from '../features/notifications/notificationSlice'
import {
  isSupabaseConfigured,
  supabase,
} from '../services/supabase'
import { useToast } from '../hooks/useToast'
import { useBrowserNotifications } from '../hooks/useBrowserNotifications'
import NotificationList from '../components/notifications/NotificationList'
import NotificationPreferences from '../components/notifications/NotificationPreferences'

export default function Notifications() {
  const dispatch = useDispatch()
  const { items, preferences } = useSelector(
    state => state.notifications,
  )
  const { toast } = useToast()
  const { enable } = useBrowserNotifications()

  const save = async value => {
    dispatch(updatePreferences(value))

    if (!isSupabaseConfigured) {
      toast('Preferences saved in this browser.', 'success')
      return
    }

    const { error } = await supabase
      .from('notification_preferences')
      .upsert({
        user_id: 'demo-user',
        emailSent: value.emailSent,
        activity: value.activity,
        browser: value.browser,
      }, { onConflict: 'user_id' })

    if (error) {
      toast('Local save succeeded, but Supabase save failed.', 'warning')
    } else {
      toast('Preferences saved locally and to Supabase.', 'success')
    }
  }

  return (
    <div className="space-y-5 animate-in">
      <div>
        <h2 className="text-2xl font-bold">Notifications</h2>
        <p className="mt-1 text-sm muted">
          Manage alerts and notification preferences.
        </p>
      </div>

      <NotificationPreferences
        preferences={preferences}
        onSave={save}
        onEnableBrowser={enable}
      />

      <NotificationList
        items={items}
        onMarkAllRead={() => {
          dispatch(markAllRead())
          toast('Notifications marked as read.', 'success')
        }}
      />
    </div>
  )
}

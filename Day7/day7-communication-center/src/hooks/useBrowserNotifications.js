
import { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { useToast } from './useToast'
import {
  requestBrowserPermission,
  showBrowserNotification,
} from '../services/notificationService'

export function useBrowserNotifications() {
  const { toast } = useToast()

  const browserEnabled = useSelector(
    (state) => state.notifications.preferences.browser
  )

  const enable = useCallback(async () => {
    try {
      const permission = await requestBrowserPermission()

      if (permission === 'granted') {
        toast('Browser notifications permission granted.', 'success')
      } else {
        toast('Browser notification permission was not granted.', 'error')
      }
    } catch {
      toast('Unable to enable browser notifications.', 'error')
    }
  }, [toast])

  const notify = useCallback(
    (title, body) => {
      if (browserEnabled) {
        showBrowserNotification(title, body)
      }
    },
    [browserEnabled]
  )

  return { enable, notify }
}

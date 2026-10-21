
export async function requestBrowserPermission() {
  if (!('Notification' in window)) {
    throw new Error('This browser does not support notifications.')
  }

  return Notification.requestPermission()
}

export function showBrowserNotification(title, body) {
  if (
    !('Notification' in window) ||
    Notification.permission !== 'granted'
  ) {
    return false
  }

  new Notification(title, { body })
  return true
}

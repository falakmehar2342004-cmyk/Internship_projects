
import { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addEmail, deleteEmail } from '../features/emails/emailSlice'
import { addNotification } from '../features/notifications/notificationSlice'
import { sendEmail } from '../services/emailService'
import { useToast } from '../hooks/useToast'
import { useBrowserNotifications } from '../hooks/useBrowserNotifications'
import {
  isSupabaseConfigured,
  supabase,
} from '../services/supabase'
import EmailComposer from '../components/email/EmailComposer'
import EmailTemplates, {
  templates,
} from '../components/email/EmailTemplates'
import EmailFilters from '../components/email/EmailFilters'
import EmailHistory from '../components/email/EmailHistory'

export default function Emails() {
  const dispatch = useDispatch()
  const emails = useSelector(state => state.emails.items)
  const preferences = useSelector(
    state => state.notifications.preferences,
  )

  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('all')
  const [sort, setSort] = useState('newest')
  const [busy, setBusy] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState(null)

  const { toast } = useToast()
  const { notify } = useBrowserNotifications()

  const saveRecord = async record => {
    dispatch(addEmail(record))

    if (isSupabaseConfigured) {
      const { error } = await supabase.from('emails').insert({
        recipient: record.to,
        subject: record.subject,
        message: record.message,
        status: record.status,
        from_name: record.fromName || null,
      })

      if (error) {
        toast(
          'Saved locally, but Supabase could not save the record.',
          'warning',
        )
      }
    }
  }

  const handleSend = async values => {
    setBusy(true)
    let state = 'sent'
    let errorMessage = ''

    try {
      await sendEmail(values)
      toast('Email sent successfully.', 'success')

      if (preferences.browser) {
        notify('Email sent', `Email to ${values.to} was sent.`)
      }
    } catch (error) {
      state = 'failed'
      errorMessage = error.message || 'Email sending failed.'
      toast(errorMessage, 'error')
    } finally {
      const now = new Date().toISOString()

      await saveRecord({
        ...values,
        id: crypto.randomUUID(),
        status: state,
        createdAt: now,
        errorMessage,
      })

      if (preferences.emailSent) {
        dispatch(addNotification({
          id: crypto.randomUUID(),
          title: state === 'sent' ? 'Email sent' : 'Email send failed',
          message: `${values.subject} — ${values.to}`,
          createdAt: now,
          read: false,
        }))
      }

      setBusy(false)
    }
  }

  const handleDraft = async values => {
    const now = new Date().toISOString()

    await saveRecord({
      ...values,
      id: crypto.randomUUID(),
      status: 'draft',
      createdAt: now,
    })

    toast('Draft saved.', 'success')
  }

  const visible = useMemo(() => {
    return emails
      .filter(email => {
        const query = search.toLowerCase()
        const text = `${email.to} ${email.subject} ${email.message}`.toLowerCase()

        return text.includes(query) &&
          (status === 'all' || email.status === status)
      })
      .sort((a, b) => {
        if (sort === 'oldest') {
          return new Date(a.createdAt) - new Date(b.createdAt)
        }
        if (sort === 'recipient') {
          return a.to.localeCompare(b.to)
        }
        return new Date(b.createdAt) - new Date(a.createdAt)
      })
  }, [emails, search, status, sort])

  return (
    <div className="space-y-5 animate-in">
      <div>
        <h2 className="text-2xl font-bold">Email center</h2>
        <p className="mt-1 text-sm muted">
          Compose, send, search and manage email records.
        </p>
      </div>

      <EmailTemplates
        onChoose={template => {
          setSelectedTemplate(template)
          toast(`${template.name} template selected.`, 'info')
        }}
      />

      <EmailComposer
        onSend={handleSend}
        onDraft={handleDraft}
        busy={busy}
        selectedTemplate={selectedTemplate}
      />

      <section className="space-y-4">
        <div>
          <h2 className="font-semibold">
            Email history <span className="badge">{visible.length}</span>
          </h2>
          <p className="mt-1 text-sm muted">
            Search, filter and sort saved email records.
          </p>
        </div>

        <EmailFilters
          search={search}
          setSearch={setSearch}
          status={status}
          setStatus={setStatus}
          sort={sort}
          setSort={setSort}
        />

        <EmailHistory
          emails={visible}
          onDelete={id => {
            const email = emails.find(item => item.id === id)
            dispatch(deleteEmail(id))

            if (email && isSupabaseConfigured) {
              // Database rows need their database ID for reliable deletion.
              // This demo removes the local record only.
            }

            toast('Email record deleted locally.', 'info')
          }}
        />
      </section>
    </div>
  )
}

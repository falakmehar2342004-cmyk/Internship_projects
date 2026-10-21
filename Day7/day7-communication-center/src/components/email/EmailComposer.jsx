
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Send } from 'lucide-react'

export default function EmailComposer({
  onSend,
  onDraft,
  busy,
  selectedTemplate,
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      to: '',
      subject: '',
      message: '',
      fromName: '',
    },
  })

  useEffect(() => {
    if (selectedTemplate) {
      reset(current => ({
        ...current,
        subject: selectedTemplate.subject,
        message: selectedTemplate.message,
      }))
    }
  }, [selectedTemplate, reset])

  const submit = async values => {
    await onSend(values)
    reset()
  }

  const saveDraft = async values => {
    await onDraft(values)
    reset()
  }

  return (
    <form
      className="panel space-y-4 p-5"
      onSubmit={handleSubmit(submit)}
    >
      <div>
        <h2 className="font-semibold">Compose email</h2>
        <p className="mt-1 text-xs muted">
          Complete the fields to send an email or save a draft.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label>
          <span className="field-label">Recipient email *</span>
          <input
            type="email"
            placeholder="name@example.com"
            {...register('to', {
              required: 'Recipient is required',
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: 'Enter a valid email',
              },
            })}
          />
          {errors.to && (
            <span className="text-xs text-rose-300">
              {errors.to.message}
            </span>
          )}
        </label>

        <label>
          <span className="field-label">Your name</span>
          <input
            placeholder="Your name"
            {...register('fromName')}
          />
        </label>
      </div>

      <label className="block">
        <span className="field-label">Subject *</span>
        <input
          placeholder="What is this email about?"
          {...register('subject', {
            required: 'Subject is required',
            maxLength: {
              value: 120,
              message: 'Maximum 120 characters',
            },
          })}
        />
        {errors.subject && (
          <span className="text-xs text-rose-300">
            {errors.subject.message}
          </span>
        )}
      </label>

      <label className="block">
        <span className="field-label">Message *</span>
        <textarea
          rows="5"
          placeholder="Write your message..."
          {...register('message', {
            required: 'Message is required',
            minLength: {
              value: 3,
              message: 'Message is too short',
            },
          })}
        />
        {errors.message && (
          <span className="text-xs text-rose-300">
            {errors.message.message}
          </span>
        )}
      </label>

      <div className="flex flex-wrap justify-end gap-2">
        <button
          type="button"
          className="btn-secondary"
          onClick={handleSubmit(saveDraft)}
        >
          Save draft
        </button>

        <button
          className="btn-primary"
          disabled={busy}
          type="submit"
        >
          <Send size={16} />
          {busy ? 'Sending...' : 'Send email'}
        </button>
      </div>
    </form>
  )
}

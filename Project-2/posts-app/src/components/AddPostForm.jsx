import { useState } from 'react'

export default function AddPostForm({ onSubmit }) {
  // Yaha form ke fields aur messages ki states hain
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState('')
  const [saving, setSaving] = useState(false)

  async function handleSubmit(e) {
    // Yaha form submit par page reload hone se roka ha
    e.preventDefault()
    setMessage('')

    // Yaha basic validation ho rahi ha (title 5 aur body 10 characters se zyada ho)
    const newErrors = {}
    if (title.trim().length < 5) newErrors.title = 'Title must be at least 5 characters.'
    if (body.trim().length < 10) newErrors.body = 'Body must be at least 10 characters.'
    setErrors(newErrors)

    // Yaha error ho to aage nahi barhte
    if (Object.keys(newErrors).length > 0) return

    // Yaha post bheji ja rahi ha, success hone par form khali ho jata ha
    try {
      setSaving(true)
      await onSubmit({ title: title.trim(), body: body.trim() })
      setTitle('')
      setBody('')
      setMessage('✅ Post added! (JSONPlaceholder does not permanently save it.)')
    } catch (err) {
      setMessage('❌ ' + err.message)
    }
    setSaving(false)
  }

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      <label>Title
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Post title" />
        {errors.title && <span className="error">{errors.title}</span>}
      </label>

      <label>Body
        <textarea rows="5" value={body} onChange={(e) => setBody(e.target.value)} placeholder="Write something..." />
        {errors.body && <span className="error">{errors.body}</span>}
      </label>

      {/* Yaha saving ke dauran button disable rehta ha */}
      <button className="btn" disabled={saving}>{saving ? 'Saving...' : 'Add Post'}</button>
      {message && <p className="status">{message}</p>}
    </form>
  )
}

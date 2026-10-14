import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { usePostsContext } from '../context/PostsContext'

const API_URL = import.meta.env.VITE_API_URL

export default function PostDetails() {
  // Yaha useParams se URL (/posts/:id) ki id padh rahe hain
  const { id } = useParams()
  const navigate = useNavigate()
  const { posts } = usePostsContext()

  // Yaha pehle apni list mein post dhoondte hain
  const savedPost = posts.find((p) => String(p.id) === id)

  const [post, setPost] = useState(savedPost || null)
  const [loading, setLoading] = useState(!savedPost)
  const [error, setError] = useState(null)

  // Yaha post list mein na mile (jaise page refresh ho) to sirf wahi aik post fetch karte hain
  useEffect(() => {
    if (savedPost) {
      setPost(savedPost)
      setLoading(false)
      return
    }

    setLoading(true)
    fetch(API_URL + '/' + id)
      .then((res) => {
        if (!res.ok) throw new Error('Post not found')
        return res.json()
      })
      .then((data) => setPost(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [id, savedPost])

  // Yaha loading ya error ho to pehle wohi message dikhate hain
  if (loading) return <p className="status">Loading post...</p>
  if (error) return <p className="status error">Error: {error}</p>

  return (
    <article className="details">
      {/* Yaha navigate(-1) se pichle page par wapis jate hain */}
      <button className="btn small" onClick={() => navigate(-1)}>← Back</button>
      <h2>{post.title}</h2>
      <small>Post #{post.id} · User {post.userId}</small>
      <p>{post.body}</p>
    </article>
  )
}

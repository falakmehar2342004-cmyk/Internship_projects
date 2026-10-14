import { memo } from 'react'

function PostCard({ post, onView }) {
  // Yaha console mein print hota ha jab ye card dobara render hota ha (memo check karne ke liye)
  console.log('Render PostCard', post.id)

  return (
    <article className="card">
      <h3>{post.title}</h3>
      {/* Yaha body ke sirf pehle 90 characters dikhaye hain */}
      <p>{post.body.slice(0, 90)}...</p>
      <button className="btn small" onClick={() => onView(post.id)}>View details</button>
    </article>
  )
}

// Yaha React.memo lagaya ha, props (post, onView) na badlein to card dobara render nahi hota
export default memo(PostCard)

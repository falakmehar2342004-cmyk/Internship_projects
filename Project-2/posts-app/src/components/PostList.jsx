import PostCard from './PostCard'

// Yaha PostCards ki grid dikhayi ja rahi ha (ya message agar koi post na ho)
export default function PostList({ posts, onView }) {
  if (posts.length === 0) {
    return <p className="status">No posts found.</p>
  }

  return (
    <div className="grid">
      {/* Yaha har post ke liye aik PostCard banta ha, key unique id ha */}
      {posts.map((post) => (
        <PostCard key={post.id} post={post} onView={onView} />
      ))}
    </div>
  )
}

import { useState, useMemo, useCallback, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePostsContext } from '../context/PostsContext'
import useDebounce from '../hooks/useDebounce'
import PostList from '../components/PostList'

export default function Posts() {
  // Yaha context se posts, loading aur error le rahe hain
  const { posts, loading, error, refetch } = usePostsContext()
  const [search, setSearch] = useState('')

  // Yaha debounce lagaya ha, typing rukne ke 400ms baad search chalega
  const debouncedSearch = useDebounce(search, 400)

  const searchRef = useRef(null)
  const navigate = useNavigate()

  // Yaha useRef se page khulte hi search box par cursor aa jata ha
  useEffect(() => {
    searchRef.current.focus()
  }, [])

  // Yaha useMemo se filter sirf tab dobara chalta ha jab posts ya search text badle
  const filteredPosts = useMemo(() => {
    const text = debouncedSearch.trim().toLowerCase()
    return posts.filter((post) => post.title.toLowerCase().includes(text))
  }, [posts, debouncedSearch])

  // Yaha useCallback se function same rehta ha, is se React.memo wale PostCard dobara render nahi hote
  const handleView = useCallback((id) => {
    navigate('/posts/' + id)
  }, [navigate])

  return (
    <section>
      <h2>Posts</h2>

      {/* Yaha search box ha, ref se is par focus hota ha */}
      <input
        ref={searchRef}
        className="search"
        type="search"
        placeholder="Search by title..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Yaha loading aur error ke messages dikhte hain */}
      {loading && <p className="status">Loading posts...</p>}
      {error && (
        <p className="status error">
          Error: {error} <button className="btn small" onClick={refetch}>Retry</button>
        </p>
      )}

      {/* Yaha posts tab dikhti hain jab sahi load ho jayen */}
      {!loading && !error && <PostList posts={filteredPosts} onView={handleView} />}
    </section>
  )
}

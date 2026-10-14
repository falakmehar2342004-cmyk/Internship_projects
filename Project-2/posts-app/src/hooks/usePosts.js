import { useReducer, useEffect } from 'react'

// Yaha API ka URL .env file se aa raha ha
const API_URL = import.meta.env.VITE_API_URL

// Yaha shuru ki state ha: posts khali, loading true, error nahi
const initialState = { posts: [], loading: true, error: null }

// Yaha reducer ha, posts state ke badalne ke sab tareeqe aik jagah likhe hain
function postsReducer(state, action) {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true, error: null }
    case 'FETCH_SUCCESS':
      return { posts: action.payload, loading: false, error: null }
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.payload }
    case 'ADD_POST':
      // Yaha naya post list ke sab se upar add hota ha
      return { ...state, posts: [action.payload, ...state.posts] }
    default:
      return state
  }
}

// Yaha custom hook ha, post fetch karne ka logic dobara use ho sakta ha
export default function usePosts() {
  const [state, dispatch] = useReducer(postsReducer, initialState)

  // Yaha API se saari posts li ja rahi hain
  async function fetchPosts() {
    dispatch({ type: 'FETCH_START' })
    try {
      const res = await fetch(API_URL)
      if (!res.ok) throw new Error('Request failed (' + res.status + ')')
      const data = await res.json()
      dispatch({ type: 'FETCH_SUCCESS', payload: data })
    } catch (err) {
      dispatch({ type: 'FETCH_ERROR', payload: err.message })
    }
  }

  // Yaha useEffect se app load hote hi posts fetch hoti hain (sirf aik dafa)
  useEffect(() => {
    fetchPosts()
  }, [])

  // Yaha naya post API ko bheja ja raha ha aur apni list mein add ho raha ha
  async function addPost(post) {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...post, userId: 1 }),
    })
    if (!res.ok) throw new Error('Could not create post')
    const created = await res.json()

    // API hamesha id 101 deti ha, is liye yaha apni unique id lagayi ha
    dispatch({ type: 'ADD_POST', payload: { ...created, id: Date.now() } })
  }

  return { ...state, addPost, refetch: fetchPosts }
}

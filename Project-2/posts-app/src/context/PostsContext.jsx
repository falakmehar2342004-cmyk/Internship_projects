import { createContext, useContext } from 'react'
import usePosts from '../hooks/usePosts'

const PostsContext = createContext()

// Yaha posts sirf aik dafa fetch hoti hain aur sab pages ko share hoti hain
// Is se naya add kiya hua post page badalne par bhi list mein rehta ha
export function PostsProvider({ children }) {
  const postsData = usePosts()
  return <PostsContext.Provider value={postsData}>{children}</PostsContext.Provider>
}

export const usePostsContext = () => useContext(PostsContext)

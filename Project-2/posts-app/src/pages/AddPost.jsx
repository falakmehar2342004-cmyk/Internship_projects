import { usePostsContext } from '../context/PostsContext'
import AddPostForm from '../components/AddPostForm'

// Yaha protected page ha (App.jsx dekho), is ke liye login zaroori ha
export default function AddPost() {
  const { addPost } = usePostsContext()

  return (
    <section>
      <h2>Add a New Post</h2>
      <AddPostForm onSubmit={addPost} />
    </section>
  )
}

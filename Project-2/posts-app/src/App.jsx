import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './pages/Layout'
import Home from './pages/Home'
import Posts from './pages/Posts'
import AddPost from './pages/AddPost'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import ProtectedRoute from './components/ProtectedRoute'

// Yaha PostDetails page ko lazy load kiya ha, ye page tab load hoga jab khulega
const PostDetails = lazy(() => import('./pages/PostDetails'))

export default function App() {
  return (
    // Jab tak lazy page load ho raha ha, Suspense ye loading message dikhata ha
    <Suspense fallback={<p className="status">Loading page...</p>}>
      <Routes>
        {/* Yaha Layout parent route ha (Navbar + Outlet), baqi pages is ke andar hain */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="posts" element={<Posts />} />

          {/* Yaha protected route ha, sirf login user ye page khol sakta ha */}
          <Route path="posts/new" element={<ProtectedRoute><AddPost /></ProtectedRoute>} />

          {/* Yaha dynamic route ha, har post ke liye :id badal jati ha */}
          <Route path="posts/:id" element={<PostDetails />} />

          <Route path="login" element={<Login />} />

          {/* Yaha koi bhi galat URL aaye to NotFound page dikhega */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  )
}

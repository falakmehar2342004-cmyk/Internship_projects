import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

// Yaha kisi page ko is se wrap karo to sirf login user hi usay khol sake ga
export default function ProtectedRoute({ children }) {
  const { user } = useAuth()
  const location = useLocation()

  // Yaha user login nahi ha to login page par bhej diya, aur yaad rakha ke kahan jana tha
  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }

  // Yaha user login ha to page dikha diya
  return children
}

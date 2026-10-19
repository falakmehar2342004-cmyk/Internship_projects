import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Yahan page badalte hi scroll wapis sabse upar chala jata hai
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null; // ye kuch dikhata nahi, sirf kaam karta hai
}

import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import ScrollToTop from './ScrollToTop';

// Yahan har page ka common dhancha hai: Header + page ka content + Footer
export default function Layout() {
  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <ScrollToTop />
      <Header />
      {/* <Outlet /> ki jagah current page (Home, Cart, etc.) aa jata hai */}
      <main id="main" className="container-page flex-1 py-6 sm:py-8">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

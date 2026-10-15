
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import { useTheme } from "./context/ThemeContext";

function AppContent() {
  const { theme } = useTheme();

 
return (
  <div className={theme}>
    <div
      className="min-h-screen transition-colors"
      style={{
        backgroundColor: "var(--page-bg)",
        color: "var(--text-color)",
      }}
    >
      <Navbar />

      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route
          path="*"
          element={
            <main className="p-10 text-center">
              <h1 className="text-2xl font-bold">Page Not Found</h1>
            </main>
          }
        />
      </Routes>

      <footer
        className="mt-12 border-t px-4 py-6 text-center text-sm"
        style={{
          borderColor: "var(--border-color)",
          color: "var(--muted-color)",
        }}
      >
        © {new Date().getFullYear()} ShopEase. Demo shopping project.
      </footer>
    </div>
  </div>
);

}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

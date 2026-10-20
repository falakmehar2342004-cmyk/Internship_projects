import { Toaster } from 'react-hot-toast';

// Central toast outlet; pages can call toast.success(), toast.error(), etc.
export default function ToastContainer() {
  return <Toaster position="top-right" toastOptions={{ duration: 3200 }} />;
}

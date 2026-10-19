import { useEffect } from 'react';

// Yahan browser tab ka title set hota hai, jaise "Cart | Kartly"
export default function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} | Kartly` : 'Kartly';
  }, [title]);
}

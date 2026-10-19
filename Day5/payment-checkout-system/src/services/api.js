import axios from 'axios';

// Yahan ek hi Axios instance banaya hai jo poori app use karti hai.
// Products ka data DummyJSON (free fake API) se aata hai.
export const api = axios.create({
  baseURL: 'https://dummyjson.com',
  timeout: 10000, // 10 second baad request fail
});

export const PAGE_SIZE = 12; // ek baar mein 12 products

// Yahan categories ki list mangwate hain (dropdown ke liye)
export async function fetchCategories() {
  const { data } = await api.get('/products/categories');
  return data.map((c) => (typeof c === 'string' ? { slug: c, name: c.replace(/-/g, ' ') } : c));
}

// Yahan products mangwate hain. Agar search likha ho to title local filter hota hai,
// warna server se pagination (limit + skip) ke saath data aata hai.
export async function fetchProducts({ limit = PAGE_SIZE, skip = 0, search = '', category = '' } = {}) {
  const path = category ? `/products/category/${category}` : '/products';
  const term = search.trim().toLowerCase();

  if (term) {
    const { data } = await api.get(path, { params: { limit: 0 } }); // limit 0 = sab products
    const matches = data.products.filter((p) => p.title.toLowerCase().includes(term));
    return { products: matches.slice(skip, skip + limit), total: matches.length };
  }

  const { data } = await api.get(path, { params: { limit, skip } });
  return { products: data.products, total: data.total };
}

// Yahan ek product ki poori detail mangwate hain
export async function fetchProduct(id) {
  const { data } = await api.get(`/products/${id}`);
  return data;
}

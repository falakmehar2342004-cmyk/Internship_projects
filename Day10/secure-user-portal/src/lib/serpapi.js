
import { supabase } from './supabaseClient';

// Secure Supabase Edge Function ke through SerpAPI call karo.
async function invokeSearch(query, engine) {
  const { data, error } = await supabase.functions.invoke(
    'serpapi-search',
    {
      body: { query, engine },
    }
  );

  if (error) {
    throw new Error(
      error.message || 'Could not connect to the search function.'
    );
  }

  if (data?.error) {
    throw new Error(data.error);
  }

  return data;
}

// Search box ke liye autocomplete suggestions.
export async function getSearchSuggestions(query, signal) {
  const trimmed = query.trim();

  if (trimmed.length < 2) return [];

  if (signal?.aborted) {
    throw new DOMException('Request cancelled', 'AbortError');
  }

  const data = await invokeSearch(trimmed, 'google_autocomplete');

  if (signal?.aborted) {
    throw new DOMException('Request cancelled', 'AbortError');
  }

  return (data.suggestions || [])
    .map((item) =>
      typeof item === 'string' ? item : item.value
    )
    .filter(Boolean);
}

// Web results aur product results dono fetch karo.
export async function searchGoogle(query, signal) {
  const trimmed = query.trim();

  if (!trimmed) {
    throw new Error('Please enter a search query.');
  }

  if (signal?.aborted) {
    throw new DOMException('Request cancelled', 'AbortError');
  }

  const [webData, shoppingData] = await Promise.all([
    invokeSearch(trimmed, 'google'),
    invokeSearch(trimmed, 'google_shopping'),
  ]);

  if (signal?.aborted) {
    throw new DOMException('Request cancelled', 'AbortError');
  }

  // Normal Google website results.
  const webResults = (webData.organic_results || []).map(
    (item, index) => ({
      position: item.position ?? index + 1,
      title: item.title || 'Untitled result',
      link: item.link || '',
      snippet: item.snippet || '',
      thumbnail: item.thumbnail || '',
      source: item.source || '',
    })
  );

  // Google Shopping product results.
  const productResults = (shoppingData.shopping_results || []).map(
    (item, index) => ({
      position: item.position ?? index + 1,
      title: item.title || 'Untitled product',
      link: item.product_link || item.link || '',
      snippet: item.snippet || '',
      thumbnail:
        item.thumbnail ||
        item.serpapi_thumbnail ||
        item.thumbnails?.[0] ||
        '',
      price: item.price || '',
      source: item.source || '',
      rating: item.rating ?? null,
      reviews: item.reviews ?? null,
      delivery: item.delivery || '',
    })
  );

  return {
    query: trimmed,
    webResults,
    productResults,
    totalWebResults:
      webData.search_information?.total_results ?? null,
    searchedAt: new Date().toISOString(),
  };
}

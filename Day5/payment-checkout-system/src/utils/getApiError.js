import axios from 'axios';

// Yahan kisi bhi API error ko user ke liye aasan message mein badal dete hain.
export function getApiError(error) {
  if (axios.isAxiosError(error)) {
    if (error.code === 'ECONNABORTED') return 'The request timed out. Please try again.';
    if (error.response) {
      if (error.response.status === 404) return 'We could not find what you were looking for.';
      if (error.response.status >= 500) return 'The server is having trouble. Please try again shortly.';
      return `The request failed (status ${error.response.status}).`;
    }
    return 'Network error. Please check your internet connection.';
  }
  return 'Something went wrong. Please try again.';
}

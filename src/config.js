// Teen Site API Configuration
const API_BASE_URL = import.meta.env.PROD 
  ? 'https://youth-poll-backend.onrender.com'  // Production API endpoint (Render)
  : 'http://localhost:8000';

// Site configuration
export const SITE = 'teen';

// Utility function to add site parameter to API calls
export const apiCall = (endpoint, options = {}) => {
  const url = new URL(`${API_BASE_URL}${endpoint}`);
  url.searchParams.set('site', SITE);
  
  return fetch(url.toString(), options);
};

export default API_BASE_URL; 
// Youth Site API Configuration
const API_BASE_URL = import.meta.env.PROD 
  ? 'https://youth-poll-backend-production.up.railway.app'  // Production API endpoint (Railway)
  : 'http://localhost:8000';

export default API_BASE_URL; 
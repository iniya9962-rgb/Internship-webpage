// API Configuration
// This allows easy switching between local and production environments

const API_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:3000'
    : window.location.origin.replace('/frontend', '').replace('frontend.', '');

// Or use environment variable if available
const CONFIG = {
    API_URL: window.CONFIG_API_URL || API_URL
};

console.log('Using API URL:', CONFIG.API_URL);

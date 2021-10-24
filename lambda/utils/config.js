export const BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:8888'
    : 'https://svelte-oauth-example.netlify.app';
export const ENDPOINT = process.env.NODE_ENV === 'development' ? '/.netlify/functions' : '/api';

export const COOKIE_SECURE = process.env.NODE_ENV !== 'development';

export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

export const SECRET = process.env.SECRET || 'SUPERSECRET';
export const SESSION_SECRET = process.env.SESSION_SECRET || 'SUPERSECRET';


export interface User {
  id: string;
  email?: string;
  user_metadata?: {
    full_name?: string;
    avatar_url?: string;
  };
}


export interface User {
  id: string;
  email?: string;
  user_metadata?: {
    full_name?: string;
    avatar_url?: string;
  };
}

export const API_BASE_URL = 'http://localhost:5000/api';
const API_URL = `${API_BASE_URL}/auth`;
const STORAGE_KEY = 'auth_token';
const USER_KEY = 'auth_user';

export async function signUp(email: string, password: string, fullName: string) {
  try {
    const res = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password, fullName })
    });

    const text = await res.text();
    let data;
    try {
        data = JSON.parse(text);
    } catch (e) {
        data = { msg: text || res.statusText };
    }
    
    if (!res.ok) {
      return { data: null, error: { message: data.msg || 'Registration failed' } };
    }

    // Store token and user
    localStorage.setItem(STORAGE_KEY, data.token);
    // Adapt user object to match previous Supabase/Mock structure
    const user: User = {
        id: data.user.id,
        email: data.user.email,
        user_metadata: {
            full_name: data.user.fullName
        }
    };
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    window.dispatchEvent(new Event("auth-change"));

    return { data: { user }, error: null };
  } catch (err: any) {
    return { data: null, error: { message: err.message || 'Network error' } };
  }
}

export async function signIn(email: string, password: string) {
  try {
    const res = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    const text = await res.text();
    let data;
    try {
        data = JSON.parse(text);
    } catch (e) {
        data = { msg: text || res.statusText };
    }

    if (!res.ok) {
      return { data: null, error: { message: data.msg || 'Request failed' } };
    }

    localStorage.setItem(STORAGE_KEY, data.token);
    const user: User = {
        id: data.user.id,
        email: data.user.email,
        user_metadata: {
            full_name: data.user.fullName
        }
    };
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    window.dispatchEvent(new Event("auth-change"));

    return { data: { user, session: { user, access_token: data.token } }, error: null };
  } catch (err: any) {
    return { data: null, error: { message: err.message || 'Network error' } };
  }
}

export async function signOut() {
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(USER_KEY);
  window.dispatchEvent(new Event("auth-change"));
  return { error: null };
}

export async function getCurrentUser() {
  const userStr = localStorage.getItem(USER_KEY);
  // Optional: Verify token with backend /me endpoint if strictly needed,
  // but for performance, reading local is fine given the token will fail on requests if invalid.
  // We can add a verify check if we want to be robust.
  return userStr ? JSON.parse(userStr) : null;
}

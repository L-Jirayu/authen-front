const BASE_URL = "http://localhost:3000";

export async function registerUser(data) {
  const res = await fetch(`${BASE_URL}/user/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Register failed');
  return await res.json();
}

export async function loginUser(data) {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Login failed');
  return await res.json();
}

export async function getUserProfile() {
  const res = await fetch(`${BASE_URL}/user/profile`, {
    method: "GET",
    credentials: "include",
  });
  if (!res.ok) throw new Error('Unauthorized or failed to fetch profile');
  return await res.json();
}

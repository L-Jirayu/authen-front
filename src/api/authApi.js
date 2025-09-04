const BASE_URL = "https://minifeed-back.onrender.com";

/** =================== AUTH / USER =================== */
export async function registerUser(data) {
  const res = await fetch(`${BASE_URL}/user/register`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
  if (!res.ok) throw new Error('Register failed');
  return res.json();
}

export async function loginUser(data) {
  const res = await fetch(`${BASE_URL}/auth/login`, { method: "POST", headers: { "Content-Type": "application/json" }, credentials: "include", body: JSON.stringify(data) });
  if (!res.ok) throw new Error('Login failed');
  return res.json();
}

export async function logoutUser() {
  const res = await fetch(`${BASE_URL}/auth/logout`, { method: "POST", credentials: "include" });
  if (!res.ok) throw new Error('Logout failed');
  return res.json();
}

export async function getUserProfile() {
  const res = await fetch(`${BASE_URL}/user/profile`, { method: "GET", credentials: "include" });
  if (!res.ok) throw new Error('Unauthorized or failed to fetch profile');
  return res.json();
}


/** =================== POST AND UPLOAD =================== */

// ดึงโพสต์ทั้งหมด
export async function fetchPosts() {
  const res = await fetch(`${BASE_URL}/postandup`, {
    method: "GET",
    credentials: "include",
  });
  if (!res.ok) throw new Error('Failed to fetch posts');
  return await res.json();
}

// สร้างโพสต์ใหม่ (ข้อความ + รูป optional)
export async function createPost({ content, image }) {
  const formData = new FormData();
  formData.append('content', content);
  if (image) formData.append('file', image); // ชื่อ field ตรง backend

  const res = await fetch(`${BASE_URL}/postandup`, {
    method: "POST",
    credentials: "include",
    body: formData,
  });

  if (!res.ok) throw new Error('Failed to create post');
  return await res.json();
}


// อัพเดตโพสต์
export async function updatePost(id, { content, image }) {
  const formData = new FormData();
  if (content !== undefined) formData.append('content', content);
  if (image) formData.append('file', image);

  const res = await fetch(`${BASE_URL}/postandup/${id}`, {
    method: "PATCH",
    credentials: "include",
    body: formData,
  });

  if (!res.ok) throw new Error('Failed to update post');
  return await res.json();
}

// ลบโพสต์
export async function deletePost(id) {
  const res = await fetch(`${BASE_URL}/postandup/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!res.ok) throw new Error('Failed to delete post');
  return await res.json();
}

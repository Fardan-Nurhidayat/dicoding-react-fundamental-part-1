const BASE_URL = "https://notes-api.dicoding.dev/v1";
const REGISTER_URL = `${BASE_URL}/register`;
const DEFAULT_OPTIONS = {
  headers : {
    "Content-Type": "application/json",
  },
  timeout: 10000,
};

async function apiCall(url, options = {}) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), options.timeout || DEFAULT_OPTIONS.timeout);
  try {
    const response = await fetch(url, {
      ...DEFAULT_OPTIONS,
      ...options,
      signal: controller.signal,
      headers: {
        ...DEFAULT_OPTIONS.headers,
        ...options.headers,
      },
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "API request failed");
  }
  return data;
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error("Request timed out");
    }
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}

export async function registerUser({ name, email, password }) {
  return apiCall(`${BASE_URL}/register`, {
    method: "POST",
    body: JSON.stringify({ name, email, password }),
  });
}

export async function loginUser({ email, password }) {
  return apiCall(`${BASE_URL}/login`, {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export async function apiCallWithAuth(url, options = {}) {
  const token = localStorage.getItem("accessToken");

  return apiCall(url, {
    ...options,
    headers: {
      ...options.headers,
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });
}

export async function getAllNotes() {
  return apiCallWithAuth(`${BASE_URL}/notes`, {
    method: "GET",
  });
}

export async function getArchivedNotes() {
  return apiCallWithAuth(`${BASE_URL}/notes/archived`, {
    method: "GET",
  });
}

export async function getNoteById(id) {
  return apiCallWithAuth(`${BASE_URL}/notes/${id}`, {
    method: "GET",
  });
}

export async function createNote({ title, body }) {
  return apiCallWithAuth(`${BASE_URL}/notes`, {
    method: "POST",
    body: JSON.stringify({ title, body }),
  });
}

export async function updateNote(id, { title, body }) {
  return apiCallWithAuth(`${BASE_URL}/notes/${id}`, {
    method: "PUT",
    body: JSON.stringify({ title, body }),
  });
}
export async function deleteNote(id) {
  return apiCallWithAuth(`${BASE_URL}/notes/${id}`, {
    method: "DELETE",
  });
}
export async function archiveNote(id) {
  return apiCallWithAuth(`${BASE_URL}/notes/${id}/archive`, {
    method: "POST",
  });
}

export async function unarchiveNote(id) {
  return apiCallWithAuth(`${BASE_URL}/notes/${id}/unarchive`, {
    method: "POST",
  });
}

export async function getUserProfile() {
  return apiCallWithAuth(`${BASE_URL}/users/me`, {
    method: "GET",
  });
}
const API_BASE_URL =
  process.env.REACT_APP_API_URL ||
  (typeof window !== "undefined" && window.location.hostname === "localhost"
    ? "http://localhost:8000"
    : "");
const TOKEN_KEY = "adminToken";

export const getAdminToken = () => localStorage.getItem(TOKEN_KEY);

export const setAdminToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const clearAdminToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export async function apiRequest(path, options = {}) {
  const token = getAdminToken();
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  });

  if (response.status === 204) {
    return null;
  }

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    if (response.status === 401) {
      clearAdminToken();
    }
    const message = data.detail || "Request failed";
    throw new Error(message);
  }

  return data;
}

import { apiRequest, clearAdminToken, getAdminToken, setAdminToken } from "./client";

function decodeJwtPayload(token) {
  try {
    const base64Payload = token.split(".")[1];
    const payload = JSON.parse(atob(base64Payload));
    return payload;
  } catch (_error) {
    return null;
  }
}

function isTokenExpired(token) {
  const payload = decodeJwtPayload(token);
  if (!payload?.exp) {
    return true;
  }
  const nowInSeconds = Math.floor(Date.now() / 1000);
  return payload.exp <= nowInSeconds;
}

export async function loginAdmin(credentials) {
  const data = await apiRequest("/api/admin/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
  setAdminToken(data.token);
  return data;
}

export async function getAdminMe() {
  return apiRequest("/api/admin/me");
}

export function logoutAdmin() {
  clearAdminToken();
}

export function isAdminLoggedIn() {
  const token = getAdminToken();
  if (!token) {
    return false;
  }
  if (isTokenExpired(token)) {
    clearAdminToken();
    return false;
  }
  return true;
}

import { apiRequest } from "./client";

function normalizeMessagesResponse(response) {
  if (Array.isArray(response)) {
    return response;
  }

  if (response && typeof response === "object") {
    if (Array.isArray(response.messages)) {
      return response.messages;
    }
    if (Array.isArray(response.data)) {
      return response.data;
    }
    if (Array.isArray(response.items)) {
      return response.items;
    }
  }

  return [];
}

export function submitContactMessage(payload) {
  return apiRequest("/api/contact/messages", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function getAdminMessages() {
  return apiRequest("/api/admin/messages").then(normalizeMessagesResponse);
}

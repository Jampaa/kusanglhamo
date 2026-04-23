import { apiRequest } from "./client";

function normalizeProjectsResponse(response) {
  if (Array.isArray(response)) {
    return response;
  }

  if (response && typeof response === "object") {
    if (Array.isArray(response.projects)) {
      return response.projects;
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

export function getPublishedProjects() {
  return apiRequest("/api/projects").then(normalizeProjectsResponse);
}

export function getProjectById(projectId) {
  return apiRequest(`/api/projects/${projectId}`);
}

export function getAdminProjects() {
  return apiRequest("/api/admin/projects").then(normalizeProjectsResponse);
}

export function createProject(payload) {
  return apiRequest("/api/admin/projects", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function updateProject(projectId, payload) {
  return apiRequest(`/api/admin/projects/${projectId}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export function deleteProject(projectId) {
  return apiRequest(`/api/admin/projects/${projectId}`, {
    method: "DELETE",
  });
}

import { API_URL } from "./api.js";
import { getMasterAdminToken } from "./masterAdminAuth.js";

function buildUrl() {
  return `${API_URL}/api/community-join`;
}

export async function addCommunityJoinSubmission(payload) {
  const response = await fetch(buildUrl(), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok || !data.success) {
    throw new Error(data.message || "Unable to submit application");
  }
  return data.entry;
}

export async function getCommunityJoinSubmissions() {
  const token = getMasterAdminToken();
  const response = await fetch(buildUrl(), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok || !data.success) {
    throw new Error(data.message || "Unable to load submissions");
  }
  return Array.isArray(data.rows) ? data.rows : [];
}

function authHeaders() {
  const token = getMasterAdminToken();
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

/** Master admin: create entry via POST /api/community-join/admin */
export async function createCommunityJoinSubmissionAdmin(payload) {
  const response = await fetch(`${buildUrl()}/admin`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(payload),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok || !data.success) {
    throw new Error(data.message || "Unable to create entry");
  }
  return data.entry;
}

export async function updateCommunityJoinSubmission(id, payload) {
  const response = await fetch(`${buildUrl()}/${encodeURIComponent(id)}`, {
    method: "PATCH",
    headers: authHeaders(),
    body: JSON.stringify(payload),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok || !data.success) {
    throw new Error(data.message || "Unable to update entry");
  }
  return data.entry;
}

export async function deleteCommunityJoinSubmission(id) {
  const response = await fetch(`${buildUrl()}/${encodeURIComponent(id)}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok || !data.success) {
    throw new Error(data.message || "Unable to delete entry");
  }
}

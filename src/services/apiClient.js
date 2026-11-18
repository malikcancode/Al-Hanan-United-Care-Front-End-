const API_URL = process.env.NEXT_PUBLIC_API_URL;
const API_ORIGIN = API_URL ? new URL(API_URL).origin : "";

export const assetUrl = (path) => (!path || /^https?:\/\//.test(path) ? path : `${API_ORIGIN}${path}`);

export class ApiError extends Error {
  constructor(message, status, errors) {
    super(message);
    this.status = status;
    this.errors = errors;
  }
}

export async function apiRequest(path, { method = "GET", body, ...options } = {}) {
  let res;
  try {
    res = await fetch(`${API_URL}${path}`, {
      method,
      headers: body ? { "Content-Type": "application/json" } : undefined,
      body: body ? JSON.stringify(body) : undefined,
      ...options,
    });
  } catch {
    throw new ApiError("Unable to reach the server. Please try again shortly.", 0);
  }

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new ApiError(data.message || "Something went wrong", res.status, data.errors);
  }
  return data;
}

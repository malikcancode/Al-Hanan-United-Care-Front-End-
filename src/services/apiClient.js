// Accepts values pasted into hosting dashboards without a scheme, with quotes or a trailing slash.
function normalizeApiUrl(raw) {
  let url = (raw || "").trim().replace(/^["']|["']$/g, "").replace(/\/+$/, "");
  if (/^[a-z0-9-]+(\.[a-z0-9-]+)*(:\d+)?(\/|$)/i.test(url)) {
    url = `${/^(localhost|127\.0\.0\.1)(:|\/|$)/.test(url) ? "http" : "https"}://${url}`;
  }
  try {
    return { url, origin: new URL(url).origin };
  } catch {
    console.warn(`NEXT_PUBLIC_API_URL is missing or invalid ("${raw ?? ""}"). Expected e.g. https://api.example.com/api`);
    return { url: "", origin: "" };
  }
}

const { url: API_URL, origin: API_ORIGIN } = normalizeApiUrl(process.env.NEXT_PUBLIC_API_URL);

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

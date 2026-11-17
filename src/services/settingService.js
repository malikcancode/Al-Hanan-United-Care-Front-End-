import { apiRequest } from "./apiClient";

export async function getSettings() {
  try {
    const { data } = await apiRequest("/settings", { next: { revalidate: 60 } });
    return data;
  } catch {
    return null;
  }
}

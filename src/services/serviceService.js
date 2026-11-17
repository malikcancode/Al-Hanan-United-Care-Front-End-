import { apiRequest } from "./apiClient";

export async function getServices() {
  try {
    const { data } = await apiRequest("/services", { next: { revalidate: 60 } });
    return data;
  } catch {
    return [];
  }
}

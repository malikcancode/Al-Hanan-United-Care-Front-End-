import { apiRequest } from "./apiClient";

export async function getDoctors() {
  try {
    const { data } = await apiRequest("/doctors", { next: { revalidate: 60 } });
    return data;
  } catch {
    return [];
  }
}

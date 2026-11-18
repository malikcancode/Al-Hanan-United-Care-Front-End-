import { cacheLife, cacheTag } from "next/cache";
import { apiRequest } from "./apiClient";

// Cached, but refreshed instantly when an admin changes services (see /api/revalidate).
export async function getServices() {
  "use cache";
  cacheTag("services");
  cacheLife("minutes");

  try {
    const { data } = await apiRequest("/services");
    return data;
  } catch {
    return [];
  }
}

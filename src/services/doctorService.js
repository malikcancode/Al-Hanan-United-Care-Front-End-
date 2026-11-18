import { cacheLife, cacheTag } from "next/cache";
import { apiRequest } from "./apiClient";

export async function getDoctors() {
  "use cache";
  cacheTag("doctors");
  cacheLife("minutes");

  try {
    const { data } = await apiRequest("/doctors");
    return data;
  } catch {
    return [];
  }
}

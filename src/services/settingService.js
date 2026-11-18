import { cacheLife, cacheTag } from "next/cache";
import { apiRequest } from "./apiClient";

export async function getSettings() {
  "use cache";
  cacheTag("settings");
  cacheLife("minutes");

  try {
    const { data } = await apiRequest("/settings");
    return data;
  } catch {
    return null;
  }
}

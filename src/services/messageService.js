import { apiRequest } from "./apiClient";

export function sendMessage(payload) {
  return apiRequest("/messages", { method: "POST", body: payload });
}

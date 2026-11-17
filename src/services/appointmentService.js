import { apiRequest } from "./apiClient";

export function createAppointment(payload) {
  return apiRequest("/appointments", { method: "POST", body: payload });
}

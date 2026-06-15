import { apiClient } from "@/api/client";
import { GET_ENDPOINTS } from "@/api/endpoints";
import type { ActionResponse } from "./actionEvent.type";

export const actionEventService = {
  getAll: (): Promise<ActionResponse> =>
    apiClient.get(GET_ENDPOINTS.actionEvent.getAll),
};

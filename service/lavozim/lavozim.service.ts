import { apiClient } from "@/api/client";
import { GET_ENDPOINTS } from "@/api/endpoints";
import type { LavozimListResponse, LavozimStatistikaResponse } from "./lavozim.type";

export const lavozimService = {
  getAll: (): Promise<LavozimListResponse> =>
    apiClient.get(GET_ENDPOINTS.lavozim.getAll),

  getStats: (): Promise<LavozimStatistikaResponse> =>
    apiClient.get(GET_ENDPOINTS.lavozim.getStats),
};

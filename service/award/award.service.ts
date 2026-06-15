import { apiClient } from "@/api/client";
import { GET_ENDPOINTS } from "@/api/endpoints";
import type { AwardResponse, AwardByUserResponse } from "./award.type";

export const awardService = {
  getAll: (): Promise<{ success: boolean; message: string; data: import("./award.type").AwardData[] }> =>
    apiClient.get(GET_ENDPOINTS.award.getAll),

  getById: (id: string | number): Promise<AwardResponse> =>
    apiClient.get(GET_ENDPOINTS.award.getById(id)),

  getByUser: (id: string | number): Promise<AwardByUserResponse> =>
    apiClient.get(GET_ENDPOINTS.award.getByUser(id)),
};

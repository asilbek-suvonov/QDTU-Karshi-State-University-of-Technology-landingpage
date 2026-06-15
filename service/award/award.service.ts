import { apiClient } from "@/api/client";
import { GET_ENDPOINTS } from "@/api/endpoints";
import type {
  AwardResponse,
  AwardListResponse,
  AwardByUserResponse,
} from "./award.type";

export interface AwardPageParams {
  page?: number;
  size?: number;
}

export const awardService = {
  getAll: (params?: AwardPageParams): Promise<AwardListResponse> =>
    apiClient.get(GET_ENDPOINTS.award.getAll, { params }),

  getById: (id: string | number): Promise<AwardResponse> =>
    apiClient.get(GET_ENDPOINTS.award.getById(id)),

  getByUser: (id: string | number, params?: AwardPageParams): Promise<AwardByUserResponse> =>
    apiClient.get(GET_ENDPOINTS.award.getByUser(id), { params }),
};

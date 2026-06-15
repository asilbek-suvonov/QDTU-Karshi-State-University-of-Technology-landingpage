import { apiClient } from "@/api/client";
import { GET_ENDPOINTS } from "@/api/endpoints";
import type {
  ResearchDetailResponse,
  ResearchListResponse,
  ResearchByUserResponse,
} from "./research.type";

export interface ResearchPageParams {
  page?: number;
  size?: number;
}

export const researchService = {
  getAll: (params?: ResearchPageParams): Promise<ResearchListResponse> =>
    apiClient.get(GET_ENDPOINTS.research.getAll, { params }),

  getById: (id: string | number): Promise<ResearchDetailResponse> =>
    apiClient.get(GET_ENDPOINTS.research.getById(id)),

  getByUser: (id: string | number, params?: ResearchPageParams): Promise<ResearchByUserResponse> =>
    apiClient.get(GET_ENDPOINTS.research.getByUser(id), { params }),
};

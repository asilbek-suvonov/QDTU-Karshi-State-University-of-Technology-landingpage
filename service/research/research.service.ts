import { apiClient } from "@/api/client";
import { GET_ENDPOINTS } from "@/api/endpoints";
import type {
  ResearchDetailResponse,
  ResearchListResponse,
  ResearchByUserResponse,
} from "./research.type";

export const researchService = {
  getAll: (): Promise<ResearchListResponse> =>
    apiClient.get(GET_ENDPOINTS.research.getAll),

  getById: (id: string | number): Promise<ResearchDetailResponse> =>
    apiClient.get(GET_ENDPOINTS.research.getById(id)),

  getByUser: (id: string | number): Promise<ResearchByUserResponse> =>
    apiClient.get(GET_ENDPOINTS.research.getByUser(id)),
};

import { apiClient } from "@/api/client";
import { GET_ENDPOINTS } from "@/api/endpoints";
import type {
  NazoratDetailResponse,
  NazoratListResponse,
  NazoratByUserResponse,
} from "./nazorat.type";

export const nazoratService = {
  getAll: (): Promise<NazoratListResponse> =>
    apiClient.get(GET_ENDPOINTS.nazorat.getAll),

  getById: (id: string | number): Promise<NazoratDetailResponse> =>
    apiClient.get(GET_ENDPOINTS.nazorat.getById(id)),

  getByUser: (id: string | number): Promise<NazoratByUserResponse> =>
    apiClient.get(GET_ENDPOINTS.nazorat.getByUser(id)),
};

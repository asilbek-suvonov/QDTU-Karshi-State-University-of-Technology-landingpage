import { apiClient } from "@/api/client";
import { GET_ENDPOINTS } from "@/api/endpoints";
import type {
  ConsultationResponse,
  ConsultationPageResponse,
  ConsultationByUserResponse,
} from "./consultation.type";

export interface ConsultationPageParams {
  page?: number;
  size?: number;
}

export const consultationService = {
  getPage: (params?: ConsultationPageParams): Promise<ConsultationPageResponse> =>
    apiClient.get(GET_ENDPOINTS.consultation.getPage, { params }),

  getById: (id: string | number): Promise<ConsultationResponse> =>
    apiClient.get(GET_ENDPOINTS.consultation.getById(id)),

  getByUser: (id: string | number, params?: ConsultationPageParams): Promise<ConsultationByUserResponse> =>
    apiClient.get(GET_ENDPOINTS.consultation.getByUser(id), { params }),
};

import { apiClient } from "@/api/client";
import { GET_ENDPOINTS } from "@/api/endpoints";
import type {
  PublicationResponse,
  PublicationPageResponse,
  PublicationByUserResponse,
} from "./publication.type";

export interface PublicationPageParams {
  page?: number;
  size?: number;
}

export const publicationService = {
  getPage: (params?: PublicationPageParams): Promise<PublicationPageResponse> =>
    apiClient.get(GET_ENDPOINTS.publication.getPage, { params }),

  getById: (publicationId: string | number): Promise<PublicationResponse> =>
    apiClient.get(GET_ENDPOINTS.publication.getById(publicationId)),

  getByUser: (id: string | number, params?: PublicationPageParams): Promise<PublicationByUserResponse> =>
    apiClient.get(GET_ENDPOINTS.publication.getByUser(id), { params }),
};

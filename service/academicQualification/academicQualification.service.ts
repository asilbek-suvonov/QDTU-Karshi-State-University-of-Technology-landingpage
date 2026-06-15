import { apiClient } from "@/api/client";
import { GET_ENDPOINTS } from "@/api/endpoints";
import type {
  AcademicQualificationResponse,
  AcademicQualificationListResponse,
} from "./academicQualification.type";

export const academicQualificationService = {
  getAll: (): Promise<AcademicQualificationListResponse> =>
    apiClient.get(GET_ENDPOINTS.academicQualification.getAll),

  getById: (id: string | number): Promise<AcademicQualificationResponse> =>
    apiClient.get(GET_ENDPOINTS.academicQualification.getById(id)),
};

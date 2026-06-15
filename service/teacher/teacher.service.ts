import { apiClient } from "@/api/client";
import { GET_ENDPOINTS } from "@/api/endpoints";
import type { TeacherDetailResponse, TeacherSearchResponse } from "./teacher.type";

export interface TeacherSearchParams {
  query?: string;
  collegeName?: string;
  departmentName?: string;
}

export const teacherService = {
  getById: (userId: string | number): Promise<TeacherDetailResponse> =>
    apiClient.get(GET_ENDPOINTS.teacher.getById(userId)),

  search: (params?: TeacherSearchParams): Promise<TeacherSearchResponse> =>
    apiClient.get(GET_ENDPOINTS.teacher.search, { params }),
};

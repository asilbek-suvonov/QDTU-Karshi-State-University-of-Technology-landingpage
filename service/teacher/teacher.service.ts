import { apiClient } from "@/api/client";
import { GET_ENDPOINTS, POST_ENDPOINTS, PUT_ENDPOINTS, DELETE_ENDPOINTS } from "@/api/endpoints";
import type {
  TeacherDetailResponse,
  TeacherSearchResponse,
  TeacherMutationResponse,
  ReqTeacher,
  TeacherSearchParams,
} from "./teacher.type";

export const teacherService = {
  getById: (userId: string | number): Promise<TeacherDetailResponse> =>
    apiClient.get(GET_ENDPOINTS.teacher.getById(userId)),

  search: (params?: TeacherSearchParams): Promise<TeacherSearchResponse> =>
    apiClient.get(GET_ENDPOINTS.teacher.search, { params }),

  create: (data: ReqTeacher): Promise<TeacherMutationResponse> =>
    apiClient.post(POST_ENDPOINTS.teacher.create, data),

  update: (data: ReqTeacher): Promise<TeacherMutationResponse> =>
    apiClient.put(PUT_ENDPOINTS.teacher.update, data),

  delete: (userId: string | number): Promise<TeacherMutationResponse> =>
    apiClient.delete(DELETE_ENDPOINTS.teacher.delete(userId)),
};

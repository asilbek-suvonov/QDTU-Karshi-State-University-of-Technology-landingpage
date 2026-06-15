import { apiClient } from "@/api/client";
import { GET_ENDPOINTS } from "@/api/endpoints";
import type {
  CollegeDetailResponse,
  CollegeListResponse,
  CollegePageResponse,
  CollegeDashboardResponse,
} from "./college.type";

export interface CollegePageParams {
  page?: number;
  size?: number;
}

export const collegeService = {
  getAll: (): Promise<CollegeListResponse> =>
    apiClient.get(GET_ENDPOINTS.college.getAll),

  getById: (collegeId: string | number): Promise<CollegeDetailResponse> =>
    apiClient.get(GET_ENDPOINTS.college.getById(collegeId)),

  getPage: (params?: CollegePageParams): Promise<CollegePageResponse> =>
    apiClient.get(GET_ENDPOINTS.college.getPage, { params }),

  getDashboard: (): Promise<CollegeDashboardResponse> =>
    apiClient.get(GET_ENDPOINTS.college.getDashboard),
};

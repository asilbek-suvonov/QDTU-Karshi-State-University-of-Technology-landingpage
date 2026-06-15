import { apiClient } from "@/api/client";
import { GET_ENDPOINTS } from "@/api/endpoints";
import type {
  UserScientificResponse,
  UserAgeDashboardResponse,
  UserGenderDashboardResponse,
  UserDashboardResponse,
  UserStatisticsResponse,
  UserProfileCompletionResponse,
  UserCollegeResponse,
  UserDepartmentResponse,
  UserListResponse,
} from "./user.type";

export const userService = {
  getAll: (): Promise<UserListResponse> =>
    apiClient.get(GET_ENDPOINTS.user.getAll),

  getScientific: (): Promise<UserScientificResponse> =>
    apiClient.get(GET_ENDPOINTS.user.getScientific),

  getDashboard: (): Promise<UserDashboardResponse> =>
    apiClient.get(GET_ENDPOINTS.user.getDashboard),

  getAgeDashboard: (): Promise<UserAgeDashboardResponse> =>
    apiClient.get(GET_ENDPOINTS.user.getAgeDashboard),

  getGenderDashboard: (): Promise<UserGenderDashboardResponse> =>
    apiClient.get(GET_ENDPOINTS.user.getGenderDashboard),

  getStatistics: (userId: string | number): Promise<UserStatisticsResponse> =>
    apiClient.get(GET_ENDPOINTS.user.getStatistics(userId)),

  getProfileCompletion: (userId: string | number): Promise<UserProfileCompletionResponse> =>
    apiClient.get(GET_ENDPOINTS.user.getProfileCompletion(userId)),

  getByCollege: (collegeId: string | number): Promise<UserCollegeResponse> =>
    apiClient.get(GET_ENDPOINTS.user.getCollege(collegeId)),

  getByDepartment: (departmentId: string | number): Promise<UserDepartmentResponse> =>
    apiClient.get(GET_ENDPOINTS.user.getDepartment(departmentId)),
};

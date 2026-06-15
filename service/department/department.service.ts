import { apiClient } from "@/api/client";
import { GET_ENDPOINTS } from "@/api/endpoints";
import type {
  DepartmentDetailResponse,
  DepartmentListResponse,
  DepartmentPageResponse,
  DepartmentStatsResponse,
} from "./department.type";

export interface DepartmentPageParams {
  page?: number;
  size?: number;
}

export const departmentService = {
  getList: (): Promise<DepartmentListResponse> =>
    apiClient.get(GET_ENDPOINTS.department.getList),

  getOne: (departmentId: string | number): Promise<DepartmentDetailResponse> =>
    apiClient.get(GET_ENDPOINTS.department.getOne(departmentId)),

  getPage: (params?: DepartmentPageParams): Promise<DepartmentPageResponse> =>
    apiClient.get(GET_ENDPOINTS.department.getPage, { params }),

  getStats: (): Promise<DepartmentStatsResponse> =>
    apiClient.get(GET_ENDPOINTS.department.getStats),
};

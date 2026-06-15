import { useQuery } from "@tanstack/react-query";
import { departmentService, type DepartmentPageParams } from "@/service/department/department.service";

export const departmentKeys = {
  all: ["department"] as const,
  list: () => ["department", "list"] as const,
  detail: (id: string | number) => ["department", "detail", id] as const,
  page: (params: DepartmentPageParams) => ["department", "page", params] as const,
  stats: () => ["department", "stats"] as const,
};

export const useGetDepartmentList = () => {
  return useQuery({
    queryKey: departmentKeys.list(),
    queryFn: () => departmentService.getList(),
    staleTime: 5 * 60 * 1000,
  });
};

export const useGetDepartmentById = (departmentId: string | number) => {
  return useQuery({
    queryKey: departmentKeys.detail(departmentId),
    queryFn: () => departmentService.getOne(departmentId),
    enabled: !!departmentId,
    staleTime: 5 * 60 * 1000,
  });
};

export const useGetDepartmentPage = (params: DepartmentPageParams = {}) => {
  return useQuery({
    queryKey: departmentKeys.page(params),
    queryFn: () => departmentService.getPage(params),
    staleTime: 5 * 60 * 1000,
  });
};

export const useGetDepartmentStats = () => {
  return useQuery({
    queryKey: departmentKeys.stats(),
    queryFn: () => departmentService.getStats(),
    staleTime: 5 * 60 * 1000,
  });
};

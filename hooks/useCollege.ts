import { useQuery } from "@tanstack/react-query";
import { collegeService, type CollegePageParams } from "@/service/college/college.service";

export const collegeKeys = {
  all: ["college"] as const,
  list: () => ["college", "list"] as const,
  detail: (id: string | number) => ["college", "detail", id] as const,
  page: (params: CollegePageParams) => ["college", "page", params] as const,
  dashboard: () => ["college", "dashboard"] as const,
};

export const useGetAllColleges = () => {
  return useQuery({
    queryKey: collegeKeys.list(),
    queryFn: () => collegeService.getAll(),
    staleTime: 5 * 60 * 1000,
  });
};

export const useGetCollegeById = (collegeId: string | number) => {
  return useQuery({
    queryKey: collegeKeys.detail(collegeId),
    queryFn: () => collegeService.getById(collegeId),
    enabled: !!collegeId,
    staleTime: 5 * 60 * 1000,
  });
};

export const useGetCollegePage = (params: CollegePageParams = {}) => {
  return useQuery({
    queryKey: collegeKeys.page(params),
    queryFn: () => collegeService.getPage(params),
    staleTime: 5 * 60 * 1000,
  });
};

export const useGetCollegeDashboard = () => {
  return useQuery({
    queryKey: collegeKeys.dashboard(),
    queryFn: () => collegeService.getDashboard(),
    staleTime: 5 * 60 * 1000,
  });
};

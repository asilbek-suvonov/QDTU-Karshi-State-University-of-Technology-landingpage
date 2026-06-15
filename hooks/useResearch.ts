import { useQuery } from "@tanstack/react-query";
import { researchService } from "@/service/research/research.service";
import { getStoredToken } from "@/store/auth.store";

export const researchKeys = {
  all: ["research"] as const,
  list: (params?: { page?: number; size?: number }) => ["research", "list", params] as const,
  detail: (id: string | number) => ["research", "detail", id] as const,
  byUser: (id: string | number) => ["research", "byUser", id] as const,
};

export const useGetAllResearch = (params: { page?: number; size?: number } = { size: 50 }) => {
  return useQuery({
    queryKey: researchKeys.list(params),
    queryFn: () => researchService.getAll(params),
    staleTime: 5 * 60 * 1000,
  });
};

export const useGetResearchById = (id: string | number) => {
  return useQuery({
    queryKey: researchKeys.detail(id),
    queryFn: () => researchService.getById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
};

export const useGetResearchByUser = (userId: string | number) => {
  return useQuery({
    queryKey: researchKeys.byUser(userId),
    queryFn: () => researchService.getByUser(userId),
    enabled: !!userId && !!getStoredToken(),
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
};

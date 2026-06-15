import { useQuery } from "@tanstack/react-query";
import { researchService } from "@/service/research/research.service";

export const researchKeys = {
  all: ["research"] as const,
  list: () => ["research", "list"] as const,
  detail: (id: string | number) => ["research", "detail", id] as const,
  byUser: (id: string | number) => ["research", "byUser", id] as const,
};

export const useGetAllResearch = () => {
  return useQuery({
    queryKey: researchKeys.list(),
    queryFn: () => researchService.getAll(),
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
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
  });
};

import { useQuery } from "@tanstack/react-query";
import { awardService, type AwardPageParams } from "@/service/award/award.service";
import { getStoredToken } from "@/store/auth.store";

export const awardKeys = {
  all: ["award"] as const,
  list: (params: AwardPageParams) => ["award", "list", params] as const,
  detail: (id: string | number) => ["award", "detail", id] as const,
  byUser: (id: string | number) => ["award", "byUser", id] as const,
};

export const useGetAllAwards = (params: AwardPageParams = { size: 50 }) => {
  return useQuery({
    queryKey: awardKeys.list(params),
    queryFn: () => awardService.getAll(params),
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
};

export const useGetAwardById = (id: string | number) => {
  return useQuery({
    queryKey: awardKeys.detail(id),
    queryFn: () => awardService.getById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
};

export const useGetAwardsByUser = (userId: string | number) => {
  return useQuery({
    queryKey: awardKeys.byUser(userId),
    queryFn: () => awardService.getByUser(userId),
    enabled: !!userId && !!getStoredToken(),
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
};

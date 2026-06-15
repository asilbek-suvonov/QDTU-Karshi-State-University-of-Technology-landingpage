import { useQuery } from "@tanstack/react-query";
import { awardService } from "@/service/award/award.service";

export const awardKeys = {
  all: ["award"] as const,
  list: () => ["award", "list"] as const,
  detail: (id: string | number) => ["award", "detail", id] as const,
  byUser: (id: string | number) => ["award", "byUser", id] as const,
};

export const useGetAllAwards = () => {
  return useQuery({
    queryKey: awardKeys.list(),
    queryFn: () => awardService.getAll(),
    staleTime: 5 * 60 * 1000,
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
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
  });
};

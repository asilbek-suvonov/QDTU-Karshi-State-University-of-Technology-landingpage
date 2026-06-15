import { useQuery } from "@tanstack/react-query";
import { nazoratService } from "@/service/nazorat/nazorat.service";

export const nazoratKeys = {
  all: ["nazorat"] as const,
  list: () => ["nazorat", "list"] as const,
  detail: (id: string | number) => ["nazorat", "detail", id] as const,
  byUser: (id: string | number) => ["nazorat", "byUser", id] as const,
};

export const useGetAllNazorat = () => {
  return useQuery({
    queryKey: nazoratKeys.list(),
    queryFn: () => nazoratService.getAll(),
    staleTime: 5 * 60 * 1000,
  });
};

export const useGetNazoratById = (id: string | number) => {
  return useQuery({
    queryKey: nazoratKeys.detail(id),
    queryFn: () => nazoratService.getById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
};

export const useGetNazoratByUser = (userId: string | number) => {
  return useQuery({
    queryKey: nazoratKeys.byUser(userId),
    queryFn: () => nazoratService.getByUser(userId),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
  });
};

import { useQuery } from "@tanstack/react-query";
import { publicationService, type PublicationPageParams } from "@/service/publication/publication.service";

export const publicationKeys = {
  all: ["publication"] as const,
  page: (params: PublicationPageParams) => ["publication", "page", params] as const,
  detail: (id: string | number) => ["publication", "detail", id] as const,
  byUser: (id: string | number, params: PublicationPageParams) => ["publication", "byUser", id, params] as const,
};

export const useGetPublicationPage = (params: PublicationPageParams = {}) => {
  return useQuery({
    queryKey: publicationKeys.page(params),
    queryFn: () => publicationService.getPage(params),
    staleTime: 5 * 60 * 1000,
  });
};

export const useGetPublicationById = (id: string | number) => {
  return useQuery({
    queryKey: publicationKeys.detail(id),
    queryFn: () => publicationService.getById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
};

export const useGetPublicationsByUser = (userId: string | number, params: PublicationPageParams = {}) => {
  return useQuery({
    queryKey: publicationKeys.byUser(userId, params),
    queryFn: () => publicationService.getByUser(userId, params),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
  });
};

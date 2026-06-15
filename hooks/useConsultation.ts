import { useQuery } from "@tanstack/react-query";
import { consultationService, type ConsultationPageParams } from "@/service/consultation/consultation.service";

export const consultationKeys = {
  all: ["consultation"] as const,
  page: (params: ConsultationPageParams) => ["consultation", "page", params] as const,
  detail: (id: string | number) => ["consultation", "detail", id] as const,
  byUser: (id: string | number, params: ConsultationPageParams) => ["consultation", "byUser", id, params] as const,
};

export const useGetConsultationPage = (params: ConsultationPageParams = {}) => {
  return useQuery({
    queryKey: consultationKeys.page(params),
    queryFn: () => consultationService.getPage(params),
    staleTime: 5 * 60 * 1000,
  });
};

export const useGetConsultationById = (id: string | number) => {
  return useQuery({
    queryKey: consultationKeys.detail(id),
    queryFn: () => consultationService.getById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
};

export const useGetConsultationsByUser = (userId: string | number, params: ConsultationPageParams = {}) => {
  return useQuery({
    queryKey: consultationKeys.byUser(userId, params),
    queryFn: () => consultationService.getByUser(userId, params),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
  });
};

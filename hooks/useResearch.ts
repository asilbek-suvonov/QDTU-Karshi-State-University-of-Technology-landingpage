import { useQuery } from '@tanstack/react-query';
import { researchService } from '../service/researchService';

/**
 * Key Factory for Research-related queries.
 */
export const researchKeys = {
  all: ['research'] as const,
  lists: () => [...researchKeys.all, 'list'] as const,
  list: (params: Record<string, any>) => [...researchKeys.lists(), params] as const,
  publications: (params: Record<string, any>) => [...researchKeys.all, 'publications', params] as const,
  awards: (params: Record<string, any>) => [...researchKeys.all, 'awards', params] as const,
  consultations: (params: Record<string, any>) => [...researchKeys.all, 'consultations', params] as const,
};

/**
 * Hook to fetch all research projects.
 */
export const useGetResearch = (params: Record<string, any> = {}) => {
  return useQuery({
    queryKey: researchKeys.list(params),
    queryFn: () => researchService.getResearch(params),
    staleTime: 5 * 60 * 1000,
  });
};

/**
 * Hook to fetch all publications.
 */
export const useGetPublications = (params: Record<string, any> = {}) => {
  return useQuery({
    queryKey: researchKeys.publications(params),
    queryFn: () => researchService.getPublications(params),
    staleTime: 5 * 60 * 1000,
  });
};

/**
 * Hook to fetch all awards.
 */
export const useGetAwards = (params: Record<string, any> = {}) => {
  return useQuery({
    queryKey: researchKeys.awards(params),
    queryFn: () => researchService.getAwards(params),
    staleTime: 5 * 60 * 1000,
  });
};

/**
 * Hook to fetch all consultations.
 */
export const useGetConsultations = (params: Record<string, any> = {}) => {
  return useQuery({
    queryKey: researchKeys.consultations(params),
    queryFn: () => researchService.getConsultations(params),
    staleTime: 5 * 60 * 1000,
  });
};

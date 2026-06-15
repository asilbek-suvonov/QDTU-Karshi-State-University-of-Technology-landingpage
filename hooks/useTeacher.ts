import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { teacherService } from "@/service/teacher/teacher.service";
import type { TeacherSearchParams, ReqTeacher } from "@/service/teacher/teacher.type";

export const teacherKeys = {
  all: ["teacher"] as const,
  detail: (id: string | number) => ["teacher", "detail", id] as const,
  search: (params: TeacherSearchParams) => ["teacher", "search", params] as const,
};

export const useGetTeacherById = (userId: string | number) => {
  return useQuery({
    queryKey: teacherKeys.detail(userId),
    queryFn: () => teacherService.getById(userId),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
  });
};

export const useSearchTeachers = (params: TeacherSearchParams = {}) => {
  return useQuery({
    queryKey: teacherKeys.search(params),
    queryFn: () => teacherService.search(params),
    staleTime: 5 * 60 * 1000,
  });
};

export const useCreateTeacher = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ReqTeacher) => teacherService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: teacherKeys.all });
    },
  });
};

export const useUpdateTeacher = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ReqTeacher) => teacherService.update(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: teacherKeys.all });
    },
  });
};

export const useDeleteTeacher = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (userId: number) => teacherService.delete(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: teacherKeys.all });
    },
  });
};

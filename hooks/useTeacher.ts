import { useQuery } from "@tanstack/react-query";
import { teacherService, type TeacherSearchParams } from "@/service/teacher/teacher.service";

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

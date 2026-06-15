import { useQuery } from "@tanstack/react-query";
import { userService } from "@/service/user/user.service";

export const userKeys = {
  all: ["user"] as const,
  list: () => ["user", "list"] as const,
  scientific: () => ["user", "scientific"] as const,
  dashboard: () => ["user", "dashboard"] as const,
  ageDashboard: () => ["user", "age-dashboard"] as const,
  genderDashboard: () => ["user", "gender-dashboard"] as const,
  statistics: (userId: string | number) => ["user", "statistics", userId] as const,
  profileCompletion: (userId: string | number) => ["user", "profile-completion", userId] as const,
  byCollege: (collegeId: string | number) => ["user", "college", collegeId] as const,
  byDepartment: (departmentId: string | number) => ["user", "department", departmentId] as const,
};

export const useGetAllUsers = () => {
  return useQuery({
    queryKey: userKeys.list(),
    queryFn: () => userService.getAll(),
    staleTime: 5 * 60 * 1000,
  });
};

export const useGetUserScientific = () => {
  return useQuery({
    queryKey: userKeys.scientific(),
    queryFn: () => userService.getScientific(),
    staleTime: 5 * 60 * 1000,
  });
};

export const useGetUserDashboard = () => {
  return useQuery({
    queryKey: userKeys.dashboard(),
    queryFn: () => userService.getDashboard(),
    staleTime: 5 * 60 * 1000,
  });
};

export const useGetUserAgeDashboard = () => {
  return useQuery({
    queryKey: userKeys.ageDashboard(),
    queryFn: () => userService.getAgeDashboard(),
    staleTime: 5 * 60 * 1000,
  });
};

export const useGetUserGenderDashboard = () => {
  return useQuery({
    queryKey: userKeys.genderDashboard(),
    queryFn: () => userService.getGenderDashboard(),
    staleTime: 5 * 60 * 1000,
  });
};

export const useGetUserStatistics = (userId: string | number) => {
  return useQuery({
    queryKey: userKeys.statistics(userId),
    queryFn: () => userService.getStatistics(userId),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
  });
};

export const useGetUserProfileCompletion = (userId: string | number) => {
  return useQuery({
    queryKey: userKeys.profileCompletion(userId),
    queryFn: () => userService.getProfileCompletion(userId),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
  });
};

export const useGetUsersByCollege = (collegeId: string | number) => {
  return useQuery({
    queryKey: userKeys.byCollege(collegeId),
    queryFn: () => userService.getByCollege(collegeId),
    enabled: !!collegeId,
    staleTime: 5 * 60 * 1000,
  });
};

export const useGetUsersByDepartment = (departmentId: string | number) => {
  return useQuery({
    queryKey: userKeys.byDepartment(departmentId),
    queryFn: () => userService.getByDepartment(departmentId),
    enabled: !!departmentId,
    staleTime: 5 * 60 * 1000,
  });
};

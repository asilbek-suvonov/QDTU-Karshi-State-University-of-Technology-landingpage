import { useQueries } from "@tanstack/react-query";
import { useGetAllColleges } from "@/hooks/useCollege";
import { userService } from "@/service/user/user.service";
import { userKeys } from "@/hooks/useUser";
import type { ResUser } from "@/service/user/user.type";

/**
 * Barcha college lardan userlarni parallel ravishda yuklaydi.
 * /user/college/{id} public endpoint — token shart emas.
 */
export function useAllStaff() {
  const { data: collegesData, isLoading: collegesLoading } = useGetAllColleges();
  const colleges = collegesData?.data ?? [];

  const userQueries = useQueries({
    queries: colleges.map((college) => ({
      queryKey: userKeys.byCollege(college.id),
      queryFn: () => userService.getByCollege(college.id),
      staleTime: 5 * 60 * 1000,
      enabled: colleges.length > 0,
    })),
  });

  const isLoading = collegesLoading || userQueries.some((q) => q.isLoading);
  const isError = userQueries.some((q) => q.isError);

  // Barcha natijalarni birlashtirib, id bo'yicha deduplicate qilamiz
  const staffMap = new Map<number, ResUser>();
  userQueries.forEach((q) => {
    (q.data?.data ?? []).forEach((user) => {
      staffMap.set(user.id, user);
    });
  });

  const staff = Array.from(staffMap.values());

  return { staff, isLoading, isError, total: staff.length };
}

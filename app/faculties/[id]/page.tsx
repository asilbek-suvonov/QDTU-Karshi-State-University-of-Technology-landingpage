"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import { Building2, GraduationCap, Loader2, Users } from "lucide-react";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { UserCard } from "@/components/user-card";
import { useGetCollegeById } from "@/hooks/useCollege";
import { useGetUsersByCollege } from "@/hooks/useUser";

function CollegeDetail({ id }: { id: string }) {
  const { data: collegeData, isLoading, isError } = useGetCollegeById(id);
  const { data: usersData, isLoading: usersLoading } = useGetUsersByCollege(id);

  if (isLoading) {
    return (
      <div className="py-8 text-center">
        <Loader2 className="h-5 w-5 animate-spin inline-block mr-1" /> Yuklanmoqda...
      </div>
    );
  }

  if (isError || !collegeData?.data) notFound();

  const college = collegeData.data;
  const users = usersData?.data ?? [];

  const stats = [
    { label: "Professor", value: college.countProfessor },
    { label: "Dotsent", value: college.countDotsent },
    { label: "PhD", value: college.countPHD },
    { label: "DSc", value: college.countDSC },
    { label: "Boshqa", value: college.countNull },
  ];

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Faculty", href: "/directory/faculty" },
    { label: college.name },
  ];

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <Breadcrumb items={breadcrumbs} />

      {/* Header va Fakultet haqida */}
      <div className="flex flex-col sm:flex-row gap-4 items-start my-4 pb-4 border-b">
        {college.imgUrl && (
          <div className="w-24 h-24 shrink-0">
            <img src={college.imgUrl} alt={college.name} className="h-full w-full object-cover" />
          </div>
        )}
        
        <div className="flex-1">
          <h1 className="text-2xl font-bold">{college.name}</h1>
          <p className="text-sm my-1 flex items-center gap-1.5">
            <Users className="h-4 w-4" /> Jami {college.countUsers} ta o'qituvchi
          </p>

          {/* Kafedralar ro'yxati - oddiy matnli ko'rinish */}
          {college.departmentList.length > 0 && (
            <div className="mt-2">
              <p className="text-xs uppercase font-bold">Kafedralar:</p>
              <p className="text-sm text-gray-600">
                {college.departmentList.map((d) => d.name).join(", ")}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Statistika - Bitta umumiy sodda hoshiya ichida */}
      <div className="flex flex-wrap gap-4 border p-4 my-4">
        {stats.map((s) => (
          <div key={s.label} className="min-w-[100px]">
            <p className="text-xs uppercase">{s.label}</p>
            <p className="text-xl font-bold">{s.value}</p>
          </div>
        ))}
      </div>

      {/* O'qituvchilar ro'yxati */}
      <div>
        <div className="flex items-center gap-2 my-4">
          <GraduationCap className="h-5 w-5" />
          <h2 className="text-lg font-bold">
            O'qituvchilar {users.length > 0 && `(${users.length})`}
          </h2>
        </div>

        {usersLoading && (
          <div className="py-6">
            <Loader2 className="h-5 w-5 animate-spin" />
          </div>
        )}

        {!usersLoading && users.length === 0 && (
          <p className="text-sm py-4">Xodimlar topilmadi.</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {users.map((u) => (
            <UserCard
              key={u.id}
              id={u.id}
              fullName={u.fullName}
              departmentName={u.departmentName ?? ""}
              lavozim={u.lavozim}
              phoneNumber={u.phoneNumber}
              imgUrl={u.imgUrl}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  return <CollegeDetail id={id} />;
}
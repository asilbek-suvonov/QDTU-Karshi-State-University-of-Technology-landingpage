"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import { GraduationCap, Loader2, Users } from "lucide-react";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { UserCard } from "@/components/user-card";
import { useGetDepartmentById } from "@/hooks/useDepartment";
import { useGetUsersByDepartment } from "@/hooks/useUser";

function DepartmentDetail({ id }: { id: string }) {
  const { data: deptData, isLoading, isError } = useGetDepartmentById(id);
  const { data: usersData, isLoading: usersLoading } = useGetUsersByDepartment(id);

  if (isLoading) {
    return (
      <div className="py-8 text-center">
        <Loader2 className="h-5 w-5 animate-spin inline-block mr-1" /> Yuklanmoqda...
      </div>
    );
  }

  if (isError || !deptData?.data) notFound();

  const dept = deptData.data;
  const users = usersData?.data ?? [];

  const stats = [
    { label: "Professor", value: dept.countProfessor },
    { label: "Dotsent", value: dept.countDotsent },
    { label: "PhD", value: dept.countPHD },
    { label: "DSc", value: dept.countDSC },
    { label: "Boshqa", value: dept.countNull },
  ];

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Directory", href: "/directory" },
    { label: dept.collegeName },
    { label: dept.name },
  ];

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <Breadcrumb items={breadcrumbs} />

      <div className="my-4">
        <h1 className="text-2xl font-bold">{dept.name}</h1>
        <p className="text-sm">{dept.collegeName}</p>
        <p className="text-sm my-1 flex items-center gap-1.5">
          <Users className="h-4 w-4" /> Jami {dept.countUsers} ta o'qituvchi
        </p>
      </div>

      {/* Statistika - Oddiy borderli qator */}
      <div className="flex flex-wrap gap-4 border p-4 my-4">
        {stats.map((s) => (
          <div key={s.label} className="min-w-[100px]">
            <p className="text-xs uppercase">{s.label}</p>
            <p className="text-xl font-bold">{s.value}</p>
          </div>
        ))}
      </div>

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
  return <DepartmentDetail id={id} />;
}
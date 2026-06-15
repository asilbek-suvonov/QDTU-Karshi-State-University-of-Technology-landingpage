"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import { GraduationCap, Loader2, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { UserCard } from "@/components/user-card";
import { useGetDepartmentById } from "@/hooks/useDepartment";
import { useGetUsersByDepartment } from "@/hooks/useUser";

function DepartmentDetail({ id }: { id: string }) {
  const { data: deptData, isLoading, isError } = useGetDepartmentById(id);
  const { data: usersData, isLoading: usersLoading } = useGetUsersByDepartment(id);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (isError || !deptData?.data) notFound();

  const dept = deptData.data;
  const users = usersData?.data ?? [];

  const stats = [
    { label: "Professor", value: dept.countProfessor, color: "text-blue-600 dark:text-blue-400" },
    { label: "Dotsent", value: dept.countDotsent, color: "text-violet-600 dark:text-violet-400" },
    { label: "PhD", value: dept.countPHD, color: "text-emerald-600 dark:text-emerald-400" },
    { label: "DSc", value: dept.countDSC, color: "text-amber-600 dark:text-amber-400" },
    { label: "Boshqa", value: dept.countNull, color: "text-muted-foreground" },
  ];

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Directory", href: "/directory" },
    { label: dept.collegeName },
    { label: dept.name },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-10">
        <Breadcrumb items={breadcrumbs} />

        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground mb-1">{dept.name}</h1>
          <p className="text-sm text-muted-foreground">{dept.collegeName}</p>
          <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1.5">
            <Users className="h-4 w-4" />
            Jami {dept.countUsers} ta o'qituvchi
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-8">
          {stats.map((s) => (
            <Card key={s.label} className="border-border bg-card">
              <CardContent className="p-4">
                <p className="text-xs text-muted-foreground">{s.label}</p>
                <p className={`text-2xl font-bold mt-0.5 ${s.color}`}>{s.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div>
          <div className="flex items-center gap-2 mb-5">
            <GraduationCap className="h-5 w-5 text-muted-foreground" />
            <h2 className="text-lg font-semibold text-foreground">
              O'qituvchilar
              {users.length > 0 && <span className="ml-2 text-sm font-normal text-muted-foreground">({users.length})</span>}
            </h2>
          </div>

          {usersLoading && (
            <div className="flex justify-center py-10">
              <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
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
    </div>
  );
}

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  return <DepartmentDetail id={id} />;
}

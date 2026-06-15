"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Loader2, Users } from "lucide-react";
import { UserCard } from "@/components/user-card";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { useGetDepartmentById } from "@/hooks/useDepartment";
import { useGetUsersByDepartment } from "@/hooks/useUser";

function DepartmentDetailContent({ id }: { id: string }) {
  const { data: deptData, isLoading, isError } = useGetDepartmentById(id);
  const { data: usersData } = useGetUsersByDepartment(id);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (isError || !deptData?.data) {
    notFound();
  }

  const dept = deptData.data;
  const users = usersData?.data ?? [];

  const stats = [
    { title: "Professors", value: dept.countProfessor },
    { title: "Docents", value: dept.countDotsent },
    { title: "PhD", value: dept.countPHD },
    { title: "DSc", value: dept.countDSC },
  ];

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Directory", href: "/directory" },
    { label: dept.collegeName, href: "#" },
    { label: dept.name },
  ];

  return (
    <div className="container mx-auto px-4 py-10 min-h-screen">
      <Breadcrumb items={breadcrumbItems} />

      <div className="mt-8 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{dept.name}</h1>
          <p className="text-muted-foreground mt-1">{dept.collegeName}</p>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Users className="h-4 w-4" />
          <span>Jami o'qituvchilar: {dept.countUsers}</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Card
              key={stat.title}
              className="bg-[#1c1c1c] border-zinc-800 shadow-none h-[90px] p-0 rounded-xl"
            >
              <CardContent className="p-4 flex flex-col justify-between h-full">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-zinc-400 font-medium">{stat.title}</p>
                  <GraduationCap className="h-4 w-4 text-zinc-500" />
                </div>
                <h3 className="text-2xl font-bold text-white mt-1">{stat.value}</h3>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {users.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-semibold text-foreground mb-5">
            O'qituvchilar ({users.length})
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {users.map((user) => (
              <UserCard
                key={user.id}
                id={user.id}
                fullName={user.fullName}
                collegeName={user.collegeName}
                departmentName={user.departmentName}
                imgUrl={user.imgUrl}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default function DepartmentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  return <DepartmentDetailContent id={id} />;
}

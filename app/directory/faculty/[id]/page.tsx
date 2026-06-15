"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Loader2, Building2 } from "lucide-react";
import { UserCard } from "@/components/user-card";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { useGetCollegeById } from "@/hooks/useCollege";
import { useGetUsersByCollege } from "@/hooks/useUser";

function FacultyDetailContent({ id }: { id: string }) {
  const { data: collegeData, isLoading, isError } = useGetCollegeById(id);
  const { data: usersData } = useGetUsersByCollege(id);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (isError || !collegeData?.data) {
    notFound();
  }

  const college = collegeData.data;
  const users = usersData?.data ?? [];

  const stats = [
    { title: "Professors", value: college.countProfessor },
    { title: "Docents", value: college.countDotsent },
    { title: "PhD", value: college.countPHD },
    { title: "DSc", value: college.countDSC },
  ];

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Directory", href: "/directory" },
    { label: "Faculties", href: "/directory/faculty" },
    { label: college.name },
  ];

  return (
    <div className="container mx-auto px-4 py-10 min-h-screen">
      <Breadcrumb items={breadcrumbItems} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 items-start">
        {/* Left Column: Image */}
        <div className="col-span-1">
          <Card className="bg-card border-border shadow-lg p-0 overflow-hidden rounded-xl">
            <CardContent className="p-0">
              <div className="h-64 w-full relative">
                {college.imgUrl ? (
                  <img
                    src={college.imgUrl}
                    alt={college.name}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="h-full w-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                    <Building2 className="h-16 w-16 text-muted-foreground" />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Statistics */}
        <div className="col-span-1 md:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-4 w-full">
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

      {/* Departments */}
      {college.departmentList.length > 0 && (
        <section className="mt-8">
          <h2 className="text-lg font-semibold mb-3">Kafedralar</h2>
          <div className="flex flex-wrap gap-2">
            {college.departmentList.map((dept) => (
              <span
                key={dept.id}
                className="text-sm px-3 py-1.5 bg-muted rounded-lg text-muted-foreground"
              >
                {dept.name}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Staff Section */}
      {users.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-semibold text-foreground mb-5">
            O'qituvchilar ({users.length})
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
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

export default function FacultyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  return <FacultyDetailContent id={id} />;
}

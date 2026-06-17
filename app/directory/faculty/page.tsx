"use client";

import Link from "next/link";
import { Building2, ArrowRight, Loader2 } from "lucide-react";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { PageHeader } from "@/components/page-header";
import { useGetAllColleges } from "@/hooks/useCollege";
import type { CollegeListItem } from "@/service/college/college.type";

const breadcrumbs = [
  { label: "Asosiy", href: "/" },
  { label: "Yo'nalishlar", href: "/directory" },
  { label: "Fakultetlar" },
];

export default function FacultyPage() {
  const { data, isLoading, isError } = useGetAllColleges();
  const colleges = data?.data ?? [];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-10">
        <Breadcrumb items={breadcrumbs} />
        <PageHeader
          eyebrow="Akademik bo'linmalar"
          title="Fakultetlar"
          count={!isLoading ? colleges.length : undefined}
          icon={Building2}
        />

        {isLoading && <div className="flex justify-center py-16"><Loader2 className="h-5 w-5 animate-spin text-muted-foreground" /></div>}
        {isError && <p className="text-center text-sm text-destructive py-10">Xatolik yuz berdi.</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {colleges.map((college: CollegeListItem) => (
            <Link
              key={college.id}
              href={`/faculties/${college.id}`}
              className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-all hover:shadow-md hover:border-primary/30"
            >
              <div className="h-44 bg-muted overflow-hidden shrink-0">
                {college.imgUrl ? (
                  <img src={college.imgUrl} alt={college.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                ) : (
                  <div className="flex h-full items-center justify-center bg-secondary">
                    <Building2 className="h-10 w-10 text-muted-foreground/25" />
                  </div>
                )}
              </div>
              <div className="flex flex-col flex-1 p-4">
                <div className="w-6 h-0.5 bg-accent mb-2" />
                <h3 className="font-bold text-sm text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-1">
                  {college.name}
                </h3>
                <p className="text-xs text-muted-foreground mb-3">{college.departmentCount} kafedra</p>
                <div className="flex items-center gap-1 text-xs font-semibold text-primary mt-auto">
                  Batafsil <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

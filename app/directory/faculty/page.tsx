"use client";

import Link from "next/link";
import { Building2, ChevronRight, Loader2, ArrowUpRight } from "lucide-react";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { useGetAllColleges } from "@/hooks/useCollege";
import type { CollegeListItem } from "@/service/college/college.type";

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Directory", href: "/directory" },
  { label: "Faculty" },
];

export default function FacultyPage() {
  const { data, isLoading, isError } = useGetAllColleges();
  const colleges = data?.data ?? [];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-10">
        <Breadcrumb items={breadcrumbs} />

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-1">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-50 dark:bg-violet-950/40">
              <Building2 className="h-5 w-5 text-violet-600 dark:text-violet-400" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">Fakultetlar</h1>
          </div>
          {colleges.length > 0 && (
            <p className="text-sm text-muted-foreground ml-[52px]">Jami {colleges.length} ta fakultet</p>
          )}
        </div>

        {isLoading && (
          <div className="flex justify-center py-20">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        )}

        {isError && (
          <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-6 text-center">
            <p className="text-sm text-destructive">Ma'lumotlarni yuklashda xatolik.</p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {colleges.map((college: CollegeListItem) => (
            <Link
              key={college.id}
              href={`/faculties/${college.id}`}
              className="group relative overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:shadow-lg hover:border-primary/30 flex flex-col"
            >
              <div className="relative h-44 w-full overflow-hidden bg-muted">
                {college.imgUrl ? (
                  <img
                    src={college.imgUrl}
                    alt={college.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <Building2 className="h-14 w-14 text-muted-foreground/30" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
              </div>

              <div className="flex flex-col flex-1 p-4">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold text-foreground leading-snug group-hover:text-primary transition-colors line-clamp-2">
                    {college.name}
                  </h3>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>

                <p className="mt-1 text-xs text-muted-foreground">{college.departmentCount} kafedra</p>

                {college.departmentNames.length > 0 && (
                  <div className="mt-3 space-y-1.5 flex-1">
                    {college.departmentNames.slice(0, 3).map((d, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <ChevronRight className="h-3 w-3 text-primary/60 shrink-0" />
                        <span className="truncate">{d}</span>
                      </div>
                    ))}
                    {college.departmentNames.length > 3 && (
                      <p className="text-xs text-muted-foreground/60 pl-4">
                        +{college.departmentNames.length - 3} ta yana
                      </p>
                    )}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

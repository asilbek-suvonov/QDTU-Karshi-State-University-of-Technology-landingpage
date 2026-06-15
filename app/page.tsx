"use client";

import Link from "next/link";
import { ArrowRight, Users, Building2, Loader2 } from "lucide-react";
import { useGetAllColleges } from "@/hooks/useCollege";
import { useAllStaff } from "@/hooks/useAllStaff";
import { UserCard } from "@/components/user-card";
import type { CollegeListItem } from "@/service/college/college.type";
import type { ResUser } from "@/service/user/user.type";

function CollegeGrid() {
  const { data, isLoading } = useGetAllColleges();
  const colleges = data?.data ?? [];

  if (isLoading)
    return (
      <div className="flex justify-center py-16">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {colleges.map((college: CollegeListItem) => (
        <Link
          key={college.id}
          href={`/faculties/${college.id}`}
          className="group relative overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:shadow-lg hover:border-primary/30"
        >
          <div className="h-40 w-full overflow-hidden bg-muted">
            {college.imgUrl ? (
              <img
                src={college.imgUrl}
                alt={college.name}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full items-center justify-center">
                <Building2 className="h-12 w-12 text-muted-foreground/40" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
          </div>

          <div className="p-4">
            <h3 className="font-semibold text-foreground leading-tight group-hover:text-primary transition-colors line-clamp-2">
              {college.name}
            </h3>
            <p className="mt-1 text-xs text-muted-foreground">
              {college.departmentCount} kafedra
            </p>
            {college.departmentNames.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1">
                {college.departmentNames.slice(0, 2).map((d, i) => (
                  <span
                    key={i}
                    className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground"
                  >
                    {d}
                  </span>
                ))}
                {college.departmentNames.length > 2 && (
                  <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                    +{college.departmentNames.length - 2}
                  </span>
                )}
              </div>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
}

function StaffPreview() {
  const { staff, isLoading } = useAllStaff();
  const preview = staff.slice(0, 8);

  if (isLoading)
    return (
      <div className="flex justify-center py-16">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {preview.map((user: ResUser) => (
        <UserCard
          key={user.id}
          id={user.id}
          fullName={user.fullName}
          departmentName={user.departmentName ?? ""}
          lavozim={user.lavozim}
          phoneNumber={user.phoneNumber}
          imgUrl={user.imgUrl}
        />
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="border-b border-border bg-gradient-to-br from-background to-muted/30 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
            Qdtu University
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground sm:text-lg">
            Bilim va kashfiyotlar markazi — ta'lim, ilm-fan va innovatsiya yo'lida.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/directory/faculty"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              <Building2 className="h-4 w-4" />
              Fakultetlar
            </Link>
            <Link
              href="/directory/staff"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
            >
              <Users className="h-4 w-4" />
              Xodimlar
            </Link>
          </div>
        </div>
      </section>

      {/* Faculties */}
      <section className="py-14">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-foreground">
                Fakultetlar
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Universitetimizning asosiy ta'lim bo'limlari
              </p>
            </div>
            <Link
              href="/directory/faculty"
              className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Barchasi <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <CollegeGrid />
        </div>
      </section>

      {/* Staff */}
      <section className="border-t border-border bg-muted/20 py-14">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-foreground">
                Xodimlar
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Bizning professor-o'qituvchilar tarkibi
              </p>
            </div>
            <Link
              href="/directory/staff"
              className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Barchasi <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <StaffPreview />
        </div>
      </section>
    </main>
  );
}

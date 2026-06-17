"use client";

import Link from "next/link";
import { Building2, Loader2, ArrowRight } from "lucide-react";
import { useGetAllColleges } from "@/hooks/useCollege";
import type { CollegeListItem } from "@/service/college/college.type";

function Skeleton() {
  return (
    <div className="animate-pulse rounded-lg border border-border bg-card overflow-hidden">
      <div className="h-48 bg-muted" />
      <div className="p-5 space-y-3">
        <div className="h-5 bg-muted rounded w-3/4" />
        <div className="h-3 bg-muted rounded w-1/4" />
        <div className="space-y-2 pt-1">
          <div className="h-3 bg-muted rounded w-full" />
          <div className="h-3 bg-muted rounded w-5/6" />
          <div className="h-3 bg-muted rounded w-4/6" />
        </div>
      </div>
    </div>
  );
}

function CollegeCard({ college }: { college: CollegeListItem }) {
  return (
    <Link
      href={`/faculties/${college.id}`}
      className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-all duration-200 hover:shadow-md hover:border-primary/40"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-muted shrink-0">
        {college.imgUrl ? (
          <img
            src={college.imgUrl}
            alt={college.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-secondary">
            <Building2 className="h-12 w-12 text-muted-foreground/30" />
          </div>
        )}
        {/* Subtle overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Dept count */}
        <div className="absolute top-3 right-3 rounded bg-card/90 backdrop-blur-sm px-2.5 py-1 text-xs font-semibold text-foreground border border-border/60">
          {college.departmentCount} kafedra
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        {/* Accent line */}
        <div className="w-8 h-0.5 bg-accent mb-3 transition-all duration-200 group-hover:w-16" />

        <h3 className="font-bold text-base text-foreground leading-snug mb-3 group-hover:text-primary transition-colors line-clamp-2">
          {college.name}
        </h3>

        {/* Departments */}
        {college.departmentNames.length > 0 && (
          <ul className="flex-1 space-y-1.5 mb-4">
            {college.departmentNames.slice(0, 4).map((dept, i) => (
              <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="h-1 w-1 rounded-full bg-accent shrink-0" />
                <span className="truncate">{dept}</span>
              </li>
            ))}
            {college.departmentNames.length > 4 && (
              <li className="text-xs text-muted-foreground/70 pl-3">
                +{college.departmentNames.length - 4} ta yana
              </li>
            )}
          </ul>
        )}

        {/* CTA */}
        <div className="flex items-center gap-1.5 text-sm font-semibold text-primary mt-auto pt-3 border-t border-border/60">
          <span>Batafsil</span>
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}

const FacultyCardsContainer = () => {
  const { data, isLoading, isError } = useGetAllColleges();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} />)}
      </div>
    );
  }

  if (isError || !data?.data?.length) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-3">
        <Building2 className="h-10 w-10 text-muted-foreground/30" />
        <p className="text-muted-foreground text-sm">
          {isError ? "Ma'lumotlarni yuklashda xatolik." : "Fakultetlar topilmadi."}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {data.data.map(college => <CollegeCard key={college.id} college={college} />)}
    </div>
  );
};

export default FacultyCardsContainer;

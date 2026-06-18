"use client";

import Link from "next/link";
import { Building2, ArrowRight } from "lucide-react";
import { useGetAllColleges } from "@/hooks/useCollege";
import type { CollegeListItem } from "@/service/college/college.type";

function Skeleton() {
  return (
    <div className="animate-pulse border border-foreground p-4 space-y-3">
      <div className="h-40 bg-neutral-100" />
      <div className="h-5 bg-neutral-100 w-3/4" />
      <div className="h-3 bg-neutral-100 w-1/4" />
      <div className="space-y-2 pt-1">
        <div className="h-3 bg-neutral-100 w-full" />
        <div className="h-3 bg-neutral-100 w-5/6" />
      </div>
    </div>
  );
}

function CollegeCard({ college }: { college: CollegeListItem }) {
  return (
    <Link
      href={`/faculties/${college.id}`}
      className="group flex flex-col border border-foreground bg-background p-4 transition-colors hover:bg-neutral-50"
    >
      {/* Image */}
      {college.imgUrl ? (
        <div className="h-40 w-full overflow-hidden bg-neutral-100 mb-3">
          <img
            src={college.imgUrl}
            alt={college.name}
            className="h-full w-full object-cover grayscale"
          />
        </div>
      ) : (
        <div className="h-40 w-full flex items-center justify-center bg-neutral-50 border border-dashed border-neutral-300 mb-3">
          <Building2 className="h-8 w-8 text-muted-foreground/40" />
        </div>
      )}

      {/* Content */}
      <div className="flex flex-col flex-1">
        <div className="flex items-baseline justify-between gap-2 mb-2">
          <h3 className="font-bold text-sm uppercase tracking-tight line-clamp-2">
            {college.name}
          </h3>
        </div>

        <p className="text-xs text-muted-foreground mb-3 font-medium">
          {college.departmentCount} ta kafedra
        </p>

        {/* Departments - Oddiy vergul bilan ajratilgan matn */}
        {college.departmentNames.length > 0 && (
          <p className="text-xs text-muted-foreground/80 line-clamp-2 flex-1 mb-4">
            {college.departmentNames.join(", ")}
          </p>
        )}

        {/* CTA */}
        <div className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider border-t border-foreground/10 pt-3 mt-auto">
          <span>Batafsil</span>
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}

const FacultyCardsContainer = () => {
  const { data, isLoading, isError } = useGetAllColleges();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} />)}
      </div>
    );
  }

  if (isError || !data?.data?.length) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-2 border border-dashed border-neutral-300">
        <p className="text-muted-foreground text-xs uppercase tracking-wider font-bold">
          {isError ? "Yuklashda xatolik yuz berdi" : "Fakultetlar topilmadi"}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {data.data.map(college => <CollegeCard key={college.id} college={college} />)}
    </div>
  );
};

export default FacultyCardsContainer;
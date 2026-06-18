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
    <div className="p-4 max-w-7xl mx-auto">
      <Breadcrumb items={breadcrumbs} />
      <PageHeader
        eyebrow="Akademik bo'linmalar"
        title="Fakultetlar"
        count={!isLoading ? colleges.length : undefined}
        icon={Building2}
      />

      {isLoading && <div className="py-8"><Loader2 className="h-5 w-5 animate-spin" /> Yuklanmoqda...</div>}
      {isError && <p className="text-sm my-4">Xatolik yuz berdi.</p>}

      <div className="space-y-4">
        {colleges.map((college: CollegeListItem) => (
          <div key={college.id} className="border-b pb-4">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              
              {/* Rasm qismi soddalashtirildi, qat'iy o'lchamlar olib tashlandi */}
              {college.imgUrl && (
                <div className="w-20 h-20 shrink-0">
                  <img src={college.imgUrl} alt={college.name} className="h-full w-full object-cover" />
                </div>
              )}
              
              <div>
                <h3 className="font-bold text-sm">
                  {college.name}
                </h3>
                <p className="text-xs my-0.5">{college.departmentCount} kafedra</p>
                <Link href={`/faculties/${college.id}`} className="underline text-xs inline-flex items-center gap-1">
                  Batafsil <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
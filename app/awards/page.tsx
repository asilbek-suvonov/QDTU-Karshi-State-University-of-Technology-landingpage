"use client";

import { useState } from "react";
import { Calendar, Download, Loader2, Trophy } from "lucide-react";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Pagination } from "@/components/ui/pagination";
import { SearchInput } from "@/components/ui/search-input";
import { PageHeader } from "@/components/page-header";
import { AuthRequired } from "@/components/auth-required";
import { useGetAllAwards } from "@/hooks/useAward";
import type { AwardData } from "@/service/award/award.type";
import axios from "axios";

const PAGE_SIZE = 10;
const breadcrumbs = [{ label: "Asosiy", href: "/" }, { label: "Mukofotlar" }];

export default function AwardsPage() {
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");

  const { data, isLoading, isError, error } = useGetAllAwards({ page, size: PAGE_SIZE });
  const is403 = axios.isAxiosError(error) && error.response?.status === 403;

  const items: AwardData[] = (data?.data?.body ?? []).filter(
    a => a.name.toLowerCase().includes(search.toLowerCase()) ||
         (a.description ?? "").toLowerCase().includes(search.toLowerCase())
  );
  const total = data?.data?.totalElements ?? 0;
  const totalPage = data?.data?.totalPage ?? 0;

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <Breadcrumb items={breadcrumbs} />
      <PageHeader eyebrow="Yutuqlar" title="Mukofotlar va Tan olinishlar" count={!is403 && total > 0 ? total : undefined} icon={Trophy} />

      {is403 ? <AuthRequired title="Mukofotlar" /> : (
        <>
          <div className="my-4">
            <SearchInput value={search} onChange={v => { setSearch(v); setPage(0); }} placeholder="Nomi yoki tavsif..." />
          </div>

          {isLoading && <div className="py-8"><Loader2 className="h-5 w-5 animate-spin" /> Yuklanmoqda...</div>}
          {isError && !is403 && <p className="text-sm my-4">Xatolik yuz berdi.</p>}
          {!isLoading && !isError && items.length === 0 && (
            <div className="py-8">
              <p className="text-sm">Mukofot topilmadi.</p>
            </div>
          )}

          <div className="space-y-4">
            {items.map((award, idx) => (
              <div key={idx} className="border-b pb-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-sm">{award.name}</h3>
                    {award.description && (
                      <p className="text-xs my-1">{award.description}</p>
                    )}
                  </div>
                  {award.fileUrl && (
                    <a href={award.fileUrl} target="_blank" rel="noopener noreferrer" download className="underline text-xs inline-flex items-center gap-1">
                      <Download className="h-3.5 w-3.5" /> Yuklab olish
                    </a>
                  )}
                </div>

                <div className="flex flex-wrap gap-3 mt-2 text-xs text-gray-600">
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="h-3 w-3" /> {award.year}-yil
                  </span>
                  <span>| {award.memberEnum}</span>
                  {award.awardEnum && (
                    <span>| {award.awardEnum.replace(/_/g, " ")}</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {!search && <Pagination page={page} totalPage={totalPage} onPageChange={setPage} className="mt-6" />}
        </>
      )}
    </div>
  );
}
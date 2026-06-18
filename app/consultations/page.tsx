"use client";

import { useState } from "react";
import { Calendar, Download, CheckCircle2, User, Loader2, MessageSquare } from "lucide-react";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Pagination } from "@/components/ui/pagination";
import { SearchInput } from "@/components/ui/search-input";
import { PageHeader } from "@/components/page-header";
import { AuthRequired } from "@/components/auth-required";
import { useGetConsultationPage } from "@/hooks/useConsultation";
import type { ConsultationData } from "@/service/consultation/consultation.type";
import axios from "axios";

const PAGE_SIZE = 10;
const breadcrumbs = [{ label: "Asosiy", href: "/" }, { label: "Maslahatlar" }];

const STATUS_LABEL: Record<string, string> = {
  COMPLETED: "Yakunlangan", IN_PROGRESS: "Davom etmoqda", FINISHED: "Tugallangan",
};

export default function ConsultationsPage() {
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");

  const { data, isLoading, isError, error } = useGetConsultationPage({ page, size: PAGE_SIZE });
  const is403 = axios.isAxiosError(error) && error.response?.status === 403;

  const items: ConsultationData[] = (data?.data?.body ?? []).filter(
    c => c.name.toLowerCase().includes(search.toLowerCase()) ||
         (c.leader ?? "").toLowerCase().includes(search.toLowerCase())
  );
  const total = data?.data?.totalElements ?? 0;
  const totalPage = data?.data?.totalPage ?? 0;

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <Breadcrumb items={breadcrumbs} />
      <PageHeader eyebrow="Ilmiy faoliyat" title="Maslahat loyihalari" count={!is403 && total > 0 ? total : undefined} icon={MessageSquare} />

      {is403 ? <AuthRequired title="Maslahat loyihalari" /> : (
        <>
          <div className="my-4">
            <SearchInput value={search} onChange={v => { setSearch(v); setPage(0); }} placeholder="Nomi yoki rahbar..." />
          </div>

          {isLoading && <div className="py-8"><Loader2 className="h-5 w-5 animate-spin" /> Yuklanmoqda...</div>}
          {isError && !is403 && <p className="text-sm my-4">Xatolik yuz berdi.</p>}
          {!isLoading && !isError && items.length === 0 && (
            <div className="py-8">
              <p className="text-sm">Maslahat topilmadi.</p>
            </div>
          )}

          <div className="space-y-4">
            {items.map(c => (
              <div key={c.id} className="border-b pb-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-sm">{c.name}</h3>
                    {c.leader && <p className="text-xs my-0.5">Rahbar: {c.leader}</p>}
                    {c.description && <p className="text-xs">{c.description}</p>}
                  </div>
                  {c.fileUrl && (
                    <a href={c.fileUrl} target="_blank" rel="noopener noreferrer" download className="underline text-xs inline-flex items-center gap-1 shrink-0">
                      <Download className="h-3.5 w-3.5" /> Yuklab olish
                    </a>
                  )}
                </div>

                <div className="flex flex-wrap gap-3 mt-2 text-xs text-gray-600">
                  <span className="inline-flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3" /> {STATUS_LABEL[c.finishedEnum] ?? c.finishedEnum}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <User className="h-3 w-3" /> {c.member ? "A'zo" : "Rahbar"}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="h-3 w-3" /> {c.year}-yil
                  </span>
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
"use client";

import { useState } from "react";
import { Calendar, Globe, Download, Loader2, BookOpen } from "lucide-react";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Pagination } from "@/components/ui/pagination";
import { SearchInput } from "@/components/ui/search-input";
import { PageHeader } from "@/components/page-header";
import { AuthRequired } from "@/components/auth-required";
import { useGetPublicationPage } from "@/hooks/usePublication";
import type { PublicationData } from "@/service/publication/publication.type";
import axios from "axios";

const PAGE_SIZE = 10;
const breadcrumbs = [{ label: "Asosiy", href: "/" }, { label: "Nashrlar" }];

const TYPE_LABEL: Record<string, string> = {
  ARTICLE: "Maqola", BOOK: "Kitob", PROCEEDING: "Proceedings", OTHERS: "Boshqa",
};

export default function PublicationsPage() {
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");

  const { data, isLoading, isError, error } = useGetPublicationPage({ page, size: PAGE_SIZE });
  const is403 = axios.isAxiosError(error) && error.response?.status === 403;

  const items: PublicationData[] = (data?.data?.body ?? []).filter(
    p => p.name.toLowerCase().includes(search.toLowerCase()) ||
         (p.institution ?? "").toLowerCase().includes(search.toLowerCase())
  );
  const total = data?.data?.totalElements ?? 0;
  const totalPage = data?.data?.totalPage ?? 0;

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <Breadcrumb items={breadcrumbs} />
      
      {/* Header */}
      <div className="my-4 pb-4 border-b">
        <p className="text-xs uppercase">Ilmiy faoliyat</p>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          Nashrlar {!is403 && total > 0 && <span className="text-sm font-normal text-muted-foreground">({total})</span>}
        </h1>
      </div>

      {is403 ? <AuthRequired title="Nashrlar" /> : (
        <>
          <div className="mb-4">
            <SearchInput value={search} onChange={v => { setSearch(v); setPage(0); }} placeholder="Nomi yoki muassasa..." />
          </div>

          {isLoading && <div className="py-8 text-center"><Loader2 className="h-5 w-5 animate-spin inline-block" /> Yuklanmoqda...</div>}
          {isError && !is403 && <p className="text-sm text-center py-4">Xatolik yuz berdi.</p>}
          {!isLoading && !isError && items.length === 0 && (
            <div className="py-8 text-center">
              <p className="text-sm text-muted-foreground">Nashr topilmadi.</p>
            </div>
          )}

          {/* Nashrlar ro'yxati - oddiy chiziqli tizim */}
          <div className="space-y-4">
            {items.map(pub => (
              <div key={pub.id} className="border-b pb-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-sm leading-snug">{pub.name}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {pub.institution}{pub.volume ? ` · Vol. ${pub.volume}` : ""}
                    </p>
                  </div>
                  {pub.fileUrl && (
                    <a href={pub.fileUrl} target="_blank" rel="noopener noreferrer" download
                      className="underline text-xs inline-flex items-center gap-1 shrink-0">
                      <Download className="h-3.5 w-3.5" /> Yuklab olish
                    </a>
                  )}
                </div>

                {/* Metama'lumotlar - oddiy matnli ko'rinishda */}
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="h-3 w-3" /> {pub.year}
                  </span>
                  <span>•</span>
                  <span className="inline-flex items-center gap-1">
                    <Globe className="h-3 w-3" /> {pub.degree}
                  </span>
                  {pub.type && (
                    <>
                      <span>•</span>
                      <span>{TYPE_LABEL[pub.type] ?? pub.type}</span>
                    </>
                  )}
                  {pub.popular && (
                    <>
                      <span>•</span>
                      <span className="font-bold uppercase tracking-wider text-xs">Popular</span>
                    </>
                  )}
                  {pub.author && (
                    <>
                      <span>•</span>
                      <span>{pub.author}</span>
                    </>
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
"use client";

import { useState } from "react";
import { Calendar, Download, Loader2, FlaskConical } from "lucide-react";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Pagination } from "@/components/ui/pagination";
import { SearchInput } from "@/components/ui/search-input";
import { PageHeader } from "@/components/page-header";
import { AuthRequired } from "@/components/auth-required";
import { useGetAllResearch } from "@/hooks/useResearch";
import type { ResearchDataItem } from "@/service/research/research.type";
import axios from "axios";

const PAGE_SIZE = 10;
const breadcrumbs = [{ label: "Asosiy", href: "/" }, { label: "Tadqiqotlar" }];

export default function ResearchPage() {
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");

  const { data, isLoading, isError, error } = useGetAllResearch({ page, size: PAGE_SIZE });
  const is403 = axios.isAxiosError(error) && error.response?.status === 403;

  const items: ResearchDataItem[] = (data?.data?.body ?? []).filter(
    r => r.name.toLowerCase().includes(search.toLowerCase()) || String(r.year).includes(search)
  );
  const total = data?.data?.totalElements ?? 0;
  const totalPage = data?.data?.totalPage ?? 0;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-10 max-w-3xl">
        <Breadcrumb items={breadcrumbs} />
        <PageHeader eyebrow="Ilmiy faoliyat" title="Tadqiqot loyihalari" count={!is403 && total > 0 ? total : undefined} icon={FlaskConical} />

        {is403 ? <AuthRequired title="Tadqiqot loyihalari" /> : (
          <>
            <div className="mb-6">
              <SearchInput value={search} onChange={v => { setSearch(v); setPage(0); }} placeholder="Nomi yoki yil bo'yicha..." />
            </div>

            {isLoading && <div className="flex justify-center py-14"><Loader2 className="h-5 w-5 animate-spin text-muted-foreground" /></div>}
            {isError && !is403 && <p className="text-center text-sm text-destructive py-10">Xatolik yuz berdi.</p>}
            {!isLoading && !isError && items.length === 0 && (
              <div className="py-14 text-center">
                <FlaskConical className="mx-auto h-8 w-8 text-muted-foreground/25 mb-3" />
                <p className="text-sm text-muted-foreground">Tadqiqot topilmadi.</p>
              </div>
            )}

            <div className="space-y-3">
              {items.map(r => (
                <div key={r.id} className="group card-academic p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                        <h3 className="font-bold text-sm text-foreground group-hover:text-primary transition-colors leading-snug">{r.name}</h3>
                      </div>
                      {r.description && <p className="text-xs text-muted-foreground line-clamp-2 pl-3.5">{r.description}</p>}
                    </div>
                    {r.fileUrl && (
                      <a href={r.fileUrl} target="_blank" rel="noopener noreferrer" download
                        className="shrink-0 flex h-8 w-8 items-center justify-center rounded border border-border text-muted-foreground hover:border-primary hover:text-primary transition-colors">
                        <Download className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3 pl-3.5">
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-muted-foreground border border-border rounded px-2 py-0.5">
                      <Calendar className="h-3 w-3" />{r.year}
                    </span>
                    <span className="text-[11px] text-muted-foreground/60">#{r.userId}</span>
                  </div>
                </div>
              ))}
            </div>

            {!search && <Pagination page={page} totalPage={totalPage} onPageChange={setPage} className="mt-8" />}
          </>
        )}
      </div>
    </div>
  );
}

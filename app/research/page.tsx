"use client";

import { useState } from "react";
import { Calendar, Download, Loader2, FlaskConical } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SearchInput } from "@/components/ui/search-input";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Pagination } from "@/components/ui/pagination";
import { AuthRequired } from "@/components/auth-required";
import { useGetAllResearch } from "@/hooks/useResearch";
import type { ResearchDataItem } from "@/service/research/research.type";
import axios from "axios";

const PAGE_SIZE = 10;
const breadcrumbs = [{ label: "Home", href: "/" }, { label: "Research" }];

export default function ResearchPage() {
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");

  const { data, isLoading, isError, error } = useGetAllResearch({ page, size: PAGE_SIZE });
  const is403 = axios.isAxiosError(error) && error.response?.status === 403;

  const items: ResearchDataItem[] = (data?.data?.body ?? []).filter(
    (r) => r.name.toLowerCase().includes(search.toLowerCase()) || String(r.year).includes(search)
  );
  const totalPage = data?.data?.totalPage ?? 0;
  const totalElements = data?.data?.totalElements ?? 0;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-10 max-w-3xl">
        <Breadcrumb items={breadcrumbs} />

        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 dark:bg-blue-500/20">
            <FlaskConical className="h-5 w-5 text-blue-500" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">Tadqiqot loyihalari</h1>
            {!is403 && totalElements > 0 && (
              <p className="text-xs text-muted-foreground">Jami {totalElements} ta</p>
            )}
          </div>
        </div>

        {is403 ? <AuthRequired title="Tadqiqot loyihalari" /> : (
          <>
            <div className="mb-5">
              <SearchInput value={search} onChange={(v) => { setSearch(v); setPage(0); }} placeholder="Nomi yoki yil bo'yicha..." />
            </div>

            {isLoading && <div className="flex justify-center py-16"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>}
            {isError && !is403 && <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-5 text-center text-sm text-destructive">Xatolik yuz berdi.</div>}
            {!isLoading && !isError && items.length === 0 && (
              <div className="py-16 text-center">
                <FlaskConical className="mx-auto h-10 w-10 text-muted-foreground/20 mb-3" />
                <p className="text-sm text-muted-foreground">Tadqiqot topilmadi.</p>
              </div>
            )}

            <div className="space-y-3">
              {items.map((r) => (
                <div key={r.id} className="group rounded-xl border border-border/60 bg-card/80 backdrop-blur-sm shadow-sm p-5 transition-all hover:border-blue-500/30 hover:shadow-md hover:bg-card">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-medium text-foreground leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{r.name}</h3>
                    {r.fileUrl && (
                      <a href={r.fileUrl} target="_blank" rel="noopener noreferrer" download
                        className="shrink-0 flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50 text-blue-500 hover:bg-blue-100 dark:bg-blue-950/40 dark:text-blue-400 dark:hover:bg-blue-950/60 transition-colors">
                        <Download className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </div>
                  {r.description && <p className="mt-2 text-xs text-muted-foreground line-clamp-2">{r.description}</p>}
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Badge className="gap-1 text-[11px] px-2 py-0 h-5 rounded-full bg-red-500/10 text-red-600 border-red-200 dark:bg-red-500/20 dark:text-red-400 dark:border-red-900/50">
                      <Calendar className="h-3 w-3" />{r.year}
                    </Badge>
                    <Badge className="text-[11px] px-2 py-0 h-5 rounded-full bg-muted text-muted-foreground border-border">
                      #{r.userId}
                    </Badge>
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

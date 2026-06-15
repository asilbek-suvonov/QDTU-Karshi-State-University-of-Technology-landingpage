"use client";

import { useState } from "react";
import { Calendar, Download, CheckCircle2, User, Loader2, MessageSquare } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SearchInput } from "@/components/ui/search-input";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Pagination } from "@/components/ui/pagination";
import { AuthRequired } from "@/components/auth-required";
import { useGetConsultationPage } from "@/hooks/useConsultation";
import type { ConsultationData } from "@/service/consultation/consultation.type";
import axios from "axios";

const PAGE_SIZE = 10;
const breadcrumbs = [{ label: "Home", href: "/" }, { label: "Consultations" }];

const STATUS_STYLE: Record<string, string> = {
  COMPLETED:   "bg-emerald-500/10 text-emerald-600 border-emerald-200 dark:bg-emerald-500/20 dark:text-emerald-400 dark:border-emerald-900/50",
  IN_PROGRESS: "bg-blue-500/10 text-blue-600 border-blue-200 dark:bg-blue-500/20 dark:text-blue-400 dark:border-blue-900/50",
  FINISHED:    "bg-muted text-muted-foreground border-border",
};

export default function ConsultationsPage() {
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");

  const { data, isLoading, isError, error } = useGetConsultationPage({ page, size: PAGE_SIZE });
  const is403 = axios.isAxiosError(error) && error.response?.status === 403;

  const items: ConsultationData[] = (data?.data?.body ?? []).filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      (c.leader ?? "").toLowerCase().includes(search.toLowerCase())
  );
  const totalPage = data?.data?.totalPage ?? 0;
  const totalElements = data?.data?.totalElements ?? 0;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-10 max-w-3xl">
        <Breadcrumb items={breadcrumbs} />

        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-500/10 dark:bg-violet-500/20">
            <MessageSquare className="h-5 w-5 text-violet-500" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">Maslahatlar</h1>
            {!is403 && totalElements > 0 && (
              <p className="text-xs text-muted-foreground">Jami {totalElements} ta</p>
            )}
          </div>
        </div>

        {is403 ? <AuthRequired title="Maslahat loyihalari" /> : (
          <>
            <div className="mb-5">
              <SearchInput
                value={search}
                onChange={(v) => { setSearch(v); setPage(0); }}
                placeholder="Nomi yoki rahbar bo'yicha..."
              />
            </div>

            {isLoading && (
              <div className="flex justify-center py-16">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
            )}
            {isError && !is403 && (
              <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-5 text-center text-sm text-destructive">
                Xatolik yuz berdi.
              </div>
            )}
            {!isLoading && !isError && items.length === 0 && (
              <div className="py-16 text-center">
                <MessageSquare className="mx-auto h-10 w-10 text-muted-foreground/20 mb-3" />
                <p className="text-sm text-muted-foreground">Maslahat topilmadi.</p>
              </div>
            )}

            <div className="space-y-3">
              {items.map((c) => (
                <div
                  key={c.id}
                  className="group rounded-xl border border-border/60 bg-card/80 shadow-sm p-5 transition-all hover:border-violet-500/30 hover:shadow-md hover:bg-card"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="font-medium text-foreground leading-snug group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                        {c.name}
                      </h3>
                      {c.leader && (
                        <p className="mt-0.5 text-xs text-muted-foreground">Rahbar: {c.leader}</p>
                      )}
                      {c.description && (
                        <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{c.description}</p>
                      )}
                    </div>
                    {c.fileUrl && (
                      <a
                        href={c.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        download
                        className="shrink-0 flex h-7 w-7 items-center justify-center rounded-lg bg-violet-50 text-violet-500 hover:bg-violet-100 dark:bg-violet-950/40 dark:text-violet-400 dark:hover:bg-violet-950/60 transition-colors"
                      >
                        <Download className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </div>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    <Badge
                      className={`gap-1 text-[11px] px-2 py-0 h-5 rounded-full ${STATUS_STYLE[c.finishedEnum] ?? STATUS_STYLE.FINISHED}`}
                    >
                      <CheckCircle2 className="h-3 w-3" />{c.finishedEnum}
                    </Badge>
                    <Badge className="gap-1 text-[11px] px-2 py-0 h-5 rounded-full bg-slate-500/10 text-slate-600 border-slate-200 dark:bg-slate-500/20 dark:text-slate-400 dark:border-slate-800">
                      <User className="h-3 w-3" />{c.member ? "A'zo" : "Rahbar"}
                    </Badge>
                    <Badge className="gap-1 text-[11px] px-2 py-0 h-5 rounded-full bg-red-500/10 text-red-600 border-red-200 dark:bg-red-500/20 dark:text-red-400 dark:border-red-900/50">
                      <Calendar className="h-3 w-3" />{c.year}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>

            {!search && (
              <Pagination page={page} totalPage={totalPage} onPageChange={setPage} className="mt-8" />
            )}
          </>
        )}
      </div>
    </div>
  );
}

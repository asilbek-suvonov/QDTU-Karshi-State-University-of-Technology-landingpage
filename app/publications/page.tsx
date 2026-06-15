"use client";

import { useState } from "react";
import { Calendar, Globe, Download, Loader2, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SearchInput } from "@/components/ui/search-input";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Pagination } from "@/components/ui/pagination";
import { AuthRequired } from "@/components/auth-required";
import { useGetPublicationPage } from "@/hooks/usePublication";
import type { PublicationData } from "@/service/publication/publication.type";
import axios from "axios";

const PAGE_SIZE = 10;
const breadcrumbs = [{ label: "Home", href: "/" }, { label: "Publications" }];

const TYPE_STYLE: Record<string, string> = {
  ARTICLE:   "bg-blue-500/10 text-blue-600 border-blue-200 dark:bg-blue-500/20 dark:text-blue-400 dark:border-blue-900/50",
  BOOK:      "bg-emerald-500/10 text-emerald-600 border-emerald-200 dark:bg-emerald-500/20 dark:text-emerald-400 dark:border-emerald-900/50",
  PROCEEDING:"bg-purple-500/10 text-purple-600 border-purple-200 dark:bg-purple-500/20 dark:text-purple-400 dark:border-purple-900/50",
  OTHERS:    "bg-muted text-muted-foreground border-border",
};

export default function PublicationsPage() {
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");

  const { data, isLoading, isError, error } = useGetPublicationPage({ page, size: PAGE_SIZE });
  const is403 = axios.isAxiosError(error) && error.response?.status === 403;

  const items: PublicationData[] = (data?.data?.body ?? []).filter(
    (p) => p.name.toLowerCase().includes(search.toLowerCase()) || (p.institution ?? "").toLowerCase().includes(search.toLowerCase())
  );
  const totalPage = data?.data?.totalPage ?? 0;
  const totalElements = data?.data?.totalElements ?? 0;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-10 max-w-3xl">
        <Breadcrumb items={breadcrumbs} />

        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 dark:bg-emerald-500/20">
            <BookOpen className="h-5 w-5 text-emerald-500" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">Nashrlar</h1>
            {!is403 && totalElements > 0 && <p className="text-xs text-muted-foreground">Jami {totalElements} ta</p>}
          </div>
        </div>

        {is403 ? <AuthRequired title="Nashrlar" /> : (
          <>
            <div className="mb-5">
              <SearchInput value={search} onChange={(v) => { setSearch(v); setPage(0); }} placeholder="Nomi yoki muassasa..." />
            </div>

            {isLoading && <div className="flex justify-center py-16"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>}
            {isError && !is403 && <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-5 text-center text-sm text-destructive">Xatolik yuz berdi.</div>}
            {!isLoading && !isError && items.length === 0 && (
              <div className="py-16 text-center">
                <BookOpen className="mx-auto h-10 w-10 text-muted-foreground/20 mb-3" />
                <p className="text-sm text-muted-foreground">Nashr topilmadi.</p>
              </div>
            )}

            <div className="space-y-3">
              {items.map((pub) => (
                <div key={pub.id} className="group rounded-xl border border-border/60 bg-card/80 shadow-sm p-5 transition-all hover:border-emerald-500/30 hover:shadow-md hover:bg-card">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="font-medium text-foreground leading-snug group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">{pub.name}</h3>
                      <p className="mt-0.5 text-xs text-muted-foreground truncate">{pub.institution}{pub.volume ? ` · Vol. ${pub.volume}` : ""}</p>
                    </div>
                    {pub.fileUrl && (
                      <a href={pub.fileUrl} target="_blank" rel="noopener noreferrer" download
                        className="shrink-0 flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50 text-emerald-500 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-400 dark:hover:bg-emerald-950/60 transition-colors">
                        <Download className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </div>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    <Badge className="gap-1 text-[11px] px-2 py-0 h-5 rounded-full bg-red-500/10 text-red-600 border-red-200 dark:bg-red-500/20 dark:text-red-400 dark:border-red-900/50">
                      <Calendar className="h-3 w-3" />{pub.year}
                    </Badge>
                    <Badge className="gap-1 text-[11px] px-2 py-0 h-5 rounded-full bg-sky-500/10 text-sky-600 border-sky-200 dark:bg-sky-500/20 dark:text-sky-400 dark:border-sky-900/50">
                      <Globe className="h-3 w-3" />{pub.degree}
                    </Badge>
                    {pub.type && (
                      <Badge className={`text-[11px] px-2 py-0 h-5 rounded-full ${TYPE_STYLE[pub.type] ?? TYPE_STYLE.OTHERS}`}>
                        {pub.type}
                      </Badge>
                    )}
                    {pub.popular && (
                      <Badge className="text-[11px] px-2 py-0 h-5 rounded-full bg-amber-500/10 text-amber-600 border-amber-200 dark:bg-amber-500/20 dark:text-amber-400 dark:border-amber-900/50">
                        ★ Popular
                      </Badge>
                    )}
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

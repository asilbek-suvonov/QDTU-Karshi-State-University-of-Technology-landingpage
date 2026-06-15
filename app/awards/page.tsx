"use client";

import { useState } from "react";
import { Calendar, Download, Loader2, Trophy } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SearchInput } from "@/components/ui/search-input";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Pagination } from "@/components/ui/pagination";
import { AuthRequired } from "@/components/auth-required";
import { useGetAllAwards } from "@/hooks/useAward";
import type { AwardData } from "@/service/award/award.type";
import axios from "axios";

const PAGE_SIZE = 10;
const breadcrumbs = [{ label: "Home", href: "/" }, { label: "Awards" }];

const MEMBER_STYLE: Record<string, string> = {
  MILLIY:   "bg-blue-500/10 text-blue-600 border-blue-200 dark:bg-blue-500/20 dark:text-blue-400 dark:border-blue-900/50",
  XALQARO:  "bg-violet-500/10 text-violet-600 border-violet-200 dark:bg-violet-500/20 dark:text-violet-400 dark:border-violet-900/50",
};

export default function AwardsPage() {
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");

  const { data, isLoading, isError, error } = useGetAllAwards({ page, size: PAGE_SIZE });
  const is403 = axios.isAxiosError(error) && error.response?.status === 403;

  const items: AwardData[] = (data?.data?.body ?? []).filter(
    (a) => a.name.toLowerCase().includes(search.toLowerCase()) || (a.description ?? "").toLowerCase().includes(search.toLowerCase())
  );
  const totalPage = data?.data?.totalPage ?? 0;
  const totalElements = data?.data?.totalElements ?? 0;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-10 max-w-3xl">
        <Breadcrumb items={breadcrumbs} />

        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10 dark:bg-amber-500/20">
            <Trophy className="h-5 w-5 text-amber-500" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">Mukofotlar</h1>
            {!is403 && totalElements > 0 && <p className="text-xs text-muted-foreground">Jami {totalElements} ta</p>}
          </div>
        </div>

        {is403 ? <AuthRequired title="Mukofotlar" /> : (
          <>
            <div className="mb-5">
              <SearchInput value={search} onChange={(v) => { setSearch(v); setPage(0); }} placeholder="Nomi yoki tavsif..." />
            </div>

            {isLoading && <div className="flex justify-center py-16"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>}
            {isError && !is403 && <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-5 text-center text-sm text-destructive">Xatolik yuz berdi.</div>}
            {!isLoading && !isError && items.length === 0 && (
              <div className="py-16 text-center">
                <Trophy className="mx-auto h-10 w-10 text-muted-foreground/20 mb-3" />
                <p className="text-sm text-muted-foreground">Mukofot topilmadi.</p>
              </div>
            )}

            <div className="space-y-3">
              {items.map((award, idx) => (
                <div key={idx} className="group rounded-xl border border-border/60 bg-card/80 shadow-sm p-5 transition-all hover:border-amber-500/30 hover:shadow-md hover:bg-card">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="font-medium text-foreground leading-snug group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">{award.name}</h3>
                      {award.description && <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{award.description}</p>}
                    </div>
                    {award.fileUrl && (
                      <a href={award.fileUrl} target="_blank" rel="noopener noreferrer" download
                        className="shrink-0 flex h-7 w-7 items-center justify-center rounded-lg bg-amber-50 text-amber-500 hover:bg-amber-100 dark:bg-amber-950/40 dark:text-amber-400 dark:hover:bg-amber-950/60 transition-colors">
                        <Download className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </div>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    <Badge className="gap-1 text-[11px] px-2 py-0 h-5 rounded-full bg-red-500/10 text-red-600 border-red-200 dark:bg-red-500/20 dark:text-red-400 dark:border-red-900/50">
                      <Calendar className="h-3 w-3" />{award.year}
                    </Badge>
                    <Badge className={`text-[11px] px-2 py-0 h-5 rounded-full ${MEMBER_STYLE[award.memberEnum] ?? MEMBER_STYLE.MILLIY}`}>
                      {award.memberEnum}
                    </Badge>
                    {award.awardEnum && (
                      <Badge className="text-[11px] px-2 py-0 h-5 rounded-full bg-purple-500/10 text-purple-600 border-purple-200 dark:bg-purple-500/20 dark:text-purple-400 dark:border-purple-900/50">
                        {award.awardEnum.replace(/_/g, " ")}
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

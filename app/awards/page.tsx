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
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-10 max-w-3xl">
        <Breadcrumb items={breadcrumbs} />
        <PageHeader eyebrow="Yutuqlar" title="Mukofotlar va Tan olinishlar" count={!is403 && total > 0 ? total : undefined} icon={Trophy} />

        {is403 ? <AuthRequired title="Mukofotlar" /> : (
          <>
            <div className="mb-6">
              <SearchInput value={search} onChange={v => { setSearch(v); setPage(0); }} placeholder="Nomi yoki tavsif..." />
            </div>

            {isLoading && <div className="flex justify-center py-14"><Loader2 className="h-5 w-5 animate-spin text-muted-foreground" /></div>}
            {isError && !is403 && <p className="text-center text-sm text-destructive py-10">Xatolik yuz berdi.</p>}
            {!isLoading && !isError && items.length === 0 && (
              <div className="py-14 text-center">
                <Trophy className="mx-auto h-8 w-8 text-muted-foreground/25 mb-3" />
                <p className="text-sm text-muted-foreground">Mukofot topilmadi.</p>
              </div>
            )}

            <div className="space-y-3">
              {items.map((award, idx) => (
                <div key={idx} className="group card-academic p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start gap-2 mb-1">
                        <span className="mt-1.5 inline-block w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                        <h3 className="font-bold text-sm text-foreground group-hover:text-primary transition-colors">{award.name}</h3>
                      </div>
                      {award.description && (
                        <p className="text-xs text-muted-foreground line-clamp-2 pl-3.5">{award.description}</p>
                      )}
                    </div>
                    {award.fileUrl && (
                      <a href={award.fileUrl} target="_blank" rel="noopener noreferrer" download
                        className="shrink-0 flex h-8 w-8 items-center justify-center rounded border border-border text-muted-foreground hover:border-primary hover:text-primary transition-colors">
                        <Download className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2 mt-3 pl-3.5">
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold border border-border rounded px-2 py-0.5 text-muted-foreground">
                      <Calendar className="h-3 w-3" />{award.year}
                    </span>
                    <span className="text-[11px] font-semibold bg-secondary text-foreground rounded px-2 py-0.5">
                      {award.memberEnum}
                    </span>
                    {award.awardEnum && (
                      <span className="text-[11px] text-muted-foreground/70 bg-secondary rounded px-2 py-0.5">
                        {award.awardEnum.replace(/_/g, " ")}
                      </span>
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

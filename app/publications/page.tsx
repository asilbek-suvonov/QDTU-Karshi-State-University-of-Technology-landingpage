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
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-10 max-w-3xl">
        <Breadcrumb items={breadcrumbs} />
        <PageHeader eyebrow="Ilmiy faoliyat" title="Nashrlar" count={!is403 && total > 0 ? total : undefined} icon={BookOpen} />

        {is403 ? <AuthRequired title="Nashrlar" /> : (
          <>
            <div className="mb-6">
              <SearchInput value={search} onChange={v => { setSearch(v); setPage(0); }} placeholder="Nomi yoki muassasa..." />
            </div>

            {isLoading && <div className="flex justify-center py-14"><Loader2 className="h-5 w-5 animate-spin text-muted-foreground" /></div>}
            {isError && !is403 && <p className="text-center text-sm text-destructive py-10">Xatolik yuz berdi.</p>}
            {!isLoading && !isError && items.length === 0 && (
              <div className="py-14 text-center">
                <BookOpen className="mx-auto h-8 w-8 text-muted-foreground/25 mb-3" />
                <p className="text-sm text-muted-foreground">Nashr topilmadi.</p>
              </div>
            )}

            <div className="space-y-3">
              {items.map(pub => (
                <div key={pub.id} className="group card-academic p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start gap-2 mb-1">
                        <span className="mt-1.5 inline-block w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                        <h3 className="font-bold text-sm text-foreground group-hover:text-primary transition-colors leading-snug">{pub.name}</h3>
                      </div>
                      <p className="text-xs text-muted-foreground pl-3.5 truncate">
                        {pub.institution}{pub.volume ? ` · Vol. ${pub.volume}` : ""}
                      </p>
                    </div>
                    {pub.fileUrl && (
                      <a href={pub.fileUrl} target="_blank" rel="noopener noreferrer" download
                        className="shrink-0 flex h-8 w-8 items-center justify-center rounded border border-border text-muted-foreground hover:border-primary hover:text-primary transition-colors">
                        <Download className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-2 mt-3 pl-3.5">
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold border border-border rounded px-2 py-0.5 text-muted-foreground">
                      <Calendar className="h-3 w-3" />{pub.year}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold border border-border rounded px-2 py-0.5 text-muted-foreground">
                      <Globe className="h-3 w-3" />{pub.degree}
                    </span>
                    {pub.type && (
                      <span className="text-[11px] font-semibold bg-secondary text-foreground rounded px-2 py-0.5">
                        {TYPE_LABEL[pub.type] ?? pub.type}
                      </span>
                    )}
                    {pub.popular && (
                      <span className="text-[11px] font-bold text-[#8B6914] dark:text-[#E6CA9F] bg-accent/20 rounded px-2 py-0.5">
                        Popular
                      </span>
                    )}
                    <span className="text-[11px] text-muted-foreground/50">{pub.author}</span>
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

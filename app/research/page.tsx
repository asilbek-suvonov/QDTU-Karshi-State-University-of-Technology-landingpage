"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { SearchInput } from "@/components/ui/search-input";
import { Calendar, ExternalLink, FileText, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGetAllResearch } from "@/hooks/useResearch";
import type { ResearchDataItem } from "@/service/research/research.type";
import Link from "next/link";

export default function ResearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const { data, isLoading, isError } = useGetAllResearch();

  const filteredResearch = (data?.data ?? []).filter(
    (r: ResearchDataItem) =>
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      String(r.year).includes(searchQuery)
  );

  return (
    <div className="min-h-screen bg-[#f8f9fa] dark:bg-zinc-950 p-4 md:p-8 transition-colors duration-200">
      <div className="w-full max-w-5xl mx-auto space-y-8">
        <h1 className="text-3xl font-normal text-black dark:text-white tracking-tight text-center">
          Research Projects
        </h1>

        <div className="w-full flex justify-center">
          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search by project name..."
          />
        </div>

        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        )}

        {isError && (
          <div className="flex justify-center items-center py-20">
            <p className="text-slate-500">
              Ma'lumotlarni yuklashda xatolik yuz berdi.
            </p>
          </div>
        )}

        {!isLoading && !isError && filteredResearch.length === 0 && (
          <div className="flex justify-center items-center py-20">
            <p className="text-slate-500">Tadqiqot loyihalari topilmadi.</p>
          </div>
        )}

        <div className="flex flex-col gap-8">
          {filteredResearch.map((research: ResearchDataItem) => (
            <div
              key={research.id}
              className="border-b border-slate-200 dark:border-zinc-800 pb-8 last:border-none"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <h2 className="text-sm font-normal text-slate-400 dark:text-zinc-500 uppercase tracking-widest">
                  User #{research.userId}
                </h2>
                <Link href={`/directory/staff/${research.userId}`}>
                  <Button
                    variant="outline"
                    className="border border-black dark:border-white text-black dark:text-white hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black rounded-md px-3.5 py-2 text-xs font-normal"
                  >
                    View Full Profile
                  </Button>
                </Link>
              </div>

              <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm transition-all hover:shadow-md">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-normal text-slate-900 dark:text-white text-base md:text-lg leading-snug">
                    {research.name}
                  </h3>
                  <div className="flex items-center gap-2 text-slate-400 dark:text-zinc-500 shrink-0">
                    {research.fileUrl && (
                      <a
                        href={research.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FileText className="w-4 h-4 hover:text-black dark:hover:text-white transition-colors" />
                      </a>
                    )}
                    <ExternalLink className="w-4 h-4" />
                  </div>
                </div>

                {research.description && (
                  <p className="text-xs font-normal text-slate-400 dark:text-zinc-500 mt-1 mb-3">
                    {research.description}
                  </p>
                )}

                <div className="flex flex-wrap gap-2 mt-3">
                  <Badge
                    variant="outline"
                    className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-normal bg-red-50 text-red-600 dark:bg-red-950/30 dark:text-red-400 border-red-100 dark:border-red-900"
                  >
                    <Calendar className="w-3.5 h-3.5" /> {research.year}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { SearchInput } from "@/components/ui/search-input";
import { Calendar, FileText, Globe, Loader2 } from "lucide-react";
import { useGetPublicationPage } from "@/hooks/usePublication";
import type { PublicationData } from "@/service/publication/publication.type";

export default function PublicationsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const { data, isLoading, isError } = useGetPublicationPage({ size: 50 });

  const filteredPublications = (data?.data?.body ?? []).filter(
    (p: PublicationData) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.institution.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#f8f9fa] dark:bg-zinc-950 p-4 md:p-8 transition-colors duration-200">
      <div className="w-full max-w-5xl mx-auto space-y-8">
        <h1 className="text-3xl font-normal text-black dark:text-white tracking-tight text-center">
          Academic Publications
        </h1>

        <div className="w-full flex justify-center">
          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search by publication title or institution..."
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

        {!isLoading && !isError && filteredPublications.length === 0 && (
          <div className="flex justify-center items-center py-20">
            <p className="text-slate-500">Nashrlar topilmadi.</p>
          </div>
        )}

        <div className="flex flex-col gap-8">
          {filteredPublications.map((pub: PublicationData) => (
            <div
              key={pub.id}
              className="border-b border-slate-200 dark:border-zinc-800 pb-8 last:border-none"
            >
              <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
                <h3 className="font-normal text-slate-900 dark:text-white text-base md:text-lg leading-snug">
                  {pub.name}
                </h3>
                <p className="text-xs font-normal text-slate-400 dark:text-zinc-500 mt-1 mb-3">
                  {pub.institution}
                  {pub.volume ? ` · Vol. ${pub.volume}` : ""}
                </p>

                <div className="flex flex-wrap gap-2 mt-3">
                  <Badge
                    variant="outline"
                    className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-normal bg-red-50 text-red-600 dark:bg-red-950/30 dark:text-red-400 border-red-100 dark:border-red-900"
                  >
                    <Calendar className="w-3.5 h-3.5" /> {pub.year}
                  </Badge>
                  <Badge
                    variant="outline"
                    className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-normal bg-blue-50 text-blue-600 dark:bg-blue-950/30 dark:text-blue-400 border-blue-100 dark:border-blue-900"
                  >
                    <Globe className="w-3.5 h-3.5" /> {pub.degree}
                  </Badge>
                  <Badge
                    variant="outline"
                    className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-normal bg-purple-50 text-purple-600 dark:bg-purple-950/30 dark:text-purple-400 border-purple-100 dark:border-purple-900"
                  >
                    <FileText className="w-3.5 h-3.5" /> {pub.author}
                  </Badge>
                  {pub.type && (
                    <Badge
                      variant="outline"
                      className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-normal bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400 border-emerald-100 dark:border-emerald-900"
                    >
                      {pub.type}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

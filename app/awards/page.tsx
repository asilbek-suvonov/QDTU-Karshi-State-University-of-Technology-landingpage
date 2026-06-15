"use client";

import { useState } from "react";
import { /*  */Badge } from "@/components/ui/badge";
import { SearchInput } from "@/components/ui/search-input";
import { Calendar, Building, Info, Loader2, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGetAllAwards } from "@/hooks/useAward";
import type { AwardData } from "@/service/award/award.type";
import Link from "next/link";

export default function AwardsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const { data, isLoading, isError } = useGetAllAwards();

  const filteredAwards = (data?.data ?? []).filter(
    (a: AwardData) =>
      a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#f8f9fa] dark:bg-zinc-950 p-4 md:p-8 transition-colors duration-200">
      <div className="w-full max-w-5xl mx-auto space-y-8">
        <h1 className="text-3xl font-normal text-black dark:text-white tracking-tight text-center">
          Awards & Recognitions
        </h1>

        <div className="w-full flex justify-center">
          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search by name or award..."
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

        {!isLoading && !isError && filteredAwards.length === 0 && (
          <div className="flex justify-center items-center py-20">
            <p className="text-center text-slate-500">No awards found.</p>
          </div>
        )}

        <div className="flex flex-col gap-8">
          {filteredAwards.map((award: AwardData, index: number) => (
            <div
              key={index}
              className="border-b border-slate-200 dark:border-zinc-800 pb-8 last:border-none"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-4">
                  <div className="flex flex-col">
                    <span className="text-xs font-normal text-slate-500 dark:text-zinc-400 uppercase tracking-wider">
                      User #{award.userId}
                    </span>
                  </div>
                </div>

                <Link href={`/directory/staff/${award.userId}`}>
                  <Button
                    variant="outline"
                    className="border border-black dark:border-white text-black dark:text-white hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black rounded-md px-3.5 py-2 text-xs font-normal"
                  >
                    <Info className="w-3.5 h-3.5 mr-2" /> View Full Profile
                  </Button>
                </Link>
              </div>

              <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
                <h3 className="font-normal text-slate-900 dark:text-white text-base leading-snug">
                  {award.name}
                </h3>
                <p className="text-xs font-normal text-slate-400 dark:text-zinc-500 mt-1 mb-3">
                  {award.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  <Badge className="font-normal flex items-center gap-1.5 bg-red-50 text-red-600 dark:bg-red-950/30 dark:text-red-400 border-red-100 dark:border-red-900">
                    <Calendar className="w-3.5 h-3.5" /> {award.year}
                  </Badge>
                  <Badge className="font-normal flex items-center gap-1.5 bg-blue-50 text-blue-600 dark:bg-blue-950/30 dark:text-blue-400 border-blue-100 dark:border-blue-900">
                    <Building className="w-3.5 h-3.5" /> {award.memberEnum}
                  </Badge>
                  {award.awardEnum && (
                    <Badge className="font-normal flex items-center gap-1.5 bg-purple-50 text-purple-600 dark:bg-purple-950/30 dark:text-purple-400 border-purple-100 dark:border-purple-900">
                      {award.awardEnum}
                    </Badge>
                  )}
                  {award.fileUrl && (
                    <a href={award.fileUrl} target="_blank" rel="noopener noreferrer">
                      <Badge className="font-normal flex items-center gap-1.5 bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400 border-emerald-100 dark:border-emerald-900 cursor-pointer hover:opacity-80">
                        <FileText className="w-3.5 h-3.5" /> Fayl
                      </Badge>
                    </a>
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

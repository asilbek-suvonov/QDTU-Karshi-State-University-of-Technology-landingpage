"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { SearchInput } from "@/components/ui/search-input";
import { CheckCircle2, User, Info, Loader2, Calendar, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGetConsultationPage } from "@/hooks/useConsultation";
import type { ConsultationData } from "@/service/consultation/consultation.type";
import Link from "next/link";

export default function ConsultationsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const { data, isLoading, isError } = useGetConsultationPage({ size: 50 });

  const filteredConsultations = (data?.data?.body ?? []).filter(
    (c: ConsultationData) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.leader.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#f8f9fa] dark:bg-zinc-950 p-4 md:p-8 transition-colors duration-200">
      <div className="w-full max-w-5xl mx-auto space-y-8">
        <h1 className="text-3xl font-normal text-black dark:text-white tracking-tight text-center">
          Consultations
        </h1>

        <div className="w-full flex justify-center">
          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search by project or leader..."
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

        {!isLoading && !isError && filteredConsultations.length === 0 && (
          <div className="flex justify-center items-center py-20">
            <p className="text-slate-500">Maslahat loyihalari topilmadi.</p>
          </div>
        )}

        <div className="flex flex-col gap-8">
          {filteredConsultations.map((consultation: ConsultationData) => (
            <div
              key={consultation.id}
              className="border-b border-slate-200 dark:border-zinc-800 pb-8 last:border-none"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-4">
                  <div className="flex flex-col">
                    <span className="text-base font-normal text-black dark:text-white tracking-tight">
                      {consultation.leader}
                    </span>
                    <span className="text-xs font-normal text-slate-500 dark:text-zinc-400 uppercase tracking-wider">
                      User #{consultation.userId}
                    </span>
                  </div>
                </div>

                <Link href={`/directory/staff/${consultation.userId}`}>
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
                  {consultation.name}
                </h3>
                {consultation.description && (
                  <p className="text-xs font-normal text-slate-400 dark:text-zinc-500 mt-1 mb-3">
                    {consultation.description}
                  </p>
                )}

                <div className="flex flex-wrap gap-2 mt-3">
                  <Badge className="font-normal flex items-center gap-1.5 bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400 border-emerald-100 dark:border-emerald-900">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {consultation.finishedEnum}
                  </Badge>
                  <Badge className="font-normal flex items-center gap-1.5 bg-blue-50 text-blue-600 dark:bg-blue-950/30 dark:text-blue-400 border-blue-100 dark:border-blue-900">
                    <User className="w-3.5 h-3.5" />
                    {consultation.member ? "A'zo" : "Rahbar"}
                  </Badge>
                  <Badge className="font-normal flex items-center gap-1.5 bg-red-50 text-red-600 dark:bg-red-950/30 dark:text-red-400 border-red-100 dark:border-red-900">
                    <Calendar className="w-3.5 h-3.5" />
                    {consultation.year}
                  </Badge>
                  {consultation.fileUrl && (
                    <a href={consultation.fileUrl} target="_blank" rel="noopener noreferrer">
                      <Badge className="font-normal flex items-center gap-1.5 bg-purple-50 text-purple-600 dark:bg-purple-950/30 dark:text-purple-400 border-purple-100 dark:border-purple-900 cursor-pointer hover:opacity-80">
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

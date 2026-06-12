"use client"

import { useState } from "react"
import { researchData } from "@/lib/research-data"
import { Badge } from "@/components/ui/badge"
import { SearchInput } from "@/components/ui/search-input"
import { 
  Calendar, 
  CheckCircle2, 
  Globe, 
  BarChart3, 
  ExternalLink, 
  FileText, 
  Info
} from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ResearchPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredResearch = researchData.filter((r: any) =>
    r.researcher.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.projectDetails.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-[#f8f9fa] dark:bg-zinc-950 p-4 md:p-8 transition-colors duration-200">
      <div className="w-full max-w-5xl mx-auto space-y-8">
        <h1 className="text-3xl font-normal text-black dark:text-white tracking-tight text-center">Research Projects</h1>

        <div className="w-full flex justify-center">
          <SearchInput 
            value={searchQuery} 
            onChange={setSearchQuery} 
            placeholder="Search by researcher or project..." 
          />
        </div>

        <div className="flex flex-col gap-8">
          {filteredResearch.map((research: any) => (
            <div key={research.id} className="border-b border-slate-200 dark:border-zinc-800 pb-8 last:border-none">
              
              {/* User Header Profile */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-4">
                  <img 
                    src={research.researcher.avatarUrl} 
                    alt={research.researcher.fullName}
                    className="w-12 h-12 rounded-full border border-slate-200 dark:border-zinc-800 object-cover"
                  />
                  <div className="flex flex-col">
                    <span className="text-base font-normal text-black dark:text-white tracking-tight">{research.researcher.fullName}</span>
                    <span className="text-xs font-normal text-slate-500 dark:text-zinc-400 uppercase tracking-wider">{research.researcher.department}</span>
                  </div>
                </div>
                
                <Button variant="outline" className="border border-black dark:border-white text-black dark:text-white hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black rounded-md px-3.5 py-2 text-xs font-normal">
                  <Info className="w-3.5 h-3.5 mr-2" /> View Full Profile
                </Button>
              </div>

              {/* Section Header */}
              <h2 className="text-sm font-normal text-slate-400 dark:text-zinc-500 uppercase tracking-widest mt-4 mb-2">{research.section}</h2>

              {/* Project Card */}
              <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm transition-all hover:shadow-md">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-normal text-slate-900 dark:text-white text-base md:text-lg leading-snug">{research.projectDetails.title}</h3>
                  <div className="flex items-center gap-2 text-slate-400 dark:text-zinc-500 shrink-0">
                    <ExternalLink className="w-4 h-4 hover:text-black dark:hover:text-white transition-colors" />
                    <FileText className="w-4 h-4 hover:text-black dark:hover:text-white transition-colors" />
                  </div>
                </div>
                
                <p className="text-xs font-normal text-slate-400 dark:text-zinc-500 mt-1 mb-3">{research.projectDetails.organization}</p>
                
                {/* Badges Row - Keep colorful */}
                <div className="flex flex-wrap gap-2 mt-3">
                  <Badge variant="outline" className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-normal bg-red-50 text-red-600 dark:bg-red-950/30 dark:text-red-400 border-red-100 dark:border-red-900">
                    <Calendar className="w-3.5 h-3.5"/> {research.projectDetails.year}
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-normal bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400 border-emerald-100 dark:border-emerald-900">
                    <CheckCircle2 className="w-3.5 h-3.5"/> {research.projectDetails.role}
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-normal bg-blue-50 text-blue-600 dark:bg-blue-950/30 dark:text-blue-400 border-blue-100 dark:border-blue-900">
                    <Globe className="w-3.5 h-3.5"/> {research.projectDetails.type}
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-normal bg-purple-50 text-purple-600 dark:bg-purple-950/30 dark:text-purple-400 border-purple-100 dark:border-purple-900">
                    <BarChart3 className="w-3.5 h-3.5"/> {research.projectDetails.status}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

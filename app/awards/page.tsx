"use client"

import { useState } from "react"
import { mockAwardsData } from "@/lib/awards-data"
import { Badge } from "@/components/ui/badge"
import { SearchInput } from "@/components/ui/search-input"
import { Calendar, Building, Info } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AwardsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredAwards = mockAwardsData.awardsList.filter((a) =>
    a.consultant.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.awards.some(award => award.title.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  return (
    <div className="min-h-screen bg-[#f8f9fa] dark:bg-zinc-950 p-4 md:p-8 transition-colors duration-200">
      <div className="w-full max-w-5xl mx-auto space-y-8">
        <h1 className="text-3xl font-normal text-black dark:text-white tracking-tight text-center">Awards & Recognitions</h1>

        <div className="w-full flex justify-center">
          <SearchInput 
            value={searchQuery} 
            onChange={setSearchQuery} 
            placeholder="Search by name or award..." 
          />
        </div>

        <div className="flex flex-col gap-8">
          {filteredAwards.length > 0 ? (
            filteredAwards.map((data) => (
              <div key={data.consultant.fullName} className="border-b border-slate-200 dark:border-zinc-800 pb-8 last:border-none">
                
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                  <div className="flex items-center gap-4">
                    <img 
                      src={data.consultant.avatarUrl} 
                      alt={data.consultant.fullName}
                      className="w-12 h-12 rounded-full border border-slate-200 dark:border-zinc-800 object-cover"
                    />
                    <div className="flex flex-col">
                      <span className="text-base font-normal text-black dark:text-white tracking-tight">{data.consultant.fullName}</span>
                      <span className="text-xs font-normal text-slate-500 dark:text-zinc-400 uppercase tracking-wider">{data.consultant.department}</span>
                    </div>
                  </div>
                  
                  <Button variant="outline" className="border border-black dark:border-white text-black dark:text-white hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black rounded-md px-3.5 py-2 text-xs font-normal">
                    <Info className="w-3.5 h-3.5 mr-2" /> View Full Profile
                  </Button>
                </div>

                <div className="space-y-4">
                  {data.awards.map(award => (
                    <div key={award.id} className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
                      <h3 className="font-normal text-slate-900 dark:text-white text-base leading-snug">{award.title}</h3>
                      <p className="text-xs font-normal text-slate-400 dark:text-zinc-500 mt-1 mb-3">{award.description}</p>
                      
                      <div className="flex flex-wrap gap-2">
                        <Badge className="font-normal flex items-center gap-1.5 bg-red-50 text-red-600 dark:bg-red-950/30 dark:text-red-400 border-red-100 dark:border-red-900">
                          <Calendar className="w-3.5 h-3.5"/> {award.badges.year}
                        </Badge>
                        <Badge className="font-normal flex items-center gap-1.5 bg-blue-50 text-blue-600 dark:bg-blue-950/30 dark:text-blue-400 border-blue-100 dark:border-blue-900">
                          <Building className="w-3.5 h-3.5"/> {award.badges.organization}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-slate-500">No awards found.</p>
          )}
        </div>
      </div>
    </div>
  )
}

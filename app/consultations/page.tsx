"use client"

import { useState } from "react"
import { mockConsultationsData } from "@/lib/consultations-data"
import { Badge } from "@/components/ui/badge"
import { SearchInput } from "@/components/ui/search-input"
import { CheckCircle2, User, Info } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ConsultationsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredConsultants = mockConsultationsData.consultantsList.filter((c: any) =>
    c.consultant.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.projects.some((p: any) => p.title.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  return (
    <div className="min-h-screen bg-[#f8f9fa] dark:bg-zinc-950 p-4 md:p-8 transition-colors duration-200">
      <div className="w-full max-w-5xl mx-auto space-y-8">
        <h1 className="text-3xl font-normal text-black dark:text-white tracking-tight text-center">Consultations</h1>

        <div className="w-full flex justify-center">
          <SearchInput 
            value={searchQuery} 
            onChange={setSearchQuery} 
            placeholder="Search by consultant or project..." 
          />
        </div>

        <div className="flex flex-col gap-8">
          {filteredConsultants.length > 0 ? (
            filteredConsultants.map((data: any) => (
              <div key={data.id} className="border-b border-slate-200 dark:border-zinc-800 pb-8 last:border-none">
                
                {/* Consultant Header Profile */}
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

                <h2 className="text-sm font-normal text-slate-400 dark:text-zinc-500 uppercase tracking-widest mt-4 mb-2">{data.sectionTitle}</h2>

                {/* Projects */}
                <div className="space-y-4">
                  {data.projects.map((project: any) => (
                    <div key={project.id} className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
                      <h3 className="font-normal text-slate-900 dark:text-white text-base leading-snug">{project.title}</h3>
                      <p className="text-xs font-normal text-slate-400 dark:text-zinc-500 mt-1 mb-3">Client: {project.client}</p>
                      
                      <div className="flex flex-wrap gap-2">
                        <Badge className="font-normal flex items-center gap-1.5 bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400 border-emerald-100 dark:border-emerald-900">
                          <CheckCircle2 className="w-3.5 h-3.5"/> {project.badges.status}
                        </Badge>
                        <Badge className="font-normal flex items-center gap-1.5 bg-blue-50 text-blue-600 dark:bg-blue-950/30 dark:text-blue-400 border-blue-100 dark:border-blue-900">
                          <User className="w-3.5 h-3.5"/> {project.badges.role}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-slate-500">No consultation projects found.</p>
          )}
        </div>
      </div>
    </div>
  )
}

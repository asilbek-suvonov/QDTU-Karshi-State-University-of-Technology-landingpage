"use client"

import { useState } from "react"
import { mockPublicationsData } from "@/lib/publications-data"
import { Badge } from "@/components/ui/badge"
import { SearchInput } from "@/components/ui/search-input"
import { Calendar, FileText, Globe } from "lucide-react"

export default function PublicationsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const allPublications = Object.values(mockPublicationsData).flatMap(author => 
    author.publicationsByGroup.flatMap(group => group.items.map(item => ({
      ...item,
      authorName: author.author.fullName,
      avatarUrl: author.author.avatarUrl
    })))
  );

  const filteredPublications = allPublications.filter((p) =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.authorName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#f8f9fa] dark:bg-zinc-950 p-4 md:p-8 transition-colors duration-200">
      <div className="w-full max-w-5xl mx-auto space-y-8">
        <h1 className="text-3xl font-normal text-black dark:text-white tracking-tight text-center">Academic Publications</h1>

        <div className="w-full flex justify-center">
          <SearchInput 
            value={searchQuery} 
            onChange={setSearchQuery} 
            placeholder="Search by publication title or author..." 
          />
        </div>

        <div className="flex flex-col gap-8">
          {filteredPublications.length > 0 ? (
            filteredPublications.map((pub) => (
              <div key={pub.id} className="border-b border-slate-200 dark:border-zinc-800 pb-8 last:border-none">
                <div className="flex items-center gap-4 mb-6">
                    <img 
                      src={pub.avatarUrl} 
                      alt={pub.authorName}
                      className="w-10 h-10 rounded-full border border-slate-200 dark:border-zinc-800 object-cover"
                    />
                    <span className="text-sm font-normal text-black dark:text-white">{pub.authorName}</span>
                </div>

                <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
                  <h3 className="font-normal text-slate-900 dark:text-white text-base md:text-lg leading-snug">{pub.title}</h3>
                  <p className="text-xs font-normal text-slate-400 dark:text-zinc-500 mt-1 mb-3">{pub.publisherInfo}</p>
                  
                  <div className="flex flex-wrap gap-2 mt-3">
                    <Badge variant="outline" className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-normal bg-red-50 text-red-600 dark:bg-red-950/30 dark:text-red-400 border-red-100 dark:border-red-900">
                      <Calendar className="w-3.5 h-3.5"/> {pub.badges.year}
                    </Badge>
                    <Badge variant="outline" className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-normal bg-blue-50 text-blue-600 dark:bg-blue-950/30 dark:text-blue-400 border-blue-100 dark:border-blue-900">
                      <Globe className="w-3.5 h-3.5"/> {pub.badges.scope}
                    </Badge>
                    <Badge variant="outline" className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-normal bg-purple-50 text-purple-600 dark:bg-purple-950/30 dark:text-purple-400 border-purple-100 dark:border-purple-900">
                      <FileText className="w-3.5 h-3.5"/> {pub.badges.authorOrder}
                    </Badge>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-slate-500">No publications found.</p>
          )}
        </div>
      </div>
    </div>
  )
}

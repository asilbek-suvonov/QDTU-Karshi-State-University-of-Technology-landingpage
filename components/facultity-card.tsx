import React from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { ChevronRight, ArrowUpRight } from "lucide-react"

interface FacultyType {
  title: string
  imageUrl: string
  departments: string[]
  id: string
}

// Rasmdagi ma'lumotlar asosida tuzilgan mock data
const facultiesList: FacultyType[] = [
  {
    title: "Arxitektura fakulteti",
    imageUrl: "https://images.unsplash.com/photo-1504297050568-910d24c426d3?auto=format&fit=crop&w=500&q=80",
    departments: ["Adabiyot va ona tili...", "Arxitektura va dizayn"],
    id: "1"
  },
  {
    title: "Asulan (Axborot Tizimlari)",
    imageUrl: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=500&q=80",
    departments: ["Salom...", "Dasturiy injiniring kafedrasi"],
    id: "2"
  },
  {
    title: "Davolash fakulteti",
    imageUrl: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=500&q=80",
    departments: ["Farmatsiya va kimyo kafedrasi...", "book..."],
    id: "3"
  },
  {
    title: "Sun'iy intellekt",
    imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=500&q=80",
    departments: ["Axborot tizimlari xavfsizligi...", "Axborot Texnologiyalari kafedrasi..."],
    id: "4"
  },
  {
    title: "Xorijiy tillar fakulteti",
    imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=500&q=80",
    departments: ["Arxeologik ishlar kafedrasi...", "developerds...", "Asu..."],
    id: "5"
  }
];

const FacultyCardsContainer = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6 w-full  mx-auto">
      {facultiesList.map((faculty, index) => (
        <Card 
          key={index} 
          className="group w-full overflow-hidden border border-border/80 bg-card shadow-md transition-all duration-300 hover:shadow-xl  rounded-xl flex flex-col justify-between p-0 gap-1"
        >
          {/* Fakultet Rasmi */}
          <div className="relative h-44 w-full bg-muted overflow-hidden">
            <img 
              src={faculty.imageUrl} 
              alt={faculty.title} 
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* Rasm tagidagi yorug'lik gradiyenti (UserCard kabi) */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/30 to-transparent" />
          </div>

          {/* Sarlavha qismi */}
          <CardHeader className="px-5 pt-2 pb-2">
            <CardTitle className="text-lg font-semibold tracking-tight text-foreground transition-colors group-hover:text-blue-500 flex items-center justify-between gap-2">
              <span className="truncate">{faculty.title}</span>
            </CardTitle>
          </CardHeader>

          {/* Kafedralar ro'yxati (Asosiy kontent) */}
          <CardContent className="px-5 pb-4 flex-grow">
            <div className="space-y-2">
              {faculty.departments.map((dept, dIndex) => (
                <div key={dIndex} className="flex items-start gap-2 text-sm text-muted-foreground group/item">
                  <ChevronRight className="h-4 w-4 text-blue-500 shrink-0 mt-0.5 transition-transform group-hover/item:translate-x-0.5" />
                  <span className="truncate hover:text-foreground transition-colors cursor-default">
                    {dept}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>

          {/* "Batafsil ma'lumot" havolasi */}
          <CardFooter className="px-5 py-3 border-t border-border/50 bg-muted/20">
            <Link 
              href={`/directory/faculty/${faculty.id}`} 
              className="inline-flex items-center text-xs  tracking-wider text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors gap-1 group/link"
            >
             {" Batafsil ma'lumot"}
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

export default FacultyCardsContainer

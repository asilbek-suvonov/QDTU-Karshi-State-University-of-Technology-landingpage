"use client"

import * as React from "react"
import Link from "next/link"
import { ChevronDown, Menu, X } from "lucide-react"
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

const directoryLinks = [
  { title: "Directory Home", href: "/directory" },
  { title: "Faculty", href: "/directory/faculty" },
  { title: "Staff", href: "/directory/staff" },
]

const academicLinks = [
  { title: "Academic Home", href: "/academic" },
  { title: "Research", href: "/academic/research" },
  { title: "Publications", href: "/academic/publications" },
  { title: "Controls", href: "/academic/controls" },
  { title: "Consultations", href: "/academic/consultations" },
  { title: "Awards", href: "/academic/awards" },
]

export function Navbar() {
  const { theme, setTheme } = useTheme()
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-17 items-center justify-between mx-auto px-4">
        <div className="flex items-center gap-12">
          <Link href="/" className="flex items-center space-x-3 group">
           
            <span className="font-bold text-2xl uppercase tracking-tight text-primary">
              University
            </span>
          </Link>
          
          <nav className="hidden lg:flex items-center gap-8">
            <Link href="/" className="text-sm font-semibold uppercase tracking-wider hover:text-primary transition-colors">
              Home
            </Link>

            {/* Directory Dropdown */}
            <div className="relative group py-6">
              <button className="flex items-center gap-1.5 text-sm font-semibold uppercase tracking-wider hover:text-primary transition-colors cursor-default">
                Directory <ChevronDown className="h-4 w-4 opacity-50 group-hover:rotate-180 transition-transform duration-300" />
              </button>
              <div className="absolute top-[calc(100%-12px)] left-0 w-64 bg-card border border-border shadow-2xl p-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 rounded-lg -translate-y-2 group-hover:translate-y-0">
                {directoryLinks.map((link) => (
                  <Link
                    key={link.title}
                    href={link.href}
                    className="block px-4 py-3 text-xs font-bold  tracking-widest hover:bg-primary/10 hover:text-primary rounded-md transition-all"
                  >
                    {link.title}
                  </Link>
                ))}
              </div>
            </div>

            {/* Academic Dropdown */}
            <div className="relative group py-6">
              <button className="flex items-center gap-1.5 text-sm font-semibold uppercase tracking-wider hover:text-primary transition-colors cursor-default">
                Academic <ChevronDown className="h-4 w-4 opacity-50 group-hover:rotate-180 transition-transform duration-300" />
              </button>
              <div className="absolute top-[calc(100%-12px)] left-0 w-64 bg-card border border-border shadow-2xl p-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 rounded-lg -translate-y-2 group-hover:translate-y-0">
                {academicLinks.map((link) => (
                  <Link
                    key={link.title}
                    href={link.href}
                    className="block px-4 py-3 text-xs font-bold uppercase tracking-widest hover:bg-primary/10 hover:text-primary rounded-md transition-all"
                  >
                    {link.title}
                  </Link>
                ))}
              </div>
            </div>

            <Link href="/staff-statistics" className="text-sm font-semibold uppercase tracking-wider hover:text-primary transition-colors">
              Statistics
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="border-l border-border pl-4 flex items-center h-8">
            <AnimatedThemeToggler 
              theme={theme as "light" | "dark"} 
              onThemeChange={(t) => setTheme(t)}
              variant="circle"
              className="p-2 hover:bg-secondary rounded-full transition-all duration-300"
            />
          </div>
          <button 
            className="lg:hidden p-2 text-primary"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={cn(
        "lg:hidden absolute top-full left-0 w-full bg-background border-b transition-all duration-300 overflow-hidden",
        isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
      )}>
        <div className="p-4 space-y-4">
          <Link href="/" className="block text-sm font-bold uppercase tracking-widest py-2" onClick={() => setIsOpen(false)}>Home</Link>
          <div className="space-y-2">
            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Directory</p>
            {directoryLinks.map(link => (
              <Link key={link.href} href={link.href} className="block text-xs font-bold uppercase py-1 pl-4 border-l border-primary/20" onClick={() => setIsOpen(false)}>{link.title}</Link>
            ))}
          </div>
          <div className="space-y-2">
            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Academic</p>
            {academicLinks.map(link => (
              <Link key={link.href} href={link.href} className="block text-xs font-bold uppercase py-1 pl-4 border-l border-primary/20" onClick={() => setIsOpen(false)}>{link.title}</Link>
            ))}
          </div>
          <Link href="/staff-statistics" className="block text-sm font-bold uppercase tracking-widest py-2" onClick={() => setIsOpen(false)}>Statistics</Link>
        </div>
      </div>
    </header>
  )
}

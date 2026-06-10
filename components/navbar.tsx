"use client"

import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler"
import { useTheme } from "next-themes"

const directoryLinks = [
  { title: "Faculty", href: "/directory/faculty", description: "Browse our academic faculty members." },
  { title: "Staff", href: "/directory/staff", description: "View university administrative and support staff." },
]

const academicLinks = [
  { title: "Research", href: "/academic/research", description: "Ongoing and past research initiatives." },
  { title: "Publications", href: "/academic/publications", description: "Academic journals and papers." },
  { title: "Controls", href: "/academic/controls", description: "Academic standards and monitoring." },
  { title: "Consultations", href: "/academic/consultations", description: "Schedule a session with experts." },
  { title: "Awards", href: "/academic/awards", description: "Honors and recognition in the field." },
]

export function Navbar() {
  const { theme, setTheme } = useTheme()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between mx-auto px-4">
        <div className="flex items-center gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <span className="inline-block font-bold text-xl uppercase tracking-tighter">
              University
            </span>
          </Link>
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="/" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Home
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuTrigger>Directory</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {directoryLinks.map((link) => (
                      <ListItem
                        key={link.title}
                        title={link.title}
                        href={link.href}
                      >
                        {link.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>Academic</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {academicLinks.map((link) => (
                      <ListItem
                        key={link.title}
                        title={link.title}
                        href={link.href}
                      >
                        {link.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/staff-statistics" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Statistics
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="flex items-center space-x-4">
          <div className="border-l pl-4 flex items-center h-8">
            <AnimatedThemeToggler 
              theme={theme as "light" | "dark"} 
              onThemeChange={(t) => setTheme(t)}
              variant="circle"
              className="p-2 hover:bg-foreground hover:text-background rounded-xs border-2 border-foreground/10 transition-all duration-300"
            />
          </div>
        </div>
      </div>
    </header>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-xs p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none uppercase tracking-tight">{title}</div>
          <p className="line-clamp-2 text-xs leading-snug text-muted-foreground mt-1">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"

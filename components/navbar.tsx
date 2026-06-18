"use client";

import { NavbarDropdown } from "@/components/navbar-dropdown";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { AuthDialog } from "@/components/auth-dialog";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";
import Image from "next/image";
import { Logo } from "@/public";

const directoryLinks = [
  { title: "Fakultetlar", href: "/directory/faculty" },
  { title: "Xodimlar", href: "/directory/staff" },
];
const academicLinks = [
  { title: "Tadqiqotlar", href: "/research" },
  { title: "Nashrlar", href: "/publications" },
  { title: "Maslahatlar", href: "/consultations" },
  { title: "Mukofotlar", href: "/awards" },
];

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const pathname = usePathname();
  const active = pathname === href;
  return (
    <Link
      href={href}
      className={cn(
        "text-sm font-medium transition-colors duration-150",
        active
          ? "text-primary border-b-2 border-primary pb-0.5"
          : "text-foreground/70 hover:text-foreground"
      )}
    >
      {children}
    </Link>
  );
}

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-card border-b border-border">
      <div className="hidden lg:block border-b border-border/60 bg-secondary/100">
        <div className="container mx-auto px-4 flex items-center justify-end gap-4 h-8">
          <NavbarDropdown
            title="UZ"
            links={[
              { title: "O'zbekcha", href: "#" },
              { title: "English", href: "#" },
              { title: "Русский", href: "#" },
            ]}
          />
          <AnimatedThemeToggler
            theme={theme as "light" | "dark"}
            onThemeChange={(t) => setTheme(t)}
            variant="circle"
            className="p-1 hover:bg-muted rounded-full transition-colors"
          />
          <AuthDialog />
        </div>
      </div>

      {/* Main navbar */}
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group shrink-0">
         <Image 
         alt=""
         src={Logo}
         width={40}
         height={40}
         />
          <div className="hidden sm:block">
            <p className="text-base font-bold text-foreground leading-tight tracking-tight">QDTU</p>
            <p className="text-[10px] text-muted-foreground leading-none ">{"Qarshi Davlat Texnika Universiteti"}</p>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-7">
          <NavLink href="/">Asosiy</NavLink>
          <NavbarDropdown title="Yo'nalishlar" links={directoryLinks} />
          <NavbarDropdown title="Akademik" links={academicLinks} />
          <NavLink href="/staff-statistics">Statistika</NavLink>
        </nav>

        {/* Mobile right */}
        <div className="flex items-center gap-3 lg:hidden">
          <AnimatedThemeToggler
            theme={theme as "light" | "dark"}
            onThemeChange={(t) => setTheme(t)}
            variant="circle"
            className="p-1.5 hover:bg-muted rounded-full transition-colors"
          />
          <button
            className="p-1.5 rounded hover:bg-muted transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={cn(
        "lg:hidden border-t border-border bg-card transition-all duration-200 overflow-hidden",
        isOpen ? "max-h-screen" : "max-h-0"
      )}>
        <div className="container mx-auto px-4 py-4 space-y-0.5">
          {[
            { label: "Asosiy", href: "/" },
            ...directoryLinks.map(l => ({ label: l.title, href: l.href })),
            ...academicLinks.map(l => ({ label: l.title, href: l.href })),
            { label: "Statistika", href: "/staff-statistics" },
          ].map(item => (
            <Link
              key={item.href}
              href={item.href}
              className="block px-3 py-2.5 rounded text-sm text-foreground/80 hover:text-primary hover:bg-muted transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-3 border-t border-border flex items-center gap-3">
            <AuthDialog />
          </div>
        </div>
      </div>
    </header>
  );
}

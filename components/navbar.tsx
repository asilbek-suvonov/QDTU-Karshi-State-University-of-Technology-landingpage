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
        "text-xs font-bold uppercase tracking-wider transition-colors py-1 relative",
        active
          ? "text-foreground underline underline-offset-8 decoration-2"
          : "text-muted-foreground hover:text-foreground"
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
    <header className="sticky top-0 z-50 w-full border-b border-foreground bg-background text-foreground">
      {/* Top strip */}
      <div className="hidden lg:block border-b border-foreground/10 bg-neutral-50 dark:bg-neutral-900/50">
        <div className="container mx-auto px-4 flex items-center justify-end gap-4 h-9">
          <NavbarDropdown
            title="UZ"
            links={[
              { title: "O'zbekcha", href: "#" },
              { title: "English", href: "#" },
              { title: "Русский", href: "#" },
            ]}
          />
          <div className="h-4 w-px bg-foreground/10" />
          <AnimatedThemeToggler
            theme={theme as "light" | "dark"}
            onThemeChange={(t) => setTheme(t)}
            variant="square"
            className="p-1 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-none transition-colors"
          />
          <div className="h-4 w-px bg-foreground/10" />
          <AuthDialog />
        </div>
      </div>

      {/* Main navbar */}
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <div className="grayscale invert-0 dark:invert">
            <Image 
              alt="QDTU Logo"
              src={Logo}
              width={36}
              height={36}
              className="rounded-none"
            />
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-black uppercase tracking-wider leading-none">QDTU</p>
            <p className="text-[10px] uppercase tracking-tight text-muted-foreground mt-0.5">
              Qarshi Davlat Texnika Universiteti
            </p>
          </div>
        </Link>
            
        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-8">
          <NavLink href="/">Asosiy</NavLink>
          <NavbarDropdown title="Yo'nalishlar" links={directoryLinks} />
          <NavbarDropdown title="Akademik" links={academicLinks} />
          <NavLink href="/staff-statistics">Statistika</NavLink>
        </nav>

        {/* Mobile right */}
        <div className="flex items-center gap-2 lg:hidden">
          <AnimatedThemeToggler
            theme={theme as "light" | "dark"}
            onThemeChange={(t) => setTheme(t)}
            variant="square"
            className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-none transition-colors"
          />
          <button
            className="p-2 border border-foreground/20 rounded-none hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Menu"
          >
            {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={cn(
        "lg:hidden border-t border-foreground bg-background transition-all duration-200 overflow-hidden",
        isOpen ? "max-h-screen border-b border-foreground" : "max-h-0"
      )}>
        <div className="container mx-auto px-4 py-3 divide-y divide-foreground/5">
          {[
            { label: "Asosiy", href: "/" },
            ...directoryLinks.map(l => ({ label: l.title, href: l.href })),
            ...academicLinks.map(l => ({ label: l.title, href: l.href })),
            { label: "Statistika", href: "/staff-statistics" },
          ].map(item => (
            <Link
              key={item.href}
              href={item.href}
              className="block py-3 text-xs font-bold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-4 pb-2 flex items-center gap-3">
            <AuthDialog />
          </div>
        </div>
      </div>
    </header>
  );
}
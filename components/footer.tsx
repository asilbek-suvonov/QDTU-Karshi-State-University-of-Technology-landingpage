"use client";

import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import Image from "next/image";
import { Logo } from "@/public";

const navLinks = [
  {
    group: "Yo'nalishlar",
    links: [
      { label: "Fakultetlar", href: "/directory/faculty" },
      { label: "Xodimlar", href: "/directory/staff" },
    ],
  },
  {
    group: "Akademik",
    links: [
      { label: "Tadqiqotlar", href: "/research" },
      { label: "Nashrlar", href: "/publications" },
      { label: "Maslahatlar", href: "/consultations" },
    ],
  },
  {
    group: "Ma'lumotlar",
    links: [{ label: "Statistika", href: "/staff-statistics" }],
  },
];

export default function Footer() {
  return (
    <footer className="w-full border-t border-foreground bg-background text-foreground">
      {/* Top Section */}
      <div className="container mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
        
        {/* Brand & Description */}
        <div className="lg:col-span-2 space-y-3">
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <div className="grayscale invert-0 dark:invert">
              <Image alt="QDTU Logo" src={Logo} width={36} height={36} className="rounded-none" />
            </div>
            <div>
              <p className="text-sm font-black uppercase tracking-wider leading-none">
                QDTU
              </p>
              <p className="text-[10px] uppercase tracking-tight text-muted-foreground mt-0.5">
                Qarshi Davlat Texnika Universiteti
              </p>
            </div>
          </Link>
          <p className="text-xs text-muted-foreground max-w-sm leading-relaxed pt-1">
            Ilm-fan va innovatsiya sohasida yetakchi kadrlar tayyorlovchi oliy ta'lim muassasasi.
          </p>
        </div>

        {/* Nav groups */}
        {navLinks.map((group) => (
          <div key={group.group} className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">
              {group.group}
            </h3>
            <ul className="space-y-2">
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs text-muted-foreground hover:text-foreground hover:underline underline-offset-4 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Contact */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">
            Kontakt
          </h3>
          <ul className="space-y-2">
            <li className="flex items-start gap-2 text-xs text-muted-foreground">
              <MapPin className="h-3.5 w-3.5 mt-0.5 shrink-0 text-foreground" />
              <span>Qarshi shahri, O'zbekiston</span>
            </li>
            <li className="flex items-center gap-2 text-xs text-muted-foreground">
              <Phone className="h-3.5 w-3.5 shrink-0 text-foreground" />
              <span>+998 (73) 123-45-67</span>
            </li>
            <li className="flex items-center gap-2 text-xs text-muted-foreground">
              <Mail className="h-3.5 w-3.5 shrink-0 text-foreground" />
              <span>info@qdtu.uz</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-foreground/10 bg-neutral-50 dark:bg-neutral-900/50">
        <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] uppercase tracking-wider text-muted-foreground text-center sm:text-left">
            © {new Date().getFullYear()} QDTU. Barcha huquqlar himoyalangan.
          </p>
          <p className="text-[10px] font-medium text-muted-foreground/60 hidden sm:block">
            Qarshi Davlat Texnika Universiteti
          </p>
        </div>
      </div>
    </footer>
  );
}
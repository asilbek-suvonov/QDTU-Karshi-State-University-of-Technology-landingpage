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
      { label: "Mukofotlar", href: "/awards" },
    ],
  },
  {
    group: "Ma'lumotlar",
    links: [{ label: "Statistika", href: "/staff-statistics" }],
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#04383b] text-white">
      {/* Top strip */}
      <div className="border-b border-white/10">
        <div className="container mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <Link href="/" className="flex items-center gap-3 group shrink-0">
                <Image alt="" src={Logo} width={40} height={40} />
                <div className="hidden sm:block">
                  <p className="text-base font-bold text-foreground leading-tight tracking-tight">
                    QDTU
                  </p>
                  <p className="text-[10px] text-muted-foreground leading-none ">
                    {"Qarshi Davlat Texnika Universiteti"}
                  </p>
                </div>
              </Link>
           
            </div>
            <p className="text-sm text-white/60 leading-relaxed">
              {
                "   Ilm-fan va innovatsiya sohasida yetakchi kadrlar tayyorlovchi oliy ta'lim muassasasi."
              }
            </p>
          </div>

          {/* Nav groups */}
          {navLinks.map((group) => (
            <div key={group.group}>
              <h3 className="text-xs font-medium uppercase tracking-widest text-white/50 mb-4">
                {group.group}
              </h3>
              <ul className="space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/70 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-white/50 mb-4">
              Kontakt
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-sm text-white/70">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-accent" />
                <span>{"Qarshi shahri, O'zbekiston"}</span>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-white/70">
                <Phone className="h-4 w-4 shrink-0 text-accent" />
                <span>+998 (73) 123-45-67</span>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-white/70">
                <Mail className="h-4 w-4 shrink-0 text-accent" />
                <span>info@qdtu.uz</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p className="text-xs text-white/40">
          © {new Date().getFullYear()} QDTU. Barcha huquqlar himoyalangan.
        </p>
        <p className="text-xs text-white/30">
          {"Qarshi Davlat Texnika Universiteti"}
        </p>
      </div>
    </footer>
  );
}

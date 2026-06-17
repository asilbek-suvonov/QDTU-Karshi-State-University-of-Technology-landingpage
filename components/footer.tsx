import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";

const navLinks = [
  { group: "Yo'nalishlar", links: [{ label: "Fakultetlar", href: "/directory/faculty" }, { label: "Xodimlar", href: "/directory/staff" }] },
  { group: "Akademik", links: [{ label: "Tadqiqotlar", href: "/research" }, { label: "Nashrlar", href: "/publications" }, { label: "Maslahatlar", href: "/consultations" }, { label: "Mukofotlar", href: "/awards" }] },
  { group: "Ma'lumotlar", links: [{ label: "Statistika", href: "/staff-statistics" }] },
];

export default function Footer() {
  return (
    <footer className="bg-[#0F5257] text-white">
      {/* Top strip */}
      <div className="border-b border-white/10">
        <div className="container mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded bg-white/15">
                <span className="text-lg font-black text-white leading-none">Q</span>
              </div>
              <div>
                <p className="font-bold text-base text-white leading-tight">QDTU</p>
                <p className="text-[10px] text-white/60 uppercase tracking-wider">Davlat Texnika Universiteti</p>
              </div>
            </div>
            <p className="text-sm text-white/60 leading-relaxed">
              Ilm-fan va innovatsiya sohasida yetakchi kadrlar tayyorlovchi oliy ta'lim muassasasi.
            </p>
          </div>

          {/* Nav groups */}
          {navLinks.map(group => (
            <div key={group.group}>
              <h3 className="text-xs font-bold uppercase tracking-widest text-white/50 mb-4">{group.group}</h3>
              <ul className="space-y-2.5">
                {group.links.map(link => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-white/70 hover:text-white transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-white/50 mb-4">Kontakt</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-sm text-white/70">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-accent" />
                <span>Qo'qon shahri, O'zbekiston</span>
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
          Qo'qon Davlat Texnika Universiteti
        </p>
      </div>
    </footer>
  );
}

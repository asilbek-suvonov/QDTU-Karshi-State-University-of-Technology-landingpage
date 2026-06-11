import Link from "next/link";
import { ChevronDown } from "lucide-react";

interface NavbarDropdownProps {
  title: string;
  links: { title: string; href: string }[];
}

export function NavbarDropdown({ title, links }: NavbarDropdownProps) {
  return (
    <div className="relative group py-6">
      <button className="flex items-center gap-1.5 text-sm font-semibold uppercase tracking-wider hover:text-primary transition-colors cursor-default">
        {title} <ChevronDown className="h-4 w-4 opacity-50 group-hover:rotate-180 transition-transform duration-300" />
      </button>
      <div className="absolute top-[calc(100%-12px)] left-0 w-64 bg-card border border-border shadow-2xl p-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 rounded-lg -translate-y-2 group-hover:translate-y-0">
        {links.map((link) => (
          <Link
            key={link.title}
            href={link.href}
            className="block px-4 py-3 text-sm font-medium tracking-widest hover:bg-primary/5 hover:text-primary rounded-md transition-all"
          >
            {link.title}
          </Link>
        ))}
      </div>
    </div>
  );
}

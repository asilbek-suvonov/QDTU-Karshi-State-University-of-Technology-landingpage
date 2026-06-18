import Link from "next/link";
import { ChevronDown } from "lucide-react";

interface NavbarDropdownProps {
  title: string;
  links: { title: string; href: string }[];
}

export function NavbarDropdown({ title, links }: NavbarDropdownProps) {
  return (
    <div className="relative group py-6">
      <button className="flex items-center gap-1.5 text-sm tracking-wider hover:text-primary transition-colors cursor-default select-none">
        {title} 
        <ChevronDown className="h-3.5 w-3.5 opacity-50 group-hover:rotate-180 transition-transform duration-300" />
      </button>

      <div className="absolute top-[calc(100%-12px)] left-1/2 -translate-x-1/2 w-44 bg-card border border-border shadow-2xl p-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300  -translate-y-2 group-hover:translate-y-0 z-50
        before:absolute before:-top-[2px] before:left-0 before:w-full before:h-[3px] before:bg-primary
        after:absolute after:-top-[6px] after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-0 after:border-l-[6px] after:border-l-transparent after:border-r-[6px] after:border-r-transparent after:border-b-[6px] after:border-b-primary"
      >
        <div className="pt-1"> 
          {links.map((link) => ( 
            <Link
              key={link.title}
              href={link.href}
              className="block px-3 py-2 text-xs font-medium tracking-wide hover:bg-primary/5 hover:text-primary transition-all duration-150"
            >
              {link.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
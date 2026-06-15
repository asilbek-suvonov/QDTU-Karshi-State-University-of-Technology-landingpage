import Link from "next/link";
import { Building2, Users, ArrowRight } from "lucide-react";
import { Breadcrumb } from "@/components/ui/breadcrumb";

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Directory" },
];

const sections = [
  {
    title: "Fakultetlar",
    description: "Universitetimizning barcha fakultet va kollejlari",
    href: "/directory/faculty",
    icon: Building2,
    color: "bg-violet-50 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400",
  },
  {
    title: "Xodimlar",
    description: "Professor-o'qituvchilar va xodimlar ro'yxati",
    href: "/directory/staff",
    icon: Users,
    color: "bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400",
  },
];

export default function DirectoryPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-10">
        <Breadcrumb items={breadcrumbs} />

        <h1 className="text-2xl font-bold tracking-tight text-foreground mb-2">Directory</h1>
        <p className="text-muted-foreground mb-8 text-sm">
          Universitet tarkibi, xodimlar va kafedralar haqida ma'lumot.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl">
          {sections.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-md"
            >
              <div className={`inline-flex h-11 w-11 items-center justify-center rounded-lg ${s.color} mb-4`}>
                <s.icon className="h-5 w-5" />
              </div>
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                  {s.title}
                </h2>
                <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{s.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

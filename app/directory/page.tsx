import Link from "next/link";
import { ArrowRight, Building2, Users } from "lucide-react";
import { Breadcrumb } from "@/components/ui/breadcrumb";

const breadcrumbs = [{ label: "Asosiy", href: "/" }, { label: "Yo'nalishlar" }];

export default function DirectoryPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-10">
        <Breadcrumb items={breadcrumbs} />

        <div className="pb-8 mb-8 border-b border-border">
          <p className="section-label mb-2">Universitet tuzilmasi</p>
          <h1 className="text-3xl font-black text-foreground">Yo'nalishlar</h1>
          <div className="divider-gold mt-3" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg">
          {[
            { title: "Fakultetlar", desc: "Akademik bo'linmalar va yo'nalishlar", href: "/directory/faculty", icon: Building2 },
            { title: "Xodimlar", desc: "Professor-o'qituvchilar va ilmiy xodimlar", href: "/directory/staff", icon: Users },
          ].map(item => (
            <Link
              key={item.href}
              href={item.href}
              className="group flex items-start gap-4 rounded-lg border border-border bg-card p-5 shadow-sm transition-all hover:shadow-md hover:border-primary/30"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded border border-border bg-secondary">
                <item.icon className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h2 className="font-bold text-base text-foreground group-hover:text-primary transition-colors">{item.title}</h2>
                  <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
                </div>
                <p className="mt-0.5 text-sm text-muted-foreground">{item.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

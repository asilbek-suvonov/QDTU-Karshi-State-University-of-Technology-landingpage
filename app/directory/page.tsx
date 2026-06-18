import Link from "next/link";
import { ArrowRight, Building2, Users } from "lucide-react";
import { Breadcrumb } from "@/components/ui/breadcrumb";

const breadcrumbs = [{ label: "Asosiy", href: "/" }, { label: "Yo'nalishlar" }];

export default function DirectoryPage() {
  return (
    <div className="p-4 max-w-7xl mx-auto">
      <Breadcrumb items={breadcrumbs} />

      {/* Header */}
      <div className="my-4 pb-4 border-b">
        <p className="text-xs uppercase">Universitet tuzilmasi</p>
        <h1 className="text-2xl font-bold">Yo'nalishlar</h1>
      </div>

      {/* Yo'nalishlar ro'yxati */}
      <div className="space-y-4 max-w-lg mt-6">
        {[
          { title: "Fakultetlar", desc: "Akademik bo'linmalar va yo'nalishlar", href: "/directory/faculty", icon: Building2 },
          { title: "Xodimlar", desc: "Professor-o'qituvchilar va ilmiy xodimlar", href: "/directory/staff", icon: Users },
        ].map(item => (
          <div key={item.href} className="border-b pb-4">
            <div className="flex items-start gap-3">
              <item.icon className="h-5 w-5 shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h2 className="font-bold text-sm">{item.title}</h2>
                  <Link href={item.href} className="underline text-xs inline-flex items-center gap-1">
                    O'tish <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
                <p className="text-xs mt-0.5 text-muted-foreground">{item.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
"use client";

import { useState, useMemo } from "react";
import { Loader2, Users, SlidersHorizontal } from "lucide-react";
import { SearchInput } from "@/components/ui/search-input";
import { Combobox } from "@/components/ui/combobox";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { UserCard } from "@/components/user-card";
import { useAllStaff } from "@/hooks/useAllStaff";
import { useGetAllColleges } from "@/hooks/useCollege";
import type { ResUser } from "@/service/user/user.type";

const breadcrumbs = [
  { label: "Asosiy", href: "/" },
  { label: "Yo'nalishlar", href: "/directory" },
  { label: "Xodimlar" },
];

export default function StaffPage() {
  const [search, setSearch] = useState("");
  const [collegeFilter, setCollegeFilter] = useState("");
  const [lavozimFilter, setLavozimFilter] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const { staff, isLoading, isError, total } = useAllStaff();
  const { data: collegesData } = useGetAllColleges();

  const collegeOptions = useMemo(() =>
    (collegesData?.data ?? []).map(c => ({ value: c.name, label: c.name })),
    [collegesData]
  );

  const lavozimOptions = useMemo(() => {
    const set = new Set<string>();
    staff.forEach(u => { if (u.lavozim) set.add(u.lavozim); });
    return Array.from(set).sort().map(v => ({ value: v, label: v }));
  }, [staff]);

  const filtered = useMemo(() =>
    staff.filter((u: ResUser) => {
      const q = search.toLowerCase();
      const matchSearch = !q || u.fullName.toLowerCase().includes(q)
        || (u.departmentName ?? "").toLowerCase().includes(q)
        || (u.lavozim ?? "").toLowerCase().includes(q);
      const matchCollege = !collegeFilter || (u.departmentName ?? "").toLowerCase().includes(collegeFilter.toLowerCase());
      const matchLavozim = !lavozimFilter || u.lavozim === lavozimFilter;
      return matchSearch && matchCollege && matchLavozim;
    }),
    [staff, search, collegeFilter, lavozimFilter]
  );

  const hasFilters = !!collegeFilter || !!lavozimFilter;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-10">
        <Breadcrumb items={breadcrumbs} />

        {/* Header */}
        <div className="mb-8 pb-6 border-b border-border">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="section-label mb-2">Ilmiy tarkib</p>
              <h1 className="text-3xl font-black text-foreground">Professor-o'qituvchilar</h1>
              <div className="divider-gold mt-3 mb-2" />
              {total > 0 && !isLoading && (
                <p className="text-sm text-muted-foreground">
                  {filtered.length} / {total} ta xodim
                </p>
              )}
            </div>
            <div className="flex items-center gap-3 mt-1">
              <div className="flex h-11 w-11 items-center justify-center rounded border border-border bg-card">
                <Users className="h-5 w-5 text-primary" />
              </div>
            </div>
          </div>
        </div>

        {/* Search + filter bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          <div className="flex-1">
            <SearchInput value={search} onChange={setSearch} placeholder="Ism, bo'lim yoki lavozim bo'yicha..." />
          </div>
          <button
            onClick={() => setShowFilters(p => !p)}
            className={`inline-flex items-center gap-2 rounded border px-4 py-2 text-sm font-semibold transition-colors ${
              showFilters || hasFilters
                ? "border-primary bg-primary/8 text-primary"
                : "border-border bg-card text-foreground hover:bg-secondary"
            }`}
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filter
            {hasFilters && (
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-white font-bold">
                {(!!collegeFilter ? 1 : 0) + (!!lavozimFilter ? 1 : 0)}
              </span>
            )}
          </button>
        </div>

        {/* Filter panel */}
        {showFilters && (
          <div className="mb-6 rounded border border-border bg-card p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-muted-foreground">Kafedra</label>
                <Combobox options={collegeOptions} value={collegeFilter} onChange={setCollegeFilter} placeholder="Barcha kafedralar" />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-muted-foreground">Lavozim</label>
                <Combobox options={lavozimOptions} value={lavozimFilter} onChange={setLavozimFilter} placeholder="Barcha lavozimlar" />
              </div>
            </div>
            {hasFilters && (
              <button
                onClick={() => { setCollegeFilter(""); setLavozimFilter(""); }}
                className="mt-3 text-xs text-muted-foreground hover:text-destructive transition-colors"
              >
                Tozalash
              </button>
            )}
          </div>
        )}

        {isLoading && (
          <div className="flex justify-center py-16"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>
        )}
        {isError && (
          <div className="rounded border border-destructive/30 bg-destructive/5 p-5 text-center">
            <p className="text-sm text-destructive">Ma'lumotlarni yuklashda xatolik.</p>
          </div>
        )}
        {!isLoading && !isError && filtered.length === 0 && (
          <div className="py-16 text-center">
            <Users className="mx-auto h-10 w-10 text-muted-foreground/25 mb-3" />
            <p className="text-muted-foreground text-sm">Xodim topilmadi.</p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((u: ResUser) => (
            <UserCard
              key={u.id}
              id={u.id}
              fullName={u.fullName}
              departmentName={u.departmentName ?? ""}
              lavozim={u.lavozim}
              phoneNumber={u.phoneNumber}
              email={u.email}
              profession={u.profession ?? undefined}
              orcId={u.orcId}
              scopusId={u.scopusId}
              gender={u.gender}
              imgUrl={u.imgUrl}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

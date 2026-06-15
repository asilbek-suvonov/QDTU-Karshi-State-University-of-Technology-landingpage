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
  { label: "Home", href: "/" },
  { label: "Directory", href: "/directory" },
  { label: "Staff" },
];

export default function StaffPage() {
  const [search, setSearch] = useState("");
  const [collegeFilter, setCollegeFilter] = useState("");
  const [lavozimFilter, setLavozimFilter] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const { staff, isLoading, isError, total } = useAllStaff();
  const { data: collegesData } = useGetAllColleges();

  const collegeOptions = useMemo(
    () => (collegesData?.data ?? []).map((c) => ({ value: c.name, label: c.name })),
    [collegesData]
  );

  const lavozimOptions = useMemo(() => {
    const set = new Set<string>();
    staff.forEach((u) => { if (u.lavozim) set.add(u.lavozim); });
    return Array.from(set).sort().map((v) => ({ value: v, label: v }));
  }, [staff]);

  const filtered = useMemo(() => {
    return staff.filter((u: ResUser) => {
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        u.fullName.toLowerCase().includes(q) ||
        (u.departmentName ?? "").toLowerCase().includes(q) ||
        (u.lavozim ?? "").toLowerCase().includes(q);
      const matchCollege =
        !collegeFilter ||
        (u.departmentName ?? "").toLowerCase().includes(collegeFilter.toLowerCase());
      const matchLavozim = !lavozimFilter || u.lavozim === lavozimFilter;
      return matchSearch && matchCollege && matchLavozim;
    });
  }, [staff, search, collegeFilter, lavozimFilter]);

  const hasFilters = !!collegeFilter || !!lavozimFilter;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-10">
        <Breadcrumb items={breadcrumbs} />

        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-1">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-950/40">
              <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">Xodimlar</h1>
          </div>
          <p className="text-sm text-muted-foreground ml-[52px]">
            {isLoading ? "Yuklanmoqda..." : `${filtered.length} / ${total} ta xodim`}
          </p>
        </div>

        {/* Search + Filter bar */}
        <div className="mb-6 flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <SearchInput value={search} onChange={setSearch} placeholder="Ism, bo'lim yoki lavozim..." />
          </div>
          <button
            onClick={() => setShowFilters((p) => !p)}
            className={`inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
              showFilters || hasFilters
                ? "border-primary bg-primary/5 text-primary dark:border-primary dark:bg-primary/10"
                : "border-border bg-background text-foreground hover:bg-muted"
            }`}
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filter
            {hasFilters && (
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground font-bold">
                {(!!collegeFilter ? 1 : 0) + (!!lavozimFilter ? 1 : 0)}
              </span>
            )}
          </button>
        </div>

        {/* Filter panel */}
        {showFilters && (
          <div className="mb-6 rounded-xl border border-border bg-card p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Fakultet / Kafedra
                </label>
                <Combobox
                  options={collegeOptions}
                  value={collegeFilter}
                  onChange={setCollegeFilter}
                  placeholder="Barcha fakultetlar"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Lavozim
                </label>
                <Combobox
                  options={lavozimOptions}
                  value={lavozimFilter}
                  onChange={setLavozimFilter}
                  placeholder="Barcha lavozimlar"
                />
              </div>
            </div>
            {hasFilters && (
              <button
                onClick={() => { setCollegeFilter(""); setLavozimFilter(""); }}
                className="mt-3 text-xs text-muted-foreground hover:text-destructive transition-colors"
              >
                Filtrlarni tozalash
              </button>
            )}
          </div>
        )}

        {isLoading && (
          <div className="flex justify-center py-20">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        )}

        {isError && (
          <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-6 text-center">
            <p className="text-sm text-destructive">Ma'lumotlarni yuklashda xatolik.</p>
          </div>
        )}

        {!isLoading && !isError && filtered.length === 0 && (
          <div className="py-20 text-center">
            <Users className="mx-auto h-10 w-10 text-muted-foreground/30 mb-3" />
            <p className="text-muted-foreground text-sm">Xodim topilmadi.</p>
            {hasFilters && (
              <button
                onClick={() => { setCollegeFilter(""); setLavozimFilter(""); setSearch(""); }}
                className="mt-2 text-xs text-primary hover:underline"
              >
                Filtrlarni tozalash
              </button>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((u: ResUser) => (
            <UserCard
              key={u.id}
              id={u.id}
              fullName={u.fullName}
              departmentName={u.departmentName ?? ""}
              lavozim={u.lavozim}
              phoneNumber={u.phoneNumber}
              imgUrl={u.imgUrl}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

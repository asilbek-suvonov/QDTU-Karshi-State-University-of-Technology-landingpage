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
    <div className="p-4 max-w-7xl mx-auto">
      <Breadcrumb items={breadcrumbs} />

      {/* Header */}
      <div className="my-4 pb-4 border-b">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase">Ilmiy tarkib</p>
            <h1 className="text-2xl font-bold">Professor-o'qituvchilar</h1>
            {total > 0 && !isLoading && (
              <p className="text-xs my-1">
                {filtered.length} / {total} ta xodim topildi
              </p>
            )}
          </div>
          <Users className="h-5 w-5" />
        </div>
      </div>

      {/* Search + filter bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="flex-1">
          <SearchInput value={search} onChange={setSearch} placeholder="Ism, bo'lim yoki lavozim bo'yicha..." />
        </div>
        <button
          onClick={() => setShowFilters(p => !p)}
          className="border p-2 text-sm font-semibold inline-flex items-center gap-2"
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filter {hasFilters && `(${(collegeFilter ? 1 : 0) + (lavozimFilter ? 1 : 0)})`}
        </button>
      </div>

      {/* Filter panel */}
      {showFilters && (
        <div className="border p-4 my-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-xs uppercase font-bold">Kafedra</label>
              <Combobox options={collegeOptions} value={collegeFilter} onChange={setCollegeFilter} placeholder="Barcha kafedralar" />
            </div>
            <div>
              <label className="mb-1 block text-xs uppercase font-bold">Lavozim</label>
              <Combobox options={lavozimOptions} value={lavozimFilter} onChange={setLavozimFilter} placeholder="Barcha lavozimlar" />
            </div>
          </div>
          {hasFilters && (
            <button
              onClick={() => { setCollegeFilter(""); setLavozimFilter(""); }}
              className="underline text-xs mt-3 block"
            >
              Tozalash
            </button>
          )}
        </div>
      )}

      {isLoading && (
        <div className="py-8 text-center"><Loader2 className="h-5 w-5 animate-spin inline-block" /> Yuklanmoqda...</div>
      )}
      {isError && (
        <div className="border p-4 text-center my-4">
          <p className="text-sm">Ma'lumotlarni yuklashda xatolik.</p>
        </div>
      )}
      {!isLoading && !isError && filtered.length === 0 && (
        <div className="py-8 text-center">
          <p className="text-sm">Xodim topilmadi.</p>
        </div>
      )}

      {/* Grid ro'yxati */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
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
  );
}
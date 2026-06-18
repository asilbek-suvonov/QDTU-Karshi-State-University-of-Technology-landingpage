"use client";

import Link from "next/link";
import { ArrowRight, Loader2, Users, Building2 } from "lucide-react";
import FacultyCardsContainer from "@/components/facultity-card";
import { UserCard } from "@/components/user-card";
import { useAllStaff } from "@/hooks/useAllStaff";
import { useGetUserDashboard } from "@/hooks/useUser";
import { useGetAllColleges } from "@/hooks/useCollege";
import type { ResUser } from "@/service/user/user.type";

function StatBadge({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="p-4">
      <p className="text-xl font-bold">{value}</p>
      <p className="text-xs uppercase">{label}</p>
    </div>
  );
}

function StatsRow() {
  const { data: dash } = useGetUserDashboard();
  const { data: col } = useGetAllColleges();
  if (!dash?.data) return null;
  const d = dash.data;
  return (
    <div className="flex flex-wrap gap-4 border p-2">
      <StatBadge label="Xodimlar" value={d.countAllUsers} />
      <StatBadge label="Fakultetlar" value={col?.data?.length ?? "—"} />
      <StatBadge label="Erkaklar" value={d.countMale} />
      <StatBadge label="Ayollar" value={d.countFemale} />
    </div>
  );
}

function StaffPreview() {
  const { staff, isLoading } = useAllStaff();
  const preview = staff.slice(0, 8);

  if (isLoading)
    return <div className="py-4"><Loader2 className="h-5 w-5 animate-spin" /> Yuklanmoqda...</div>;

  if (!preview.length) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      {preview.map((u: ResUser) => (
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
  );
}

export default function Home() {
  return (
    <div className="p-4 max-w-7xl mx-auto">

      {/* ── Hero ── */}
      <section className="py-8 border-b">
        <div>
          <p className="text-xs uppercase">
            Qo'qon Davlat Texnika Universiteti — O'zbekiston
          </p>

          <h1 className="text-3xl font-bold my-2">
            Ilm-fan va Texnologiyalar Markazi
          </h1>

          <p className="my-4 text-sm max-w-xl">
            Innovatsiya, ilmiy tadqiqot va zamonaviy ta'lim orqali jamiyat
            rivojiga hissa qo'shadigan yetakchi kadrlar tayyorlaymiz.
          </p>

          <div className="flex gap-4 my-4">
            <Link href="/directory/faculty" className="underline inline-flex items-center gap-1">
              <Building2 className="h-4 w-4" /> Fakultetlar
            </Link>
            <Link href="/directory/staff" className="underline inline-flex items-center gap-1">
              <Users className="h-4 w-4" /> Xodimlar
            </Link>
          </div>

          <StatsRow />
        </div>
      </section>

      {/* ── Faculties ── */}
      <section className="py-8 border-b">
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-xs">Ta'lim tuzilmasi</p>
            <h2 className="text-xl font-bold">Fakultetlar</h2>
          </div>
          <Link href="/directory/faculty" className="underline text-sm inline-flex items-center gap-1">
            Barchasi <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        
        <FacultyCardsContainer />
      </section>

      {/* ── Staff ── */}
      <section className="py-8">
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-xs">Ilmiy tarkib</p>
            <h2 className="text-xl font-bold">Professor-o'qituvchilar</h2>
          </div>
          <Link href="/directory/staff" className="underline text-sm inline-flex items-center gap-1">
            Barchasi <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <StaffPreview />
      </section>

    </div>
  );
}
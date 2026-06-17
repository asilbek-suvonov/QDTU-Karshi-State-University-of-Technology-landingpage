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
    <div className="text-center px-6 py-4 border-r border-white/15 last:border-r-0">
      <p className="text-2xl font-bold text-white">{value}</p>
      <p className="text-xs text-white/60 uppercase tracking-wider mt-0.5">{label}</p>
    </div>
  );
}

function StatsRow() {
  const { data: dash } = useGetUserDashboard();
  const { data: col } = useGetAllColleges();
  if (!dash?.data) return null;
  const d = dash.data;
  return (
    <div className="flex flex-wrap justify-center divide-x divide-white/15 bg-white/6 rounded-lg border border-white/10">
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
    return <div className="flex justify-center py-12"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>;

  if (!preview.length) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
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
    <div className="min-h-screen bg-background">

      {/* ── Hero ── */}
      <section className="relative bg-[#0F5257] overflow-hidden">
        {/* subtle texture */}
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }}
        />

        <div className="container mx-auto px-4 py-20 sm:py-28 relative">
          <div className="max-w-3xl">
            {/* Eyebrow */}
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#E6CA9F] mb-6">
              Qo'qon Davlat Texnika Universiteti — O'zbekiston
            </p>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.1] mb-6">
              Ilm-fan va
              <br />
              <span className="text-[#E6CA9F]">Texnologiyalar</span>
              <br />
              Markazi
            </h1>

            <p className="text-base sm:text-lg text-white/65 leading-relaxed mb-10 max-w-xl">
              Innovatsiya, ilmiy tadqiqot va zamonaviy ta'lim orqali jamiyat
              rivojiga hissa qo'shadigan yetakchi kadrlar tayyorlaymiz.
            </p>

            <div className="flex flex-wrap gap-3 mb-14">
              <Link
                href="/directory/faculty"
                className="inline-flex items-center gap-2 rounded bg-white text-[#0F5257] px-5 py-2.5 text-sm font-bold hover:bg-[#E6CA9F] transition-colors duration-200"
              >
                <Building2 className="h-4 w-4" />
                Fakultetlar
              </Link>
              <Link
                href="/directory/staff"
                className="inline-flex items-center gap-2 rounded border border-white/30 text-white px-5 py-2.5 text-sm font-semibold hover:bg-white/10 transition-colors duration-200"
              >
                <Users className="h-4 w-4" />
                Xodimlar
              </Link>
            </div>

            {/* Stats */}
            <StatsRow />
          </div>
        </div>
      </section>

      {/* ── Faculties ── */}
      <section className="py-16 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="section-label mb-2">Ta'lim tuzilmasi</p>
              <h2 className="text-3xl font-black text-foreground leading-tight">Fakultetlar</h2>
              <div className="divider-gold mt-3" />
            </div>
            <Link
              href="/directory/faculty"
              className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
            >
              Barchasi <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <FacultyCardsContainer />
          <Link href="/directory/faculty" className="mt-6 flex sm:hidden items-center gap-1 text-sm font-semibold text-primary">
            Barchasini ko'rish <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* ── Staff ── */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="section-label mb-2">Ilmiy tarkib</p>
              <h2 className="text-3xl font-black text-foreground leading-tight">
                Professor-o'qituvchilar
              </h2>
              <div className="divider-gold mt-3" />
            </div>
            <Link
              href="/directory/staff"
              className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
            >
              Barchasi <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <StaffPreview />
          <Link href="/directory/staff" className="mt-6 flex sm:hidden items-center gap-1 text-sm font-semibold text-primary">
            Barchasini ko'rish <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

    </div>
  );
}

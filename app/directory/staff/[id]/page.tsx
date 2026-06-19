"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import {
  Phone, BookOpen, Mail, Loader2, Calendar,
  Download, CheckCircle2, User, Trophy, FlaskConical, MessageSquare, ExternalLink,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { AuthRequired } from "@/components/auth-required";
import { ReadMoreText } from "@/components/ui/read-more-text";
import { useAllStaff } from "@/hooks/useAllStaff";
import { useGetResearchByUser } from "@/hooks/useResearch";
import { useGetPublicationsByUser } from "@/hooks/usePublication";
import { useGetConsultationsByUser } from "@/hooks/useConsultation";
import { useGetAwardsByUser } from "@/hooks/useAward";
import { useAuth } from "@/store/auth.store";
import type { ResearchDataItem } from "@/service/research/research.type";
import type { PublicationData } from "@/service/publication/publication.type";
import type { AwardData } from "@/service/award/award.type";
import type { ConsultationData } from "@/service/consultation/consultation.type";
import axios from "axios";

// ── Tab helpers ──────────────────────────────────────────────────────────────

function EmptyTab({ icon: Icon, text }: { icon: React.ElementType; text: string }) {
  return (
    <div className="py-12 text-center border border-dashed rounded-md border-border bg-muted/10">
      <Icon className="mx-auto h-5 w-5 text-muted-foreground/30 mb-2" />
      <p className="text-xs text-muted-foreground/80">{text}</p>
    </div>
  );
}

function TabLoader() {
  return (
    <div className="flex justify-center py-12">
      <Loader2 className="h-4 w-4 animate-spin text-primary/80" />
    </div>
  );
}

function ResearchTab({ userId }: { userId: number }) {
  const { data, isLoading, error } = useGetResearchByUser(userId);
  const is403 = axios.isAxiosError(error) && error.response?.status === 403;
  const items: ResearchDataItem[] = data?.data?.body ?? [];

  if (isLoading) return <TabLoader />;
  if (is403) return <AuthRequired title="Tadqiqot ma'lumotlari" />;
  if (!items.length) return <EmptyTab icon={FlaskConical} text="Tadqiqotlar mavjud emas." />;

  return (
    <div className="space-y-3">
      {items.map(r => (
        <div key={r.id} className="p-4 border border-border rounded-md bg-card/50 hover:bg-card transition-colors">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1.5">
              <h3 className="font-semibold text-sm text-foreground/90 leading-snug">{r.name}</h3>
              {r.description && <ReadMoreText text={r.description} limit={120} />}
              <div className="text-[11px] text-muted-foreground flex items-center gap-1.5 pt-1">
                <Calendar className="h-3 w-3" /> {r.year}-yil
              </div>
            </div>
            {r.fileUrl && (
              <a href={r.fileUrl} target="_blank" rel="noopener noreferrer" download
                className="p-2 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors border border-transparent hover:border-border">
                <Download className="h-3.5 w-3.5" />
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

function PublicationsTab({ userId }: { userId: number }) {
  const { data, isLoading, error } = useGetPublicationsByUser(userId);
  const is403 = axios.isAxiosError(error) && error.response?.status === 403;
  const items: PublicationData[] = data?.data?.body ?? [];

  if (isLoading) return <TabLoader />;
  if (is403) return <AuthRequired title="Nashrlar" />;
  if (!items.length) return <EmptyTab icon={BookOpen} text="Nashrlar topilmadi." />;

  return (
    <div className="space-y-3">
      {items.map(pub => (
        <div key={pub.id} className="p-4 border border-border rounded-md bg-card/50 hover:bg-card transition-colors">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1.5">
              <h3 className="font-semibold text-sm text-foreground/90 leading-snug">{pub.name}</h3>
              <p className="text-xs text-muted-foreground/90 font-medium">{pub.institution}</p>
              <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[11px] text-muted-foreground pt-1">
                <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {pub.year}</span>
                <span>•</span>
                <span className="bg-muted px-1.5 py-0.5 rounded text-[10px]">Daraja: {pub.degree}</span>
                <span>•</span>
                <span>Muallif: {pub.author}</span>
              </div>
            </div>
            {pub.fileUrl && (
              <a href={pub.fileUrl} target="_blank" rel="noopener noreferrer"
                className="p-2 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors border border-transparent hover:border-border">
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

function AwardsTab({ userId }: { userId: number }) {
  const { data, isLoading, error } = useGetAwardsByUser(userId);
  const is403 = axios.isAxiosError(error) && error.response?.status === 403;
  const items: AwardData[] = data?.data?.body ?? [];

  if (isLoading) return <TabLoader />;
  if (is403) return <AuthRequired title="Mukofotlar" />;
  if (!items.length) return <EmptyTab icon={Trophy} text="Mukofotlar topilmadi." />;

  return (
    <div className="space-y-3">
      {items.map((a, i) => (
        <div key={i} className="p-4 border border-border rounded-md bg-card/50 space-y-2">
          <div className="flex items-start gap-2.5">
            <Trophy className="h-4 w-4 text-primary shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h3 className="font-semibold text-sm text-foreground/90">{a.name}</h3>
              {a.description && <p className="text-xs text-muted-foreground/90 leading-relaxed">{a.description}</p>}
            </div>
          </div>
          <div className="flex items-center gap-2.5 text-[11px] text-muted-foreground pt-1 border-t border-border/40">
            <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {a.year}</span>
            <span>•</span>
            <span className="capitalize">{a.memberEnum.toLowerCase()}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function ConsultationsTab({ userId }: { userId: number }) {
  const { data, isLoading, error } = useGetConsultationsByUser(userId);
  const is403 = axios.isAxiosError(error) && error.response?.status === 403;
  const items: ConsultationData[] = data?.data?.body ?? [];

  if (isLoading) return <TabLoader />;
  if (is403) return <AuthRequired title="Maslahat loyihalari" />;
  if (!items.length) return <EmptyTab icon={MessageSquare} text="Konsultatsiya loyihalari mavjud emas." />;

  return (
    <div className="space-y-3">
      {items.map(c => (
        <div key={c.id} className="p-4 border border-border rounded-md bg-card/50 space-y-2">
          <h3 className="font-semibold text-sm text-foreground/90">{c.name}</h3>
          {c.leader && <p className="text-xs text-muted-foreground">Mas'ul rahbar: <span className="text-foreground/80 font-medium">{c.leader}</span></p>}
          {c.description && <p className="text-xs text-muted-foreground leading-relaxed">{c.description}</p>}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-muted-foreground pt-1 border-t border-border/40">
            <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {c.year}</span>
            <span>•</span>
            <span className="flex items-center gap-1"><CheckCircle2 className="h-3 w-3 text-emerald-600" /> {c.finishedEnum}</span>
            <span>•</span>
            <span className="flex items-center gap-1"><User className="h-3 w-3" /> {c.member ? "Ishtirokchi" : "Tashabbuskor"}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Main profile layout ──────────────────────────────────────────────────────

function StaffDetail({ id }: { id: string }) {
  const { staff, isLoading } = useAllStaff();
  const { isAuthenticated } = useAuth();
  const numId = Number(id);
  const user = staff.find(u => u.id === numId);

  if (isLoading) {
    return (
      <div className="flex justify-center min-h-[60vh] items-center">
        <Loader2 className="h-5 w-5 animate-spin text-primary" />
      </div>
    );
  }
  if (!user) notFound();

  const initials = user.fullName.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();
  const breadcrumbs = [
    { label: "Asosiy", href: "/" },
    { label: "Xodimlar", href: "/directory/staff" },
    { label: user.fullName },
  ];

  return (
    <div className="min-h-screen bg-background/50">
      <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        <Breadcrumb items={breadcrumbs} />

        {/* 2 Ustunli Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Chap ustun - Shaxsiy vizual profil (Sticky) */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-4">
            <div className="bg-card border border-border rounded-md p-5 shadow-[0_1px_3px_rgba(0,0,0,0.01)] text-center sm:text-left lg:text-center">
              <Avatar className="h-20 w-20 rounded-md border mx-auto sm:mx-0 lg:mx-auto mb-4 object-cover">
                {user.imgUrl && <AvatarImage src={user.imgUrl} alt={user.fullName} className="object-cover" />}
                <AvatarFallback className="bg-muted text-muted-foreground font-semibold text-xl rounded-md">
                  {initials}
                </AvatarFallback>
              </Avatar>

              <div className="space-y-1">
                <h1 className="text-lg font-bold tracking-tight text-foreground leading-tight">{user.fullName}</h1>
                {user.lavozim && <p className="text-xs font-semibold text-primary/90 uppercase tracking-wide">{user.lavozim}</p>}
                {user.profession && <p className="text-xs text-muted-foreground/80 italic">{user.profession}</p>}
              </div>

              {/* Aloqa maydonlari */}
              <div className="mt-5 pt-5 border-t border-border/60 text-left text-xs space-y-2.5 text-muted-foreground">
                {user.departmentName && (
                  <div className="flex items-start gap-2.5">
                    <BookOpen className="h-3.5 w-3.5 shrink-0 text-muted-foreground/50 mt-0.5" />
                    <span className="text-foreground/80">{user.departmentName}</span>
                  </div>
                )}
                {user.phoneNumber && (
                  <div className="flex items-center gap-2.5">
                    <Phone className="h-3.5 w-3.5 shrink-0 text-muted-foreground/50" />
                    <span className="text-foreground/80 font-mono">{user.phoneNumber}</span>
                  </div>
                )}
                {user.email && (
                  <div className="flex items-center gap-2.5">
                    <Mail className="h-3.5 w-3.5 shrink-0 text-muted-foreground/50" />
                    <span className="text-foreground/80 break-all font-mono">{user.email}</span>
                  </div>
                )}
                {(user.gender !== undefined || user.age > 0) && (
                  <div className="flex gap-4 pt-1 text-[11px] border-t border-border/40 mt-2 text-muted-foreground/70">
                    {user.gender !== undefined && <span>Jinsi: {user.gender ? "Erkak" : "Ayol"}</span>}
                    {user.age > 0 && <span>Yoshi: {user.age} da</span>}
                  </div>
                )}
              </div>

              {/* Akademik ID nishonlari */}
              {(user.orcId || user.scopusId || user.scienceId) && (
                <div className="mt-4 pt-4 border-t border-border/60 flex flex-wrap gap-1.5 justify-center sm:justify-start lg:justify-center">
                  {user.orcId && (
                    <span className="bg-muted font-mono text-[10px] text-muted-foreground px-2 py-0.5 rounded border border-border/40">
                      ORCID: {user.orcId}
                    </span>
                  )}
                  {user.scopusId && (
                    <span className="bg-muted font-mono text-[10px] text-muted-foreground px-2 py-0.5 rounded border border-border/40">
                      Scopus: {user.scopusId}
                    </span>
                  )}
                  {user.scienceId && (
                    <span className="bg-muted font-mono text-[10px] text-muted-foreground px-2 py-0.5 rounded border border-border/40">
                      ScienceID: {user.scienceId}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* O'ng ustun - Akademik faoliyat ma'lumotlari (Tabs) */}
          <div className="lg:col-span-8 bg-card border border-border rounded-md p-6 shadow-[0_1px_3px_rgba(0,0,0,0.01)]">
            <Tabs defaultValue="research" className="w-full space-y-5">
              <TabsList className="flex bg-transparent border-b border-border rounded-none h-auto p-0 gap-6 justify-start overflow-x-auto no-scrollbar">
                <TabsTrigger value="research" className="rounded-none bg-transparent border-b-2 border-transparent px-0 pb-2.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground data-[state=active]:border-primary data-[state=active]:text-foreground data-[state=active]:bg-transparent shadow-none transition-all">
                  Tadqiqotlar
                </TabsTrigger>
                <TabsTrigger value="publications" className="rounded-none bg-transparent border-b-2 border-transparent px-0 pb-2.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground data-[state=active]:border-primary data-[state=active]:text-foreground data-[state=active]:bg-transparent shadow-none transition-all">
                  Nashrlar
                </TabsTrigger>
                <TabsTrigger value="awards" className="rounded-none bg-transparent border-b-2 border-transparent px-0 pb-2.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground data-[state=active]:border-primary data-[state=active]:text-foreground data-[state=active]:bg-transparent shadow-none transition-all">
                  Mukofotlar
                </TabsTrigger>
                <TabsTrigger value="consultations" className="rounded-none bg-transparent border-b-2 border-transparent px-0 pb-2.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground data-[state=active]:border-primary data-[state=active]:text-foreground data-[state=active]:bg-transparent shadow-none transition-all">
                  Maslahat
                </TabsTrigger>
              </TabsList>

              <div>
                {!isAuthenticated ? (
                  <>
                    <TabsContent value="research" className="outline-none"><AuthRequired title="Tadqiqot ma'lumotlari" /></TabsContent>
                    <TabsContent value="publications" className="outline-none"><AuthRequired title="Nashrlar" /></TabsContent>
                    <TabsContent value="awards" className="outline-none"><AuthRequired title="Mukofotlar" /></TabsContent>
                    <TabsContent value="consultations" className="outline-none"><AuthRequired title="Maslahat loyihalari" /></TabsContent>
                  </>
                ) : (
                  <>
                    <TabsContent value="research" className="outline-none"><ResearchTab userId={numId} /></TabsContent>
                    <TabsContent value="publications" className="outline-none"><PublicationsTab userId={numId} /></TabsContent>
                    <TabsContent value="awards" className="outline-none"><AwardsTab userId={numId} /></TabsContent>
                    <TabsContent value="consultations" className="outline-none"><ConsultationsTab userId={numId} /></TabsContent>
                  </>
                )}
              </div>
            </Tabs>
          </div>

        </div>
      </div>
    </div>
  );
}

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  return <StaffDetail id={id} />;
}
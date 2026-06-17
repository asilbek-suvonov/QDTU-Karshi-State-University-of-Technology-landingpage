"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import {
  Phone, BookOpen, Mail, Loader2, Calendar,
  Globe, Download, CheckCircle2, User, Trophy, FlaskConical, MessageSquare, ExternalLink,
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
    <div className="py-12 text-center">
      <Icon className="mx-auto h-8 w-8 text-muted-foreground/20 mb-3" />
      <p className="text-sm text-muted-foreground">{text}</p>
    </div>
  );
}

function TabLoader() {
  return <div className="flex justify-center py-10"><Loader2 className="h-5 w-5 animate-spin text-muted-foreground" /></div>;
}

function ResearchTab({ userId }: { userId: number }) {
  const { data, isLoading, error } = useGetResearchByUser(userId);
  const is403 = axios.isAxiosError(error) && error.response?.status === 403;
  const items: ResearchDataItem[] = data?.data?.body ?? [];

  if (isLoading) return <TabLoader />;
  if (is403) return <AuthRequired title="Tadqiqot ma'lumotlari" />;
  if (!items.length) return <EmptyTab icon={FlaskConical} text="Tadqiqot topilmadi." />;

  return (
    <div className="space-y-3">
      {items.map(r => (
        <div key={r.id} className="group card-academic p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-sm text-foreground group-hover:text-primary transition-colors">{r.name}</h3>
              {r.description && <ReadMoreText text={r.description} limit={60} />}
            </div>
            {r.fileUrl && (
              <a href={r.fileUrl} target="_blank" rel="noopener noreferrer" download
                className="shrink-0 flex h-7 w-7 items-center justify-center rounded border border-border text-muted-foreground hover:border-primary hover:text-primary transition-colors">
                <Download className="h-3 w-3" />
              </a>
            )}
          </div>
          <div className="flex gap-2 mt-2">
            <span className="inline-flex items-center gap-1 text-[11px] border border-border rounded px-2 py-0.5 text-muted-foreground">
              <Calendar className="h-3 w-3" />{r.year}
            </span>
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
  if (!items.length) return <EmptyTab icon={BookOpen} text="Nashr topilmadi." />;

  return (
    <div className="space-y-3">
      {items.map(pub => (
        <div key={pub.id} className="group card-academic p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="font-bold text-sm text-foreground group-hover:text-primary transition-colors">{pub.name}</h3>
              <p className="text-xs text-muted-foreground mt-0.5 truncate">{pub.institution}</p>
            </div>
            {pub.fileUrl && (
              <a href={pub.fileUrl} target="_blank" rel="noopener noreferrer"
                className="shrink-0 text-muted-foreground hover:text-primary transition-colors">
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            )}
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            <span className="inline-flex items-center gap-1 text-[11px] border border-border rounded px-2 py-0.5 text-muted-foreground">
              <Calendar className="h-3 w-3" />{pub.year}
            </span>
            <span className="text-[11px] bg-secondary rounded px-2 py-0.5 text-foreground">{pub.degree}</span>
            <span className="text-[11px] text-muted-foreground/60">{pub.author}</span>
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
  if (!items.length) return <EmptyTab icon={Trophy} text="Mukofot topilmadi." />;

  return (
    <div className="space-y-3">
      {items.map((a, i) => (
        <div key={i} className="group card-academic p-4">
          <h3 className="font-bold text-sm text-foreground group-hover:text-primary transition-colors">{a.name}</h3>
          {a.description && <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{a.description}</p>}
          <div className="flex gap-2 mt-2">
            <span className="inline-flex items-center gap-1 text-[11px] border border-border rounded px-2 py-0.5 text-muted-foreground">
              <Calendar className="h-3 w-3" />{a.year}
            </span>
            <span className="text-[11px] bg-secondary rounded px-2 py-0.5 text-foreground">{a.memberEnum}</span>
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
  if (!items.length) return <EmptyTab icon={MessageSquare} text="Maslahat topilmadi." />;

  return (
    <div className="space-y-3">
      {items.map(c => (
        <div key={c.id} className="group card-academic p-4">
          <h3 className="font-bold text-sm text-foreground group-hover:text-primary transition-colors">{c.name}</h3>
          {c.leader && <p className="text-xs text-muted-foreground mt-0.5">Rahbar: {c.leader}</p>}
          {c.description && <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{c.description}</p>}
          <div className="flex gap-2 mt-2">
            <span className="inline-flex items-center gap-1 text-[11px] border border-border rounded px-2 py-0.5 text-muted-foreground">
              <CheckCircle2 className="h-3 w-3" />{c.finishedEnum}
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] bg-secondary rounded px-2 py-0.5 text-foreground">
              <User className="h-3 w-3" />{c.member ? "A'zo" : "Rahbar"}
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
              <Calendar className="h-3 w-3" />{c.year}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Main profile ─────────────────────────────────────────────────────────────

function StaffDetail({ id }: { id: string }) {
  const { staff, isLoading } = useAllStaff();
  const { isAuthenticated } = useAuth();
  const numId = Number(id);
  const user = staff.find(u => u.id === numId);

  if (isLoading) {
    return <div className="flex justify-center min-h-[60vh] items-center"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>;
  }
  if (!user) notFound();

  const initials = user.fullName.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();
  const breadcrumbs = [
    { label: "Asosiy", href: "/" },
    { label: "Xodimlar", href: "/directory/staff" },
    { label: user.fullName },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-10">
        <Breadcrumb items={breadcrumbs} />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-lg border border-border bg-card shadow-sm overflow-hidden">
              {/* Top accent */}
              <div className="h-1 w-full bg-primary" />
              <div className="p-5">
                {/* Avatar */}
                <div className="flex flex-col items-center text-center mb-5">
                  <Avatar className="h-24 w-24 rounded-lg border-2 border-border shadow-sm mb-3">
                    {user.imgUrl && <AvatarImage src={user.imgUrl} alt={user.fullName} className="object-cover" />}
                    <AvatarFallback className="rounded-lg bg-secondary text-primary font-black text-xl">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <h1 className="font-black text-base text-foreground leading-snug">{user.fullName}</h1>
                  {user.lavozim && (
                    <span className="mt-1.5 inline-block text-xs font-bold text-primary bg-primary/8 dark:bg-primary/20 px-2.5 py-0.5 rounded">
                      {user.lavozim}
                    </span>
                  )}
                </div>

                {/* Gold divider */}
                <div className="divider-gold mx-auto mb-4" />

                {/* Info */}
                <div className="space-y-2.5 text-sm">
                  {user.profession && (
                    <p className="text-xs text-muted-foreground text-center italic">{user.profession}</p>
                  )}
                  {user.departmentName && (
                    <div className="flex items-start gap-2 text-xs text-muted-foreground">
                      <BookOpen className="h-3.5 w-3.5 mt-0.5 shrink-0 text-primary/50" />
                      <span>{user.departmentName}</span>
                    </div>
                  )}
                  {user.phoneNumber && (
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Phone className="h-3.5 w-3.5 shrink-0 text-primary/50" />
                      <span>{user.phoneNumber}</span>
                    </div>
                  )}
                  {user.email && (
                    <div className="flex items-start gap-2 text-xs text-muted-foreground">
                      <Mail className="h-3.5 w-3.5 mt-0.5 shrink-0 text-primary/50" />
                      <span className="break-all">{user.email}</span>
                    </div>
                  )}
                  {user.gender !== undefined && (
                    <div className="text-xs text-muted-foreground">
                      Jinsi: {user.gender ? "Erkak" : "Ayol"}
                    </div>
                  )}
                  {user.age > 0 && (
                    <div className="text-xs text-muted-foreground">Yoshi: {user.age}</div>
                  )}
                </div>

                {/* Academic IDs */}
                {(user.orcId || user.scopusId || user.scienceId || user.researcherId) && (
                  <div className="mt-4 pt-4 border-t border-border space-y-2">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Akademik profil</p>
                    {user.orcId && (
                      <div className="flex items-center gap-1.5 text-xs">
                        <ExternalLink className="h-3 w-3 text-[#5C8A00]" />
                        <span className="text-muted-foreground">ORCID:</span>
                        <span className="font-mono text-[10px] truncate">{user.orcId}</span>
                      </div>
                    )}
                    {user.scopusId && (
                      <div className="flex items-center gap-1.5 text-xs">
                        <Globe className="h-3 w-3 text-orange-500" />
                        <span className="text-muted-foreground">Scopus:</span>
                        <span className="font-mono text-[10px] truncate">{user.scopusId}</span>
                      </div>
                    )}
                    {user.scienceId && (
                      <div className="flex items-center gap-1.5 text-xs">
                        <ExternalLink className="h-3 w-3 text-blue-500" />
                        <span className="text-muted-foreground">Science ID:</span>
                        <span className="font-mono text-[10px] truncate">{user.scienceId}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Tabs */}
   
          <div className="lg:col-span-3">
            <Tabs defaultValue="research">
              <TabsList className="grid w-full grid-cols-4 bg-secondary h-10 rounded-lg mb-5">
                <TabsTrigger value="research" className="text-xs font-semibold data-[state=active]:bg-card data-[state=active]:text-primary data-[state=active]:shadow-sm">
                  Tadqiqot
                </TabsTrigger>
                <TabsTrigger value="publications" className="text-xs font-semibold data-[state=active]:bg-card data-[state=active]:text-primary data-[state=active]:shadow-sm">
                  Nashrlar
                </TabsTrigger>
                <TabsTrigger value="awards" className="text-xs font-semibold data-[state=active]:bg-card data-[state=active]:text-primary data-[state=active]:shadow-sm">
                  Mukofotlar
                </TabsTrigger>
                <TabsTrigger value="consultations" className="text-xs font-semibold data-[state=active]:bg-card data-[state=active]:text-primary data-[state=active]:shadow-sm">
                  Maslahat
                </TabsTrigger>
              </TabsList>

              {!isAuthenticated ? (
                <>
                  <TabsContent value="research"><AuthRequired title="Tadqiqot ma'lumotlari" /></TabsContent>
                  <TabsContent value="publications"><AuthRequired title="Nashrlar" /></TabsContent>
                  <TabsContent value="awards"><AuthRequired title="Mukofotlar" /></TabsContent>
                  <TabsContent value="consultations"><AuthRequired title="Maslahat loyihalari" /></TabsContent>
                </>
              ) : (
                <>
                  <TabsContent value="research"><ResearchTab userId={numId} /></TabsContent>
                  <TabsContent value="publications"><PublicationsTab userId={numId} /></TabsContent>
                  <TabsContent value="awards"><AwardsTab userId={numId} /></TabsContent>
                  <TabsContent value="consultations"><ConsultationsTab userId={numId} /></TabsContent>
                </>
              )}
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

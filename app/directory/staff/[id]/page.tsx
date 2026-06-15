"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import {
  Phone, BookOpen, Mail, Loader2, Calendar, Globe,
  FileText, ExternalLink, CheckCircle2, User, Trophy, FlaskConical, MessageSquare,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
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

// ── Tab components ──────────────────────────────────────────────────────────

function ResearchTab({ userId }: { userId: number }) {
  const { data, isLoading, error } = useGetResearchByUser(userId);
  const is403 = axios.isAxiosError(error) && error.response?.status === 403;
  const items: ResearchDataItem[] = data?.data?.body ?? [];

  if (isLoading) return <div className="flex justify-center py-10"><Loader2 className="h-5 w-5 animate-spin text-muted-foreground" /></div>;
  if (is403) return <AuthRequired title="Tadqiqot ma'lumotlari" />;
  if (!items.length) return <EmptyState icon={FlaskConical} text="Tadqiqot topilmadi." />;

  return (
    <div className="space-y-3">
      {items.map((r) => (
        <div key={r.id} className="group rounded-xl border border-border bg-card p-5 hover:border-primary/30 hover:shadow-sm transition-all">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-medium text-foreground leading-snug group-hover:text-primary transition-colors">{r.name}</h3>
            {r.fileUrl && (
              <a href={r.fileUrl} target="_blank" rel="noopener noreferrer" className="shrink-0 text-muted-foreground hover:text-foreground">
                <FileText className="h-4 w-4" />
              </a>
            )}
          </div>
          {r.description && <ReadMoreText text={r.description} limit={80} />}
          <div className="mt-3 flex flex-wrap gap-2">
            <Badge variant="outline" className="gap-1 text-xs bg-red-50 text-red-600 border-red-100 dark:bg-red-950/30 dark:text-red-400 dark:border-red-900">
              <Calendar className="h-3 w-3" />{r.year}
            </Badge>
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

  if (isLoading) return <div className="flex justify-center py-10"><Loader2 className="h-5 w-5 animate-spin text-muted-foreground" /></div>;
  if (is403) return <AuthRequired title="Nashrlar" />;
  if (!items.length) return <EmptyState icon={BookOpen} text="Nashr topilmadi." />;

  return (
    <div className="space-y-3">
      {items.map((pub) => (
        <div key={pub.id} className="group rounded-xl border border-border bg-card p-5 hover:border-primary/30 hover:shadow-sm transition-all">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="font-medium text-foreground leading-snug group-hover:text-primary transition-colors">{pub.name}</h3>
              <p className="mt-0.5 text-xs text-muted-foreground truncate">{pub.institution}</p>
            </div>
            {pub.fileUrl && (
              <a href={pub.fileUrl} target="_blank" rel="noopener noreferrer" className="shrink-0 text-muted-foreground hover:text-foreground">
                <ExternalLink className="h-4 w-4" />
              </a>
            )}
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            <Badge variant="outline" className="gap-1 text-xs bg-red-50 text-red-600 border-red-100 dark:bg-red-950/30 dark:text-red-400 dark:border-red-900">
              <Calendar className="h-3 w-3" />{pub.year}
            </Badge>
            <Badge variant="outline" className="text-xs bg-sky-50 text-sky-600 border-sky-100 dark:bg-sky-950/30 dark:text-sky-400 dark:border-sky-900">
              <Globe className="h-3 w-3 mr-1" />{pub.degree}
            </Badge>
            <Badge variant="outline" className="text-xs bg-purple-50 text-purple-600 border-purple-100 dark:bg-purple-950/30 dark:text-purple-400 dark:border-purple-900">
              {pub.author}
            </Badge>
            {pub.type && <Badge variant="outline" className="text-xs">{pub.type}</Badge>}
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

  if (isLoading) return <div className="flex justify-center py-10"><Loader2 className="h-5 w-5 animate-spin text-muted-foreground" /></div>;
  if (is403) return <AuthRequired title="Mukofotlar" />;
  if (!items.length) return <EmptyState icon={Trophy} text="Mukofot topilmadi." />;

  return (
    <div className="space-y-3">
      {items.map((a, i) => (
        <div key={i} className="group rounded-xl border border-border bg-card p-5 hover:border-primary/30 hover:shadow-sm transition-all">
          <h3 className="font-medium text-foreground leading-snug group-hover:text-primary transition-colors">{a.name}</h3>
          {a.description && <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{a.description}</p>}
          <div className="mt-3 flex flex-wrap gap-2">
            <Badge variant="outline" className="gap-1 text-xs bg-red-50 text-red-600 border-red-100 dark:bg-red-950/30 dark:text-red-400 dark:border-red-900">
              <Calendar className="h-3 w-3" />{a.year}
            </Badge>
            <Badge variant="outline" className="text-xs bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-950/30 dark:text-blue-400 dark:border-blue-900">
              {a.memberEnum}
            </Badge>
            {a.awardEnum && (
              <Badge variant="outline" className="text-xs bg-amber-50 text-amber-600 border-amber-100 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-900">
                {a.awardEnum.replace(/_/g, " ")}
              </Badge>
            )}
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

  if (isLoading) return <div className="flex justify-center py-10"><Loader2 className="h-5 w-5 animate-spin text-muted-foreground" /></div>;
  if (is403) return <AuthRequired title="Maslahat loyihalari" />;
  if (!items.length) return <EmptyState icon={MessageSquare} text="Maslahat topilmadi." />;

  return (
    <div className="space-y-3">
      {items.map((c) => (
        <div key={c.id} className="group rounded-xl border border-border bg-card p-5 hover:border-primary/30 hover:shadow-sm transition-all">
          <h3 className="font-medium text-foreground leading-snug group-hover:text-primary transition-colors">{c.name}</h3>
          {c.leader && <p className="mt-0.5 text-xs text-muted-foreground">Rahbar: {c.leader}</p>}
          {c.description && <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{c.description}</p>}
          <div className="mt-3 flex flex-wrap gap-2">
            <Badge variant="outline" className="gap-1 text-xs bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-900">
              <CheckCircle2 className="h-3 w-3" />{c.finishedEnum}
            </Badge>
            <Badge variant="outline" className="gap-1 text-xs">
              <User className="h-3 w-3" />{c.member ? "A'zo" : "Rahbar"}
            </Badge>
            <Badge variant="outline" className="gap-1 text-xs bg-red-50 text-red-600 border-red-100 dark:bg-red-950/30 dark:text-red-400 dark:border-red-900">
              <Calendar className="h-3 w-3" />{c.year}
            </Badge>
          </div>
        </div>
      ))}
    </div>
  );
}

function EmptyState({ icon: Icon, text }: { icon: React.ElementType; text: string }) {
  return (
    <div className="py-16 text-center">
      <Icon className="mx-auto h-10 w-10 text-muted-foreground/25 mb-3" />
      <p className="text-sm text-muted-foreground">{text}</p>
    </div>
  );
}

// ── Main ────────────────────────────────────────────────────────────────────

function StaffDetail({ id }: { id: string }) {
  const { staff, isLoading } = useAllStaff();
  const { isAuthenticated } = useAuth();
  const numId = Number(id);
  const user = staff.find((u) => u.id === numId);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }
  if (!user) notFound();

  const initials = user.fullName.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Staff", href: "/directory/staff" },
    { label: user.fullName },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-10">
        <Breadcrumb items={breadcrumbs} />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="sticky top-24 rounded-xl border border-border bg-card overflow-hidden">
              <div className="h-20 bg-gradient-to-r from-primary/20 to-primary/5" />
              <div className="px-5 pb-5 -mt-10">
                <Avatar className="h-20 w-20 border-4 border-card shadow-md mb-3">
                  {user.imgUrl && <AvatarImage src={user.imgUrl} alt={user.fullName} className="object-cover" />}
                  <AvatarFallback className="text-xl font-bold">{initials}</AvatarFallback>
                </Avatar>

                <h1 className="text-lg font-bold text-foreground leading-tight">{user.fullName}</h1>
                {user.lavozim && (
                  <Badge variant="secondary" className="mt-1.5 text-xs bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400 border border-blue-200/60 dark:border-blue-900/50">
                    {user.lavozim}
                  </Badge>
                )}

                <div className="mt-4 space-y-2.5 text-sm text-muted-foreground border-t border-border pt-4">
                  {user.departmentName && (
                    <div className="flex items-start gap-2">
                      <BookOpen className="h-4 w-4 shrink-0 mt-0.5" />
                      <span>{user.departmentName}</span>
                    </div>
                  )}
                  {user.phoneNumber && (
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 shrink-0" />
                      <span>{user.phoneNumber}</span>
                    </div>
                  )}
                  {user.email && (
                    <div className="flex items-start gap-2">
                      <Mail className="h-4 w-4 shrink-0 mt-0.5" />
                      <span className="truncate">{user.email}</span>
                    </div>
                  )}
                  {user.profession && (
                    <div className="pt-1 border-t border-border">
                      <p className="text-xs text-muted-foreground/70 mb-0.5">Mutaxassislik</p>
                      <p className="text-foreground text-sm">{user.profession}</p>
                    </div>
                  )}
                  {user.orcId && (
                    <div>
                      <p className="text-xs text-muted-foreground/70 mb-0.5">ORCID</p>
                      <p className="text-xs font-mono">{user.orcId}</p>
                    </div>
                  )}
                  {user.scopusId && (
                    <div>
                      <p className="text-xs text-muted-foreground/70 mb-0.5">Scopus ID</p>
                      <p className="text-xs font-mono">{user.scopusId}</p>
                    </div>
                  )}
                  {user.scienceId && (
                    <div>
                      <p className="text-xs text-muted-foreground/70 mb-0.5">Science ID</p>
                      <p className="text-xs font-mono">{user.scienceId}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="md:col-span-3">
            {!isAuthenticated ? (
              <Tabs defaultValue="research">
                <TabsList className="grid w-full grid-cols-4 bg-muted h-10">
                  <TabsTrigger value="research" className="text-xs sm:text-sm">Research</TabsTrigger>
                  <TabsTrigger value="publications" className="text-xs sm:text-sm">Publications</TabsTrigger>
                  <TabsTrigger value="awards" className="text-xs sm:text-sm">Awards</TabsTrigger>
                  <TabsTrigger value="consultations" className="text-xs sm:text-sm">Consults</TabsTrigger>
                </TabsList>
                <div className="mt-4">
                  <TabsContent value="research"><AuthRequired title="Tadqiqot ma'lumotlari" /></TabsContent>
                  <TabsContent value="publications"><AuthRequired title="Nashrlar" /></TabsContent>
                  <TabsContent value="awards"><AuthRequired title="Mukofotlar" /></TabsContent>
                  <TabsContent value="consultations"><AuthRequired title="Maslahat loyihalari" /></TabsContent>
                </div>
              </Tabs>
            ) : (
              <Tabs defaultValue="research">
                <TabsList className="grid w-full grid-cols-4 bg-muted h-10">
                  <TabsTrigger value="research" className="text-xs sm:text-sm">Research</TabsTrigger>
                  <TabsTrigger value="publications" className="text-xs sm:text-sm">Publications</TabsTrigger>
                  <TabsTrigger value="awards" className="text-xs sm:text-sm">Awards</TabsTrigger>
                  <TabsTrigger value="consultations" className="text-xs sm:text-sm">Consults</TabsTrigger>
                </TabsList>
                <div className="mt-4">
                  <TabsContent value="research"><ResearchTab userId={numId} /></TabsContent>
                  <TabsContent value="publications"><PublicationsTab userId={numId} /></TabsContent>
                  <TabsContent value="awards"><AwardsTab userId={numId} /></TabsContent>
                  <TabsContent value="consultations"><ConsultationsTab userId={numId} /></TabsContent>
                </div>
              </Tabs>
            )}
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

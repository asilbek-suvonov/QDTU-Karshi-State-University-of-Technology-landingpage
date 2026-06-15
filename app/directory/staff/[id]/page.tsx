"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Download,
  Calendar,
  CheckCircle2,
  User,
  ExternalLink,
  FileText,
  Building,
  Loader2,
} from "lucide-react";
import { ReadMoreText } from "@/components/ui/read-more-text";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { useGetTeacherById } from "@/hooks/useTeacher";
import { useGetResearchByUser } from "@/hooks/useResearch";
import { useGetPublicationsByUser } from "@/hooks/usePublication";
import { useGetConsultationsByUser } from "@/hooks/useConsultation";
import { useGetAwardsByUser } from "@/hooks/useAward";

function StaffProfileContent({ id }: { id: string }) {
  const { data: teacherData, isLoading, isError } = useGetTeacherById(id);
  const { data: researchData } = useGetResearchByUser(id);
  const { data: publicationsData } = useGetPublicationsByUser(id);
  const { data: consultationsData } = useGetConsultationsByUser(id);
  const { data: awardsData } = useGetAwardsByUser(id);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (isError || !teacherData?.data) {
    notFound();
  }

  const teacher = teacherData.data;

  const initials = teacher.fullName
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Staff", href: "/directory/staff" },
    { label: teacher.fullName },
  ];

  const research = researchData?.data?.body ?? [];
  const publications = publicationsData?.data?.body ?? [];
  const consultations = consultationsData?.data?.body ?? [];
  const awards = awardsData?.data?.body ?? [];

  return (
    <div className="container mx-auto px-4 py-10 min-h-screen">
      <Breadcrumb items={breadcrumbItems} />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-8">
        {/* Left Column */}
        <div className="md:col-span-1">
          <Card className="sticky top-24 bg-card border-border shadow-lg overflow-hidden p-0">
            <div className="h-24 bg-gradient-to-r from-primary/80 to-secondary/80"></div>
            <CardContent className="p-6 pt-0 space-y-6">
              <div className="flex flex-col items-center text-center -mt-18">
                <Avatar className="h-28 w-28 border-4 border-card shadow-md">
                  {teacher.imgUrl && (
                    <AvatarImage
                      src={teacher.imgUrl}
                      alt={teacher.fullName}
                      className="object-cover"
                    />
                  )}
                  <AvatarFallback className="text-4xl">{initials}</AvatarFallback>
                </Avatar>
                <h1 className="mt-2 text-2xl font-bold text-foreground">
                  {teacher.fullName}
                </h1>
                {teacher.position && (
                  <Badge
                    variant="secondary"
                    className="bg-blue-50 text-blue-700 hover:bg-blue-50 dark:bg-blue-950/50 dark:text-blue-400 dark:hover:bg-blue-950/50 border border-blue-200/60 dark:border-blue-900/50 px-2 py-0.5 rounded-md text-xs font-medium mt-2"
                  >
                    {teacher.position}
                  </Badge>
                )}
              </div>

              <div className="space-y-4 pt-6 border-t border-border">
                {teacher.phone && (
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span className="font-medium">Tel:</span> {teacher.phone}
                  </div>
                )}
                {teacher.collegeName && (
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Building className="h-4 w-4" /> {teacher.collegeName}
                  </div>
                )}
                {teacher.departmentName && (
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <User className="h-4 w-4" /> {teacher.departmentName}
                  </div>
                )}
                {teacher.birthDate && (
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" /> {teacher.birthDate}
                  </div>
                )}
                {teacher.scientificDegree && (
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span className="font-medium">Ilmiy daraja:</span>{" "}
                    {teacher.scientificDegree}
                  </div>
                )}
                {teacher.academicTitle && (
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span className="font-medium">Unvon:</span>{" "}
                    {teacher.academicTitle}
                  </div>
                )}
                <Button className="w-full mt-4" variant="outline">
                  <Download className="mr-2 h-4 w-4" /> Download Resume
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="md:col-span-3 space-y-6">
          <Tabs defaultValue="research" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-muted">
              <TabsTrigger value="research">Research</TabsTrigger>
              <TabsTrigger value="publications">Publications</TabsTrigger>
              <TabsTrigger value="awards">Awards</TabsTrigger>
              <TabsTrigger value="consultations">Consultations</TabsTrigger>
            </TabsList>

            <TabsContent value="research" className="space-y-4">
              {research.length > 0 ? (
                research.map((res) => (
                  <div
                    key={res.id}
                    className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm transition-all hover:shadow-md"
                  >
                    <h3 className="font-normal text-slate-900 dark:text-white text-base leading-snug">
                      {res.name}
                    </h3>
                    {res.description && (
                      <ReadMoreText text={res.description} limit={120} />
                    )}
                    <div className="flex gap-2 mt-3">
                      <Badge
                        variant="outline"
                        className="font-normal bg-red-50 text-red-600 dark:bg-red-950/30 dark:text-red-400 border-red-100 dark:border-red-900"
                      >
                        <Calendar className="w-3.5 h-3.5 mr-1" />
                        {res.year}
                      </Badge>
                      {res.fileUrl && (
                        <a href={res.fileUrl} target="_blank" rel="noopener noreferrer">
                          <Badge
                            variant="outline"
                            className="font-normal bg-blue-50 text-blue-600 dark:bg-blue-950/30 dark:text-blue-400 border-blue-100 dark:border-blue-900 cursor-pointer"
                          >
                            <FileText className="w-3.5 h-3.5 mr-1" /> Fayl
                          </Badge>
                        </a>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground">
                  No research projects found.
                </p>
              )}
            </TabsContent>

            <TabsContent value="publications" className="space-y-4">
              {publications.length > 0 ? (
                publications.map((pub) => (
                  <div
                    key={pub.id}
                    className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-all"
                  >
                    <div className="flex justify-between items-start">
                      <h4 className="font-normal text-slate-900 dark:text-white text-base">
                        {pub.name}
                      </h4>
                      <div className="flex gap-2 text-slate-400">
                        {pub.fileUrl && (
                          <a href={pub.fileUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>
                    <p className="text-xs font-normal text-slate-400 dark:text-zinc-500 mt-1 mb-3">
                      {pub.institution}
                    </p>
                    <div className="flex gap-2 mt-2">
                      <Badge
                        variant="outline"
                        className="font-normal bg-red-50 text-red-600 dark:bg-red-950/30 dark:text-red-400 border-red-100 dark:border-red-900"
                      >
                        <Calendar className="w-3.5 h-3.5 mr-1" />
                        {pub.year}
                      </Badge>
                      <Badge
                        variant="secondary"
                        className="font-normal bg-blue-50 text-blue-600 dark:bg-blue-950/30 dark:text-blue-400 border-blue-100 dark:border-blue-900"
                      >
                        {pub.degree}
                      </Badge>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground">No publications found.</p>
              )}
            </TabsContent>

            <TabsContent value="awards" className="space-y-4">
              {awards.length > 0 ? (
                awards.map((award, idx) => (
                  <div
                    key={idx}
                    className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-all"
                  >
                    <h3 className="font-normal text-slate-900 dark:text-white text-base leading-snug">
                      {award.name}
                    </h3>
                    <p className="text-xs font-normal text-slate-400 dark:text-zinc-500 mt-1 mb-3">
                      {award.description}
                    </p>
                    <div className="flex gap-2">
                      <Badge className="font-normal bg-red-50 text-red-600 dark:bg-red-950/30 dark:text-red-400 border-red-100 dark:border-red-900">
                        <Calendar className="w-3.5 h-3.5 mr-1" />
                        {award.year}
                      </Badge>
                      <Badge className="font-normal bg-blue-50 text-blue-600 dark:bg-blue-950/30 dark:text-blue-400 border-blue-100 dark:border-blue-900">
                        <Building className="w-3.5 h-3.5 mr-1" />
                        {award.memberEnum}
                      </Badge>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground">No awards found.</p>
              )}
            </TabsContent>

            <TabsContent value="consultations" className="space-y-4">
              {consultations.length > 0 ? (
                consultations.map((c) => (
                  <div
                    key={c.id}
                    className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-all"
                  >
                    <h3 className="font-normal text-slate-900 dark:text-white text-base leading-snug">
                      {c.name}
                    </h3>
                    {c.description && (
                      <p className="text-xs font-normal text-slate-400 dark:text-zinc-500 mt-1 mb-3">
                        {c.description}
                      </p>
                    )}
                    <div className="flex gap-2 mt-2">
                      <Badge className="font-normal bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400 border-emerald-100 dark:border-emerald-900">
                        <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                        {c.finishedEnum}
                      </Badge>
                      <Badge className="font-normal bg-blue-50 text-blue-600 dark:bg-blue-950/30 dark:text-blue-400 border-blue-100 dark:border-blue-900">
                        <User className="w-3.5 h-3.5 mr-1" />
                        {c.member ? "A'zo" : "Rahbar"}
                      </Badge>
                      <Badge className="font-normal bg-red-50 text-red-600 dark:bg-red-950/30 dark:text-red-400 border-red-100 dark:border-red-900">
                        <Calendar className="w-3.5 h-3.5 mr-1" />
                        {c.year}
                      </Badge>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground">
                  No consultation projects found.
                </p>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default function StaffProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  return <StaffProfileContent id={id} />;
}

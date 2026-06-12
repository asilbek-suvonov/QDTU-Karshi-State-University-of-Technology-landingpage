import { notFound } from "next/navigation"
import { users } from "@/lib/data"
import { researchData } from "@/lib/research-data"
import { mockPublicationsData } from "@/lib/publications-data"
import { mockConsultationsData } from "@/lib/consultations-data"
import { mockAwardsData } from "@/lib/awards-data"

import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Mail, Phone, MapPin, Download, Calendar, CheckCircle2, User, ExternalLink, FileText, Building, Info } from "lucide-react"
import { ReadMoreText } from "@/components/ui/read-more-text"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"

export default async function StaffProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const user = users.find((u) => u.id === id)

  if (!user) {
    notFound()
  }

  const userResearch = researchData.filter(r => r.researcher.fullName === user.name)
  const userPublications = mockPublicationsData[id] || { publicationsByGroup: [] }
  const userConsultations = mockConsultationsData.consultantsList.find(c => c.id === `c-${id}`) || { projects: [] }
  const userAwards = mockAwardsData.awardsList.find(a => a.consultant.fullName === user.name) || { awards: [] }

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Staff", href: "/directory/staff" },
    { label: user.name },
  ]

  return (
    <div className="container mx-auto px-4 py-10 min-h-screen">
      <Breadcrumb items={breadcrumbItems} />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-8">
        {/* Left Column: Contact & Info */}
        <div className="md:col-span-1">
          <Card className="sticky top-24 bg-card border-border shadow-lg overflow-hidden p-0">
            <div className="h-24 bg-gradient-to-r from-primary/80 to-secondary/80"></div>
            <CardContent className="p-6 pt-0 space-y-6">
              <div className="flex flex-col items-center text-center -mt-18">
                <Avatar className="h-28 w-28 border-4 border-card shadow-md">
                  <AvatarImage src={user.avatarUrl} alt={user.name} className="object-cover" />
                  <AvatarFallback className="text-4xl">{user.initials}</AvatarFallback>
                </Avatar>
                <h1 className="mt-2 text-2xl font-bold text-foreground">{user.name}</h1>
                <Badge variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-50 dark:bg-blue-950/50 dark:text-blue-400 dark:hover:bg-blue-950/50 border border-blue-200/60 dark:border-blue-900/50 px-2 py-0.5 rounded-md text-xs font-medium mt-2">{user.role}</Badge>
              </div>

              <div className="space-y-4 pt-6 border-t border-border">
                <div className="flex items-center gap-3 text-sm text-muted-foreground"><Mail className="h-4 w-4" /> {user.email}</div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground"><Phone className="h-4 w-4" /> {user.phone}</div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground"><MapPin className="h-4 w-4" /> {user.location}</div>
                <Button className="w-full mt-4" variant="outline">
                  <Download className="mr-2 h-4 w-4" /> Download Resume
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-3 space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-2">Biography</h2>
            <ReadMoreText text={user.bio} limit={70} />
          </section>

          <Tabs defaultValue="research" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-muted">
              <TabsTrigger value="research">Research</TabsTrigger>
              <TabsTrigger value="publications">Publications</TabsTrigger>
              <TabsTrigger value="awards">Awards</TabsTrigger>
              <TabsTrigger value="consultations">Consultations</TabsTrigger>
            </TabsList>
            
            <TabsContent value="research" className="space-y-4">
              {userResearch.length > 0 ? userResearch.map(res => (
                <div key={res.id} className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm transition-all hover:shadow-md">
                  <h3 className="font-normal text-slate-900 dark:text-white text-base leading-snug">{res.projectDetails.title}</h3>
                  <p className="text-xs font-normal text-slate-400 dark:text-zinc-500 mt-1">{res.projectDetails.organization}</p>
                </div>
              )) : <p className="text-muted-foreground">No research projects found.</p>}
            </TabsContent>
            
            <TabsContent value="publications" className="space-y-6">
              {userPublications.publicationsByGroup.map((group: any) => (
                <div key={group.groupName}>
                  <h3 className="text-lg font-semibold mb-3">{group.groupName}</h3>
                  <div className="space-y-3">
                    {group.items.map((item: any) => (
                      <div key={item.id} className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
                        <div className="flex justify-between items-center">
                            <h4 className="font-normal text-slate-900 dark:text-white text-base">{item.title}</h4>
                            <div className="flex gap-2 text-slate-400">
                                <ExternalLink className="w-4 h-4" />
                            </div>
                        </div>
                        <p className="text-xs font-normal text-slate-400 dark:text-zinc-500 mt-1 mb-3">{item.publisherInfo}</p>
                        <div className="flex gap-2 mt-2">
                          <Badge variant="outline" className="font-normal bg-red-50 text-red-600 dark:bg-red-950/30 dark:text-red-400 border-red-100 dark:border-red-900"><Calendar className="w-3.5 h-3.5 mr-1"/>{item.badges.year}</Badge>
                          <Badge variant="secondary" className="font-normal bg-blue-50 text-blue-600 dark:bg-blue-950/30 dark:text-blue-400 border-blue-100 dark:border-blue-900">{item.badges.scope}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </TabsContent>
            
            <TabsContent value="awards" className="space-y-4">
              {userAwards.awards.map((a: any) => (
                <div key={a.id} className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
                  <h3 className="font-normal text-slate-900 dark:text-white text-base leading-snug">{a.title}</h3>
                  <p className="text-xs font-normal text-slate-400 dark:text-zinc-500 mt-1 mb-3">{a.description}</p>
                  <div className="flex gap-2">
                    <Badge className="font-normal bg-red-50 text-red-600 dark:bg-red-950/30 dark:text-red-400 border-red-100 dark:border-red-900"><Calendar className="w-3.5 h-3.5 mr-1"/>{a.badges.year}</Badge>
                    <Badge className="font-normal bg-blue-50 text-blue-600 dark:bg-blue-950/30 dark:text-blue-400 border-blue-100 dark:border-blue-900"><Building className="w-3.5 h-3.5 mr-1"/>{a.badges.organization}</Badge>
                  </div>
                </div>
              ))}
            </TabsContent>
            
            <TabsContent value="consultations" className="space-y-4">
              {userConsultations.projects.map((p: any) => (
                <div key={p.id} className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
                  <h3 className="font-normal text-slate-900 dark:text-white text-base leading-snug">{p.title}</h3>
                  <p className="text-xs font-normal text-slate-400 dark:text-zinc-500 mt-1 mb-3">Client: {p.client}</p>
                  <div className="flex gap-2 mt-2">
                         <Badge className="font-normal bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400 border-emerald-100 dark:border-emerald-900"><CheckCircle2 className="w-3.5 h-3.5 mr-1"/>{p.badges.status}</Badge>
                         <Badge className="font-normal bg-blue-50 text-blue-600 dark:bg-blue-950/30 dark:text-blue-400 border-blue-100 dark:border-blue-900"><User className="w-3.5 h-3.5 mr-1"/>{p.badges.role}</Badge>
                  </div>
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}


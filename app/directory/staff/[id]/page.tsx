import { notFound } from "next/navigation"
import { users } from "@/lib/data"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Mail, Phone, MapPin, Building, Download } from "lucide-react"
import { ReadMoreText } from "@/components/ui/read-more-text"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"

export default async function StaffProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const user = users.find(u => u.id === id)

  if (!user) {
    notFound()
  }

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Staff", href: "/directory/staff" },
    { label: user.name },
  ]

  return (
    <div className="container mx-auto px-4 py-10 min-h-screen">
      <Breadcrumb items={breadcrumbItems} />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
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

        {/* Right Column: Bio & Tabs */}
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
              <TabsTrigger value="education">Education</TabsTrigger>
            </TabsList>
            <TabsContent value="research" className="p-4 bg-card rounded-lg border border-border">Research details...</TabsContent>
            
            <TabsContent value="publications" className="p-4 bg-card rounded-lg border border-border">
              <Tabs defaultValue="article">
                <TabsList className="mb-4">
                  <TabsTrigger value="article">Article</TabsTrigger>
                  <TabsTrigger value="book">Book</TabsTrigger>
                  <TabsTrigger value="proceeding">Proceeding</TabsTrigger>
                  <TabsTrigger value="other">Other</TabsTrigger>
                </TabsList>
                <TabsContent value="article">{/* article list */}</TabsContent>
                <TabsContent value="book">{/* book list */}</TabsContent>
                {/* ... */}
              </Tabs>
            </TabsContent>
            
            <TabsContent value="awards" className="p-4 bg-card rounded-lg border border-border">Awards...</TabsContent>
            <TabsContent value="education" className="p-4 bg-card rounded-lg border border-border">Education...</TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

"use client"

import { Mail, Phone, MapPin, Globe, Award, BookOpen, GraduationCap } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export interface UserCardProps {
  name: string
  role: string
  phone: string
  email: string
  location: string
  avatar?: string
  initials: string
  bio?: string
  awards?: { year: string; title: string; organization: string }[]
  education?: { year: string; degree: string; institution: string }[]
  publications?: { year: string; title: string }[]
}

export function UserCard(props: UserCardProps) {
  const {
    name,
    role,
    phone,
    email,
    location,
    avatar,
    initials,
    bio = "Distinguished academic leader with over 20 years of experience in higher education, specializing in institutional strategy and student success.",
    awards = [
      { year: "2023", title: "Academic Excellence Award", organization: "Global Edu Forum" },
      { year: "2021", title: "Outstanding Leadership", organization: "National University Association" },
    ],
    education = [
      { year: "2005", degree: "Ph.D. in Education Management", institution: "Stanford University" },
      { year: "1998", degree: "M.A. in Public Policy", institution: "Harvard University" },
    ],
    publications = [
      { year: "2022", title: "The Future of Hybrid Learning in Higher Education" },
      { year: "2020", title: "Leadership Paradigms in Modern Universities" },
    ]
  } = props

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="overflow-hidden border-2 border-foreground/5 hover:border-foreground/20 transition-all group rounded-xs cursor-pointer">
          <CardHeader className="p-0">
            <div className="h-24 bg-foreground/5 group-hover:bg-foreground/10 transition-colors" />
          </CardHeader>
          <CardContent className="px-6 pb-6 -mt-12 relative">
            <Avatar className="h-24 w-24 border-4 border-background rounded-xs">
              <AvatarImage src={avatar} className="object-cover" />
              <AvatarFallback className="text-xl font-bold rounded-xs bg-foreground text-background">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="mt-4 space-y-4">
              <div>
                <h3 className="text-xl font-bold uppercase tracking-tight">{name}</h3>
                <Badge variant="outline" className="mt-1 rounded-xs uppercase text-[10px] tracking-widest border-foreground/30">
                  {role}
                </Badge>
              </div>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-foreground" />
                  <span>{email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-foreground" />
                  <span>{phone}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto rounded-xs border-2">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold uppercase tracking-tighter mb-4">Faculty Profile</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
          {/* Left Column: Stats & Contact */}
          <div className="space-y-6">
            <div className="flex flex-col items-center md:items-start space-y-4">
              <Avatar className="h-40 w-40 rounded-xs border-2 border-foreground/10">
                <AvatarImage src={avatar} className="object-cover" />
                <AvatarFallback className="text-4xl font-bold rounded-xs bg-foreground text-background">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="text-center md:text-left">
                <h2 className="text-2xl font-bold uppercase tracking-tight">{name}</h2>
                <Badge variant="outline" className="mt-2 rounded-xs uppercase tracking-widest px-4 py-1">
                  {role}
                </Badge>
              </div>
            </div>
            
            <div className="space-y-4 pt-4 border-t border-foreground/10">
              <h4 className="font-bold uppercase text-xs tracking-[0.2em] text-muted-foreground">Contact Information</h4>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-primary" />
                  <span>{email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-primary" />
                  <span>{phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span>{location}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-foreground/10">
              <div className="flex gap-4">
                <Globe className="h-5 w-5 cursor-pointer hover:text-primary transition-colors" />
                <Award className="h-5 w-5 cursor-pointer hover:text-primary transition-colors" />
                <BookOpen className="h-5 w-5 cursor-pointer hover:text-primary transition-colors" />
              </div>
            </div>
          </div>

          {/* Right Column: Detailed Info Tabs */}
          <div className="md:col-span-2">
            <Tabs defaultValue="bio" className="w-full">
              <TabsList className="w-full justify-start rounded-xs bg-foreground/5 p-1">
                <TabsTrigger value="bio" className="rounded-xs data-[state=active]:bg-foreground data-[state=active]:text-background">Biography</TabsTrigger>
                <TabsTrigger value="experience" className="rounded-xs data-[state=active]:bg-foreground data-[state=active]:text-background">Experience</TabsTrigger>
                <TabsTrigger value="publications" className="rounded-xs data-[state=active]:bg-foreground data-[state=active]:text-background">Publications</TabsTrigger>
              </TabsList>
              
              <TabsContent value="bio" className="mt-6 space-y-4">
                <h3 className="text-xl font-bold uppercase tracking-tight flex items-center gap-2">
                  <GraduationCap className="h-5 w-5" /> Professional Bio
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {bio}
                </p>
                <div className="pt-4">
                  <h4 className="font-bold uppercase text-xs tracking-[0.2em] text-muted-foreground mb-4">Academic Background</h4>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Year</TableHead>
                        <TableHead>Degree</TableHead>
                        <TableHead>Institution</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {education.map((edu, idx) => (
                        <TableRow key={idx}>
                          <TableCell className="font-medium">{edu.year}</TableCell>
                          <TableCell>{edu.degree}</TableCell>
                          <TableCell>{edu.institution}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
              
              <TabsContent value="experience" className="mt-6">
                <h3 className="text-xl font-bold uppercase tracking-tight flex items-center gap-2 mb-6">
                  <Award className="h-5 w-5" /> Awards & Recognition
                </h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Year</TableHead>
                      <TableHead>Award Title</TableHead>
                      <TableHead>Organization</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {awards.map((award, idx) => (
                      <TableRow key={idx}>
                        <TableCell className="font-medium">{award.year}</TableCell>
                        <TableCell>{award.title}</TableCell>
                        <TableCell>{award.organization}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
              
              <TabsContent value="publications" className="mt-6">
                <h3 className="text-xl font-bold uppercase tracking-tight flex items-center gap-2 mb-6">
                  <BookOpen className="h-5 w-5" /> Selected Publications
                </h3>
                <div className="space-y-4">
                  {publications.map((pub, idx) => (
                    <div key={idx} className="p-4 border-l-4 border-foreground bg-foreground/5 rounded-xs">
                      <span className="text-xs font-bold text-muted-foreground">{pub.year}</span>
                      <p className="font-medium mt-1">{pub.title}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

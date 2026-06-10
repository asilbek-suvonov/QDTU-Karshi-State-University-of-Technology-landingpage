import * as React from "react"
import { Mail, Phone, MapPin, Globe } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface UserCardProps {
  name: string
  role: string
  phone: string
  email: string
  location: string
  avatar?: string
  initials: string
}

export function UserCard({
  name,
  role,
  phone,
  email,
  location,
  avatar,
  initials,
}: UserCardProps) {
  return (
    <Card className="overflow-hidden border-2 border-foreground/5 hover:border-foreground/20 transition-all group rounded-none">
      <CardHeader className="p-0">
        <div className="h-24 bg-foreground/5 group-hover:bg-foreground/10 transition-colors" />
      </CardHeader>
      <CardContent className="px-6 pb-6 -mt-12 relative">
        <Avatar className="h-24 w-24 border-4 border-background rounded-none">
          <AvatarImage src={avatar} className="object-cover" />
          <AvatarFallback className="text-xl font-bold rounded-none bg-foreground text-background">
            {initials}
          </AvatarFallback>
        </Avatar>
        <div className="mt-4 space-y-4">
          <div>
            <h3 className="text-xl font-bold uppercase tracking-tight">{name}</h3>
            <Badge variant="outline" className="mt-1 rounded-none uppercase text-[10px] tracking-widest border-foreground/30">
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
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-foreground" />
              <span>{location}</span>
            </div>
          </div>
          <div className="pt-4 flex gap-2">
            <Globe className="h-4 w-4 text-muted-foreground cursor-pointer hover:text-foreground transition-colors" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

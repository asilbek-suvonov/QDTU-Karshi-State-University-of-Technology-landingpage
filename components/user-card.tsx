import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Mail, Phone, MapPin, Calendar } from "lucide-react"
import Link from 'next/link'

export interface UserCardProps {
  name: string
  role: string
  email: string
  phone: string
  location: string
  joinedDate?: string
  avatarUrl?: string
  bannerUrl?: string
}

export const UserCard = ({ 
  name, 
  role, 
  email, 
  phone, 
  location, 
  joinedDate, 
  avatarUrl, 
  bannerUrl 
}: UserCardProps) => {
  return (
    <Card className="w-full max-w-sm overflow-hidden bg-card shadow-lg transition-all duration-300 hover:shadow-xl rounded-xl p-0">
      <div className="relative h-28 w-full bg-muted">
        {bannerUrl ? (
          <img 
            src={bannerUrl} 
            alt="Profile Banner" 
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-primary/20 to-primary/10" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
      </div>

      <CardContent className="px-6 pt-0 pb-5">
        <div className="flex items-start gap-4 -mt-14 relative z-10 mb-4">
          <Avatar className="h-20 w-20 border-4 border-card shadow-sm shrink-0">
            {avatarUrl && <AvatarImage src={avatarUrl} alt={name} className="object-cover" />}
            <AvatarFallback className="text-lg font-bold bg-muted text-muted-foreground">
              {name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          
          <div className="pt-3 space-y-1 min-w-0">
            <h2 className="text-lg font-semibold tracking-tight text-foreground truncate">
              {name}
            </h2>
            <Badge 
              variant="secondary" 
              className="bg-blue-50 text-blue-700 hover:bg-blue-50 dark:bg-blue-950/50 dark:text-blue-400 dark:hover:bg-blue-950/50 border border-blue-200/60 dark:border-blue-900/50 px-2 py-0.5 rounded-md text-xs font-medium"
            >
              {role}
            </Badge>
          </div>
        </div>

        <div className="space-y-2.5 pt-2 border-t border-border/60 text-sm text-muted-foreground">
          <div className="flex items-center gap-3">
            <Mail className="h-4 w-4 text-foreground/70" />
            <Link href={`mailto:${email}`} className="hover:text-foreground transition-colors truncate">
              {email}
            </Link>
          </div>
          
          <div className="flex items-center gap-3">
            <Phone className="h-4 w-4 text-foreground/70" />
            <Link href={`tel:${phone}`} className="hover:text-foreground transition-colors">
              {phone}
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <MapPin className="h-4 w-4 text-foreground/70" />
            <span className="text-foreground/90">{location}</span>
          </div>

          <div className="flex items-center gap-3">
            <Calendar className="h-4 w-4 text-foreground/70" />
            <span className="text-xs text-muted-foreground/80">Joined {joinedDate}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

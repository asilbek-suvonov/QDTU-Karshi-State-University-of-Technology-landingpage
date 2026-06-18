"use client";

import Link from "next/link";
import { Phone, BookOpen, Mail, ExternalLink } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export interface UserCardProps {
  id: number;
  fullName: string;
  departmentName: string;
  lavozim?: string;
  phoneNumber?: string;
  email?: string;
  profession?: string;
  orcId?: string | null;
  scopusId?: string | null;
  gender?: boolean;
  imgUrl: string | null;
}

export const UserCard = ({
  id, fullName, departmentName, lavozim, phoneNumber,
  email, profession, orcId, scopusId, imgUrl,
}: UserCardProps) => {
  const initials = fullName.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();

  return (
    <Link href={`/directory/staff/${id}`} className="group block h-full">
      <div className="flex flex-col h-full border border-foreground bg-background p-5 transition-colors hover:bg-neutral-50">

        {/* Body */}
        <div className="flex flex-col flex-1">

          {/* Avatar + name */}
          <div className="flex items-start gap-4 mb-3">
            <Avatar className="h-14 w-14 border border-foreground rounded-none shrink-0">
              {imgUrl && (
                <AvatarImage 
                  src={imgUrl} 
                  alt={fullName} 
                  className="object-cover rounded-none grayscale" 
                />
              )}
              <AvatarFallback className="rounded-none bg-neutral-100 text-foreground font-black text-sm">
                {initials}
              </AvatarFallback>
            </Avatar>

            <div className="min-w-0 pt-0.5">
              <h2 className="font-bold text-sm uppercase tracking-tight text-foreground leading-tight line-clamp-2 transition-colors">
                {fullName}
              </h2>
              {lavozim && (
                <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  {lavozim}
                </p>
              )}
            </div>
          </div>

          {/* Details */}
          <div className="space-y-1.5 flex-1 pt-2">
            {profession && (
              <p className="text-xs text-muted-foreground leading-normal line-clamp-2 mb-1">
                {profession}
              </p>
            )}
            {departmentName && (
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <BookOpen className="h-3.5 w-3.5 shrink-0 text-foreground" />
                <span className="truncate">{departmentName}</span>
              </div>
            )}
            {phoneNumber && (
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Phone className="h-3.5 w-3.5 shrink-0 text-foreground" />
                <span className="truncate">{phoneNumber}</span>
              </div>
            )}
            {email && (
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Mail className="h-3.5 w-3.5 shrink-0 text-foreground" />
                <span className="truncate">{email}</span>
              </div>
            )}
          </div>

          {/* Academic IDs */}
          {(orcId || scopusId) && (
            <div className="flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-foreground/10">
              {orcId && (
                <span className="inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 border border-foreground/30 text-foreground bg-transparent rounded-none">
                  <ExternalLink className="h-2.5 w-2.5" /> ORCID
                </span>
              )}
              {scopusId && (
                <span className="inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 border border-foreground/30 text-foreground bg-transparent rounded-none">
                  <ExternalLink className="h-2.5 w-2.5" /> Scopus
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};
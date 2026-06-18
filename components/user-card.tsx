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
      <div className="flex flex-col h-full rounded-lg border border-border bg-card shadow-sm transition-all duration-200 hover:shadow-md hover:border-primary/30 overflow-hidden">

        {/* Top color bar */}
        <div className="h-1 w-full bg-primary shrink-0" />

        {/* Body */}
        <div className="flex flex-col flex-1 p-5">

          {/* Avatar + name */}
          <div className="flex items-start gap-4 mb-4">
            <Avatar className="h-16 w-16 shadow-sm shrink-0">
              {imgUrl && <AvatarImage src={imgUrl} alt={fullName} className="object-cover" />}
              <AvatarFallback className="rounded-lg bg-secondary text-primary font-bold text-base">
                {initials}
              </AvatarFallback>
            </Avatar>

            <div className="min-w-0 pt-1">
              <h2 className="font-bold text-base text-foreground leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                {fullName}
              </h2>
              {lavozim && (
                <span className="mt-1 inline-block text-xs font-semibold text-primary/80 bg-primary/8 dark:bg-primary/15 px-2 py-0.5 rounded">
                  {lavozim}
                </span>
              )}
            </div>
          </div>

          {/* Gold divider */}
          <div className="w-8 h-0.5 bg-accent mb-4" />

          {/* Details */}
          <div className="space-y-2 flex-1">
            {profession && (
              <p className="text-sm text-muted-foreground leading-snug line-clamp-2">{profession}</p>
            )}
            {departmentName && (
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <BookOpen className="h-3.5 w-3.5 shrink-0 text-primary/50" />
                <span className="truncate">{departmentName}</span>
              </div>
            )}
            {phoneNumber && (
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Phone className="h-3.5 w-3.5 shrink-0 text-primary/50" />
                <span className="truncate">{phoneNumber}</span>
              </div>
            )}
            {email && (
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Mail className="h-3.5 w-3.5 shrink-0 text-primary/50" />
                <span className="truncate">{email}</span>
              </div>
            )}
          </div>

          {/* Academic IDs */}
          {(orcId || scopusId) && (
            <div className="flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-border/60">
              {orcId && (
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-1.5 py-0.5 rounded bg-[#A6CE39]/10 text-[#5C8A00] dark:text-[#A6CE39] border border-[#A6CE39]/25">
                  <ExternalLink className="h-2.5 w-2.5" />ORCID
                </span>
              )}
              {scopusId && (
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-1.5 py-0.5 rounded bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20">
                  <ExternalLink className="h-2.5 w-2.5" />Scopus
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

import Link from "next/link";
import { Phone, BookOpen } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export interface UserCardProps {
  id: number;
  fullName: string;
  departmentName: string;
  lavozim?: string;
  phoneNumber?: string;
  imgUrl: string | null;
}

export const UserCard = ({ id, fullName, departmentName, lavozim, phoneNumber, imgUrl }: UserCardProps) => {
  const initials = fullName.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();

  return (
    <Link href={`/directory/staff/${id}`} className="block group">
      <div className="relative overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all duration-300 group-hover:shadow-md group-hover:border-primary/30 group-hover:-translate-y-0.5 h-full">

        {/* Banner */}
        <div className="h-20 w-full bg-gradient-to-br from-blue-500/20 via-violet-500/15 to-pink-500/10 dark:from-blue-500/30 dark:via-violet-500/20 dark:to-pink-500/15" />

        <div className="px-4 pb-4 pt-0">
          {/* Avatar */}
          <div className="-mt-8 mb-3">
            <Avatar className="h-16 w-16 border-4 border-card shadow-md ring-2 ring-primary/10">
              {imgUrl && <AvatarImage src={imgUrl} alt={fullName} className="object-cover" />}
              <AvatarFallback className="text-base font-bold bg-gradient-to-br from-blue-500 to-violet-600 text-white">
                {initials}
              </AvatarFallback>
            </Avatar>
          </div>

          {/* Name & badge */}
          <h2 className="text-sm font-semibold leading-snug text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-1.5">
            {fullName}
          </h2>

          {lavozim && (
            <Badge
              variant="secondary"
              className="mb-3 text-[11px] px-2 py-0 h-5 bg-blue-50 text-blue-700 border border-blue-200/70 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800/50 rounded-full"
            >
              {lavozim}
            </Badge>
          )}

          {/* Info */}
          <div className="space-y-1.5 pt-2.5 border-t border-border/50 text-xs text-muted-foreground">
            {departmentName && (
              <div className="flex items-center gap-2">
                <BookOpen className="h-3.5 w-3.5 shrink-0 text-muted-foreground/60" />
                <span className="truncate">{departmentName}</span>
              </div>
            )}
            {phoneNumber && (
              <div className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 shrink-0 text-muted-foreground/60" />
                <span className="truncate">{phoneNumber}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

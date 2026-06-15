import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Building2, BookOpen } from "lucide-react";
import Link from "next/link";

export interface UserCardProps {
  id: number;
  fullName: string;
  collegeName: string;
  departmentName: string;
  imgUrl: string | null;
}

export const UserCard = ({
  id,
  fullName,
  collegeName,
  departmentName,
  imgUrl,
}: UserCardProps) => {
  const initials = fullName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <Link href={`/directory/staff/${id}`} className="block w-full max-w-sm group">
      <Card className="w-full overflow-hidden bg-card shadow-lg transition-all duration-300 group-hover:shadow-xl rounded-xl p-0 h-full">
        <div className="relative h-28 w-full bg-muted">
          <div className="h-full w-full bg-gradient-to-br from-primary/20 to-primary/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
        </div>

        <CardContent className="px-6 pt-0 pb-5">
          <div className="flex items-start gap-4 -mt-14 relative z-10 mb-4">
            <Avatar className="h-20 w-20 border-4 border-card shadow-sm shrink-0">
              {imgUrl && (
                <AvatarImage src={imgUrl} alt={fullName} className="object-cover" />
              )}
              <AvatarFallback className="text-lg font-bold bg-muted text-muted-foreground">
                {initials}
              </AvatarFallback>
            </Avatar>

            <div className="pt-3 space-y-1 min-w-0">
              <h2 className="text-lg font-semibold tracking-tight text-foreground truncate group-hover:text-blue-600 transition-colors">
                {fullName}
              </h2>
              <Badge
                variant="secondary"
                className="bg-blue-50 text-blue-700 hover:bg-blue-50 dark:bg-blue-950/50 dark:text-blue-400 dark:hover:bg-blue-950/50 border border-blue-200/60 dark:border-blue-900/50 px-2 py-0.5 rounded-md text-xs font-medium"
              >
                {departmentName}
              </Badge>
            </div>
          </div>

          <div className="space-y-2.5 pt-2 border-t border-border/60 text-sm text-muted-foreground">
            <div className="flex items-center gap-3">
              <Building2 className="h-4 w-4 text-foreground/70 shrink-0" />
              <span className="truncate">{collegeName}</span>
            </div>
            <div className="flex items-center gap-3">
              <BookOpen className="h-4 w-4 text-foreground/70 shrink-0" />
              <span className="truncate">{departmentName}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

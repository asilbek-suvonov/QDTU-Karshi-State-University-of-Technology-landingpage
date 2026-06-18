import type { LucideIcon } from "lucide-react";

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  count?: number;
  icon?: LucideIcon;
}

export function PageHeader({ eyebrow, title, description, count, icon: Icon }: PageHeaderProps) {
  return (
    <div className="pb-6 mb-8 border-b border-foreground">
      <div className="flex items-start justify-between gap-6">
        <div className="space-y-2 flex-1">
          {eyebrow && (
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
              {eyebrow}
            </p>
          )}
          
          <div className="flex items-baseline gap-3 flex-wrap">
            <h1 className="text-2xl font-black uppercase tracking-tight text-foreground">
              {title}
            </h1>
            {count !== undefined && (
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider border-l border-foreground/20 pl-3">
                Jami: {count} ta
              </span>
            )}
          </div>

          {description && (
            <p className="text-xs text-muted-foreground max-w-xl leading-relaxed pt-1">
              {description}
            </p>
          )}
        </div>

        {Icon && (
          <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-foreground bg-background rounded-none mt-1">
            <Icon className="h-4 w-4 text-foreground" />
          </div>
        )}
      </div>
    </div>
  );
}
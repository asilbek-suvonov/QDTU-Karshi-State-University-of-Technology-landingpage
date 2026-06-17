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
    <div className="pb-8 mb-8 border-b border-border">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          {eyebrow && <p className="section-label mb-2">{eyebrow}</p>}
          <h1 className="text-3xl font-black text-foreground">{title}</h1>
          <div className="divider-gold mt-3" />
          {description && (
            <p className="mt-3 text-sm text-muted-foreground max-w-xl leading-relaxed">{description}</p>
          )}
          {count !== undefined && (
            <p className="mt-2 text-sm text-muted-foreground">Jami {count} ta</p>
          )}
        </div>
        {Icon && (
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded border border-border bg-card mt-1">
            <Icon className="h-5 w-5 text-primary" />
          </div>
        )}
      </div>
    </div>
  );
}

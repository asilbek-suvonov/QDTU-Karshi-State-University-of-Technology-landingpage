"use client";

import { Lock } from "lucide-react";
import { AuthDialog } from "@/components/auth-dialog";

interface AuthRequiredProps {
  title?: string;
}

export function AuthRequired({ title = "bu bo'lim" }: AuthRequiredProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary border border-border mb-5">
        <Lock className="h-7 w-7 text-primary" />
      </div>
      <h2 className="text-lg font-bold text-foreground mb-2">Kirish talab qilinadi</h2>
      <p className="text-sm text-muted-foreground max-w-xs mb-6">
        <span className="font-semibold text-foreground">{title}</span>ni
        ko'rish uchun tizimga kiring.
      </p>
      <AuthDialog />
    </div>
  );
}

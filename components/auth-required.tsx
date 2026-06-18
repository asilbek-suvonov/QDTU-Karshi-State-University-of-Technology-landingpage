"use client";

import { Lock } from "lucide-react";
import { AuthDialog } from "@/components/auth-dialog";

interface AuthRequiredProps {
  title?: string;
}

export function AuthRequired({ title = "bu bo'lim" }: AuthRequiredProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <Lock className="h-8 w-8 text-foreground mb-4" />
      
      <h2 className="text-base font-bold uppercase tracking-wider text-foreground mb-1">
        Kirish talab qilinadi
      </h2>
      
      <p className="text-sm text-muted-foreground max-w-xs mb-5">
        {title} bo'limini ko'rish uchun tizimga kiring.
      </p>
      
      <AuthDialog />
    </div>
  );
}
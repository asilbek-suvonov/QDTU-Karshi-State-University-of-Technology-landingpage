"use client";

import { Lock } from "lucide-react";
import { AuthDialog } from "@/components/auth-dialog";

interface AuthRequiredProps {
  title?: string;
}

export function AuthRequired({ title = "bu bo'lim" }: AuthRequiredProps) {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-6 text-center">
      <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
        <Lock className="h-7 w-7 text-muted-foreground" />
      </div>
      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-foreground">
          Kirish talab qilinadi
        </h2>
        <p className="text-sm text-muted-foreground max-w-sm">
          {title}ni ko'rish uchun tizimga kiring.
        </p>
      </div>
      <AuthDialog />
    </div>
  );
}

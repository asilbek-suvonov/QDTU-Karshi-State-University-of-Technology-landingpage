"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { LogIn, LogOut, Loader2, Eye, EyeOff, Phone, Lock } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { authService } from "@/service/auth/auth.service";
import { useAuth } from "@/store/auth.store";

export function AuthDialog() {
  const { isAuthenticated, login, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const mutation = useMutation({
    mutationFn: authService.login,
    onSuccess: (res) => {
      if (res.success && res.data) {
        login(res.data);
        setOpen(false);
        setPhone("");
        setPassword("");
        setErrorMsg("");
      } else {
        setErrorMsg(res.message || "Login muvaffaqiyatsiz.");
      }
    },
    onError: () => {
      setErrorMsg("Telefon yoki parol noto'g'ri.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    if (!phone.trim() || !password.trim()) {
      setErrorMsg("Telefon va parol kiritilishi shart.");
      return;
    }
    mutation.mutate({ phone: phone.trim(), password });
  };

  // Logged in — logout button
  if (isAuthenticated) {
    return (
      <Button
        variant="outline"
        size="sm"
        onClick={logout}
        className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider"
      >
        <LogOut className="h-3.5 w-3.5" />
        <span className="hidden sm:inline">Sign Out</span>
      </Button>
    );
  }

  // Not logged in — sign in button + dialog
  return (
    <>
      <Button
        size="sm"
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider"
      >
        <LogIn className="h-3.5 w-3.5" />
        <span>Sign In</span>
      </Button>

      <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) setErrorMsg(""); }}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Tizimga kirish</DialogTitle>
            <DialogDescription>
              Telefon raqam va parolingizni kiriting.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4 mt-2">
            {/* Phone */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">
                Telefon raqam
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+998901234567"
                  autoComplete="username"
                  className="w-full pl-10 pr-4 py-2.5 rounded-md border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">
                Parol
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className="w-full pl-10 pr-10 py-2.5 rounded-md border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Error */}
            {errorMsg && (
              <p className="text-sm text-red-500 bg-red-50 dark:bg-red-950/30 px-3 py-2 rounded-md">
                {errorMsg}
              </p>
            )}

            {/* Submit */}
            <Button
              type="submit"
              className="w-full"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Kirish...
                </>
              ) : (
                "Kirish"
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

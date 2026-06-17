"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { LogIn, LogOut, Loader2, Eye, EyeOff, Phone, Lock } from "lucide-react";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
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
        setPhone(""); setPassword(""); setErrorMsg("");
      } else {
        setErrorMsg(res.message || "Login muvaffaqiyatsiz.");
      }
    },
    onError: () => { setErrorMsg("Telefon yoki parol noto'g'ri."); },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    if (!phone.trim() || !password.trim()) { setErrorMsg("Telefon va parol kiritilishi shart."); return; }
    mutation.mutate({ phone: phone.trim(), password });
  };

  if (isAuthenticated) {
    return (
      <Button
        variant="outline"
        size="sm"
        onClick={logout}
        className="gap-2 border-border text-foreground hover:bg-secondary hover:border-primary/30 text-xs font-semibold"
      >
        <LogOut className="h-3.5 w-3.5" />
        <span className="hidden sm:inline">Chiqish</span>
      </Button>
    );
  }

  return (
    <>
      <Button
        size="sm"
        onClick={() => setOpen(true)}
        className="gap-2 bg-primary text-white hover:bg-primary/90 text-xs font-semibold"
      >
        <LogIn className="h-3.5 w-3.5" />
        <span>Kirish</span>
      </Button>

      <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) setErrorMsg(""); }}>
        <DialogContent className="sm:max-w-[400px] bg-card border-border">
          <DialogHeader>
            <div className="w-8 h-0.5 bg-accent mb-3" />
            <DialogTitle className="text-xl font-bold text-foreground">Tizimga kirish</DialogTitle>
            <DialogDescription className="text-muted-foreground text-sm">
              Telefon raqam va parolingizni kiriting.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4 mt-2">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-foreground">Telefon</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="tel"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="+998901234567"
                  autoComplete="username"
                  className="w-full pl-10 pr-4 py-2.5 rounded-md border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-foreground">Parol</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className="w-full pl-10 pr-10 py-2.5 rounded-md border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(p => !p)}
                  tabIndex={-1}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {errorMsg && (
              <p className="text-sm text-destructive bg-destructive/8 px-3 py-2 rounded-md border border-destructive/20">
                {errorMsg}
              </p>
            )}

            <Button type="submit" className="w-full bg-primary text-white hover:bg-primary/90" disabled={mutation.isPending}>
              {mutation.isPending ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Kirish...</> : "Kirish"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

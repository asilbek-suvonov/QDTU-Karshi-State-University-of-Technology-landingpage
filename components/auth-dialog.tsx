"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
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
        className="text-xs font-semibold rounded-none border-foreground hover:bg-neutral-100"
      >
        Chiqish
      </Button>
    );
  }

  return (
    <>
      <Button
        size="sm"
        onClick={() => setOpen(true)}
        className="text-xs font-semibold rounded-none bg-foreground text-background hover:bg-foreground/90"
      >
        Kirish
      </Button>

      <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) setErrorMsg(""); }}>
        <DialogContent className="sm:max-w-[360px] bg-background border-foreground rounded-none p-6">
          <DialogHeader className="space-y-1">
            <DialogTitle className="text-lg font-bold uppercase tracking-tight">Tizimga kirish</DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Davom etish uchun ma'lumotlarni kiriting.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4 mt-2">
            <div className="space-y-1">
              <label className="text-xs uppercase font-bold tracking-wider text-muted-foreground">Telefon</label>
              <input
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="+998901234567"
                autoComplete="username"
                className="w-full px-3 py-2 border border-foreground bg-background text-sm focus:outline-none placeholder:text-muted-foreground/50"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <label className="text-xs uppercase font-bold tracking-wider text-muted-foreground">Parol</label>
                <button
                  type="button"
                  onClick={() => setShowPassword(p => !p)}
                  tabIndex={-1}
                  className="text-xs text-muted-foreground hover:text-foreground underline"
                >
                  {showPassword ? "Yashirish" : "Ko'rsatish"}
                </button>
              </div>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
                className="w-full px-3 py-2 border border-foreground bg-background text-sm focus:outline-none placeholder:text-muted-foreground/50"
              />
            </div>

            {errorMsg && (
              <p className="text-xs text-foreground bg-neutral-100 p-2 border border-foreground font-medium">
                {errorMsg}
              </p>
            )}

            <Button 
              type="submit" 
              className="w-full bg-foreground text-background hover:bg-foreground/90 rounded-none" 
              disabled={mutation.isPending}
            >
              {mutation.isPending ? <><Loader2 className="mr-2 h-4 w-4 animate-spin inline-block" /> Kirilmoqda...</> : "Kirish"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
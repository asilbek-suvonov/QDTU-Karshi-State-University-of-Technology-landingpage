"use client";

import * as React from "react";
import {
  Area, AreaChart, Bar, BarChart, CartesianGrid,
  Cell, Label, Pie, PieChart, XAxis, ResponsiveContainer,
} from "recharts";
import { Loader2, BarChart3, Users, User, GraduationCap, TrendingUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import {
  useGetUserDashboard,
  useGetUserAgeDashboard,
  useGetUserGenderDashboard,
  useGetUserScientific,
} from "@/hooks/useUser";

const breadcrumbs = [{ label: "Home", href: "/" }, { label: "Statistics" }];

// Chart configs
const areaConfig = {
  total:  { label: "Jami",   color: "#6366f1" },
  male:   { label: "Erkak",  color: "#3b82f6" },
  female: { label: "Ayol",   color: "#ec4899" },
} satisfies ChartConfig;

const sciConfig = {
  count: { label: "Soni", color: "#10b981" },
} satisfies ChartConfig;

const PIE_COLORS = ["#3b82f6", "#ec4899"];

// Colorful bar palette for activity chart
const BAR_COLORS = ["#6366f1", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

export default function StaffStatisticsPage() {
  const { data: dash, isLoading: l1 } = useGetUserDashboard();
  const { data: age,  isLoading: l2 } = useGetUserAgeDashboard();
  const { data: gender, isLoading: l3 } = useGetUserGenderDashboard();
  const { data: sci,  isLoading: l4 } = useGetUserScientific();

  const isLoading = l1 || l2 || l3 || l4;

  const g = gender?.data;
  const pieData = g
    ? [
        { name: "Erkak", value: g.maleCount },
        { name: "Ayol",  value: g.femaleCount },
      ]
    : [];

  // Area chart data — yosh bo'yicha
  const ageData = (age?.data ?? []).map((a) => ({
    name:   a.ageGroup,
    total:  a.total,
    male:   a.maleCount,
    female: a.femaleCount,
  }));

  const sciData = (sci?.data ?? []).map((s) => ({ name: s.name, count: s.count }));

  const dashData = dash?.data;
  const summaryCards = dashData
    ? [
        { label: "Jami xodimlar", value: dashData.countAllUsers,  icon: Users,         color: "text-indigo-600 dark:text-indigo-400",  bg: "bg-indigo-500/10 dark:bg-indigo-500/20" },
        { label: "Erkaklar",      value: dashData.countMale,      icon: User,           color: "text-blue-600 dark:text-blue-400",     bg: "bg-blue-500/10 dark:bg-blue-500/20" },
        { label: "Ayollar",       value: dashData.countFemale,    icon: User,           color: "text-pink-600 dark:text-pink-400",     bg: "bg-pink-500/10 dark:bg-pink-500/20" },
        { label: "Akademik",      value: dashData.countAcademic,  icon: GraduationCap,  color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-500/10 dark:bg-emerald-500/20" },
      ]
    : [];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-10">
        <Breadcrumb items={breadcrumbs} />

        {/* Title */}
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/10 dark:bg-indigo-500/20">
            <BarChart3 className="h-5 w-5 text-indigo-500" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Statistika</h1>
        </div>

        {/* Summary cards */}
        {summaryCards.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            {summaryCards.map((c) => (
              <Card key={c.label} className="border-border/60 bg-card/80 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-5 flex items-center gap-3">
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${c.bg}`}>
                    <c.icon className={`h-5 w-5 ${c.color}`} />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">{c.label}</p>
                    <p className={`text-2xl font-bold ${c.color}`}>{c.value}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Row 1: Area + Pie */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">

          {/* Area chart — yosh taqsimoti */}
          {ageData.length > 0 && (
            <Card className="lg:col-span-2 border-border/60 bg-card/80 shadow-sm">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-indigo-500" />
                  <CardTitle className="text-sm font-semibold">Yosh taqsimoti</CardTitle>
                </div>
                <CardDescription className="text-xs">Erkak va ayol xodimlar yosh guruhlari bo'yicha</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={areaConfig} className="h-[220px] w-full">
                  <AreaChart data={ageData} margin={{ left: 0, right: 8, top: 8, bottom: 0 }}>
                    <defs>
                      <linearGradient id="gradMale" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%"  stopColor="#3b82f6" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.02} />
                      </linearGradient>
                      <linearGradient id="gradFemale" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%"  stopColor="#ec4899" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#ec4899" stopOpacity={0.02} />
                      </linearGradient>
                      <linearGradient id="gradTotal" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%"  stopColor="#6366f1" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0.02} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="name" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Area type="monotone" dataKey="total"  stroke="#6366f1" strokeWidth={2} fill="url(#gradTotal)"  dot={false} />
                    <Area type="monotone" dataKey="male"   stroke="#3b82f6" strokeWidth={2} fill="url(#gradMale)"   dot={false} />
                    <Area type="monotone" dataKey="female" stroke="#ec4899" strokeWidth={2} fill="url(#gradFemale)" dot={false} />
                  </AreaChart>
                </ChartContainer>

                {/* Legend */}
                <div className="mt-2 flex items-center gap-4 justify-center">
                  {[
                    { color: "#6366f1", label: "Jami" },
                    { color: "#3b82f6", label: "Erkak" },
                    { color: "#ec4899", label: "Ayol" },
                  ].map((l) => (
                    <div key={l.label} className="flex items-center gap-1.5">
                      <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ backgroundColor: l.color }} />
                      <span className="text-xs text-muted-foreground">{l.label}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Donut — jins */}
          {pieData.length > 0 && (
            <Card className="border-border/60 bg-card/80 shadow-sm">
              <CardHeader className="pb-2 items-center text-center">
                <CardTitle className="text-sm font-semibold">Jins taqsimoti</CardTitle>
                {g && (
                  <CardDescription className="text-xs">
                    Erkak {g.malePercentage.toFixed(0)}% · Ayol {g.femalePercentage.toFixed(0)}%
                  </CardDescription>
                )}
              </CardHeader>
              <CardContent className="flex items-center justify-center">
                <ChartContainer config={{ count: { label: "Soni" } } satisfies ChartConfig} className="h-[200px] w-full max-w-[200px]">
                  <PieChart>
                    <ChartTooltip
                      content={<ChartTooltipContent hideLabel nameKey="name" />}
                    />
                    <Pie data={pieData} dataKey="value" nameKey="name" innerRadius={52} outerRadius={80} strokeWidth={3} className="stroke-card">
                      {pieData.map((_, i) => (
                        <Cell key={i} fill={PIE_COLORS[i]} />
                      ))}
                      <Label
                        content={({ viewBox }) =>
                          viewBox && "cx" in viewBox ? (
                            <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                              <tspan x={viewBox.cx} y={viewBox.cy} style={{ fontSize: 22, fontWeight: 700, fill: "hsl(var(--foreground))" }}>
                                {g?.total ?? 0}
                              </tspan>
                              <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 20} style={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}>
                                Jami
                              </tspan>
                            </text>
                          ) : null
                        }
                      />
                    </Pie>
                  </PieChart>
                </ChartContainer>
              </CardContent>
              {/* Legend */}
              <div className="pb-4 flex justify-center gap-4">
                {pieData.map((d, i) => (
                  <div key={d.name} className="flex items-center gap-1.5">
                    <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ backgroundColor: PIE_COLORS[i] }} />
                    <span className="text-xs text-muted-foreground">{d.name} ({d.value})</span>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>

        {/* Activity bar chart — rangli */}
        {sciData.length > 0 && (
          <Card className="border-border/60 bg-card/80 shadow-sm">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-emerald-500" />
                <CardTitle className="text-sm font-semibold">Faoliyat statistikasi</CardTitle>
              </div>
              <CardDescription className="text-xs">Tadqiqot, nashr, mukofot va maslahat soni</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={sciConfig} className="h-[260px] w-full">
                <BarChart data={sciData} margin={{ left: 0, right: 0, top: 8, bottom: 0 }}>
                  <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                    {sciData.map((_, i) => (
                      <Cell key={i} fill={BAR_COLORS[i % BAR_COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ChartContainer>

              {/* Legend */}
              <div className="mt-3 flex flex-wrap gap-3 justify-center">
                {sciData.map((d, i) => (
                  <div key={d.name} className="flex items-center gap-1.5">
                    <span className="inline-block h-3 w-3 rounded" style={{ backgroundColor: BAR_COLORS[i % BAR_COLORS.length] }} />
                    <span className="text-xs text-muted-foreground">{d.name} ({d.count})</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

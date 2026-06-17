"use client";

import * as React from "react";
import {
  Area, AreaChart, Bar, BarChart, CartesianGrid,
  Cell, Label, Pie, PieChart, XAxis,
} from "recharts";
import { Loader2, BarChart3, Users, GraduationCap } from "lucide-react";
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig,
} from "@/components/ui/chart";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { PageHeader } from "@/components/page-header";
import {
  useGetUserDashboard, useGetUserAgeDashboard,
  useGetUserGenderDashboard, useGetUserScientific,
} from "@/hooks/useUser";

const breadcrumbs = [{ label: "Asosiy", href: "/" }, { label: "Statistika" }];

const areaConfig: ChartConfig = {
  total:  { label: "Jami",  color: "#0F5257" },
  male:   { label: "Erkak", color: "#1D8A93" },
  female: { label: "Ayol",  color: "#E6CA9F" },
};

const sciConfig: ChartConfig = {
  count: { label: "Soni", color: "#0F5257" },
};

const PIE_COLORS = ["#0F5257", "#E6CA9F"];
const BAR_PALETTE = ["#0F5257", "#2D7D83", "#1D8A93", "#E6CA9F", "#8B6914"];

export default function StaffStatisticsPage() {
  const { data: dash, isLoading: l1 } = useGetUserDashboard();
  const { data: age,  isLoading: l2 } = useGetUserAgeDashboard();
  const { data: gender, isLoading: l3 } = useGetUserGenderDashboard();
  const { data: sci,  isLoading: l4 } = useGetUserScientific();

  if (l1 || l2 || l3 || l4) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const g = gender?.data;
  const pieData = g
    ? [{ name: "Erkak", value: g.maleCount }, { name: "Ayol", value: g.femaleCount }]
    : [];

  const ageData = (age?.data ?? []).map(a => ({
    name: a.ageGroup, total: a.total, male: a.maleCount, female: a.femaleCount,
  }));
  const sciData = (sci?.data ?? []).map(s => ({ name: s.name, count: s.count }));
  const d = dash?.data;

  const summaryCards = d ? [
    { label: "Jami xodimlar", value: d.countAllUsers, icon: Users },
    { label: "Erkaklar",      value: d.countMale,      icon: GraduationCap },
    { label: "Ayollar",       value: d.countFemale,    icon: GraduationCap },
    { label: "Akademik",      value: d.countAcademic,  icon: BarChart3 },
  ] : [];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-10">
        <Breadcrumb items={breadcrumbs} />
        <PageHeader eyebrow="Universitet ma'lumotlari" title="Statistika" icon={BarChart3} />

        {/* Summary cards */}
        {summaryCards.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {summaryCards.map(c => (
              <Card key={c.label} className="border-border bg-card shadow-sm">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{c.label}</p>
                    <c.icon className="h-4 w-4 text-primary/60" />
                  </div>
                  <p className="text-3xl font-black text-primary">{c.value}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5">

          {/* Area chart */}
          {ageData.length > 0 && (
            <Card className="lg:col-span-2 border-border bg-card shadow-sm">
              <CardHeader className="pb-2">
                <div className="w-8 h-0.5 bg-accent mb-2" />
                <CardTitle className="text-base font-bold">Yosh taqsimoti</CardTitle>
                <CardDescription className="text-xs">Yosh guruhlari bo'yicha xodimlar</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={areaConfig} className="h-[220px] w-full">
                  <AreaChart data={ageData} margin={{ left: 0, right: 8, top: 8 }}>
                    <defs>
                      <linearGradient id="gTotal"  x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%"  stopColor="#0F5257" stopOpacity={0.35}/>
                        <stop offset="95%" stopColor="#0F5257" stopOpacity={0.02}/>
                      </linearGradient>
                      <linearGradient id="gMale"   x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%"  stopColor="#1D8A93" stopOpacity={0.35}/>
                        <stop offset="95%" stopColor="#1D8A93" stopOpacity={0.02}/>
                      </linearGradient>
                      <linearGradient id="gFemale" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%"  stopColor="#E6CA9F" stopOpacity={0.50}/>
                        <stop offset="95%" stopColor="#E6CA9F" stopOpacity={0.02}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis dataKey="name" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Area type="monotone" dataKey="total"  stroke="#0F5257" strokeWidth={2} fill="url(#gTotal)"  dot={false} />
                    <Area type="monotone" dataKey="male"   stroke="#1D8A93" strokeWidth={2} fill="url(#gMale)"   dot={false} />
                    <Area type="monotone" dataKey="female" stroke="#E6CA9F" strokeWidth={2} fill="url(#gFemale)" dot={false} />
                  </AreaChart>
                </ChartContainer>
                <div className="mt-3 flex justify-center gap-5">
                  {[{ c: "#0F5257", l: "Jami" }, { c: "#1D8A93", l: "Erkak" }, { c: "#E6CA9F", l: "Ayol" }].map(x => (
                    <div key={x.l} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <span className="h-2.5 w-2.5 rounded-sm inline-block" style={{ backgroundColor: x.c }} />
                      {x.l}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Donut */}
          {pieData.length > 0 && g && (
            <Card className="border-border bg-card shadow-sm">
              <CardHeader className="pb-2 items-center text-center">
                <div className="w-8 h-0.5 bg-accent mb-2" />
                <CardTitle className="text-base font-bold">Jins taqsimoti</CardTitle>
                <CardDescription className="text-xs">
                  Erkak {g.malePercentage.toFixed(0)}% · Ayol {g.femalePercentage.toFixed(0)}%
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <ChartContainer config={{ count: { label: "Soni" } } satisfies ChartConfig} className="h-[180px] w-full max-w-[180px]">
                  <PieChart>
                    <ChartTooltip content={<ChartTooltipContent nameKey="name" hideLabel />} />
                    <Pie data={pieData} dataKey="value" nameKey="name" innerRadius={48} outerRadius={72} strokeWidth={3} className="stroke-card">
                      {pieData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i]} />)}
                      <Label content={({ viewBox }) =>
                        viewBox && "cx" in viewBox ? (
                          <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                            <tspan x={viewBox.cx} y={viewBox.cy} style={{ fontSize: 20, fontWeight: 900, fill: "var(--foreground)" }}>
                              {g.total}
                            </tspan>
                            <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 18} style={{ fontSize: 10, fill: "var(--muted-foreground)" }}>
                              Jami
                            </tspan>
                          </text>
                        ) : null
                      } />
                    </Pie>
                  </PieChart>
                </ChartContainer>
                <div className="flex gap-4 mt-2">
                  {pieData.map((d, i) => (
                    <div key={d.name} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <span className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: PIE_COLORS[i] }} />
                      {d.name} ({d.value})
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Activity bar chart */}
        {sciData.length > 0 && (
          <Card className="border-border bg-card shadow-sm">
            <CardHeader className="pb-2">
              <div className="w-8 h-0.5 bg-accent mb-2" />
              <CardTitle className="text-base font-bold">Faoliyat statistikasi</CardTitle>
              <CardDescription className="text-xs">Tadqiqot, nashr, mukofot va maslahat soni</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={sciConfig} className="h-[240px] w-full">
                <BarChart data={sciData} margin={{ left: 0, right: 0, top: 8 }}>
                  <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="name" tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                    {sciData.map((_, i) => <Cell key={i} fill={BAR_PALETTE[i % BAR_PALETTE.length]} />)}
                  </Bar>
                </BarChart>
              </ChartContainer>
              <div className="mt-3 flex flex-wrap justify-center gap-4">
                {sciData.map((d, i) => (
                  <div key={d.name} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <span className="h-3 w-3 rounded-sm" style={{ backgroundColor: BAR_PALETTE[i % BAR_PALETTE.length] }} />
                    {d.name} ({d.count})
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

"use client"

import * as React from "react"
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Label, Pie, PieChart, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

// --- University Context Data ---
const areaChartData = [
  { month: "Jan", admissions: 450, graduates: 200 },
  { month: "Feb", admissions: 300, graduates: 150 },
  { month: "Mar", admissions: 500, graduates: 300 },
  { month: "Apr", admissions: 650, graduates: 400 },
  { month: "May", admissions: 800, graduates: 700 },
  { month: "Jun", admissions: 950, graduates: 600 },
]

const areaChartConfig = {
  admissions: { label: "Admissions", color: "#3b82f6" },
  graduates: { label: "Graduates", color: "#8b5cf6" },
} satisfies ChartConfig

// Generating 85 departments
const barChartData = Array.from({ length: 85 }, (_, i) => ({
  dept: `Dept ${i + 1}`,
  staff: Math.floor(Math.random() * 100) + 20,
  faculty: Math.floor(Math.random() * 80) + 10,
}))

const barChartConfig = {
  staff: { label: "Staff", color: "#007FFF" },
  faculty: { label: "Faculty", color: "#f59e0b" },
} satisfies ChartConfig

const pieChartData = [
  { type: "Professors", count: 120, fill: "#10b981" },
  { type: "Lecturers", count: 350, fill: "#6366f1" },
]

const pieChartConfig = {
  count: { label: "Count" },
} satisfies ChartConfig


export default function StaffStatisticsPage() {
  const [activeBarChart, setActiveBarChart] = React.useState<"staff" | "faculty">("staff")
  const totalAcademicStaff = React.useMemo(() => pieChartData.reduce((acc, curr) => acc + curr.count, 0), [])

  return (
    <div className="container mx-auto px-4 py-20 min-h-screen space-y-8">

      <div className="grid grid-cols-1 gap-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="col-span-1 lg:col-span-2 bg-[#fdfdfd] dark:bg-[#0f0f11] border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Academic Flow</CardTitle>
              <CardDescription className="text-muted-foreground">Admissions vs Graduates (2024)</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={areaChartConfig} className="h-[250px] w-full">
                <AreaChart data={areaChartData} margin={{ left: 12, right: 12 }}>
                  <CartesianGrid vertical={false} className="stroke-border" />
                  <XAxis dataKey="month" className="text-muted-foreground" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <defs>
                    <linearGradient id="fillAdmissions" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/><stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/></linearGradient>
                    <linearGradient id="fillGraduates" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/><stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1}/></linearGradient>
                  </defs>
                  <Area dataKey="graduates" type="natural" fill="url(#fillGraduates)" stroke="#8b5cf6" stackId="a" />
                  <Area dataKey="admissions" type="natural" fill="url(#fillAdmissions)" stroke="#3b82f6" stackId="a" />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Academic Roles */}
          <Card className="flex flex-col bg-[#fdfdfd] dark:bg-[#0f0f11] border-border">
            <CardHeader className="items-center pb-0">
              <CardTitle className="text-foreground">Academic Roles</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
              <ChartContainer config={pieChartConfig} className="mx-auto aspect-square max-h-[250px]">
                <PieChart>
                  <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                  <Pie data={pieChartData} dataKey="count" nameKey="type" innerRadius={60} strokeWidth={5} className="stroke-card">
                    <Label content={({ viewBox }) => viewBox && "cx" in viewBox && (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                        <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-3xl font-bold">{totalAcademicStaff.toLocaleString()}</tspan>
                        <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground">Total Staff</tspan>
                      </text>
                    )} />
                  </Pie>
                </PieChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* Bar Chart: Department Breakdown */}
        <Card className="col-span-1 bg-[#fdfdfd] dark:bg-[#0f0f11] border-border">
          <CardHeader className="flex flex-col border-b border-border p-0 sm:flex-row">
            <div className="flex flex-1 flex-col justify-center gap-1 px-6 pt-4 pb-3">
              <CardTitle className="text-foreground">Departmental Staffing</CardTitle>
            </div>
            <div className="flex">
              {(["staff", "faculty"] as const).map((key) => (
                <button key={key} data-active={activeBarChart === key} className="flex-1 border-t border-border px-6 py-4 data-[active=true]:bg-muted/50 text-foreground" onClick={() => setActiveBarChart(key)}>
                  <span className="text-xs text-muted-foreground capitalize">{barChartConfig[key].label}</span>
                  <span className="text-lg font-bold px-3">{barChartData.reduce((a,c) => a+c[key], 0).toLocaleString()}</span>
                </button>
              ))}
            </div>
          </CardHeader>
          <CardContent className="px-2 pt-6">
            <div className="h-[400px] w-full overflow-x-auto">
              <div className="min-w-[1200px] h-full">
                <ChartContainer config={barChartConfig} className="h-full w-full">
                  <BarChart data={barChartData}>
                    <CartesianGrid vertical={false} className="stroke-border" />
                    <XAxis dataKey="dept" className="text-muted-foreground" tick={{fontSize: 10}} angle={-45} textAnchor="end" height={60} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey={activeBarChart} fill={activeBarChart === 'staff' ? '#007FFF' : '#f59e0b'} radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ChartContainer>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

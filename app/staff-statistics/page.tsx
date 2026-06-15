"use client";

import * as React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Label,
  Pie,
  PieChart,
  XAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Loader2 } from "lucide-react";
import { useGetUserDashboard, useGetUserAgeDashboard, useGetUserGenderDashboard, useGetUserScientific } from "@/hooks/useUser";

const genderChartConfig = {
  count: { label: "Count" },
} satisfies ChartConfig;

const ageChartConfig = {
  count: { label: "Xodimlar soni", color: "#007FFF" },
} satisfies ChartConfig;

const scientificChartConfig = {
  count: { label: "Soni", color: "#8b5cf6" },
} satisfies ChartConfig;

const GENDER_COLORS: Record<string, string> = {
  MALE: "#3b82f6",
  FEMALE: "#ec4899",
};

export default function StaffStatisticsPage() {
  const { data: dashboardData, isLoading: dashLoading } = useGetUserDashboard();
  const { data: ageData, isLoading: ageLoading } = useGetUserAgeDashboard();
  const { data: genderData, isLoading: genderLoading } = useGetUserGenderDashboard();
  const { data: scientificData, isLoading: sciLoading } = useGetUserScientific();

  const isLoading = dashLoading || ageLoading || genderLoading || sciLoading;

  const pieData = (genderData?.data ?? []).map((item) => ({
    type: item.gender,
    count: item.count,
    fill: GENDER_COLORS[item.gender] ?? "#6366f1",
  }));

  const totalGender = React.useMemo(
    () => pieData.reduce((acc, curr) => acc + curr.count, 0),
    [pieData]
  );

  const ageChartData = (ageData?.data ?? []).map((item) => ({
    ageGroup: item.ageGroup,
    count: item.count,
  }));

  const scientific = scientificData?.data;
  const scientificChartData = scientific
    ? [
        { label: "Professor", count: scientific.countProfessor },
        { label: "Dotsent", count: scientific.countDotsent },
        { label: "PhD", count: scientific.countPHD },
        { label: "DSc", count: scientific.countDSC },
        { label: "Boshqa", count: scientific.countNull },
      ]
    : [];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-20 min-h-screen space-y-8">

      {/* Dashboard summary cards */}
      {dashboardData?.data && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "Kafedralar", value: dashboardData.data.countDepartments },
            { label: "O'qituvchilar", value: dashboardData.data.countTeachers },
            { label: "Jami ma'lumot", value: dashboardData.data.countInfo },
            { label: "Oylik yangi", value: dashboardData.data.countInfoByMonth },
          ].map((item) => (
            <Card key={item.label} className="bg-[#fdfdfd] dark:bg-[#0f0f11] border-border">
              <CardHeader className="pb-2">
                <CardDescription>{item.label}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-foreground">{item.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Age Distribution */}
          {ageChartData.length > 0 && (
            <Card className="col-span-1 lg:col-span-2 bg-[#fdfdfd] dark:bg-[#0f0f11] border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Yosh bo'yicha taqsimot</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Xodimlar yosh guruhlari
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={ageChartConfig} className="h-[250px] w-full">
                  <BarChart data={ageChartData} margin={{ left: 12, right: 12 }}>
                    <CartesianGrid vertical={false} className="stroke-border" />
                    <XAxis dataKey="ageGroup" className="text-muted-foreground" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="count" fill="#007FFF" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          )}

          {/* Gender Distribution */}
          {pieData.length > 0 && (
            <Card className="flex flex-col bg-[#fdfdfd] dark:bg-[#0f0f11] border-border">
              <CardHeader className="items-center pb-0">
                <CardTitle className="text-foreground">Jins bo'yicha</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 pb-0">
                <ChartContainer
                  config={genderChartConfig}
                  className="mx-auto aspect-square max-h-[250px]"
                >
                  <PieChart>
                    <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                    <Pie
                      data={pieData}
                      dataKey="count"
                      nameKey="type"
                      innerRadius={60}
                      strokeWidth={5}
                      className="stroke-card"
                    >
                      <Label
                        content={({ viewBox }) =>
                          viewBox && "cx" in viewBox ? (
                            <text
                              x={viewBox.cx}
                              y={viewBox.cy}
                              textAnchor="middle"
                              dominantBaseline="middle"
                            >
                              <tspan
                                x={viewBox.cx}
                                y={viewBox.cy}
                                className="fill-foreground text-3xl font-bold"
                              >
                                {totalGender.toLocaleString()}
                              </tspan>
                              <tspan
                                x={viewBox.cx}
                                y={(viewBox.cy || 0) + 24}
                                className="fill-muted-foreground"
                              >
                                Total
                              </tspan>
                            </text>
                          ) : null
                        }
                      />
                    </Pie>
                  </PieChart>
                </ChartContainer>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Scientific Degree Distribution */}
        {scientificChartData.length > 0 && (
          <Card className="col-span-1 bg-[#fdfdfd] dark:bg-[#0f0f11] border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Ilmiy daraja bo'yicha</CardTitle>
              <CardDescription className="text-muted-foreground">
                Xodimlarning ilmiy darajasi taqsimoti
              </CardDescription>
            </CardHeader>
            <CardContent className="px-2 pt-6">
              <ChartContainer config={scientificChartConfig} className="h-[300px] w-full">
                <BarChart data={scientificChartData}>
                  <CartesianGrid vertical={false} className="stroke-border" />
                  <XAxis dataKey="label" className="text-muted-foreground" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="count" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { ChevronRight, ArrowUpRight, Loader2 } from "lucide-react";
import { useGetAllColleges } from "@/hooks/useCollege";

const FacultyCardsContainer = () => {
  const { data, isLoading, isError } = useGetAllColleges();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (isError || !data?.data?.length) {
    return (
      <div className="flex justify-center items-center py-20">
        <p className="text-muted-foreground">
          {isError ? "Ma'lumotlarni yuklashda xatolik yuz berdi." : "Fakultetlar topilmadi."}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6 w-full mx-auto">
      {data.data.map((college) => (
        <Card
          key={college.id}
          className="group w-full overflow-hidden border border-border/80 bg-card shadow-md transition-all duration-300 hover:shadow-xl rounded-xl flex flex-col justify-between p-0 gap-1"
        >
          {/* Kollej rasmi */}
          <div className="relative h-44 w-full bg-muted overflow-hidden">
            {college.imgUrl ? (
              <img
                src={college.imgUrl}
                alt={college.name}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="h-full w-full bg-gradient-to-br from-primary/20 to-primary/10" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-background/30 to-transparent" />
          </div>

          {/* Sarlavha */}
          <CardHeader className="px-5 pt-2 pb-2">
            <CardTitle className="text-lg font-semibold tracking-tight text-foreground transition-colors group-hover:text-blue-500 flex items-center justify-between gap-2">
              <span className="truncate">{college.name}</span>
            </CardTitle>
          </CardHeader>

          {/* Kafedralar ro'yxati */}
          <CardContent className="px-5 pb-4 flex-grow">
            <div className="space-y-2">
              {college.departmentNames.map((dept, dIndex) => (
                <div
                  key={dIndex}
                  className="flex items-start gap-2 text-sm text-muted-foreground group/item"
                >
                  <ChevronRight className="h-4 w-4 text-blue-500 shrink-0 mt-0.5 transition-transform group-hover/item:translate-x-0.5" />
                  <span className="truncate hover:text-foreground transition-colors cursor-default">
                    {dept}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>

          {/* Footer */}
          <CardFooter className="px-5 py-3 border-t border-border/50 bg-muted/20">
            <Link
              href={`/faculties/${college.id}`}
              className="inline-flex items-center text-xs tracking-wider text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors gap-1 group/link"
            >
              {"Batafsil ma'lumot"}
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default FacultyCardsContainer;

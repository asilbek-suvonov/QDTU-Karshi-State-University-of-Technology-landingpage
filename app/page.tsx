"use client";

import FacultyCardsContainer from "@/components/facultity-card";
import { UserCard } from "@/components/user-card";
import { useGetAllUsers } from "@/hooks/useUser";
import { Loader2 } from "lucide-react";

export default function Home() {
  const { data, isLoading, isError } = useGetAllUsers();

  return (
    <main className="min-h-screen">
      {/* Faculties Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold tracking-tight text-foreground mb-8 text-center">
            Bizning Fakultetlar
          </h2>
          <FacultyCardsContainer />
        </div>
      </section>

      {/* Staff Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold tracking-tight text-foreground mb-8 text-center">
            Bizning Rahbariyat va Xodimlar
          </h2>

          {isLoading && (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          )}

          {isError && (
            <div className="flex justify-center items-center py-20">
              <p className="text-muted-foreground">
                Ma'lumotlarni yuklashda xatolik yuz berdi.
              </p>
            </div>
          )}

          {!isLoading && !isError && data?.data?.length === 0 && (
            <div className="flex justify-center items-center py-20">
              <p className="text-muted-foreground">Xodimlar topilmadi.</p>
            </div>
          )}

          {data?.data && data.data.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {data.data.map((user) => (
                <UserCard
                  key={user.id}
                  id={user.id}
                  fullName={user.fullName}
                  collegeName={user.collegeName}
                  departmentName={user.departmentName}
                  imgUrl={user.imgUrl}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

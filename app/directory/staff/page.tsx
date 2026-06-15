"use client";

import { UserCard } from "@/components/user-card";
import { useGetAllUsers } from "@/hooks/useUser";
import { useState } from "react";
import { SearchInput } from "@/components/ui/search-input";
import { Loader2 } from "lucide-react";
import type { UserListItem } from "@/service/user/user.type";

export default function Page() {
  const [searchQuery, setSearchQuery] = useState("");
  const { data, isLoading, isError } = useGetAllUsers();

  const filtered = (data?.data ?? []).filter(
    (user: UserListItem) =>
      user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.departmentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.collegeName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-20 min-h-screen">
      <div className="mb-8 w-full flex justify-center">
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search by name, department or college..."
        />
      </div>

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

      {!isLoading && !isError && filtered.length === 0 && (
        <div className="flex justify-center items-center py-20">
          <p className="text-muted-foreground">Xodimlar topilmadi.</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filtered.map((user: UserListItem) => (
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
    </div>
  );
}

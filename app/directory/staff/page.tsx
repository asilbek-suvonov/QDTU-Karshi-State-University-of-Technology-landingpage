"use client"

import { UserCard } from '@/components/user-card';
import { users } from '@/lib/data';
import { useState } from 'react';
import { SearchInput } from '@/components/ui/search-input';

export default function Page() {
  const [searchQuery, setSearchQuery] = useState("");
  
  const staff = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-20 min-h-screen">
      <div className="mb-8 w-full flex justify-center">
        <SearchInput 
          value={searchQuery} 
          onChange={setSearchQuery} 
          placeholder="Search by name or role..." 
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {staff.map((user) => (
          <UserCard 
            key={user.id}
            id={user.id}
            name={user.name}
            role={user.role}
            email={user.email}
            phone={user.phone}
            location={user.location}
            avatarUrl={user.avatarUrl}
            joinedDate={user.joinedDate}
          />
        ))}
      </div>
    </div>
  );
}

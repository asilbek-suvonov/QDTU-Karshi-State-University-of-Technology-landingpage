"use client"

import { UserCard } from '@/components/user-card';
import { users } from '@/lib/data';
import { Search } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

export default function Page() {
  const [searchQuery, setSearchQuery] = useState("");
  
  const staff = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-20 min-h-screen">

      <div className="mb-8">
       <div className="w-full flex justify-center px-4 mb-6">
    <div className="relative w-full max-w-md group">
      <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/70 transition-colors group-focus-within:text-blue-500" />
      
      <input 
        type="text"
        placeholder="Search by name or role..."
        className="w-full pl-10 pr-4 py-2 text-sm border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground/60 outline-none transition-all duration-200 hover:border-border/80 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {staff.map((user) => (
          <Link key={user.id} href={`/directory/staff/${user.id}`}>
            <UserCard 
              name={user.name}
              role={user.role}
              email={user.email}
              phone={user.phone}
              location={user.location}
              avatarUrl={user.avatar}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}

import React from 'react';
import { PageHeader } from '@/components/page-header';
import { UserCard } from '@/components/user-card';
import { users } from '@/lib/data';

export default function Page() {
  const faculty = users.filter(user => user.role.includes('Dr.') || user.role.includes('Prof.') || user.role === 'Chancellor' || user.role === 'Dean of Sciences');

  return (
    <div className="container mx-auto px-4 py-20 min-h-screen">
      <PageHeader 
        title="Faculty List" 
        subtitle="Browse our academic faculty members." 
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {faculty.map((member) => (
          <UserCard key={member.id} {...member} />
        ))}
      </div>
    </div>
  );
}

import React from 'react';
import { PageHeader } from '@/components/page-header';
import { users } from '@/lib/data';

export default function Page() {
  const faculty = users.filter(user => user.role.includes('Dr.') || user.role.includes('Prof.') || user.role === 'Chancellor' || user.role === 'Dean of Sciences');

  return (
    <div className="container mx-auto px-4 py-20 min-h-screen">
      <PageHeader 
        title="Faculty List" 
        subtitle="Browse our academic faculty members." 
      />
      
    </div>
  );
}

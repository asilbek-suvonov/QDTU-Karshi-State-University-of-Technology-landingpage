import React from 'react';
import { PageHeader } from '@/components/page-header';

export default function Page() {
  return (
    <div className="container mx-auto px-4 py-20 min-h-screen">
      <PageHeader 
        title="Directory" 
        subtitle="Explore the university directory including faculty and staff."
      />
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-lg text-muted-foreground leading-relaxed">
          Welcome to the comprehensive directory of our university. Here you can find information about our distinguished faculty members, dedicated administrative staff, and various departments.
        </p>
      </div>
    </div>
  );
}

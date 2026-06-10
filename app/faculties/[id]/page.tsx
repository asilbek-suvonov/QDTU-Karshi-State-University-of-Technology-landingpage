import React from 'react';

export default function Page({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto px-4 py-20 min-h-screen">
      <h1 className="text-4xl font-bold uppercase tracking-tighter mb-8">Faculty Details #{params.id}</h1>
      <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
        This is the Faculty Details section of our University platform. We provide comprehensive data and resources for students and staff.
      </p>
    </div>
  );
}

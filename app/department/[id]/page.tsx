import React from 'react';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return (
    <div className="container mx-auto px-4 py-20 min-h-screen">
      <h1 className="text-4xl font-bold uppercase tracking-tighter mb-8">Department Detail: {id}</h1>
      <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
        Information about the department: {id}
      </p>
    </div>
  );
}

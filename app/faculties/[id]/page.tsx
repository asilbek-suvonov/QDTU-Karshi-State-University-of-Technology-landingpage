import { PageHeader } from '@/components/page-header';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return (
    <div className="container mx-auto px-4 py-20 min-h-screen">
      <PageHeader 
        title={`Faculty Detail: ${id}`} 
        subtitle={`Information about the faculty: ${id}`}
      />
    </div>
  );
}

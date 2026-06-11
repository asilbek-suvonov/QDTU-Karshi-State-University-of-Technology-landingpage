import { PageHeader } from '@/components/page-header';

export default function Page() {
  return (
    <div className="container mx-auto px-4 py-20 min-h-screen">
      <PageHeader 
        title="Consultations" 
        subtitle="Academic advising and consultation services."
      />
    </div>
  );
}


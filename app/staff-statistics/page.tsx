import { PageHeader } from '@/components/page-header';

export default function Page() {
  return (
    <div className="container mx-auto px-4 py-20 min-h-screen">
      <PageHeader 
        title="Staff Statistics" 
        subtitle="Statistical data regarding university staff."
      />
    </div>
  );
}

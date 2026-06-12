import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-40 min-h-screen flex flex-col items-center text-center">
      <h1 className="text-9xl font-bold uppercase tracking-tighter mb-4 opacity-10">404</h1>
      <h2 className="text-4xl font-bold uppercase tracking-tighter mb-8">Page Not Found</h2>
      <p className="text-lg text-muted-foreground leading-relaxed max-w-md mb-12">
        The page you are looking for might have been moved, deleted, or never existed.
      </p>
      <Link href="/">
        <Button variant="outline" className="rounded-none uppercase tracking-widest px-8">
          Back to Home
        </Button>
      </Link>
    </div>
  );
}

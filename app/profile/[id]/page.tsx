import { notFound } from "next/navigation"
import { PageHeader } from '@/components/page-header';
import { users } from '@/lib/data';
import { UserCard } from '@/components/user-card';

export default async function ProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const user = users.find(u => u.id === id)

  if (!user) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-20 min-h-screen">
      <PageHeader 
        title={`Profile: ${user.name}`} 
        subtitle={user.role}
      />
      <div className="max-w-xl mx-auto">
        <UserCard {...user} />
      </div>
    </div>
  )
}

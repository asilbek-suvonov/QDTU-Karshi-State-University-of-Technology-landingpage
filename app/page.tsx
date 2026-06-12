import FacultyCardsContainer from "@/components/facultity-card";
import { UserCard } from "@/components/user-card";
import { users } from "@/lib/data";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Faculties Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold tracking-tight text-foreground mb-8 text-center">
            Bizning Fakultetlar
          </h2>
          <FacultyCardsContainer />
        </div>
      </section>

      {/* Staff Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold tracking-tight text-foreground mb-8 text-center">
            Bizning Rahbariyat va Xodimlar
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {users.map((user) => (
              <UserCard
                key={user.id}
                name={user.name}
                role={user.role}
                email={user.email}
                phone={user.phone}
                location={user.location}
                avatarUrl={user.avatarUrl}
                joinedDate={user.joinedDate}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

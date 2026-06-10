import { HeroSlider } from "@/components/hero-slider"
import { UserCard } from "@/components/user-card"

const users = [
  {
    name: "Dr. Sarah Johnson",
    role: "Chancellor",
    email: "chancellor@university.edu",
    phone: "+1 (555) 010-2233",
    location: "Administration Bldg, Room 402",
    initials: "SJ",
  },
  {
    name: "Prof. Michael Chen",
    role: "Dean of Sciences",
    email: "m.chen@university.edu",
    phone: "+1 (555) 010-4455",
    location: "Science Plaza, West Wing",
    initials: "MC",
  },
  {
    name: "Dr. Elena Rodriguez",
    role: "Head of Research",
    email: "e.rodriguez@university.edu",
    phone: "+1 (555) 010-6677",
    location: "Innovation Hub, Level 2",
    initials: "ER",
  },
  {
    name: "James Wilson",
    role: "Director of Admissions",
    email: "j.wilson@university.edu",
    phone: "+1 (555) 010-8899",
    location: "Welcome Center",
    initials: "JW",
  },
]

export default function Home() {
  return (
    <div className="flex flex-col gap-20 pb-20">
      <HeroSlider />
      
      <section className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-muted-foreground">
              Our Leadership
            </h2>
            <h3 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter">
              Meet the Visionaries
            </h3>
          </div>
          <p className="max-w-md text-muted-foreground text-sm leading-relaxed">
            Our university is guided by a team of dedicated professionals committed 
            to academic excellence and institutional growth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {users.map((user, index) => (
            <UserCard key={index} {...user} />
          ))}
        </div>
      </section>

      <section className="bg-foreground text-background py-24">
        <div className="container mx-auto px-4 text-center space-y-8">
          <h2 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter italic">
            Knowledge is Power
          </h2>
          <p className="max-w-2xl mx-auto opacity-70 text-lg uppercase tracking-widest">
            Since 1924, we have been at the forefront of education.
          </p>
        </div>
      </section>
    </div>
  )
}

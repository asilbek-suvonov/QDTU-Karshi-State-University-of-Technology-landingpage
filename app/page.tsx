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
    bio: "Dr. Sarah Johnson is a visionary educator with over 25 years of experience in higher education management. She has served as the Chancellor since 2018, focusing on global partnerships and digital transformation.",
    education: [
      { year: "2002", degree: "Ph.D. in Higher Ed Administration", institution: "Oxford University" },
      { year: "1995", degree: "M.Sc. in Organizational Leadership", institution: "LSE" }
    ],
    awards: [
      { year: "2024", title: "Global Leadership in Education", organization: "UNESCO" },
      { year: "2021", title: "Educator of the Decade", organization: "World Edu Council" }
    ],
    publications: [
      { year: "2023", title: "The Next Era of Universities: A Digital First Approach" },
      { year: "2021", title: "Equity and Access in Modern Higher Education" }
    ]
  },
  {
    name: "Prof. Michael Chen",
    role: "Dean of Sciences",
    email: "m.chen@university.edu",
    phone: "+1 (555) 010-4455",
    location: "Science Plaza, West Wing",
    initials: "MC",
    bio: "Professor Michael Chen is a world-renowned physicist specializing in quantum mechanics. As Dean of Sciences, he has pioneered several interdisciplinary research programs that bridge physics and computer science.",
    education: [
      { year: "2008", degree: "Ph.D. in Quantum Physics", institution: "MIT" },
      { year: "2003", degree: "B.S. in Theoretical Physics", institution: "Caltech" }
    ],
    awards: [
      { year: "2022", title: "Nobel Prize in Physics (Nominee)", organization: "Royal Swedish Academy" },
      { year: "2019", title: "Excellence in Research Medal", organization: "Science Foundation" }
    ],
    publications: [
      { year: "2024", title: "Quantum Computing: From Theory to Reality" },
      { year: "2022", title: "The Particle Revolution" }
    ]
  },
  {
    name: "Dr. Elena Rodriguez",
    role: "Head of Research",
    email: "e.rodriguez@university.edu",
    phone: "+1 (555) 010-6677",
    location: "Innovation Hub, Level 2",
    initials: "ER",
    bio: "Dr. Elena Rodriguez leads the university's research initiatives, managing over $500M in annual grants. Her work focuses on sustainable development and clean energy technologies.",
    education: [
      { year: "2010", degree: "Ph.D. in Environmental Science", institution: "Berkeley" },
      { year: "2005", degree: "M.Eng. in Sustainability", institution: "ETH Zurich" }
    ],
    awards: [
      { year: "2023", title: "Green Innovator Award", organization: "Earth Alliance" },
      { year: "2020", title: "Top 30 Under 40 in Science", organization: "Fortune" }
    ],
    publications: [
      { year: "2023", title: "Decarbonizing the Future: A Policy Framework" },
      { year: "2021", title: "Water Scarcity and Global Stability" }
    ]
  },
  {
    name: "James Wilson",
    role: "Director of Admissions",
    email: "j.wilson@university.edu",
    phone: "+1 (555) 010-8899",
    location: "Welcome Center",
    initials: "JW",
    bio: "James Wilson oversees the global recruitment and admission process. He is dedicated to creating a diverse and inclusive student body, representing over 120 nationalities.",
    education: [
      { year: "2012", degree: "MBA", institution: "Harvard Business School" },
      { year: "2007", degree: "B.A. in International Relations", institution: "Georgetown" }
    ],
    awards: [
      { year: "2022", title: "Diversity and Inclusion Champion", organization: "Education First" },
      { year: "2018", title: "Rising Star in Admissions", organization: "NACAC" }
    ],
    publications: [
      { year: "2022", title: "Holistic Review: The Future of College Admissions" },
      { year: "2019", title: "Global Recruitment Strategies" }
    ]
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
            to academic excellence and institutional growth. Click on a card to view detailed profile.
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

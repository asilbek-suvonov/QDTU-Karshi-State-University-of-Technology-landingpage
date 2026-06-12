import { notFound } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap } from "lucide-react";
import { UserCard } from "@/components/user-card";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { faculties, users } from "@/lib/data";

export default async function FacultyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const faculty = faculties.find(f => f.id === id);

  if (!faculty) {
    notFound();
  }

  const deanData = users.find(u => u.id === faculty.deanId) || users[0];

  const stats = [
    { title: "Professors", value: faculty.stats.professors },
    { title: "Docents", value: faculty.stats.docents },
    { title: "PhD", value: faculty.stats.phd },
    { title: "DSc", value: faculty.stats.dsc },
  ];

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Directory", href: "/directory" },
    { label: "Faculties", href: "/directory/faculty" },
    { label: faculty.title },
  ];

  return (
    <div className="container mx-auto px-4 py-10 min-h-screen">
      <Breadcrumb items={breadcrumbItems} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 items-start">
        {/* Left Column: Image */}
        <div className="col-span-1">
          <Card className="bg-card border-border shadow-lg p-0 overflow-hidden rounded-xl">
            <CardContent className="p-0">
              <div className="h-64 w-full relative">
                <img
                  src={faculty.imageUrl}
                  alt={faculty.title}
                  className="object-cover w-full h-full"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Statistics */}
        <div className="col-span-1 md:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-4 w-full">
          {stats.map((stat) => (
            <Card
              key={stat.title}
              className="bg-[#1c1c1c] border-zinc-800 shadow-none h-[90px] p-0 rounded-xl"
            >
              <CardContent className="p-4 flex flex-col justify-between h-full">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-zinc-400 font-medium">{stat.title}</p>
                  <GraduationCap className="h-4 w-4 text-zinc-500" />
                </div>
                <h3 className="text-2xl font-bold text-white mt-1">{stat.value}</h3>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* About Section & UserCard */}
      <section className="mt-12 max-w-md">
        <h2 className="text-xl font-semibold text-white mb-5">
          Faculty Administration
        </h2>
        
        <UserCard 
          name={deanData.name}
          role={deanData.role}
          email={deanData.email}
          phone={deanData.phone}
          location={deanData.location}
          joinedDate={deanData.joinedDate}
          avatarUrl={deanData.avatarUrl}
          bannerUrl={deanData.bannerUrl}
        />
      </section>
    </div>
  );
}

import { notFound } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap } from "lucide-react";
import { UserCard, UserCardProps } from "@/components/user-card";
import { Breadcrumb } from "@/components/ui/breadcrumb";

// Mock faculty data (numeric IDs)
const faculties = [
  {
    id: "1",
    name: "Arxitektura fakulteti",
    image: "https://images.unsplash.com/photo-1504297050568-910d24c426d3?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: "2",
    name: "Asulan (Axborot Tizimlari)",
    image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: "3",
    name: "Davolash fakulteti",
    image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: "4",
    name: "Sun'iy intellekt",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: "5",
    name: "Xorijiy tillar fakulteti",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=500&q=80",
  },
];

// Dekan yoki mas'ul shaxs haqida mock ma'lumotlar (Fakultet ID-siga qarab)
const facultyDeans: Record<string, any> = {
  "1": { name: "Asilbek Suvonov", role: "Fakultet Dekani", email: "asilbek@univer.uz", phone: "+998 90 123 45 67", location: "Bino A, 204-xona", joinedDate: "March 2021", avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80", bannerUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80", isVerified: true },
  "2": { name: "Jasur Karimov", role: "Kafedra Mudiri", email: "jasur@univer.uz", phone: "+998 91 456 78 90", location: "IT Markaz, 102-xona", joinedDate: "January 2023", avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80", bannerUrl: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=800&q=80", isVerified: true },
  "3": { name: "Dilshod Rahmatov", role: "Fakultet Dekani", email: "dilshod@univer.uz", phone: "+998 93 765 43 21", location: "Tibbiyot binosi, 3-qavat", joinedDate: "December 2020", avatarUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80", bannerUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80", isVerified: false },
  "4": { name: "Aziza Tursunova", role: "Kafedra Mudiri", email: "aziza@univer.uz", phone: "+998 94 112 23 34", location: "AI Lab, 405-xona", joinedDate: "October 2024", avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80", bannerUrl: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80", isVerified: true },
  "5": { name: "Bekzod Usmonov", role: "Fakultet Dekani", email: "bekzod@univer.uz", phone: "+998 95 987 65 43", location: "Xorijiy tillar binosi, 11-xona", joinedDate: "August 2022", avatarUrl: "https://images.unsplash.com/photo-1504257432389-52343af06ae3?auto=format&fit=crop&w=300&q=80", bannerUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80", isVerified: true }
};

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

  // Id ga mos dekan ma'lumotlarini olamiz, topilmasa default tursin
  const deanData = facultyDeans[id] || facultyDeans["1"];

  // Academic stats mock
  const stats = [
    { title: "Professors", value: 12 },
    { title: "Docents", value: 25 },
    { title: "PhD", value: 40 },
    { title: "DSc", value: 10 },
  ];

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Faculties", href: "/directory/faculty" },
    { label: faculty.name },
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
                  src={faculty.image}
                  alt={faculty.name}
                  className="object-cover w-full h-full"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Statistics (Dizayn to'g'rilandi va Responsive qilindi) */}
        <div className="col-span-1 md:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-4 w-full">
          {stats.map((stat) => (
            <Card
              key={stat.title}
              className="dark:bg-[#1c1c1c] bg-[#F8F8F8] border-zinc-800 shadow-none h-[90px] p-0 rounded-xl"
            >
              <CardContent className="p-4 flex flex-col justify-between h-full">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-zinc-400 font-medium">{stat.title}</p>
                  <GraduationCap className="h-4 w-4 text-zinc-500" />
                </div>
                <h3 className="text-2xl font-bold dark:text-white text-black mt-1">{stat.value}</h3>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* About Section & UserCard Props ulanishi */}
      <section className="mt-12 max-w-md">
        <h2 className="text-xl font-semibold dark:text-white text-black mb-5">
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
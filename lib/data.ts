export interface User {
  id: string
  name: string
  role: string
  email: string
  phone: string
  location: string
  avatarUrl?: string
  bannerUrl?: string
  initials: string
  bio: string
  joinedDate: string
  isVerified: boolean
  education: { year: string; degree: string; institution: string }[]
  awards: { year: string; title: string; organization: string }[]
  publications: { year: string; title: string }[]
}

export interface Faculty {
  id: string
  title: string
  imageUrl: string
  departments: string[]
  deanId: string
  stats: {
    professors: number
    docents: number
    phd: number
    dsc: number
  }
}

export const users: User[] = [
  {
    id: "sarah-johnson",
    name: "Dr. Sarah Johnson",
    role: "Chancellor",
    email: "chancellor@university.edu",
    phone: "+1 (555) 010-2233",
    location: "Administration Bldg, Room 402",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
    bannerUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    initials: "SJ",
    joinedDate: "March 2018",
    isVerified: true,
    bio: "Dr. Sarah Johnson is a visionary educator with over 25 years of experience in higher education management.",
    education: [
      { year: "2002", degree: "Ph.D. in Higher Ed Administration", institution: "Oxford University" },
      { year: "1995", degree: "M.Sc. in Organizational Leadership", institution: "LSE" }
    ],
    awards: [
      { year: "2024", title: "Global Leadership in Education", organization: "UNESCO" },
      { year: "2021", title: "Educator of the Decade", organization: "World Edu Council" }
    ],
    publications: [
      { year: "2023", title: "The Next Era of Universities: A Digital First Approach" }
    ]
  },
  {
    id: "michael-chen",
    name: "Prof. Michael Chen",
    role: "Dean of Sciences",
    email: "m.chen@university.edu",
    phone: "+1 (555) 010-4455",
    location: "Science Plaza, West Wing",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
    bannerUrl: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=800&q=80",
    initials: "MC",
    joinedDate: "January 2020",
    isVerified: true,
    bio: "Professor Michael Chen is a world-renowned physicist specializing in quantum mechanics.",
    education: [
      { year: "2008", degree: "Ph.D. in Quantum Physics", institution: "MIT" }
    ],
    awards: [
      { year: "2022", title: "Nobel Prize in Physics (Nominee)", organization: "Royal Swedish Academy" }
    ],
    publications: [
      { year: "2024", title: "Quantum Computing: From Theory to Reality" }
    ]
  },
  {
    id: "elena-rodriguez",
    name: "Dr. Elena Rodriguez",
    role: "Head of Research",
    email: "e.rodriguez@university.edu",
    phone: "+1 (555) 010-6677",
    location: "Innovation Hub, Level 2",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
    bannerUrl: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
    initials: "ER",
    joinedDate: "June 2019",
    isVerified: true,
    bio: "Dr. Elena Rodriguez leads the university's research initiatives, managing over $500M in annual grants.",
    education: [
      { year: "2010", degree: "Ph.D. in Environmental Science", institution: "Berkeley" }
    ],
    awards: [
      { year: "2023", title: "Green Innovator Award", organization: "Earth Alliance" }
    ],
    publications: [
      { year: "2023", title: "Decarbonizing the Future: A Policy Framework" }
    ]
  },
  {
    id: "james-wilson",
    name: "James Wilson",
    role: "Director of Admissions",
    email: "j.wilson@university.edu",
    phone: "+1 (555) 010-8899",
    location: "Welcome Center",
    avatarUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80",
    bannerUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
    initials: "JW",
    joinedDate: "September 2015",
    isVerified: false,
    bio: "James Wilson oversees the global recruitment and admission process.",
    education: [
      { year: "2012", degree: "MBA", institution: "Harvard Business School" }
    ],
    awards: [
      { year: "2022", title: "Diversity and Inclusion Champion", organization: "Education First" }
    ],
    publications: [
      { year: "2022", title: "Holistic Review: The Future of College Admissions" }
    ]
  },
  {
    id: "asilbek-suvonov",
    name: "Asilbek Suvonov",
    role: "Fakultet Dekani",
    email: "asilbek@univer.uz",
    phone: "+998 90 123 45 67",
    location: "Bino A, 204-xona",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
    bannerUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    initials: "AS",
    joinedDate: "March 2021",
    isVerified: true,
    bio: "Asilbek Suvonov Arxitektura fakulteti dekani lavozimida faoliyat yuritadi.",
    education: [{ year: "2010", degree: "Arxitektura magistri", institution: "TAQI" }],
    awards: [],
    publications: []
  },
  {
    id: "jasur-karimov",
    name: "Jasur Karimov",
    role: "Kafedra Mudiri",
    email: "jasur@univer.uz",
    phone: "+998 91 456 78 90",
    location: "IT Markaz, 102-xona",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
    bannerUrl: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=800&q=80",
    initials: "JK",
    joinedDate: "January 2023",
    isVerified: true,
    bio: "Jasur Karimov Dasturiy injiniring kafedrasi mudiri.",
    education: [{ year: "2015", degree: "Computer Science PhD", institution: "TUIT" }],
    awards: [],
    publications: []
  },
  {
    id: "dilshod-rahmatov",
    name: "Dilshod Rahmatov",
    role: "Fakultet Dekani",
    email: "dilshod@univer.uz",
    phone: "+998 93 765 43 21",
    location: "Tibbiyot binosi, 3-qavat",
    avatarUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80",
    bannerUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
    initials: "DR",
    joinedDate: "December 2020",
    isVerified: false,
    bio: "Dilshod Rahmatov Davolash fakulteti dekani.",
    education: [{ year: "2005", degree: "Tibbiyot fanlari doktori", institution: "TMA" }],
    awards: [],
    publications: []
  },
  {
    id: "aziza-tursunova",
    name: "Aziza Tursunova",
    role: "Kafedra Mudiri",
    email: "aziza@univer.uz",
    phone: "+998 94 112 23 34",
    location: "AI Lab, 405-xona",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
    bannerUrl: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
    initials: "AT",
    joinedDate: "October 2024",
    isVerified: true,
    bio: "Aziza Tursunova Sun'iy intellekt kafedrasi mudiri.",
    education: [{ year: "2018", degree: "AI Specialist", institution: "Stanford" }],
    awards: [],
    publications: []
  },
  {
    id: "bekzod-usmonov",
    name: "Bekzod Usmonov",
    role: "Fakultet Dekani",
    email: "bekzod@univer.uz",
    phone: "+998 95 987 65 43",
    location: "Xorijiy tillar binosi, 11-xona",
    avatarUrl: "https://images.unsplash.com/photo-1504257432389-52343af06ae3?auto=format&fit=crop&w=300&q=80",
    bannerUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80",
    initials: "BU",
    joinedDate: "August 2022",
    isVerified: true,
    bio: "Bekzod Usmonov Xorijiy tillar fakulteti dekani.",
    education: [{ year: "2012", degree: "Linguistics Master", institution: "UzSWLU" }],
    awards: [],
    publications: []
  },
  {
    id: "nilufar-olimova",
    name: "Nilufar Olimova",
    role: "Kafedra Mudiri",
    email: "nilufar@univer.uz",
    phone: "+998 99 111 22 33",
    location: "Bino B, 301-xona",
    avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=300&q=80",
    bannerUrl: "https://images.unsplash.com/photo-1523240715630-341643c7b8d4?auto=format&fit=crop&w=800&q=80",
    initials: "NO",
    joinedDate: "May 2023",
    isVerified: true,
    bio: "Nilufar Olimova Iqtisodiyot kafedrasi mudiri.",
    education: [{ year: "2014", degree: "Economics PhD", institution: "TSUE" }],
    awards: [],
    publications: []
  }
];

export const faculties: Faculty[] = [
  {
    id: "1",
    title: "Arxitektura fakulteti",
    imageUrl: "https://images.unsplash.com/photo-1504297050568-910d24c426d3?auto=format&fit=crop&w=500&q=80",
    departments: ["Adabiyot va ona tili", "Arxitektura va dizayn"],
    deanId: "asilbek-suvonov",
    stats: { professors: 12, docents: 25, phd: 40, dsc: 10 }
  },
  {
    id: "2",
    title: "Asulan (Axborot Tizimlari)",
    imageUrl: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=500&q=80",
    departments: ["Dasturiy injiniring", "Axborot xavfsizligi"],
    deanId: "jasur-karimov",
    stats: { professors: 15, docents: 30, phd: 45, dsc: 8 }
  },
  {
    id: "3",
    title: "Davolash fakulteti",
    imageUrl: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=500&q=80",
    departments: ["Farmatsiya va kimyo", "Xirurgiya"],
    deanId: "dilshod-rahmatov",
    stats: { professors: 20, docents: 40, phd: 60, dsc: 15 }
  },
  {
    id: "4",
    title: "Sun'iy intellekt",
    imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=500&q=80",
    departments: ["Machine Learning", "Data Science"],
    deanId: "aziza-tursunova",
    stats: { professors: 8, docents: 15, phd: 25, dsc: 5 }
  },
  {
    id: "5",
    title: "Xorijiy tillar fakulteti",
    imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=500&q=80",
    departments: ["Ingliz tili filologiyasi", "Nemis tili"],
    deanId: "bekzod-usmonov",
    stats: { professors: 10, docents: 20, phd: 35, dsc: 7 }
  },
  {
    id: "6",
    title: "Iqtisodiyot fakulteti",
    imageUrl: "https://images.unsplash.com/photo-1454165833767-027ffcb99c17?auto=format&fit=crop&w=500&q=80",
    departments: ["Makroiqtisodiyot", "Moliya va kredit"],
    deanId: "nilufar-olimova",
    stats: { professors: 14, docents: 28, phd: 42, dsc: 9 }
  },
  {
    id: "7",
    title: "Yuridik fakulteti",
    imageUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=500&q=80",
    departments: ["Xalqaro huquq", "Fuqarolik huquqi"],
    deanId: "michael-chen",
    stats: { professors: 11, docents: 22, phd: 33, dsc: 6 }
  },
  {
    id: "8",
    title: "Muhandislik fakulteti",
    imageUrl: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=500&q=80",
    departments: ["Mexanika muhandisligi", "Elektr muhandisligi"],
    deanId: "james-wilson",
    stats: { professors: 18, docents: 35, phd: 50, dsc: 12 }
  },
  {
    id: "9",
    title: "Tabiiy fanlar fakulteti",
    imageUrl: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=500&q=80",
    departments: ["Biologiya", "Ekologiya"],
    deanId: "elena-rodriguez",
    stats: { professors: 16, docents: 32, phd: 48, dsc: 11 }
  },
  {
    id: "10",
    title: "San'at va madaniyat",
    imageUrl: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=500&q=80",
    departments: ["Tasviriy san'at", "Musiqa"],
    deanId: "sarah-johnson",
    stats: { professors: 7, docents: 14, phd: 21, dsc: 4 }
  }
];

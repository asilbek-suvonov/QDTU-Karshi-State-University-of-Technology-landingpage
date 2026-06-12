export interface ResearchItem {
  id: string | number;
  section: string;
  researcher: {
    fullName: string;
    avatarUrl: string;
    department: string;
  };
  projectDetails: {
    title: string;
    organization: string;
    year: string | number;
    role: string;
    type: string;
    status: string;
  };
}

export const researchData: ResearchItem[] = [
  {
    id: 1,
    section: "Current Research",
    researcher: {
      fullName: "Dr. Elena Rodriguez",
      avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
      department: "Environmental Science"
    },
    projectDetails: {
      title: "Impact of Urban Green Spaces on Local Microclimates",
      organization: "Global Environmental Fund",
      year: "2024",
      role: "Principal Investigator",
      type: "International",
      status: "Ongoing"
    }
  },
  {
    id: 2,
    section: "Completed Research",
    researcher: {
      fullName: "Prof. Michael Chen",
      avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
      department: "Physics"
    },
    projectDetails: {
      title: "Quantum Entanglement in Nanostructures",
      organization: "National Science Foundation",
      year: "2023",
      role: "Lead Researcher",
      type: "National",
      status: "Completed"
    }
  }
];

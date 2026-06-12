export interface ConsultationProject {
  id: string | number;
  title: string;
  client: string;
  badges: {
    status: string;
    role: string;
  };
}

export interface ConsultantConsultations {
  id: string;
  consultant: {
    fullName: string;
    avatarUrl: string;
    department: string;
  };
  sectionTitle: string;
  projects: ConsultationProject[];
}

export const mockConsultationsData: { consultantsList: ConsultantConsultations[] } = {
  consultantsList: [
    {
      id: "c-sarah-johnson",
      consultant: {
        fullName: "Dr. Sarah Johnson",
        avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
        department: "Education Administration"
      },
      sectionTitle: "Expert Consultations",
      projects: [
        {
          id: "cp1",
          title: "Higher Education Digital Transformation",
          client: "Ministry of Education",
          badges: {
            status: "Completed",
            role: "Lead Consultant"
          }
        }
      ]
    }
  ]
};

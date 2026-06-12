export interface AwardItem {
  id: string | number;
  title: string;
  description: string;
  badges: {
    year: string | number;
    organization: string;
  };
}

export interface ConsultantAwards {
  consultant: {
    fullName: string;
    avatarUrl: string;
    department: string;
  };
  awards: AwardItem[];
}

export const mockAwardsData: { awardsList: ConsultantAwards[] } = {
  awardsList: [
    {
      consultant: {
        fullName: "Dr. Sarah Johnson",
        avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
        department: "Education Administration"
      },
      awards: [
        {
          id: "a1",
          title: "Global Leadership in Education",
          description: "Awarded for outstanding contribution to international educational standards.",
          badges: {
            year: "2024",
            organization: "UNESCO"
          }
        }
      ]
    }
  ]
};

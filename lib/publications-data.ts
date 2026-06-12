export interface PublicationItem {
  id: string | number;
  title: string;
  publisherInfo: string;
  badges: {
    year: string | number;
    scope: string;
    authorOrder: string;
  };
}

export interface PublicationGroup {
  groupName: string;
  items: PublicationItem[];
}

export interface AuthorPublications {
  author: {
    fullName: string;
    avatarUrl: string;
  };
  publicationsByGroup: PublicationGroup[];
}

export const mockPublicationsData: Record<string, AuthorPublications> = {
  "sarah-johnson": {
    author: {
      fullName: "Dr. Sarah Johnson",
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"
    },
    publicationsByGroup: [
      {
        groupName: "Books",
        items: [
          {
            id: "p1",
            title: "The Next Era of Universities: A Digital First Approach",
            publisherInfo: "Oxford University Press",
            badges: {
              year: "2023",
              scope: "International",
              authorOrder: "First Author"
            }
          }
        ]
      }
    ]
  }
};

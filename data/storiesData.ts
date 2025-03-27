// Mock data for stories feature

// Featured Techs type (moved from mockData.ts)
export type FeaturedTech = {
  id: string;
  name: string;
  profileImage: any;
  watched: boolean;
};

// Featured Techs data (moved from mockData.ts)
export const FEATURED_TECHS: FeaturedTech[] = [
  { id: '1', name: 'Sarah M.', profileImage: require('../assets/images/profiles/profile1.jpg'), watched: true },
  { id: '2', name: 'Lisa K.', profileImage: require('../assets/images/profiles/profile2.jpg'), watched: true },
  { id: '3', name: 'Amy R.', profileImage: require('../assets/images/profiles/profile3.jpg'), watched: false },
  { id: '4', name: 'Jane D.', profileImage: require('../assets/images/profiles/profile4.jpg'), watched: false },
  { id: '5', name: 'Emily W.', profileImage: require('../assets/images/profiles/profile5.jpg'), watched: false },
  { id: '6', name: 'Sophia T.', profileImage: require('../assets/images/profiles/profile1.jpg'), watched: false },
  { id: '7', name: 'Olivia P.', profileImage: require('../assets/images/profiles/profile2.jpg'), watched: false },
  { id: '8', name: 'Mia C.', profileImage: require('../assets/images/profiles/profile3.jpg'), watched: false },
  { id: '9', name: 'Isabella R.', profileImage: require('../assets/images/profiles/profile4.jpg'), watched: false },
  { id: '10', name: 'Ava B.', profileImage: require('../assets/images/profiles/profile5.jpg'), watched: false },
  { id: '11', name: 'Charlotte G.', profileImage: require('../assets/images/profiles/profile1.jpg'), watched: false },
  { id: '12', name: 'Amelia S.', profileImage: require('../assets/images/profiles/profile2.jpg'), watched: false },
];

export type Story = {
  id: string;
  image: any;
  caption?: string;
  timestamp: number; // Unix timestamp
};

export type StoriesData = {
  techId: string;
  stories: Story[];
};

// Stories mock data for each featured tech
export const STORIES_DATA: StoriesData[] = [
  {
    techId: '1', // Sarah M.
    stories: [
      { 
        id: '1-1', 
        image: require('../assets/images/nails/Nail Art Photo.jpeg'),
        caption: 'Just completed this amazing French manicure! 💅',
        timestamp: new Date().getTime() - 3600000 * 2 // 2 hours ago
      },
      { 
        id: '1-2', 
        image: require('../assets/images/nails/Nail Art Photo (1).webp'),
        caption: 'Chrome finish is trending this season! ✨',
        timestamp: new Date().getTime() - 3600000 * 1 // 1 hour ago
      },
      { 
        id: '1-3', 
        image: require('../assets/images/nails/Nail Art Photo (4).webp'),
        caption: 'Try this design for your next appointment!',
        timestamp: new Date().getTime() - 1800000 // 30 minutes ago
      },
    ]
  },
  {
    techId: '2', // Lisa K.
    stories: [
      { 
        id: '2-1', 
        image: require('../assets/images/nails/Nail Art Photo (2).webp'),
        caption: 'New gel technique gives amazing results',
        timestamp: new Date().getTime() - 7200000 // 2 hours ago
      },
      { 
        id: '2-2', 
        image: require('../assets/images/nails/Nail Art Photo (3).webp'),
        caption: 'Custom designs for a wedding party today',
        timestamp: new Date().getTime() - 3600000 // 1 hour ago
      },
    ]
  },
  {
    techId: '3', // Amy R.
    stories: [
      { 
        id: '3-1', 
        image: require('../assets/images/nails/Nail Art Photo 3230266.webp'),
        caption: 'Marble effect is back in style!',
        timestamp: new Date().getTime() - 5400000 // 1.5 hours ago
      },
      { 
        id: '3-2', 
        image: require('../assets/images/nails/Nail Art Photo (4).webp'),
        caption: 'Love how these turned out',
        timestamp: new Date().getTime() - 3600000 // 1 hour ago
      },
      { 
        id: '3-3', 
        image: require('../assets/images/nails/Nail Art Photo.jpeg'),
        caption: 'Classic never goes out of style',
        timestamp: new Date().getTime() - 1800000 // 30 minutes ago
      },
    ]
  },
  {
    techId: '4', // Jane D.
    stories: [
      { 
        id: '4-1', 
        image: require('../assets/images/nails/Nail Art Photo (1).webp'),
        caption: 'Spring vibes with these pastel colors',
        timestamp: new Date().getTime() - 3600000 // 1 hour ago
      },
    ]
  },
  {
    techId: '5', // Emily W.
    stories: [
      { 
        id: '5-1', 
        image: require('../assets/images/nails/Nail Art Photo (2).webp'),
        caption: 'Geometric patterns are so in right now',
        timestamp: new Date().getTime() - 7200000 // 2 hours ago
      },
      { 
        id: '5-2', 
        image: require('../assets/images/nails/Nail Art Photo (3).webp'),
        caption: 'Customer request - galaxy theme',
        timestamp: new Date().getTime() - 5400000 // 1.5 hours ago
      },
    ]
  },
  // Add empty arrays for the rest of the techs so we don't get errors
  { techId: '6', stories: [] },
  { techId: '7', stories: [] },
  { techId: '8', stories: [] },
  { techId: '9', stories: [] },
  { techId: '10', stories: [] },
  { techId: '11', stories: [] },
  { techId: '12', stories: [] },
];

// Helper function to get stories for a specific tech
export function getStoriesForTech(techId: string): Story[] {
  const techStories = STORIES_DATA.find(item => item.techId === techId);
  return techStories ? techStories.stories : [];
}

// Helper function to get all techs that have stories
export function getTechsWithStories(): string[] {
  return STORIES_DATA
    .filter(item => item.stories.length > 0)
    .map(item => item.techId);
}

// Function to update the "watched" status for a tech
export function markTechStoriesAsWatched(techId: string, watched: boolean = true): void {
  // This is a mock function that in a real app would update a database or local storage
  console.log(`Marking tech ${techId} stories as watched: ${watched}`);
  // In a real implementation, you would update state or storage here
}

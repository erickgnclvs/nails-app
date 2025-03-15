// Reviews data for nail technicians

export type Review = {
  id: string;
  techId: string;
  userName: string;
  userImage: any;
  rating: number;
  date: string;
  service: string;
  text: string;
  photos?: any[];
  helpfulCount: number;
};

export const REVIEWS: Review[] = [
  {
    id: '1',
    techId: '1', // Sarah Johnson
    userName: 'Emily W.',
    userImage: require('../assets/images/profiles/profile5.jpg'),
    rating: 5,
    date: 'Jan 15, 2025',
    service: 'Gel Manicure',
    text: 'Amazing work as always. Love how my nails turned out. The design was exactly what I wanted.',
    photos: [
      require('../assets/images/nails/Nail Art Photo.jpeg'),
      require('../assets/images/nails/Nail Art Photo (1).webp'),
      require('../assets/images/nails/Nail Art Photo (2).webp')
    ],
    helpfulCount: 23
  },
  {
    id: '2',
    techId: '1', // Sarah Johnson
    userName: 'Jessica T.',
    userImage: require('../assets/images/profiles/profile2.jpg'),
    rating: 5,
    date: 'Jan 10, 2025',
    service: 'Acrylic Full Set',
    text: 'Sarah is the best nail tech in town! She takes her time and makes sure everything is perfect. My nails have never looked better.',
    helpfulCount: 15
  },
  {
    id: '3',
    techId: '1', // Sarah Johnson
    userName: 'Michelle K.',
    userImage: require('../assets/images/profiles/profile3.jpg'),
    rating: 4,
    date: 'Jan 5, 2025',
    service: 'Nail Art Design',
    text: 'Great attention to detail. The nail art was beautiful, though it took a bit longer than expected. Will definitely come back!',
    photos: [
      require('../assets/images/nails/Nail Art Photo (3).webp'),
      require('../assets/images/nails/Nail Art Photo (4).webp')
    ],
    helpfulCount: 8
  },
  {
    id: '4',
    techId: '1', // Sarah Johnson
    userName: 'Amanda R.',
    userImage: require('../assets/images/profiles/profile4.jpg'),
    rating: 5,
    date: 'Dec 28, 2024',
    service: 'Gel Manicure',
    text: 'Sarah is so talented and professional. My nails lasted for weeks without chipping. Highly recommend!',
    helpfulCount: 19
  },
  {
    id: '5',
    techId: '1', // Sarah Johnson
    userName: 'Sophia L.',
    userImage: require('../assets/images/profiles/profile1.jpg'),
    rating: 5,
    date: 'Dec 20, 2024',
    service: 'Acrylic Full Set',
    text: 'Best nail experience I\'ve ever had! Sarah listened to exactly what I wanted and delivered beyond my expectations.',
    photos: [
      require('../assets/images/nails/Nail Art Photo 3230266.webp')
    ],
    helpfulCount: 27
  }
];

// Helper function to get reviews for a specific tech
export const getReviewsForTech = (techId: string) => {
  return REVIEWS.filter(review => review.techId === techId);
};

// Helper function to calculate rating distribution
export const getRatingDistribution = (techId: string) => {
  const techReviews = getReviewsForTech(techId);
  const totalReviews = techReviews.length;
  
  if (totalReviews === 0) return { fiveStarPercentage: 0 };
  
  const fiveStarCount = techReviews.filter(review => review.rating === 5).length;
  const fiveStarPercentage = Math.round((fiveStarCount / totalReviews) * 100);
  
  return { fiveStarPercentage };
};

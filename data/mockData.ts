// Mock data file for the Nails app

// ===== CUSTOMER DASHBOARD TYPES & DATA =====

// NOTE: Featured Techs (Stories) moved to storiesData.ts

// Trending Styles
export type TrendingStyle = {
  id: string;
  name: string;
  image: any;
  height: number;
  column?: number; // Optional column assignment for layout control
};

export const TRENDING_STYLES: TrendingStyle[] = [
  { id: '1', name: 'French Manicure', image: require('../assets/images/nails/Nail Art Photo.jpeg'), height: 160, column: 1 },
  { id: '2', name: 'Gel Extension', image: require('../assets/images/nails/Nail Art Photo (1).webp'), height: 180, column: 2 },
  { id: '3', name: 'Chrome Finish', image: require('../assets/images/nails/Nail Art Photo (2).webp'), height: 160, column: 1 },
  { id: '4', name: '3D Art', image: require('../assets/images/nails/Nail Art Photo (3).webp'), height: 180, column: 2 },
  { id: '5', name: 'Ombre Style', image: require('../assets/images/nails/Nail Art Photo (4).webp'), height: 160, column: 1 },
  { id: '6', name: 'Marble Design', image: require('../assets/images/nails/Nail Art Photo 3230266.webp'), height: 180, column: 2 },
];

// Top Rated Techs
export type TopRatedTech = {
  id: string;
  name: string;
  rating: number;
  reviews: number;
  profileImage: any;
};

export const TOP_RATED_TECHS: TopRatedTech[] = [
  { id: '1', name: 'Maria Johnson', rating: 4.9, reviews: 127, profileImage: require('../assets/images/profiles/profile1.jpg') },
  { id: '2', name: 'Patricia Lee', rating: 4.8, reviews: 98, profileImage: require('../assets/images/profiles/profile2.jpg') },
  { id: '3', name: 'Jennifer Kim', rating: 4.7, reviews: 85, profileImage: require('../assets/images/profiles/profile3.jpg') },
];

// ===== BOOKINGS TYPES & DATA =====

import { ImageSourcePropType } from 'react-native';

export type Review = {
  id: string;
  bookingId: string; // Link review to a specific booking
  techId: string; // Can be useful for aggregating tech reviews
  userName: string; // Ideally get from logged-in user
  userImage?: any; // Optional user profile image
  rating: number;
  date: string; // Date the review was submitted
  text: string;
  photos?: ImageSourcePropType[]; // Optional array for review photos
  service?: string; // Optional service associated with the review
  helpfulCount?: number; // Optional count of helpful votes
};

export type BookingItem = {
  id: string;
  techId: string; // Added techId
  techName: string;
  service: string;
  date: string;
  time: string;
  location: string;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled'; // Add cancelled status back
  profileImage: any;
  reviewId?: string | null; // Add reviewId back
};

export const BOOKINGS: BookingItem[] = [
  { 
    id: '1', 
    techId: '1', // Added techId
    techName: 'Sarah Johnson', 
    service: 'Nail Technician',
    date: 'March 15, 2025',
    time: '2:30 PM',
    location: '123 Beauty Street, Suite 4',
    status: 'confirmed',
    profileImage: require('../assets/images/profiles/profile1.jpg'),
    reviewId: 'r3' // Initialize reviewId
  },
  { 
    id: '2', 
    techId: '2', // Added techId
    techName: 'Emily Davis', 
    service: 'Nail Technician',
    date: 'March 20, 2025',
    time: '1:00 PM',
    location: '456 Nail Avenue, Unit 2',
    status: 'pending',
    profileImage: require('../assets/images/profiles/profile5.jpg'),
    reviewId: null // Initialize reviewId
  },
  { 
    id: '3', 
    techId: '3', // Added techId
    techName: 'Maria Garcia', 
    service: 'Nail Technician',
    date: 'February 28, 2025',
    time: '1:00 PM',
    location: '789 Spa Boulevard, Suite 12',
    status: 'completed',
    profileImage: require('../assets/images/profiles/profile3.jpg'),
    reviewId: null // Set back to null to allow leaving a new review
  },
  { 
    id: '4', 
    techId: '1', // Added techId
    techName: 'Jennifer Lopez', 
    service: 'Nail Technician',
    date: 'February 15, 2025',
    time: '11:30 AM',
    location: '321 Glamour Road, Shop 5',
    status: 'completed',
    profileImage: require('../assets/images/profiles/profile4.jpg'),
    reviewId: 'r1' // Initialize reviewId
  },
];

export const REVIEWS: Review[] = [
  {
    id: 'r1',
    bookingId: '4', // Linked to booking 4
    techId: '1', // Matches techId in booking 4 (Jennifer Lopez/Sarah Johnson)
    userName: 'Alex M.', // Placeholder name
    userImage: require('../assets/images/profiles/profile2.jpg'), // Example user image
    rating: 5,
    date: '2025-02-18', // Example date after booking
    text: 'Jennifer was fantastic! Very detailed work and super friendly.',
    service: 'Nail Technician', // Match service from booking
    helpfulCount: 5, // Example helpful count
  },
  {
    id: 'r2',
    bookingId: '3', // Linked to booking 3
    techId: '3', // Matches techId in booking 3 (Maria Garcia)
    userName: 'Samantha K.', 
    userImage: require('../assets/images/profiles/profile4.jpg'),
    rating: 4,
    date: '2025-03-02',
    text: 'Good service, my nails look great. A bit rushed though.',
    service: 'Nail Technician',
    photos: [
      require('../assets/images/nails/Nail Art Photo (2).webp'),
      require('../assets/images/nails/Nail Art Photo (3).webp')
    ],
    helpfulCount: 2,
  },
  {
    id: 'r3',
    bookingId: '1', // Linked to booking 1
    techId: '1', // Matches techId in booking 1 (Sarah Johnson)
    userName: 'Mike P.',
    rating: 5,
    date: '2025-03-17',
    text: 'Perfect gel manicure, lasted for weeks! Highly recommend Sarah.',
    service: 'Nail Technician',
    photos: [
      require('../assets/images/nails/Nail Art Photo (4).webp')
    ],
  },
  // Add more sample reviews if needed
];

// ===== UTILITY FUNCTIONS =====

/**
 * Calculates the distribution of ratings for a specific tech.
 * @param techId The ID of the technician.
 * @returns An object containing rating counts and percentages.
 */
export const getRatingDistribution = (techId: string) => {
    const techReviews = REVIEWS.filter(review => review.techId === techId);
    const totalReviews = techReviews.length;

    if (totalReviews === 0) {
        return {
            averageRating: 0,
            totalReviews: 0,
            distribution: {
                '5': 0, '4': 0, '3': 0, '2': 0, '1': 0
            },
            percentages: {
                '5': 0, '4': 0, '3': 0, '2': 0, '1': 0
            },
            fiveStarPercentage: 0 // Specific request from tech-reviews
        };
    }

    const distribution = { '5': 0, '4': 0, '3': 0, '2': 0, '1': 0 };
    let totalRatingSum = 0;

    techReviews.forEach(review => {
        const ratingStr = String(review.rating) as keyof typeof distribution;
        if (distribution.hasOwnProperty(ratingStr)) {
            distribution[ratingStr]++;
        }
        totalRatingSum += review.rating;
    });

    const percentages = {
         '5': (distribution['5'] / totalReviews) * 100,
         '4': (distribution['4'] / totalReviews) * 100,
         '3': (distribution['3'] / totalReviews) * 100,
         '2': (distribution['2'] / totalReviews) * 100,
         '1': (distribution['1'] / totalReviews) * 100,
    };

    return {
        averageRating: totalRatingSum / totalReviews,
        totalReviews: totalReviews,
        distribution: distribution,
        percentages: percentages,
        fiveStarPercentage: percentages['5'] // Specific request from tech-reviews
    };
};

// ===== FAVORITES TYPES & DATA =====

export type TechItem = {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  reviews: number;
  profileImage: any;
  yearsExperience?: number;
  clients?: number;
  successRate?: number;
  about?: string;
  portfolio?: any[];
  services?: Service[];
};

export type Service = {
  id: string;
  name: string;
  duration: number; // in minutes
  price: number;
};

export const FAVORITE_TECHS: TechItem[] = [
  { 
    id: '1', 
    name: 'Sarah Johnson', 
    specialty: 'Nail Art Specialist',
    rating: 4.8,
    reviews: 128,
    profileImage: require('../assets/images/profiles/profile1.jpg'),
    yearsExperience: 5,
    clients: 500,
    successRate: 98,
    about: 'Professional nail technician with expertise in nail art, acrylics, and gel designs. Certified nail specialist with a passion for creating unique designs tailored to each client\'s style.',
    portfolio: [
      require('../assets/images/nails/Nail Art Photo.jpeg'),
      require('../assets/images/nails/Nail Art Photo (1).webp'),
      require('../assets/images/nails/Nail Art Photo (2).webp'),
      require('../assets/images/nails/Nail Art Photo (3).webp'),
      require('../assets/images/nails/Nail Art Photo (4).webp'),
      require('../assets/images/nails/Nail Art Photo 3230266.webp')
    ],
    services: [
      { id: '1', name: 'Gel Manicure', duration: 45, price: 45 },
      { id: '2', name: 'Acrylic Full Set', duration: 90, price: 65 },
      { id: '3', name: 'Nail Art Design', duration: 30, price: 25 }
    ]
  },
  { 
    id: '2', 
    name: 'Emily Chen', 
    specialty: 'Manicure Expert',
    rating: 4.8,
    reviews: 98,
    profileImage: require('../assets/images/profiles/profile2.jpg'),
    yearsExperience: 3,
    clients: 320,
    successRate: 96,
    about: 'Specializing in classic and modern manicure techniques. Known for precision, attention to detail, and long-lasting results that keep clients coming back.',
    portfolio: [
      require('../assets/images/nails/Nail Art Photo (2).webp'),
      require('../assets/images/nails/Nail Art Photo (3).webp'),
      require('../assets/images/nails/Nail Art Photo (4).webp'),
      require('../assets/images/nails/Nail Art Photo.jpeg'),
      require('../assets/images/nails/Nail Art Photo (1).webp'),
      require('../assets/images/nails/Nail Art Photo 3230266.webp')
    ],
    services: [
      { id: '1', name: 'Classic Manicure', duration: 30, price: 35 },
      { id: '2', name: 'Gel Polish', duration: 45, price: 40 },
      { id: '3', name: 'Nail Repair', duration: 15, price: 15 }
    ]
  },
  { 
    id: '3', 
    name: 'Maria Garcia', 
    specialty: 'Pedicure Specialist',
    rating: 4.7,
    reviews: 85,
    profileImage: require('../assets/images/profiles/profile3.jpg'),
    yearsExperience: 4,
    clients: 410,
    successRate: 95,
    about: 'Pedicure expert with a focus on foot health and relaxation. Trained in therapeutic techniques and specialized in addressing common foot concerns while providing a luxurious experience.',
    portfolio: [
      require('../assets/images/nails/Nail Art Photo (4).webp'),
      require('../assets/images/nails/Nail Art Photo 3230266.webp'),
      require('../assets/images/nails/Nail Art Photo.jpeg'),
      require('../assets/images/nails/Nail Art Photo (1).webp'),
      require('../assets/images/nails/Nail Art Photo (2).webp'),
      require('../assets/images/nails/Nail Art Photo (3).webp')
    ],
    services: [
      { id: '1', name: 'Classic Pedicure', duration: 45, price: 40 },
      { id: '2', name: 'Spa Pedicure', duration: 60, price: 55 },
      { id: '3', name: 'Foot Massage', duration: 30, price: 35 }
    ]
  },
  { 
    id: '4', 
    name: 'Jennifer Lopez', 
    specialty: 'Nail Art, Pedicure',
    rating: 4.9,
    reviews: 112,
    profileImage: require('../assets/images/profiles/profile4.jpg'),
    yearsExperience: 7,
    clients: 650,
    successRate: 99,
    about: 'Award-winning nail artist with expertise in both nail art and pedicures. Known for creative designs and attention to detail. Celebrity clientele and featured in multiple beauty magazines.',
    portfolio: [
      require('../assets/images/nails/Nail Art Photo (1).webp'),
      require('../assets/images/nails/Nail Art Photo (2).webp'),
      require('../assets/images/nails/Nail Art Photo.jpeg'),
      require('../assets/images/nails/Nail Art Photo (3).webp'),
      require('../assets/images/nails/Nail Art Photo (4).webp'),
      require('../assets/images/nails/Nail Art Photo 3230266.webp')
    ],
    services: [
      { id: '1', name: 'Celebrity Manicure', duration: 60, price: 75 },
      { id: '2', name: 'Luxury Pedicure', duration: 75, price: 85 },
      { id: '3', name: 'Custom Nail Art', duration: 90, price: 120 }
    ]
  },
  { 
    id: '5', 
    name: 'Emily Davis', 
    specialty: 'Acrylics, Nail Design',
    rating: 4.6,
    reviews: 78,
    profileImage: require('../assets/images/profiles/profile5.jpg'),
    yearsExperience: 2,
    clients: 180,
    successRate: 94,
    about: 'Specializing in acrylics and innovative nail designs. Fresh talent bringing new techniques and styles to the industry. Known for durability and precision in acrylic applications.',
    portfolio: [
      require('../assets/images/nails/Nail Art Photo 3230266.webp'),
      require('../assets/images/nails/Nail Art Photo (4).webp'),
      require('../assets/images/nails/Nail Art Photo (3).webp'),
      require('../assets/images/nails/Nail Art Photo (2).webp'),
      require('../assets/images/nails/Nail Art Photo (1).webp'),
      require('../assets/images/nails/Nail Art Photo.jpeg')
    ],
    services: [
      { id: '1', name: 'Acrylic Full Set', duration: 75, price: 60 },
      { id: '2', name: 'Acrylic Fill', duration: 45, price: 40 },
      { id: '3', name: 'Custom Design', duration: 60, price: 50 }
    ]
  }
];

// ===== TECH DASHBOARD TYPES & DATA =====

export type Appointment = {
  id: string;
  time: string;
  client: string;
  service: string;
  status: 'in-progress' | 'upcoming' | 'completed';
};

export const APPOINTMENTS: Appointment[] = [
  {
    id: '1',
    time: '9:00 AM',
    client: 'Emma Wilson',
    service: 'Gel Manicure',
    status: 'in-progress',
  },
  {
    id: '2',
    time: '10:30 AM',
    client: 'Lisa Johnson',
    service: 'Full Set Acrylics',
    status: 'upcoming',
  },
  {
    id: '3',
    time: '2:00 PM',
    client: 'Maria Garcia',
    service: 'Pedicure',
    status: 'upcoming',
  },
];

// ===== REVIEWS TYPES & DATA =====

// Reviews for Sarah Johnson (ID: 1)
// {
//   id: '1',
//   techId: '1', // Sarah Johnson
//   userName: 'Emily W.',
//   userImage: require('../assets/images/profiles/profile5.jpg'),
//   rating: 5,
//   date: 'Jan 15, 2025',
//   service: 'Gel Manicure',
//   text: 'Amazing work as always. Love how my nails turned out. The design was exactly what I wanted.',
//   photos: [
//     require('../assets/images/nails/Nail Art Photo.jpeg'),
//     require('../assets/images/nails/Nail Art Photo (1).webp')
//   ],
//   helpfulCount: 23
// },
// {
//   id: '2',
//   techId: '1', // Sarah Johnson
//   userName: 'Jessica T.',
//   userImage: require('../assets/images/profiles/profile2.jpg'),
//   rating: 5,
//   date: 'Jan 10, 2025',
//   service: 'Acrylic Full Set',
//   text: 'Sarah is the best nail tech in town! She takes her time and makes sure everything is perfect. My nails have never looked better.',
//   helpfulCount: 15
// },
  
// Reviews for Emily Chen (ID: 2)
// {
//   id: '3',
//   techId: '2', // Emily Chen
//   userName: 'Michelle K.',
//   userImage: require('../assets/images/profiles/profile3.jpg'),
//   rating: 4,
//   date: 'Jan 5, 2025',
//   service: 'Classic Manicure',
//   text: 'Great attention to detail. The nail art was beautiful, though it took a bit longer than expected. Will definitely come back!',
//   photos: [
//     require('../assets/images/nails/Nail Art Photo (3).webp'),
//     require('../assets/images/nails/Nail Art Photo (4).webp')
//   ],
//   helpfulCount: 8
// },
// {
//   id: '4',
//   techId: '2', // Emily Chen
//   userName: 'Amanda R.',
//   userImage: require('../assets/images/profiles/profile4.jpg'),
//   rating: 5,
//   date: 'Dec 28, 2024',
//   service: 'Gel Polish',
//   text: 'Emily is so talented and professional. My nails lasted for weeks without chipping. Highly recommend!',
//   helpfulCount: 19
// },
  
// Reviews for Maria Garcia (ID: 3)
// {
//   id: '5',
//   techId: '3', // Maria Garcia
//   userName: 'Sophia L.',
//   userImage: require('../assets/images/profiles/profile1.jpg'),
//   rating: 5,
//   date: 'Dec 20, 2024',
//   service: 'Spa Pedicure',
//   text: 'Best pedicure experience I\'ve ever had! Maria listened to exactly what I wanted and delivered beyond my expectations.',
//   photos: [
//     require('../assets/images/nails/Nail Art Photo 3230266.webp')
//   ],
//   helpfulCount: 27
// },
// {
//   id: '6',
//   techId: '3', // Maria Garcia
//   userName: 'Taylor B.',
//   userImage: require('../assets/images/profiles/profile2.jpg'),
//   rating: 4,
//   date: 'Dec 15, 2024',
//   service: 'Classic Pedicure',
//   text: 'Maria has magic hands! My feet feel amazing and look beautiful. The massage was so relaxing too.',
//   helpfulCount: 12
// },
  
// Reviews for Jennifer Lopez (ID: 4)
// {
//   id: '7',
//   techId: '4', // Jennifer Lopez
//   userName: 'Rachel G.',
//   userImage: require('../assets/images/profiles/profile3.jpg'),
//   rating: 5,
//   date: 'Dec 10, 2024',
//   service: 'Celebrity Manicure',
//   text: 'Jennifer is an artist! Her designs are so creative and unique. I always get compliments on my nails after seeing her.',
//   photos: [
//     require('../assets/images/nails/Nail Art Photo (2).webp')
//   ],
//   helpfulCount: 31
// },
// {
//   id: '8',
//   techId: '4', // Jennifer Lopez
//   userName: 'Olivia M.',
//   userImage: require('../assets/images/profiles/profile5.jpg'),
//   rating: 5,
//   date: 'Dec 5, 2024',
//   service: 'Custom Nail Art',
//   text: 'Worth every penny! Jennifer created the most beautiful custom design for my wedding day. Everyone was asking where I got my nails done.',
//   photos: [
//     require('../assets/images/nails/Nail Art Photo.jpeg'),
//     require('../assets/images/nails/Nail Art Photo (1).webp')
//   ],
//   helpfulCount: 24
// },
  
// Reviews for Emily Davis (ID: 5)
// {
//   id: '9',
//   techId: '5', // Emily Davis
//   userName: 'Madison K.',
//   userImage: require('../assets/images/profiles/profile4.jpg'),
//   rating: 4,
//   date: 'Nov 30, 2024',
//   service: 'Acrylic Full Set',
//   text: 'Emily is a rising star in the nail industry. Her acrylic application is flawless and they last so long without lifting.',
//   helpfulCount: 9
// },
// {
//   id: '10',
//   techId: '5', // Emily Davis
//   userName: 'Ava P.',
//   userImage: require('../assets/images/profiles/profile1.jpg'),
//   rating: 5,
//   date: 'Nov 25, 2024',
//   service: 'Custom Design',
//   text: 'Emily has such a creative eye! She suggested a design I wouldn\'t have thought of and it turned out amazing.',
//   photos: [
//     require('../assets/images/nails/Nail Art Photo (4).webp')
//   ],
//   helpfulCount: 16
// }
// };

// ===== INSPIRATION SCREEN TYPES & DATA =====

// Category Images - Used in Category Detail Screen
export type CategoryImage = {
  id: string;
  name: string;
  image: any;
  height: number; // For masonry layout
  width?: number; // Optional for advanced layouts
  category: string;
  description?: string;
  likes?: number;
  techId: string; // ID of the nail tech who created this
  techName: string; // Name of the nail tech
  techImage: any; // Profile image of the tech
};

// Categories available in the app
export const CATEGORIES = ['All', 'French', 'Gel', 'Acrylic', 'Art', 'Ombre', 'Marble'];

// Helper to map category name to its ID
export const getCategoryId = (name: string): string => {
  const formatted = name.toLowerCase().replace(/\s+/g, '-');
  return CATEGORIES.find(cat => cat.toLowerCase() === formatted) ? 
    formatted : 
    CATEGORIES.find(cat => cat.toLowerCase().includes(formatted)) ? 
    CATEGORIES.find(cat => cat.toLowerCase().includes(formatted))!.toLowerCase() : 
    'all';
};

// Helper to get images by category
export const getImagesByCategory = (category: string): CategoryImage[] => {
  if (category.toLowerCase() === 'all') {
    return CATEGORY_IMAGES;
  }
  return CATEGORY_IMAGES.filter(img => img.category.toLowerCase() === category.toLowerCase());
};

// Extended dataset with multiple images per category
export const CATEGORY_IMAGES: CategoryImage[] = [
  // French Manicure images
  { 
    id: 'french-1', 
    name: 'Classic French', 
    image: require('../assets/images/nails/Nail Art Photo.jpeg'), 
    height: 180, 
    category: 'French', 
    likes: 142,
    techId: '1',
    techName: 'Sarah Johnson',
    techImage: require('../assets/images/profiles/profile1.jpg')
  },
  { 
    id: 'french-2', 
    name: 'Modern French', 
    image: require('../assets/images/nails/Nail Art Photo (2).webp'), 
    height: 200, 
    category: 'French', 
    likes: 89,
    techId: '2',
    techName: 'Emily Chen',
    techImage: require('../assets/images/profiles/profile2.jpg')
  },
  { 
    id: 'french-3', 
    name: 'Colored French', 
    image: require('../assets/images/nails/Nail Art Photo (4).webp'), 
    height: 160, 
    category: 'French', 
    likes: 112,
    techId: '3',
    techName: 'Maria Garcia',
    techImage: require('../assets/images/profiles/profile3.jpg')
  },
  { 
    id: 'french-4', 
    name: 'French with Gems', 
    image: require('../assets/images/nails/Nail Art Photo (3).webp'), 
    height: 190, 
    category: 'French', 
    likes: 78,
    techId: '4',
    techName: 'Jennifer Lopez',
    techImage: require('../assets/images/profiles/profile4.jpg')
  },
  { 
    id: 'french-5', 
    name: 'Thin Line French', 
    image: require('../assets/images/nails/Nail Art Photo (1).webp'), 
    height: 180, 
    category: 'French', 
    likes: 93,
    techId: '1',
    techName: 'Sarah Johnson',
    techImage: require('../assets/images/profiles/profile1.jpg')
  },
  { 
    id: 'french-6', 
    name: 'Curved French', 
    image: require('../assets/images/nails/Nail Art Photo 3230266.webp'), 
    height: 170, 
    category: 'French', 
    likes: 67,
    techId: '2',
    techName: 'Emily Chen',
    techImage: require('../assets/images/profiles/profile2.jpg')
  },
  
  // Gel Extension images
  { 
    id: 'gel-1', 
    name: 'Clear Gel', 
    image: require('../assets/images/nails/Nail Art Photo (1).webp'), 
    height: 180, 
    category: 'Gel', 
    likes: 156,
    techId: '3',
    techName: 'Maria Garcia',
    techImage: require('../assets/images/profiles/profile3.jpg')
  },
  { 
    id: 'gel-2', 
    name: 'Pink Gel', 
    image: require('../assets/images/nails/Nail Art Photo (2).webp'), 
    height: 170, 
    category: 'Gel', 
    likes: 103,
    techId: '4',
    techName: 'Jennifer Lopez',
    techImage: require('../assets/images/profiles/profile4.jpg')
  },
  { 
    id: 'gel-3', 
    name: 'Gel with Glitter', 
    image: require('../assets/images/nails/Nail Art Photo (3).webp'), 
    height: 190, 
    category: 'Gel', 
    likes: 145,
    techId: '1',
    techName: 'Sarah Johnson',
    techImage: require('../assets/images/profiles/profile1.jpg')
  },
  { 
    id: 'gel-4', 
    name: 'Gel Extension', 
    image: require('../assets/images/nails/Nail Art Photo (4).webp'), 
    height: 200, 
    category: 'Gel', 
    likes: 88,
    techId: '2',
    techName: 'Emily Chen',
    techImage: require('../assets/images/profiles/profile2.jpg')
  },
  { 
    id: 'gel-5', 
    name: 'Stiletto Gel', 
    image: require('../assets/images/nails/Nail Art Photo.jpeg'), 
    height: 180, 
    category: 'Gel', 
    likes: 129,
    techId: '3',
    techName: 'Maria Garcia',
    techImage: require('../assets/images/profiles/profile3.jpg')
  },
  { 
    id: 'gel-6', 
    name: 'Square Gel', 
    image: require('../assets/images/nails/Nail Art Photo 3230266.webp'), 
    height: 160, 
    category: 'Gel', 
    likes: 76,
    techId: '4',
    techName: 'Jennifer Lopez',
    techImage: require('../assets/images/profiles/profile4.jpg')
  },
  
  // Chrome Finish / Art category images
  { 
    id: 'art-1', 
    name: 'Chrome Art', 
    image: require('../assets/images/nails/Nail Art Photo (2).webp'), 
    height: 180, 
    category: 'Art', 
    likes: 167,
    techId: '2',
    techName: 'Emily Chen',
    techImage: require('../assets/images/profiles/profile2.jpg')
  },
  { 
    id: 'art-2', 
    name: 'Floral Art', 
    image: require('../assets/images/nails/Nail Art Photo (3).webp'), 
    height: 190, 
    category: 'Art', 
    likes: 134,
    techId: '1',
    techName: 'Sarah Johnson',
    techImage: require('../assets/images/profiles/profile1.jpg')
  },
  { 
    id: 'art-3', 
    name: 'Abstract Art', 
    image: require('../assets/images/nails/Nail Art Photo (4).webp'), 
    height: 170, 
    category: 'Art', 
    likes: 98,
    techId: '3',
    techName: 'Maria Garcia',
    techImage: require('../assets/images/profiles/profile3.jpg')
  }
];

// Inspiration Styles
export type InspirationStyle = {
  id: string;
  name: string;
  image: any;
  height: number;
  column: 1 | 2;
  category: 'Gel' | 'Acrylic' | 'French' | 'Art';
};

export const INSPIRATION_STYLES: InspirationStyle[] = [
  { id: '1', name: 'Gel Extension', image: require('../assets/images/nails/Nail Art Photo (1).webp'), height: 180, column: 1, category: 'Gel' },
  { id: '2', name: 'French Tips', image: require('../assets/images/nails/Nail Art Photo (2).webp'), height: 160, column: 2, category: 'French' },
  { id: '3', name: 'Nail Art Design', image: require('../assets/images/nails/Nail Art Photo (3).webp'), height: 160, column: 1, category: 'Art' },
  { id: '4', name: 'Acrylic Set', image: require('../assets/images/nails/Nail Art Photo (4).webp'), height: 180, column: 2, category: 'Acrylic' },
  { id: '5', name: 'Gel Polish', image: require('../assets/images/nails/Nail Art Photo 3230266.webp'), height: 180, column: 1, category: 'Gel' },
  { id: '6', name: 'Artistic Pattern', image: require('../assets/images/nails/Nail Art Photo.jpeg'), height: 160, column: 2, category: 'Art' },
  { id: '7', name: 'Classic French', image: require('../assets/images/nails/Nail Art Photo.webp'), height: 180, column: 1, category: 'French' },
];

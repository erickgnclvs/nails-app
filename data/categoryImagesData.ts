// Extended data file for nail art categories with multiple images per category

// Type definition for category images
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
  },
  { 
    id: 'art-4', 
    name: 'Minimalist Art', 
    image: require('../assets/images/nails/Nail Art Photo.jpeg'), 
    height: 180, 
    category: 'Art', 
    likes: 112,
    techId: '4',
    techName: 'Jennifer Lopez',
    techImage: require('../assets/images/profiles/profile4.jpg')
  },
  { 
    id: 'art-5', 
    name: '3D Art Design', 
    image: require('../assets/images/nails/Nail Art Photo (1).webp'), 
    height: 200, 
    category: 'Art', 
    likes: 156,
    techId: '1',
    techName: 'Sarah Johnson',
    techImage: require('../assets/images/profiles/profile1.jpg')
  },
  { 
    id: 'art-6', 
    name: 'Geometric Art', 
    image: require('../assets/images/nails/Nail Art Photo 3230266.webp'), 
    height: 190, 
    category: 'Art', 
    likes: 89,
    techId: '2',
    techName: 'Emily Chen',
    techImage: require('../assets/images/profiles/profile2.jpg')
  },
  
  // Acrylic category images
  { 
    id: 'acrylic-1', 
    name: 'Natural Acrylic', 
    image: require('../assets/images/nails/Nail Art Photo.jpeg'), 
    height: 180, 
    category: 'Acrylic', 
    likes: 124,
    techId: '3',
    techName: 'Maria Garcia',
    techImage: require('../assets/images/profiles/profile3.jpg')
  },
  { 
    id: 'acrylic-2', 
    name: 'Colored Acrylic', 
    image: require('../assets/images/nails/Nail Art Photo (1).webp'), 
    height: 190, 
    category: 'Acrylic', 
    likes: 109,
    techId: '4',
    techName: 'Jennifer Lopez',
    techImage: require('../assets/images/profiles/profile4.jpg')
  },
  { 
    id: 'acrylic-3', 
    name: 'Acrylic Extension', 
    image: require('../assets/images/nails/Nail Art Photo (2).webp'), 
    height: 170, 
    category: 'Acrylic', 
    likes: 86,
    techId: '1',
    techName: 'Sarah Johnson',
    techImage: require('../assets/images/profiles/profile1.jpg')
  },
  { 
    id: 'acrylic-4', 
    name: 'Acrylic with Design', 
    image: require('../assets/images/nails/Nail Art Photo (3).webp'), 
    height: 200, 
    category: 'Acrylic', 
    likes: 143,
    techId: '2',
    techName: 'Emily Chen',
    techImage: require('../assets/images/profiles/profile2.jpg')
  },
  { 
    id: 'acrylic-5', 
    name: 'Acrylic French', 
    image: require('../assets/images/nails/Nail Art Photo (4).webp'), 
    height: 180, 
    category: 'Acrylic', 
    likes: 97,
    techId: '3',
    techName: 'Maria Garcia',
    techImage: require('../assets/images/profiles/profile3.jpg')
  },
  { 
    id: 'acrylic-6', 
    name: 'Glitter Acrylic', 
    image: require('../assets/images/nails/Nail Art Photo 3230266.webp'), 
    height: 190, 
    category: 'Acrylic', 
    likes: 118,
    techId: '4',
    techName: 'Jennifer Lopez',
    techImage: require('../assets/images/profiles/profile4.jpg')
  },
  
  // Ombre Style category images
  { 
    id: 'ombre-1', 
    name: 'Pink Ombre', 
    image: require('../assets/images/nails/Nail Art Photo (4).webp'), 
    height: 180, 
    category: 'Ombre', 
    likes: 152,
    techId: '1',
    techName: 'Sarah Johnson',
    techImage: require('../assets/images/profiles/profile1.jpg')
  },
  { 
    id: 'ombre-2', 
    name: 'Blue Ombre', 
    image: require('../assets/images/nails/Nail Art Photo (3).webp'), 
    height: 190, 
    category: 'Ombre', 
    likes: 127,
    techId: '2',
    techName: 'Emily Chen',
    techImage: require('../assets/images/profiles/profile2.jpg')
  },
  { 
    id: 'ombre-3', 
    name: 'Nude Ombre', 
    image: require('../assets/images/nails/Nail Art Photo (2).webp'), 
    height: 170, 
    category: 'Ombre', 
    likes: 96,
    techId: '3',
    techName: 'Maria Garcia',
    techImage: require('../assets/images/profiles/profile3.jpg')
  },
  { 
    id: 'ombre-4', 
    name: 'Glitter Ombre', 
    image: require('../assets/images/nails/Nail Art Photo (1).webp'), 
    height: 180, 
    category: 'Ombre', 
    likes: 138,
    techId: '4',
    techName: 'Jennifer Lopez',
    techImage: require('../assets/images/profiles/profile4.jpg')
  },
  { 
    id: 'ombre-5', 
    name: 'Gradient Ombre', 
    image: require('../assets/images/nails/Nail Art Photo.jpeg'), 
    height: 200, 
    category: 'Ombre', 
    likes: 104,
    techId: '1',
    techName: 'Sarah Johnson',
    techImage: require('../assets/images/profiles/profile1.jpg')
  },
  { 
    id: 'ombre-6', 
    name: 'Pastel Ombre', 
    image: require('../assets/images/nails/Nail Art Photo 3230266.webp'), 
    height: 190, 
    category: 'Ombre', 
    likes: 79,
    techId: '2',
    techName: 'Emily Chen',
    techImage: require('../assets/images/profiles/profile2.jpg')
  },
  
  // Marble Design category images
  { 
    id: 'marble-1', 
    name: 'White Marble', 
    image: require('../assets/images/nails/Nail Art Photo 3230266.webp'), 
    height: 180, 
    category: 'Marble', 
    likes: 164,
    techId: '3',
    techName: 'Maria Garcia',
    techImage: require('../assets/images/profiles/profile3.jpg')
  },
  { 
    id: 'marble-2', 
    name: 'Gold Marble', 
    image: require('../assets/images/nails/Nail Art Photo.jpeg'), 
    height: 190, 
    category: 'Marble', 
    likes: 143,
    techId: '4',
    techName: 'Jennifer Lopez',
    techImage: require('../assets/images/profiles/profile4.jpg')
  },
  { 
    id: 'marble-3', 
    name: 'Pink Marble', 
    image: require('../assets/images/nails/Nail Art Photo (1).webp'), 
    height: 170, 
    category: 'Marble', 
    likes: 117,
    techId: '1',
    techName: 'Sarah Johnson',
    techImage: require('../assets/images/profiles/profile1.jpg')
  },
  { 
    id: 'marble-4', 
    name: 'Blue Marble', 
    image: require('../assets/images/nails/Nail Art Photo (2).webp'), 
    height: 200, 
    category: 'Marble', 
    likes: 98,
    techId: '2',
    techName: 'Emily Chen',
    techImage: require('../assets/images/profiles/profile2.jpg')
  },
  { 
    id: 'marble-5', 
    name: 'Black Marble', 
    image: require('../assets/images/nails/Nail Art Photo (3).webp'), 
    height: 180, 
    category: 'Marble', 
    likes: 125,
    techId: '3',
    techName: 'Maria Garcia',
    techImage: require('../assets/images/profiles/profile3.jpg')
  },
  { 
    id: 'marble-6', 
    name: 'Multi-color Marble', 
    image: require('../assets/images/nails/Nail Art Photo (4).webp'), 
    height: 190, 
    category: 'Marble', 
    likes: 107,
    techId: '4',
    techName: 'Jennifer Lopez',
    techImage: require('../assets/images/profiles/profile4.jpg')
  },
];

// Helper function to get images by category
export const getImagesByCategory = (category: string): CategoryImage[] => {
  if (category.toLowerCase() === 'all') {
    return CATEGORY_IMAGES;
  }
  return CATEGORY_IMAGES.filter(image => 
    image.category.toLowerCase() === category.toLowerCase());
};

// Helper to get a random set of images (for recommendations)
export const getRandomImages = (count: number = 6): CategoryImage[] => {
  const shuffled = [...CATEGORY_IMAGES].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

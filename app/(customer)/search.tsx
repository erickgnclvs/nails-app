import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, FlatList, ScrollView, Keyboard, TouchableWithoutFeedback, ImageSourcePropType, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { TOP_RATED_TECHS, TechItem, FAVORITE_TECHS } from '@/data/mockData';
import { Colors } from '@/constants/Colors';
import TechCard from '@/components/TechCard';
import ImageViewing from 'react-native-image-viewing';

// Define the tech type for search results
type SearchTech = {
  id: string;
  name: string;
  rating: number;
  reviews: number;
  profileImage: any;
  specialty: string;
  specialties?: string[];
  distance?: number;
};

type Category = {
  id: string;
  name: string;
  active: boolean;
};

export default function SearchScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  // Use FAVORITE_TECHS which already includes portfolio images
  // This ensures we have complete tech data with portfolios
  const [filteredTechs, setFilteredTechs] = useState<TechItem[]>(FAVORITE_TECHS);
  const [categories, setCategories] = useState<Category[]>([
    { id: '1', name: 'All', active: true },
    { id: '2', name: 'Nail Art', active: false },
    { id: '3', name: 'Manicure', active: false },
    { id: '4', name: 'Pedicure', active: false },
    { id: '5', name: 'Gel', active: false },
  ]);

  // State for Image Viewer Modal
  const [isViewerVisible, setIsViewerVisible] = useState(false);
  const [viewerImages, setViewerImages] = useState<ImageSourcePropType[]>([]);
  const [viewerIndex, setViewerIndex] = useState(0);

  useEffect(() => {
    filterTechs();
  }, [searchQuery, categories]);

  const filterTechs = () => {
    let results = [...FAVORITE_TECHS];
    
    // Filter by search query
    if (searchQuery.trim() !== '') {
      results = results.filter(tech => 
        tech.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Filter by category
    const activeCategory = categories.find(cat => cat.active);
    if (activeCategory && activeCategory.name !== 'All') {
      // Filter by specialty if it's not 'All'
      const specialty = activeCategory.name.toLowerCase();
      results = results.filter(tech => 
        tech.specialty.toLowerCase().includes(specialty)
      );
    }
    
    setFilteredTechs(results);
  };

  const handleCategoryPress = (id: string) => {
    setCategories(categories.map(cat => ({
      ...cat,
      active: cat.id === id
    })));
  };

  const handleBack = () => {
    // Use router.back() to enable iOS gesture navigation
    router.back();
  };

  const handleTechPress = (techId: string) => {
    router.push(`/tech-profile?id=${techId}&from=search`);
  };

  // Generate a random distance for each tech (between 0.1 and 5.0 miles)
  const getRandomDistance = () => {
    return Math.random() * 5;
  };

  // --- Image Viewer Functions ---
  const openImageViewer = (images: ImageSourcePropType[], index: number) => {
    if (images && images.length > 0) {
      setViewerImages(images);
      setViewerIndex(index);
      setIsViewerVisible(true);
    }
  };

  const closeImageViewer = () => {
    setIsViewerVisible(false);
    setViewerImages([]);
    setViewerIndex(0);
  };
  // --- End Image Viewer Functions ---

  const renderTechItem = ({ item }: { item: SearchTech }) => {
    // Generate a random distance if not provided in the item
    const distance = item.distance !== undefined ? item.distance : getRandomDistance();
    
    return (
      <View style={styles.techCardWrapper}>
        <TechCard
          item={item}
          isFavorite={false} // For demonstration, all search results are not favorites
          onToggleFavorite={(id) => {
            console.log(`Toggle favorite for tech ${id} from search screen`);
            // Add logic to toggle favorite status
          }}
          distance={distance}
          showPortfolio={true} // Show the portfolio section
          onPortfolioImagePress={openImageViewer} // Pass the handler
        />
      </View>
    );
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
    console.log('Keyboard dismissed');
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.container}>
        {/* Header with back button and search input */}
        <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={Colors.text.primary} />
        </TouchableOpacity>
        
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color={Colors.text.secondary} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search nail technicians"
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoFocus
            clearButtonMode="while-editing"
          />
        </View>
        
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="options-outline" size={24} color={Colors.text.primary} />
        </TouchableOpacity>
      </View>

      {/* Categories */}
      <View style={styles.categoriesWrapper}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          style={styles.categoriesContainer}
          contentContainerStyle={styles.categoriesContent}
        >
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryPill,
              category.active && styles.activeCategoryPill
            ]}
            onPress={() => handleCategoryPress(category.id)}
          >
            <Text 
              style={[
                styles.categoryText,
                category.active && styles.activeCategoryText
              ]}
            >
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
        </ScrollView>
      </View>

      {/* Results count */}
      <Text style={styles.resultsText}>
        {filteredTechs.length} nail technicians found
      </Text>

      {/* Tech list */}
      <FlatList
        data={filteredTechs}
        renderItem={renderTechItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.techList}
      />

      {/* Image Viewer using react-native-image-viewing */}
      <ImageViewing
        images={viewerImages.map(img => (typeof img === 'number' ? Image.resolveAssetSource(img) : { uri: img as string }))} // Ensure images are in the correct format { uri: '...' } or require('...')
        imageIndex={viewerIndex}
        visible={isViewerVisible}
        onRequestClose={closeImageViewer}
        animationType="fade"
        HeaderComponent={({ imageIndex }) => (
          <View style={styles.imageViewerHeader}>
            <Text style={styles.imageViewerHeaderText}>
              {`${imageIndex + 1} / ${viewerImages.length}`}
            </Text>
            <TouchableOpacity onPress={closeImageViewer} style={styles.imageViewerCloseButton}>
               <Ionicons name="close" size={30} color="#fff" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 16,
    backgroundColor: '#fff',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingHorizontal: 12,
    marginHorizontal: 10,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: Colors.text.primary,
  },
  filterButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoriesWrapper: {
    height: 50,
    backgroundColor: '#fff',
    marginBottom: 12,
  },
  categoriesContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  categoriesContent: {
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  categoryPill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 10,
    borderRadius: 18,
    backgroundColor: '#f5f5f5',
    minWidth: 55,
    alignItems: 'center',
    justifyContent: 'center',
    height: 34,
  },
  activeCategoryPill: {
    backgroundColor: '#222',
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#555'
  },
  activeCategoryText: {
    color: '#fff',
  },
  resultsText: {
    fontSize: 14,
    color: Colors.text.secondary,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  techList: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  techCardWrapper: {
    marginBottom: 16,
  },
  imageViewerHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingTop: 40, // Adjust for status bar
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imageViewerHeaderText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  imageViewerCloseButton: {
     padding: 5,
  }
});

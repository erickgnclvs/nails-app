import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, FlatList, Image, ScrollView, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { TOP_RATED_TECHS, TechItem, FAVORITE_TECHS } from '@/data/mockData';
import { Colors } from '@/constants/Colors';
import TechCard from '@/components/TechCard';

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
  const [filteredTechs, setFilteredTechs] = useState<SearchTech[]>(FAVORITE_TECHS);
  const [categories, setCategories] = useState<Category[]>([
    { id: '1', name: 'All', active: true },
    { id: '2', name: 'Nail Art', active: false },
    { id: '3', name: 'Manicure', active: false },
    { id: '4', name: 'Pedicure', active: false },
    { id: '5', name: 'Gel', active: false },
  ]);

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

  const renderTechItem = ({ item }: { item: SearchTech }) => (
    <View style={styles.techCardWrapper}>
      <TechCard
        item={item}
        isFavorite={false} // For demonstration, all search results are not favorites
        onToggleFavorite={(id) => {
          console.log(`Toggle favorite for tech ${id} from search screen`);
          // Add logic to toggle favorite status
        }}
      />
      
      {/* Distance information - shown below the card */}
      <View style={styles.techDistanceContainer}>
        <Text style={styles.distanceText}>{(Math.random() * 5).toFixed(1)} miles away</Text>
      </View>
    </View>
  );

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
    height: 34, // Thicker, more substantial pills
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
    marginBottom: 24,
  },
  techDistanceContainer: {
    marginTop: 4,
    paddingHorizontal: 16,
  },
  distanceText: {
    fontSize: 12,
    color: Colors.text.tertiary,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tagPill: {
    backgroundColor: '#f5f5f5',
    height: 34,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 18,
    marginRight: 10,
    marginBottom: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tagText: {
    fontSize: 12,
    fontWeight: '500',
    color: Colors.text.secondary,
  },
});

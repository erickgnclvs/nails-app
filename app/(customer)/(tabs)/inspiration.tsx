import { StyleSheet, View, Text, ScrollView, Image as RNImage, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { INSPIRATION_STYLES } from '@/data/mockData';

// Categories for filter
const CATEGORIES = ['All', 'Gel', 'Acrylic', 'French', 'Art'];

export default function InspirationScreen() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Filter styles based on selected category
  const filteredStyles = selectedCategory === 'All' 
    ? INSPIRATION_STYLES 
    : INSPIRATION_STYLES.filter(style => style.category === selectedCategory);

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Inspiration</Text>
        <TouchableOpacity style={styles.searchButton}>
          <Ionicons name="search" size={24} color="#222" />
        </TouchableOpacity>
      </View>

      {/* Category filters */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        style={styles.categoriesContainer}
        contentContainerStyle={styles.categoriesContent}
      >
        {CATEGORIES.map(category => (
          <TouchableOpacity 
            key={category} 
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.selectedCategory
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text 
              style={[
                styles.categoryText,
                selectedCategory === category && styles.selectedCategoryText
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView 
        style={styles.scrollView} 
        showsVerticalScrollIndicator={false}
      >
        
        {/* Inspiration Grid (like Trending Styles) */}
        <View style={styles.trendingContainer}>
          {/* Column 1 */}
          <View style={styles.trendingColumn}>
            {filteredStyles.filter(style => style.column === 1).map((style) => (
              <TouchableOpacity 
                key={style.id} 
                style={[styles.styleCard, { height: style.height }]}
                onPress={() => router.push(`/category-detail?category=${style.category}`)}
              >
                <Image 
                  source={style.image} 
                  style={styles.styleImage} 
                  resizeMode="cover" 
                />
                <View style={styles.styleNameContainer}>
                  <Text style={styles.styleName}>{style.name}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
          
          {/* Column 2 */}
          <View style={styles.trendingColumn}>
            {filteredStyles.filter(style => style.column === 2).map((style) => (
              <TouchableOpacity 
                key={style.id} 
                style={[styles.styleCard, { height: style.height }]}
                onPress={() => router.push(`/category-detail?category=${style.category}`)}
              >
                <Image 
                  source={style.image} 
                  style={styles.styleImage} 
                  resizeMode="cover" 
                />
                <View style={styles.styleNameContainer}>
                  <Text style={styles.styleName}>{style.name}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 16,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#222',
  },
  searchButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoriesContainer: {
    maxHeight: 50,
    backgroundColor: '#fff',
    paddingVertical: 6,
    paddingBottom: 12,
    marginBottom: 12,
  },
  categoriesContent: {
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  categoryButton: {
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
  selectedCategory: {
    backgroundColor: '#222',
  },
  categoryText: {
    fontSize: 12, // Smaller text inside
    fontWeight: '500',
    color: '#555',
  },
  selectedCategoryText: {
    color: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222',
    marginTop: 8,
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  trendingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    marginBottom: 24,
  },
  trendingColumn: {
    width: '49%',
  },
  styleCard: {
    width: '100%',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    position: 'relative',
  },
  styleImage: {
    width: '100%',
    height: '100%',
  },
  styleNameContainer: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
    backgroundColor: 'transparent',
  },
  styleName: {
    fontSize: 15,
    color: 'white',
    fontWeight: '700',
    textAlign: 'left',
    textShadowColor: 'rgba(0, 0, 0, 0.7)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
});

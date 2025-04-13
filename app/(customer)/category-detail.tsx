import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  Modal,
} from 'react-native';
import { Image } from "expo-image"
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { CATEGORY_IMAGES, CategoryImage, getImagesByCategory } from '@/data/mockData';

const { width, height } = Dimensions.get('window');
const COLUMN_WIDTH = width / 2 - 12; // Two columns with spacing

export default function CategoryDetailScreen() {
  const router = useRouter();
  const { category = 'All' } = useLocalSearchParams<{ category: string }>();
  
  const [images, setImages] = useState<CategoryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [columnHeights, setColumnHeights] = useState<[number, number]>([0, 0]);
  const [columnData, setColumnData] = useState<[CategoryImage[], CategoryImage[]]>([[], []]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<CategoryImage | null>(null);
  
  // Format the category name for display
  const formatCategoryName = (name: string) => {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  };
  
  useEffect(() => {
    // Load images for this category
    const categoryImages = getImagesByCategory(category);
    setImages(categoryImages);
    
    // Distribute images into columns for a balanced masonry layout
    distributeImagesIntoColumns(categoryImages);
    
    setLoading(false);
  }, [category]);
  
  // Distribute images between two columns to create a balanced layout
  const distributeImagesIntoColumns = (categoryImages: CategoryImage[]) => {
    const columns: [CategoryImage[], CategoryImage[]] = [[], []];
    const heights: [number, number] = [0, 0];
    
    categoryImages.forEach(image => {
      // Add the image to the shorter column
      if (heights[0] <= heights[1]) {
        columns[0].push(image);
        heights[0] += image.height;
      } else {
        columns[1].push(image);
        heights[1] += image.height;
      }
    });
    
    setColumnData(columns);
    setColumnHeights(heights);
  };
  
  const handleBackPress = () => {
    router.back();
  };

  const handleImagePress = (image: CategoryImage) => {
    setSelectedImage(image);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleViewProfile = () => {
    if (selectedImage?.techId) {
      // Close the modal first
      setModalVisible(false);
      // Navigate to the technician profile
      router.push({
        pathname: '/(customer)/tech-profile',
        params: { id: selectedImage.techId }
      });
    }
  };
  
  const renderImageCard = (item: CategoryImage, index: number) => (
    <TouchableOpacity 
      key={item.id} 
      style={[styles.imageCard, { height: item.height }]}
      activeOpacity={0.9}
      onPress={() => handleImagePress(item)}
    >
      <Image 
        source={item.image} 
        style={styles.image} 
        resizeMode="cover" 
      />
      
      <View style={styles.imageDetailOverlay}>
        <Text style={styles.imageName}>{item.name}</Text>
        
        <View style={styles.likeContainer}>
          <Ionicons name="heart-outline" size={16} color="#fff" />
          <Text style={styles.likeCount}>{item.likes || 0}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
  
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#222" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{formatCategoryName(category)} Nails</Text>
        <TouchableOpacity style={styles.searchButton}>
          <Ionicons name="search" size={24} color="#222" />
        </TouchableOpacity>
      </View>
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Category Description */}
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionText}>
            Explore our collection of beautiful {formatCategoryName(category)} nail designs and get inspired for your next manicure.
          </Text>
        </View>
        
        {/* Masonry Layout */}
        <View style={styles.galleryContainer}>
          {/* Column 1 */}
          <View style={styles.column}>
            {columnData[0].map((item, index) => renderImageCard(item, index))}
          </View>
          
          {/* Column 2 */}
          <View style={styles.column}>
            {columnData[1].map((item, index) => renderImageCard(item, index))}
          </View>
        </View>
      </ScrollView>

      {/* Technician Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedImage && (
              <>
                {/* Header */}
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>{selectedImage.name}</Text>
                  <TouchableOpacity 
                    style={styles.closeButton}
                    onPress={handleCloseModal}
                  >
                    <Ionicons name="close" size={24} color="#222" />
                  </TouchableOpacity>
                </View>
                
                {/* Image */}
                <Image 
                  source={selectedImage.image} 
                  style={styles.modalImage}
                  resizeMode="cover" 
                />
                
                {/* Technician Info */}
                <View style={styles.techInfoContainer}>
                  <View style={styles.techDetails}>
                    <Image 
                      source={selectedImage.techImage} 
                      style={styles.techImage}
                      resizeMode="cover" 
                    />
                    <View>
                      <Text style={styles.techName}>{selectedImage.techName}</Text>
                      <Text style={styles.techTitle}>Nail Technician</Text>
                    </View>
                  </View>
                  
                  <View style={styles.statsContainer}>
                    <View style={styles.statItem}>
                      <Ionicons name="heart" size={16} color="#222" />
                      <Text style={styles.statText}>{selectedImage.likes}</Text>
                    </View>
                  </View>
                </View>
                
                <TouchableOpacity 
                  style={styles.viewProfileButton}
                  onPress={handleViewProfile}
                >
                  <Text style={styles.viewProfileText}>View Profile</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 16,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#222',
    flex: 1,
    textAlign: 'center',
  },
  backButton: {
    padding: 4,
  },
  searchButton: {
    padding: 4,
  },
  descriptionContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  descriptionText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#666',
  },
  galleryContainer: {
    paddingHorizontal: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  column: {
    width: COLUMN_WIDTH,
  },
  imageCard: {
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
  image: {
    width: '100%',
    height: '100%',
  },
  imageDetailOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imageName: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
    flex: 1,
  },
  likeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  likeCount: {
    color: '#fff',
    fontSize: 12,
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  modalContent: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 2,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
  },
  closeButton: {
    padding: 4,
  },
  modalImage: {
    width: '100%',
    height: 220,
  },
  // Technician info styles
  techInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
  },
  techDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  techImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  techName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#222',
  },
  techTitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    marginLeft: 4,
    color: '#222',
    fontSize: 14,
  },
  viewProfileButton: {
    backgroundColor: '#222',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    margin: 16,
  },
  viewProfileText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

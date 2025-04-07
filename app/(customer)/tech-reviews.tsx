import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, ScrollView, ViewStyle, TextStyle, ImageStyle, ColorValue, Modal, Animated, ImageSourcePropType } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import { FAVORITE_TECHS, REVIEWS, Review, getRatingDistribution } from '../../data/mockData';
import ImageView from "react-native-image-viewing"; // Import Image Viewer

// Helper function to handle nested color objects
const getColor = (color: any): string => {
  if (typeof color === 'string') {
    return color;
  }
  if (color && typeof color === 'object' && 'primary' in color) {
    return color.primary;
  }
  if (color && typeof color === 'object' && 'medium' in color) {
    return color.medium;
  }
  return '#000000'; // Default fallback color
};

// Sort options
type SortOption = 'recent' | 'highest' | 'lowest';
type FilterOption = 'all' | '5' | '4' | '3' | '2' | '1';

export default function TechReviewsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [withPhotos, setWithPhotos] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>('recent');
  const [filterRating, setFilterRating] = useState<FilterOption>('all');
  const [showSortModal, setShowSortModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const modalAnimation = useRef(new Animated.Value(0)).current;
  
  // Find the tech with the matching id
  const tech = FAVORITE_TECHS.find((tech) => tech.id === id) || FAVORITE_TECHS[0];
  
  // Get reviews for this tech by filtering the main REVIEWS array
  const reviews = REVIEWS.filter(review => review.techId === tech.id);
  
  // Apply filters and sorting
  const getFilteredAndSortedReviews = () => {
    let result = [...reviews];
    
    // Apply rating filter
    if (filterRating !== 'all') {
      result = result.filter(review => review.rating === parseInt(filterRating));
    }
    
    // Apply photo filter
    if (withPhotos) {
      result = result.filter(review => review.photos && review.photos.length > 0);
    }
    
    // Apply sorting
    if (sortBy === 'recent') {
      // Sort by date (most recent first)
      result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else if (sortBy === 'highest') {
      // Sort by rating (highest first)
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'lowest') {
      // Sort by rating (lowest first)
      result.sort((a, b) => a.rating - b.rating);
    }
    
    return result;
  };
  
  const filteredReviews = getFilteredAndSortedReviews();
  
  // Get rating distribution
  const { fiveStarPercentage } = getRatingDistribution(tech.id);

  const handleBack = () => {
    router.back();
  };

  const handleShare = () => {
    // In a real app, this would open a share dialog
    console.log('Share profile');
  };

  const toggleWithPhotos = () => {
    setWithPhotos(!withPhotos);
  };
  
  const toggleSortModal = () => {
    if (showSortModal) {
      // Animate out
      Animated.timing(modalAnimation, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true
      }).start(() => setShowSortModal(false));
    } else {
      setShowSortModal(true);
      // Animate in
      Animated.timing(modalAnimation, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true
      }).start();
    }
  };
  
  const toggleFilterModal = () => {
    if (showFilterModal) {
      // Animate out
      Animated.timing(modalAnimation, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true
      }).start(() => setShowFilterModal(false));
    } else {
      setShowFilterModal(true);
      // Animate in
      Animated.timing(modalAnimation, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true
      }).start();
    }
  };
  
  const handleSelectSort = (option: SortOption) => {
    setSortBy(option);
    toggleSortModal();
  };
  
  const handleSelectFilter = (option: FilterOption) => {
    setFilterRating(option);
    toggleFilterModal();
  };

  // State for Image Viewer Modal
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageViewVisible, setIsImageViewVisible] = useState(false);
  const [imagesForViewer, setImagesForViewer] = useState<{ uri: string }[]>([]);

  // --- Image Viewer Handlers ---
  const openImageViewer = (photos: ImageSourcePropType[], index: number) => {
    const formattedImages = photos.map(photoSource => 
        ({ uri: Image.resolveAssetSource(photoSource as ImageSourcePropType).uri })
    );
    setImagesForViewer(formattedImages);
    setCurrentImageIndex(index);
    setIsImageViewVisible(true);
  };

  const closeImageViewer = () => {
    setIsImageViewVisible(false);
    setImagesForViewer([]); // Clear images when closing
  };

  const renderReviewItem = ({ item }: { item: Review }) => (
    <View style={styles.reviewItem}>
      <View style={styles.reviewHeader}>
        <View style={styles.reviewerInfo}>
          <Image source={item.userImage} style={styles.reviewerImage} />
          <Text style={styles.reviewerName}>{item.userName}</Text>
        </View>
        <Text style={styles.reviewDate}>{item.date}</Text>
      </View>
      
      <View style={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map((star: number) => (
          <Ionicons 
            key={star}
            name="star" 
            size={18} 
            color={star <= item.rating ? Colors.star : Colors.gray} 
          />
        ))}
      </View>
      
      <Text style={styles.serviceText}>{item.service}</Text>
      <Text style={styles.reviewText}>{item.text}</Text>
      
      {item.photos && item.photos.length > 0 && (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.photosContainer}>
          {item.photos.map((photoSource, index) => (
            <TouchableOpacity key={index} onPress={() => openImageViewer(item.photos || [], index)}>
              <Image source={photoSource as ImageSourcePropType} style={styles.reviewPhoto} />
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
      
      <View style={styles.helpfulContainer}>
        <TouchableOpacity style={styles.helpfulButton}>
          <Ionicons name="thumbs-up-outline" size={18} color={Colors.text.primary} />
          <Text style={styles.helpfulText}>Helpful ({item.helpfulCount ?? 0})</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={Colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Reviews</Text>
        <TouchableOpacity onPress={handleShare} style={styles.shareButton}>
          <Ionicons name="share-outline" size={24} color={Colors.text.primary} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredReviews}
        renderItem={renderReviewItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            {/* Tech Profile Summary */}
            <View style={styles.profileSummary}>
              <Image source={tech.profileImage} style={styles.profileImage} />
              <View style={styles.profileInfo}>
                <Text style={styles.techName}>{tech.name}</Text>
                <View style={styles.ratingContainer}>
                  <Text style={styles.ratingText}>{tech.rating}</Text>
                  <View style={styles.starsContainer}>
                    {[1, 2, 3, 4, 5].map((star: number) => (
                      <Ionicons 
                        key={star}
                        name="star" 
                        size={16} 
                        color={Colors.star} 
                      />
                    ))}
                  </View>
                  <Text style={styles.reviewsCount}>({tech.reviews} reviews)</Text>
                </View>
              </View>
            </View>

            {/* Rating Breakdown */}
            <View style={styles.ratingBreakdown}>
              <View style={styles.ratingRow}>
                <Text style={styles.ratingLabel}>5 star</Text>
                <View style={styles.ratingBarContainer}>
                  <View style={[styles.ratingBar, { width: `${fiveStarPercentage}%` }]} />
                </View>
                <Text style={styles.ratingPercentage}>{fiveStarPercentage}%</Text>
              </View>
            </View>

            {/* Filter Options */}
            <View style={styles.filterOptions}>
              <TouchableOpacity 
                style={[styles.filterButton, sortBy !== 'recent' && styles.activeFilterButton]}
                onPress={toggleSortModal}
              >
                <Ionicons 
                  name="funnel-outline" 
                  size={18} 
                  color={sortBy !== 'recent' ? Colors.white : Colors.text.primary} 
                />
                <Text style={[styles.filterText, sortBy !== 'recent' && styles.activeFilterText]}>
                  {sortBy === 'recent' ? 'Sort by' : 
                   sortBy === 'highest' ? 'Highest rated' : 'Lowest rated'}
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.filterButton, filterRating !== 'all' && styles.activeFilterButton]}
                onPress={toggleFilterModal}
              >
                <Ionicons 
                  name="options-outline" 
                  size={18} 
                  color={filterRating !== 'all' ? Colors.white : Colors.text.primary} 
                />
                <Text style={[styles.filterText, filterRating !== 'all' && styles.activeFilterText]}>
                  {filterRating === 'all' ? 'Filter' : `${filterRating} stars`}
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.filterButton, withPhotos && styles.activeFilterButton]}
                onPress={toggleWithPhotos}
              >
                <Ionicons 
                  name="images-outline" 
                  size={18} 
                  color={withPhotos ? Colors.white : Colors.text.primary} 
                />
                <Text style={[styles.filterText, withPhotos && styles.activeFilterText]}>With photos</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.divider} />
          </View>
        }
      />
      
      {/* Sort By Modal */}
      <Modal
        visible={showSortModal}
        transparent={true}
        animationType="none"
        onRequestClose={toggleSortModal}
      >
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1} 
          onPress={toggleSortModal}
        >
          <Animated.View 
            style={[
              styles.modalContent,
              { 
                opacity: modalAnimation,
                transform: [{
                  translateY: modalAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [20, 0]
                  })
                }]
              }
            ]}
          >
            <Text style={styles.modalTitle}>Sort Reviews By</Text>
            
            <TouchableOpacity 
              style={[styles.modalOption, sortBy === 'recent' && styles.selectedOption]}
              onPress={() => handleSelectSort('recent')}
            >
              <Text style={styles.modalOptionText}>Most Recent</Text>
              {sortBy === 'recent' && (
                <Ionicons name="checkmark" size={22} color={Colors.primary} />
              )}
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.modalOption, sortBy === 'highest' && styles.selectedOption]}
              onPress={() => handleSelectSort('highest')}
            >
              <Text style={styles.modalOptionText}>Highest Rating</Text>
              {sortBy === 'highest' && (
                <Ionicons name="checkmark" size={22} color={Colors.primary} />
              )}
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.modalOption, sortBy === 'lowest' && styles.selectedOption]}
              onPress={() => handleSelectSort('lowest')}
            >
              <Text style={styles.modalOptionText}>Lowest Rating</Text>
              {sortBy === 'lowest' && (
                <Ionicons name="checkmark" size={22} color={Colors.primary} />
              )}
            </TouchableOpacity>
          </Animated.View>
        </TouchableOpacity>
      </Modal>
      
      {/* Filter Modal */}
      <Modal
        visible={showFilterModal}
        transparent={true}
        animationType="none"
        onRequestClose={toggleFilterModal}
      >
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1} 
          onPress={toggleFilterModal}
        >
          <Animated.View 
            style={[
              styles.modalContent,
              { 
                opacity: modalAnimation,
                transform: [{
                  translateY: modalAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [20, 0]
                  })
                }]
              }
            ]}
          >
            <Text style={styles.modalTitle}>Filter By Rating</Text>
            
            <TouchableOpacity 
              style={[styles.modalOption, filterRating === 'all' && styles.selectedOption]}
              onPress={() => handleSelectFilter('all')}
            >
              <Text style={styles.modalOptionText}>All Ratings</Text>
              {filterRating === 'all' && (
                <Ionicons name="checkmark" size={22} color={Colors.primary} />
              )}
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.modalOption, filterRating === '5' && styles.selectedOption]}
              onPress={() => handleSelectFilter('5')}
            >
              <View style={styles.ratingOptionContainer}>
                <Text style={styles.modalOptionText}>5 Stars</Text>
                <View style={styles.miniStarContainer}>
                  {[1, 2, 3, 4, 5].map((star: number) => (
                    <Ionicons key={star} name="star" size={14} color={Colors.star} />
                  ))}
                </View>
              </View>
              {filterRating === '5' && (
                <Ionicons name="checkmark" size={22} color={Colors.primary} />
              )}
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.modalOption, filterRating === '4' && styles.selectedOption]}
              onPress={() => handleSelectFilter('4')}
            >
              <View style={styles.ratingOptionContainer}>
                <Text style={styles.modalOptionText}>4 Stars</Text>
                <View style={styles.miniStarContainer}>
                  {[1, 2, 3, 4, 5].map((star: number) => (
                    <Ionicons 
                      key={star} 
                      name="star" 
                      size={14} 
                      color={star <= 4 ? Colors.star : Colors.gray} 
                    />
                  ))}
                </View>
              </View>
              {filterRating === '4' && (
                <Ionicons name="checkmark" size={22} color={Colors.primary} />
              )}
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.modalOption, filterRating === '3' && styles.selectedOption]}
              onPress={() => handleSelectFilter('3')}
            >
              <View style={styles.ratingOptionContainer}>
                <Text style={styles.modalOptionText}>3 Stars</Text>
                <View style={styles.miniStarContainer}>
                  {[1, 2, 3, 4, 5].map((star: number) => (
                    <Ionicons 
                      key={star} 
                      name="star" 
                      size={14} 
                      color={star <= 3 ? Colors.star : Colors.gray} 
                    />
                  ))}
                </View>
              </View>
              {filterRating === '3' && (
                <Ionicons name="checkmark" size={22} color={Colors.primary} />
              )}
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.modalOption, filterRating === '2' && styles.selectedOption]}
              onPress={() => handleSelectFilter('2')}
            >
              <View style={styles.ratingOptionContainer}>
                <Text style={styles.modalOptionText}>2 Stars</Text>
                <View style={styles.miniStarContainer}>
                  {[1, 2, 3, 4, 5].map((star: number) => (
                    <Ionicons 
                      key={star} 
                      name="star" 
                      size={14} 
                      color={star <= 2 ? Colors.star : Colors.gray} 
                    />
                  ))}
                </View>
              </View>
              {filterRating === '2' && (
                <Ionicons name="checkmark" size={22} color={Colors.primary} />
              )}
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.modalOption, filterRating === '1' && styles.selectedOption]}
              onPress={() => handleSelectFilter('1')}
            >
              <View style={styles.ratingOptionContainer}>
                <Text style={styles.modalOptionText}>1 Star</Text>
                <View style={styles.miniStarContainer}>
                  {[1, 2, 3, 4, 5].map((star: number) => (
                    <Ionicons 
                      key={star} 
                      name="star" 
                      size={14} 
                      color={star <= 1 ? Colors.star : Colors.gray} 
                    />
                  ))}
                </View>
              </View>
              {filterRating === '1' && (
                <Ionicons name="checkmark" size={22} color={Colors.primary} />
              )}
            </TouchableOpacity>
          </Animated.View>
        </TouchableOpacity>
      </Modal>
      
      {/* Image Viewer Modal */}
      <ImageView
        images={imagesForViewer}
        imageIndex={currentImageIndex}
        visible={isImageViewVisible}
        onRequestClose={closeImageViewer}
        FooterComponent={({ imageIndex }) => (
          <Text style={styles.imageViewerFooter}>{`${imageIndex + 1} / ${imagesForViewer.length}`}</Text>
        )}
      />
    </View>
  );
}

// Define a type for our styles to fix TypeScript errors
type Styles = {
  container: ViewStyle;
  header: ViewStyle;
  headerTitle: TextStyle;
  backButton: ViewStyle;
  shareButton: ViewStyle;
  profileSummary: ViewStyle;
  profileImage: ImageStyle;
  profileInfo: ViewStyle;
  techName: TextStyle;
  ratingContainer: ViewStyle;
  ratingText: TextStyle;
  starsContainer: ViewStyle;
  reviewsCount: TextStyle;
  ratingBreakdown: ViewStyle;
  ratingRow: ViewStyle;
  ratingLabel: TextStyle;
  ratingBarContainer: ViewStyle;
  ratingBar: ViewStyle;
  ratingPercentage: TextStyle;
  filterOptions: ViewStyle;
  filterButton: ViewStyle;
  activeFilterButton: ViewStyle;
  filterText: TextStyle;
  activeFilterText: TextStyle;
  divider: ViewStyle;
  reviewItem: ViewStyle;
  reviewHeader: ViewStyle;
  reviewerInfo: ViewStyle;
  reviewerImage: ImageStyle;
  reviewerName: TextStyle;
  reviewDate: TextStyle;
  serviceText: TextStyle;
  reviewText: TextStyle;
  photosContainer: ViewStyle;
  photoWrapper: ViewStyle;
  reviewPhoto: ImageStyle;
  photoOverlay: ViewStyle;
  photoText: TextStyle;
  helpfulContainer: ViewStyle;
  helpfulButton: ViewStyle;
  helpfulText: TextStyle;
  modalOverlay: ViewStyle;
  modalContent: ViewStyle;
  modalTitle: TextStyle;
  modalOption: ViewStyle;
  selectedOption: ViewStyle;
  modalOptionText: TextStyle;
  ratingOptionContainer: ViewStyle;
  miniStarContainer: ViewStyle;
  imageViewerFooter: TextStyle;
};

// Use StyleSheet.create with the Styles type
const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    backgroundColor: getColor(Colors.background),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 16,
    backgroundColor: getColor(Colors.white),
    borderBottomWidth: 1,
    borderBottomColor: getColor(Colors.border),
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: getColor(Colors.text.primary),
  },
  backButton: {
    padding: 8,
  },
  shareButton: {
    padding: 8,
  },
  profileSummary: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: getColor(Colors.white),
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  techName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: getColor(Colors.text.primary),
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: getColor(Colors.text.primary),
    marginRight: 8,
  },
  starsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewsCount: {
    fontSize: 14,
    color: getColor(Colors.text.secondary),
    marginLeft: 8,
  },
  ratingBreakdown: {
    padding: 16,
    backgroundColor: getColor(Colors.white),
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ratingLabel: {
    width: 50,
    fontSize: 14,
    color: getColor(Colors.text.primary),
  },
  ratingBarContainer: {
    flex: 1,
    height: 8,
    backgroundColor: getColor(Colors.lightGray),
    borderRadius: 4,
    marginHorizontal: 8,
  },
  ratingBar: {
    height: 8,
    backgroundColor: getColor(Colors.star),
    borderRadius: 4,
  },
  ratingPercentage: {
    width: 40,
    fontSize: 14,
    color: getColor(Colors.text.primary),
    textAlign: 'right',
  },
  filterOptions: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: getColor(Colors.white),
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: getColor(Colors.border),
    marginRight: 12,
  },
  activeFilterButton: {
    backgroundColor: getColor(Colors.primary),
    borderColor: getColor(Colors.primary),
  },
  filterText: {
    fontSize: 14,
    color: getColor(Colors.text.primary),
    marginLeft: 8,
  },
  activeFilterText: {
    color: getColor(Colors.white),
  },
  divider: {
    height: 8,
    backgroundColor: getColor(Colors.background),
  },
  reviewItem: {
    padding: 16,
    backgroundColor: getColor(Colors.white),
    borderBottomWidth: 1,
    borderBottomColor: getColor(Colors.border),
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  reviewerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewerImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  reviewerName: {
    fontSize: 16,
    fontWeight: '500',
    color: getColor(Colors.text.primary),
  },
  reviewDate: {
    fontSize: 14,
    color: getColor(Colors.text.secondary),
  },
  serviceText: {
    fontSize: 14,
    fontWeight: '500',
    color: getColor(Colors.text.primary),
    marginTop: 4,
    marginBottom: 8,
  },
  reviewText: {
    fontSize: 14,
    lineHeight: 20,
    color: getColor(Colors.text.primary),
    marginBottom: 12,
  },
  photosContainer: {
    marginBottom: 12,
  },
  photoWrapper: {
    position: 'relative',
    marginRight: 12,
  },
  reviewPhoto: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  photoOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 4,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  photoText: {
    color: getColor(Colors.white),
    fontSize: 12,
    textAlign: 'center',
  },
  helpfulContainer: {
    flexDirection: 'row',
    marginTop: 8,
  },
  helpfulButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    backgroundColor: getColor(Colors.lightGray),
  },
  helpfulText: {
    fontSize: 14,
    color: getColor(Colors.text.primary),
    marginLeft: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    width: '100%',
    backgroundColor: getColor(Colors.white),
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: getColor(Colors.text.primary),
    marginBottom: 16,
    textAlign: 'center',
  },
  modalOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: getColor(Colors.border),
  },
  selectedOption: {
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  modalOptionText: {
    fontSize: 16,
    color: getColor(Colors.text.primary),
  },
  ratingOptionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  miniStarContainer: {
    flexDirection: 'row',
    marginLeft: 12,
  },
  imageViewerFooter: { // Style for the image counter in the viewer
    textAlign: 'center',
    color: 'white',
    paddingBottom: 20,
    fontSize: 14,
  },
});

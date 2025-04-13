import { StyleSheet, View, Text, FlatList, TouchableOpacity, TextInput, ImageSourcePropType, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { FAVORITE_TECHS, TechItem } from '@/data/mockData';
import { Colors } from '@/constants/Colors';
import TechCard from '@/components/TechCard';
import ImageViewing from 'react-native-image-viewing';

export default function FavoritesScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  
  // State for Image Viewer Modal
  const [isViewerVisible, setIsViewerVisible] = useState(false);
  const [viewerImages, setViewerImages] = useState<ImageSourcePropType[]>([]);
  const [viewerIndex, setViewerIndex] = useState(0);

  // Filter techs based on search query
  const filteredTechs = searchQuery.trim() === '' 
    ? FAVORITE_TECHS 
    : FAVORITE_TECHS.filter(tech => 
        tech.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tech.specialty.toLowerCase().includes(searchQuery.toLowerCase())
      );

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

  const renderTechItem = ({ item }: { item: TechItem }) => (
    <TechCard 
      item={item} 
      isFavorite={true} 
      onToggleFavorite={(id) => {
        console.log(`Toggle favorite for tech ${id}`);
      }} 
      showPortfolio={true} // Show portfolio
      onPortfolioImagePress={openImageViewer} // Add handler
    />
  );

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Favorites</Text>
        <TouchableOpacity>
          <Ionicons name="ellipsis-vertical" size={24} color={Colors.icon.primary} />
        </TouchableOpacity>
      </View>

      {/* Search bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color={Colors.icon.secondary} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search saved technicians"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <FlatList
        data={filteredTechs}
        renderItem={renderTechItem}
        keyExtractor={(item: TechItem) => item.id}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="heart-outline" size={64} color={Colors.icon.tertiary} />
            <Text style={styles.emptyText}>No favorites yet</Text>
            <Text style={styles.emptySubtext}>Your favorite nail technicians will appear here</Text>
          </View>
        }
      />

      {/* Image Viewer using react-native-image-viewing */}
      <ImageViewing
        images={viewerImages.map(img => (typeof img === 'number' ? Image.resolveAssetSource(img) : { uri: img as string }))} 
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.secondary,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 16,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.background.primary,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.text.primary,
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Colors.background.primary,
    paddingBottom: 16,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    marginBottom: 8,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background.input,
    borderRadius: 50,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: Colors.text.primary,
  },
  listContainer: {
    padding: 16,
    paddingTop: 4,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text.secondary,
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: Colors.text.tertiary,
    marginTop: 8,
    textAlign: 'center',
  },
  // Styles for ImageViewing Header
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

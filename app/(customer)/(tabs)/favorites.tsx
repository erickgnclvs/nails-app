import { StyleSheet, View, Text, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { FAVORITE_TECHS, TechItem } from '@/data/mockData';
import { Colors } from '@/constants/Colors';
import TechCard from '@/components/TechCard';

export default function FavoritesScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter techs based on search query
  const filteredTechs = searchQuery.trim() === '' 
    ? FAVORITE_TECHS 
    : FAVORITE_TECHS.filter(tech => 
        tech.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tech.specialty.toLowerCase().includes(searchQuery.toLowerCase())
      );

  const renderTechItem = ({ item }: { item: TechItem }) => (
    <TechCard item={item} isFavorite={true} onToggleFavorite={(id) => {
      // Toggle favorite logic would go here
      console.log(`Toggle favorite for tech ${id}`);
    }} />
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
});

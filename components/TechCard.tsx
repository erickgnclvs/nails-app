import { StyleSheet, View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { TechItem } from '../data/mockData';
import { Colors } from '../constants/Colors';

// Import the secondary color directly for the 'See all' text
const secondaryColor = '#f5a623';  // Matching the secondaryColor from Colors.ts

type TechCardProps = {
  item: TechItem;
  isFavorite?: boolean;
  onToggleFavorite?: (id: string) => void;
  distance?: number; // Distance in miles
};

export default function TechCard({ item, isFavorite = true, onToggleFavorite, distance }: TechCardProps) {
  const router = useRouter();
  
  return (
    <TouchableOpacity 
      style={styles.techCard}
      onPress={() => {
        // Determine which screen we're on based on the isFavorite prop
        const fromScreen = isFavorite ? 'favorites' : 'search';
        router.push(`/tech-profile?id=${item.id}&from=${fromScreen}`);
      }}
    >
      {/* Tech Info */}
      <View style={styles.techInfoContainer}>
        <Image source={item.profileImage} style={styles.techAvatar} />
        <View style={styles.techDetails}>
          <Text style={styles.techName}>{item.name}</Text>
          <Text style={styles.techSpecialty}>{item.specialty}</Text>
        </View>
        <TouchableOpacity 
          style={styles.heartButton}
          onPress={(e) => {
            e.stopPropagation();
            if (onToggleFavorite) {
              onToggleFavorite(item.id);
            }
          }}
        >
          <Ionicons 
            name={isFavorite ? "heart" : "heart-outline"} 
            size={20} 
            color={Colors.heart} 
          />
        </TouchableOpacity>
      </View>
      
      {/* Rating and Distance */}
      <View style={styles.infoRow}>
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={16} color={Colors.star} />
          <Text style={styles.infoText}>
            {item.rating} ({item.reviews} reviews)
          </Text>
        </View>
        
        {distance !== undefined && (
          <View style={styles.distanceContainer}>
            <Ionicons name="location-outline" size={16} color={Colors.text.secondary} />
            <Text style={styles.distanceText}>{distance.toFixed(1)} miles</Text>
          </View>
        )}
      </View>
      
      {/* Portfolio Preview */}
      {item.portfolio && item.portfolio.length > 0 && (
        <View style={styles.portfolioContainer}>
          <View style={styles.portfolioHeader}>
            <Text style={styles.portfolioTitle}>Recent Work</Text>
            <TouchableOpacity
              onPress={(e) => {
                e.stopPropagation();
                // Navigate to full portfolio view
                router.push(`/tech-profile?id=${item.id}&tab=portfolio`);
              }}
            >
              <Text style={styles.seeAllText}>See all</Text>
            </TouchableOpacity>
          </View>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.portfolioScroll}
          >
            {item.portfolio.map((image, index) => (
              <TouchableOpacity 
                key={index}
                onPress={(e) => {
                  e.stopPropagation();
                  // Could open a modal with larger image view
                }}
              >
                <Image 
                  source={image} 
                  style={styles.portfolioImage} 
                  resizeMode="cover"
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
      
      {/* Book Button */}
      <TouchableOpacity 
        style={styles.bookButton}
        onPress={(e) => {
          e.stopPropagation();
          router.push({
            pathname: '/(customer)/book-appointment',
            params: { techId: item.id }
          });
        }}
      >
        <Text style={styles.bookButtonText}>Book Now</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  techCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    backgroundColor: Colors.background.primary,
    shadowColor: Colors.shadow.color,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: Colors.shadow.opacity,
    shadowRadius: 2,
    elevation: 2,
  },
  techInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  techAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  techDetails: {
    flex: 1,
  },
  techName: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.text.primary,
    marginBottom: 2,
  },
  techSpecialty: {
    fontSize: 13,
    color: Colors.text.secondary,
  },
  heartButton: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  distanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    fontSize: 12,
    color: Colors.text.secondary,
    marginLeft: 6,
  },
  distanceText: {
    fontSize: 12,
    color: Colors.text.secondary,
    marginLeft: 6,
  },
  portfolioContainer: {
    marginBottom: 12,
  },
  portfolioHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  portfolioTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.text.primary,
  },
  seeAllText: {
    fontSize: 12,
    color: secondaryColor,
    fontWeight: '500',
  },
  portfolioScroll: {
    paddingRight: 8,
    paddingVertical: 2,
  },
  portfolioImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 10,
  },
  bookButton: {
    backgroundColor: Colors.button.primary.background,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 4,
  },
  bookButtonText: {
    color: Colors.button.primary.text,
    fontSize: 13,
    fontWeight: '500',
  },
});

import { StyleSheet, View, Text, TouchableOpacity, ScrollView, FlatList, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { FEATURED_TECHS } from '@/data/storiesData';
import { TRENDING_STYLES, TOP_RATED_TECHS } from '@/data/mockData';

export default function CustomerDashboard() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Ionicons name="person-circle-outline" size={24} color="#222" />
          <Text style={styles.appName}>Nails</Text>
        </View>
        <View style={styles.headerIcons}>
          <TouchableOpacity 
            style={styles.iconButton}
            onPress={() => router.push('/search')}
          >
            <Ionicons name="search" size={24} color="#222" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="notifications-outline" size={24} color="#222" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Featured Nail Techs */}
        <FlatList
          data={FEATURED_TECHS}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.featuredTechsContainer}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={styles.techItem}
              onPress={() => router.push(`/(customer)/stories?techId=${item.id}`)}
            >
              <View style={[
                styles.techAvatar, 
                { borderColor: item.watched ? '#aaa' : '#000' }
              ]}>
                <Image 
                  source={item.profileImage} 
                  style={styles.profileImage}
                  resizeMode="cover"
                />
              </View>
              <Text style={styles.techName}>{item.name}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
        />

        {/* Trending Styles */}
        <Text style={styles.sectionTitle}>Trending Styles</Text>
        <View style={styles.trendingContainer}>
          {/* Column 1 */}
          <View style={styles.trendingColumn}>
            {TRENDING_STYLES.filter(style => style.column === 1).map((style) => (
              <TouchableOpacity 
                key={style.id} 
                style={[styles.styleCard, { height: style.height }]}
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
            {TRENDING_STYLES.filter(style => style.column === 2).map((style) => (
              <TouchableOpacity 
                key={style.id} 
                style={[styles.styleCard, { height: style.height }]}
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

        {/* Top Rated Nail Techs */}
        <Text style={styles.sectionTitle}>Top Rated Nail Techs</Text>
        <View style={styles.topRatedContainer}>
          {TOP_RATED_TECHS.map((tech) => (
            <TouchableOpacity 
              key={tech.id} 
              style={styles.topRatedCard}
              onPress={() => router.push(`/tech-profile?id=${tech.id}`)}
            >
              <View style={styles.techInfo}>
                <Image source={tech.profileImage} style={styles.topRatedAvatar} />
                <View>
                  <Text style={styles.topRatedName}>{tech.name}</Text>
                  <View style={styles.ratingContainer}>
                    <Ionicons name="star" size={16} color="#222" />
                    <Text style={styles.ratingText}>
                      {tech.rating} ({tech.reviews} reviews)
                    </Text>
                  </View>
                </View>
              </View>
              <TouchableOpacity 
                style={styles.bookButton}
                onPress={() => router.push({
                  pathname: '/(customer)/book-appointment',
                  params: { techId: tech.id }
                })}
              >
                <Text style={styles.bookButtonText}>Book</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 16,
    backgroundColor: '#fff',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  appName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222',
    marginLeft: 8,
  },
  headerIcons: {
    flexDirection: 'row',
  },
  iconButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  scrollView: {
    flex: 1,
  },
  featuredTechsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  techItem: {
    alignItems: 'center',
    marginRight: 24,
  },
  techAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginBottom: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  techName: {
    fontSize: 14,
    color: '#222',
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
  topRatedContainer: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  topRatedCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  techInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  topRatedAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  topRatedName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#222',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  bookButton: {
    backgroundColor: '#222',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
});

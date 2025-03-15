import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  SafeAreaView,
} from 'react-native';

import { Colors } from '@/constants/Colors';
import { FAVORITE_TECHS, Service, TechItem } from '@/data/mockData';

export default function TechProfileScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ id: string; from?: string }>();
  const { id, from } = params;
  const [isFavorite, setIsFavorite] = useState(true); // Assume already a favorite

  // Find the tech with the matching id
  const tech = FAVORITE_TECHS.find((tech) => tech.id === id) || FAVORITE_TECHS[0];

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    // In a real app, this would update the user's favorites in a database
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Fixed Header */}
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={Colors.text.primary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Nail Artist Profile</Text>
          <TouchableOpacity onPress={toggleFavorite} style={styles.favoriteButton}>
            <Ionicons
              name={isFavorite ? 'heart' : 'heart-outline'}
              size={24}
              color={isFavorite ? Colors.heart : Colors.text.primary}
            />
          </TouchableOpacity>
        </View>
      </View>
      
      <ScrollView style={styles.scrollContent} contentContainerStyle={styles.scrollContentContainer}>

      {/* Profile Section */}
      <View style={styles.profileSection}>
        <View style={styles.profileHeader}>
          <Image source={tech.profileImage} style={styles.profileImage} />
          <View style={styles.profileInfo}>
            <Text style={styles.name}>{tech.name}</Text>
            <Text style={styles.specialty}>{tech.specialty}</Text>
            <TouchableOpacity 
              style={styles.ratingContainer}
              onPress={() => router.push(`/tech-reviews?id=${tech.id}`)}
            >
              <Ionicons name="star" size={18} color={Colors.star} />
              <Text style={styles.rating}>
                {tech.rating} ({tech.reviews} reviews)
              </Text>
              <Ionicons name="chevron-forward" size={16} color={Colors.text.secondary} style={styles.ratingArrow} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Stats Section */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{tech.yearsExperience}+</Text>
          <Text style={styles.statLabel}>Years Exp</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{tech.clients}+</Text>
          <Text style={styles.statLabel}>Clients</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{tech.successRate}%</Text>
          <Text style={styles.statLabel}>Success</Text>
        </View>
      </View>

      {/* About Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About Me</Text>
        <Text style={styles.aboutText}>{tech.about}</Text>
      </View>

      {/* Portfolio Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Portfolio</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.portfolioGrid}>
          {tech.portfolio?.map((image, index) => (
            <TouchableOpacity key={index} style={styles.portfolioItem}>
              <Image source={image} style={styles.portfolioImage} />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Services Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Services</Text>
        {tech.services?.map((service) => (
          <View key={service.id} style={styles.serviceItem}>
            <View>
              <Text style={styles.serviceName}>{service.name}</Text>
              <Text style={styles.serviceDuration}>{service.duration} mins</Text>
            </View>
            <Text style={styles.servicePrice}>${service.price}</Text>
          </View>
        ))}
      </View>

      </ScrollView>
      
      {/* Fixed Book Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.bookButton}>
          <Text style={styles.bookButtonText}>Book Appointment</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  headerContainer: {
    backgroundColor: Colors.background.primary,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: Colors.background.primary,
  },
  scrollContent: {
    flex: 1,
  },
  scrollContentContainer: {
    paddingBottom: 20,
  },
  buttonContainer: {
    backgroundColor: Colors.background.primary,
    padding: 16,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text.primary,
  },
  favoriteButton: {
    padding: 8,
  },
  profileSection: {
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.text.primary,
    marginBottom: 4,
  },
  specialty: {
    fontSize: 16,
    color: Colors.text.secondary,
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 14,
    color: Colors.text.primary,
    marginLeft: 4,
  },
  ratingArrow: {
    marginLeft: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.border.light,
    marginHorizontal: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text.primary,
  },
  statLabel: {
    fontSize: 14,
    color: Colors.text.tertiary,
    marginTop: 4,
  },
  section: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.light,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text.primary,
    marginBottom: 12,
  },
  aboutText: {
    fontSize: 15,
    lineHeight: 22,
    color: Colors.text.secondary,
  },
  seeAllText: {
    fontSize: 14,
    color: Colors.text.primary,
    fontWeight: '500',
  },
  portfolioGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  portfolioItem: {
    width: '31%',
    marginBottom: 12,
  },
  portfolioImage: {
    width: '100%',
    height: 100,
    borderRadius: 8,
  },
  portfolioItemText: {
    fontSize: 12,
    color: Colors.text.tertiary,
    marginTop: 4,
  },
  serviceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.light,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.text.primary,
    marginBottom: 4,
  },
  serviceDuration: {
    fontSize: 14,
    color: Colors.text.tertiary,
  },
  servicePrice: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text.primary,
  },
  bookButton: {
    backgroundColor: Colors.button.primary.background,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  bookButtonText: {
    color: Colors.button.primary.text,
    fontSize: 16,
    fontWeight: '600',
  },
});

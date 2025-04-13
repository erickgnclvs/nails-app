import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState, useEffect } from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Image } from "expo-image";

import * as ImagePicker from 'expo-image-picker';

import { Colors } from '@/constants/Colors';
import { BOOKINGS, REVIEWS, BookingItem, Review } from '@/data/mockData';

// Simple Star Rating Component (can be moved to a separate file)
interface StarRatingProps {
  rating: number;
  onRate: (rate: number) => void;
  maxStars?: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, onRate, maxStars = 5 }) => {
  return (
    <View style={styles.starRatingContainer}>
      {[...Array(maxStars)].map((_, index) => {
        const starNumber = index + 1;
        return (
          <TouchableOpacity key={starNumber} onPress={() => onRate(starNumber)} style={styles.starButton}>
            <Ionicons
              name={starNumber <= rating ? 'star' : 'star-outline'}
              size={35} // Increased size
              color={Colors.primary} 
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default function ReviewScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ bookingId: string, techId: string, techName: string, date: string }>();
  const { bookingId, techId, techName, date } = params;
  
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [photos, setPhotos] = useState<string[]>([]); // State for selected photo URIs

  const handleBack = () => {
    router.back();
  };

  const handleSubmitReview = () => {
    if (!bookingId) {
      Alert.alert('Error', 'Booking ID is missing.');
      return;
    }
    if (!techId) { 
        Alert.alert('Error', 'Technician ID is missing.');
        return;
    }

    if (rating === 0) {
      Alert.alert('Rating Required', 'Please select a star rating.');
      return;
    }

    // Find the booking to update
    const bookingIndex = BOOKINGS.findIndex(b => b.id === bookingId);
    if (bookingIndex === -1) {
      Alert.alert('Error', 'Booking not found.');
      return;
    }

    // Check if a review already exists for this booking
    if (BOOKINGS[bookingIndex].reviewId) {
      Alert.alert('Review Exists', 'You have already submitted a review for this appointment.');
      router.back(); // Go back if review exists
      return;
    }

    // Create new review
    const newReview: Review = {
      id: String(REVIEWS.length + 1), // Simple ID generation
      bookingId: bookingId,
      techId: techId, // Use techId from params
      userName: 'Current User', // Placeholder for actual user name
      userImage: null, // Placeholder for user image
      rating: rating,
      date: new Date().toISOString(), // Store full ISO string for potential future use
      service: BOOKINGS[bookingIndex].service, // Get service from booking
      text: comment,
      photos: photos.length > 0 
        ? photos.map((_, index) => { 
            // Cycle through placeholder images
            const placeholderIndex = (index % 3) + 1; // Use 3 placeholders
            switch (placeholderIndex) {
              case 1: return require('../../assets/images/nails/Nail Art Photo (1).webp');
              case 2: return require('../../assets/images/nails/Nail Art Photo (2).webp');
              case 3: return require('../../assets/images/nails/Nail Art Photo (3).webp');
              default: return require('../../assets/images/nails/Nail Art Photo (1).webp'); // Fallback
            }
          })
        : [], // Empty array if no photos were selected
      helpfulCount: 0, // Initialize optional fields
    };

    // Add review to mock data
    REVIEWS.push(newReview);

    // Update booking with reviewId
    BOOKINGS[bookingIndex].reviewId = newReview.id;

    Alert.alert('Review Submitted', 'Thank you for your feedback!', [
      { text: 'OK', onPress: () => router.replace({ pathname: '/(customer)/appointment-details', params: { id: bookingId }}) }
    ]);
  };

  // --- Image Picker Logic ---
  const pickImage = async () => {
    // Request permissions first
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Required', 'Sorry, we need camera roll permissions to make this work!');
      return;
    }

    // Launch image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      // allowsEditing: true, // Optional: allow editing
      allowsMultipleSelection: true, // Allow selecting multiple photos
      aspect: [4, 3],
      quality: 1, // Highest quality
    });

    // console.log(result); // Log result for debugging

    if (!result.canceled) {
      // Map selected assets to their URIs and add to existing photos
      const selectedUris = result.assets.map(asset => asset.uri);
      setPhotos(prevPhotos => [...prevPhotos, ...selectedUris]);
    }
  };

  const removePhoto = (uriToRemove: string) => {
      setPhotos(prevPhotos => prevPhotos.filter(uri => uri !== uriToRemove));
  };
  // ------------------------

  return (
    <SafeAreaView style={styles.container}>
       {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={Colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Leave a Review</Text>
        <View style={styles.placeholderRight} /> 
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Technician Info (Optional Section) */}
        <View style={styles.section}>
            <Text style={styles.techInfoText}>You had an appointment with <Text style={{fontWeight: 'bold'}}>{techName || 'Technician'}</Text> on {date || 'the date'}.</Text>
        </View>

        {/* Rating Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Rate your experience</Text>
          <StarRating rating={rating} onRate={setRating} />
        </View>

        {/* Comment Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Add a comment (optional)</Text>
          <TextInput
            style={styles.commentInput}
            placeholder="Share details of your experience..."
            placeholderTextColor={Colors.text.placeholder}
            value={comment}
            onChangeText={setComment}
            multiline
            numberOfLines={4}
          />
        </View>

        {/* Photo Upload Section */}
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>Add Photos (Optional)</Text>
            <TouchableOpacity style={styles.addPhotoButton} onPress={pickImage}>
                <Ionicons name="camera-outline" size={20} color={Colors.button.primary.background} style={{ marginRight: 8 }}/>
                <Text style={styles.addPhotoButtonText}>Select Photos</Text>
            </TouchableOpacity>

            {/* Selected Photos Preview */}
            {photos.length > 0 && (
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.photosPreviewContainer}>
                    {photos.map((uri, index) => (
                        <View key={index} style={styles.photoPreviewWrapper}>
                            <Image source={{ uri: uri }} style={styles.photoPreview} />
                            <TouchableOpacity 
                                style={styles.removePhotoButton}
                                onPress={() => removePhoto(uri)}
                            >
                                <Ionicons name="close-circle" size={24} color={Colors.status.error} />
                            </TouchableOpacity>
                        </View>
                    ))}
                </ScrollView>
            )}
         </View>
      </ScrollView>

      {/* Submit Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmitReview}>
          <Text style={styles.submitButtonText}>Submit Review</Text>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.light,
    backgroundColor: Colors.background.primary, // Match background
  },
  backButton: {
    padding: 5, // Add padding for easier tap
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text.primary,
  },
  placeholderRight: { // To balance the header when no right icon is present
    width: 24 + 10, // Width of icon + padding
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 100, // Ensure space for the button
  },
  section: {
    marginTop: 25, // Consistent spacing between sections
  },
   techInfoText: {
    fontSize: 16,
    color: Colors.text.secondary,
    textAlign: 'center',
    marginBottom: 10, // Add some space below this text
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text.primary,
    marginBottom: 15, 
  },
  starRatingContainer: {
    flexDirection: 'row',
    justifyContent: 'center', // Center stars
    alignItems: 'center',
    marginBottom: 10,
  },
  starButton: {
    paddingHorizontal: 8, // Add spacing between stars
  },
  commentInput: {
    borderWidth: 1,
    borderColor: Colors.border.medium,
    borderRadius: 8,
    padding: 12,
    minHeight: 100,
    textAlignVertical: 'top', // Start text at the top for multiline
    fontSize: 16,
    color: Colors.text.primary,
    backgroundColor: Colors.background.input, // Input background color
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 34,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: Colors.background.primary,
    // Removed all border-related properties
  },
  submitButton: {
    backgroundColor: Colors.button.primary.background,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonText: {
    color: Colors.button.primary.text,
    fontSize: 18,
    fontWeight: 'bold',
  },
  // Photo Upload Styles
  addPhotoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background.secondary, 
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border.light,
    justifyContent: 'center',
    marginBottom: 16, // Add margin below the button
  },
  addPhotoButtonText: {
    color: Colors.button.primary.background,
    fontSize: 16,
    fontWeight: '600',
  },
  photosPreviewContainer: {
    marginTop: 8, 
  },
  photoPreviewWrapper: {
    position: 'relative',
    marginRight: 10,
  },
  photoPreview: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: Colors.background.secondary,
  },
  removePhotoButton: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: Colors.background.primary, 
    borderRadius: 12,
  },
});

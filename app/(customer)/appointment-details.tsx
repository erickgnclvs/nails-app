import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter, Link } from 'expo-router';
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  ActivityIndicator, // Added for loading state
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import ImageView from "react-native-image-viewing"; // Import Image Viewer

import { Colors } from '@/constants/Colors'; 
import { BOOKINGS, REVIEWS, BookingItem, Review } from '@/data/mockData';

// TODO: Replace with actual data fetching
const findBookingById = (id: string): BookingItem | undefined => {
  return BOOKINGS.find(booking => booking.id === id);
};

const findReviewById = (id: string | null): Review | undefined => {
  if (!id) return undefined;
  return REVIEWS.find(review => review.id === id);
};

// Helper to check if appointment is in the past
const isAppointmentPast = (dateStr: string, timeStr: string): boolean => {
  // Basic parsing (assumes "Month Day, Year" and "H:MM AM/PM")
  // This is fragile; consider using a date library like date-fns or moment
  try {
    const [time, modifier] = timeStr.split(' ');
    let [hours, minutes] = time.split(':').map(Number);
    if (modifier === 'PM' && hours < 12) hours += 12;
    if (modifier === 'AM' && hours === 12) hours = 0; // Midnight case
    
    const date = new Date(`${dateStr} ${hours}:${minutes}:00`);
    return date < new Date();
  } catch (error) {
    console.error("Error parsing date/time:", error);
    return false; // Default to not past if parsing fails
  }
};

export default function AppointmentDetailsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ id: string }>();
  const { id } = params;

  const [appointment, setAppointment] = useState<BookingItem | null>(null);
  const [review, setReview] = useState<Review | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    // Simulate data fetching
    setTimeout(() => {
      const foundBooking = findBookingById(id);
      if (foundBooking) {
        setAppointment(foundBooking);
        // Use nullish coalescing to provide null if reviewId is undefined
        const foundReview = findReviewById(foundBooking.reviewId ?? null);
        setReview(foundReview || null);
      }
      setIsLoading(false);
    }, 50); // Short delay to show loading indicator
  }, [id]);

  const handleComplete = () => {
    if (!appointment) return;
    const bookingIndex = BOOKINGS.findIndex(b => b.id === appointment.id);
    if (bookingIndex !== -1) {
      BOOKINGS[bookingIndex].status = 'completed';
      setAppointment({ ...appointment, status: 'completed' }); // Update local state
      Alert.alert('Status Updated', 'Appointment marked as completed.');
    } else {
      Alert.alert('Error', 'Could not update appointment status.');
    }
  };

  const handleCancel = () => {
    if (!appointment) return;
    Alert.alert(
      "Confirm Cancellation",
      "Are you sure you want to cancel this appointment?",
      [
        { text: "No", style: "cancel" },
        {
          text: "Yes, Cancel",
          style: "destructive",
          onPress: () => {
            const bookingIndex = BOOKINGS.findIndex(b => b.id === appointment.id);
            if (bookingIndex !== -1) {
              BOOKINGS[bookingIndex].status = 'cancelled';
              setAppointment({ ...appointment, status: 'cancelled' }); // Update local state
              Alert.alert('Appointment Cancelled', 'Your appointment has been cancelled.');
            } else {
              Alert.alert('Error', 'Could not cancel the appointment.');
            }
          }
        }
      ]
    );
  };
  
  const handleBack = () => {
      router.back();
  };

  // State for Image Viewer Modal
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageViewVisible, setIsImageViewVisible] = useState(false);

  // --- Image Viewer Handlers ---
  const openImageViewer = (index: number) => {
    setCurrentImageIndex(index);
    setIsImageViewVisible(true);
  };

  const closeImageViewer = () => {
    setIsImageViewVisible(false);
  };

  // Prepare images for the viewer (needs {uri: string} format)
  const imagesForViewer = review?.photos?.map(photoSource => 
    ({ uri: Image.resolveAssetSource(photoSource as any).uri })
  ) || [];

  // --- Render Action Buttons --- //
  // Decide where and how to render these based on final design
  // Maybe group primary actions at bottom, secondary elsewhere?

  // --- Loading and Error States --- //
  if (isLoading) {
    return (
      <SafeAreaView style={styles.containerCentered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </SafeAreaView>
    );
  }

  if (!appointment) {
    return (
      <SafeAreaView style={styles.containerCentered}>
         {/* Add Header here too for consistency */}
         <View style={styles.header}>
            <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={Colors.text.primary} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Not Found</Text>
            <View style={styles.placeholderRight} />
        </View>
        <Text style={styles.errorText}>Appointment not found.</Text>
        <TouchableOpacity onPress={handleBack} style={styles.primaryButtonSmall}>
             <Text style={styles.primaryButtonTextSmall}>Go Back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  // --- Main Content --- //
  const isPast = isAppointmentPast(appointment.date, appointment.time);
  const isCompleted = appointment.status === 'completed';
  const isCancelled = appointment.status === 'cancelled';
  const hasReview = !!review;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={Colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Appointment Details</Text>
        <View style={{ width: 24 }} />
      </View>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Tech Info Card */}
        <View style={styles.card}>
          <View style={styles.techInfoContainer}>
            <Image source={appointment.profileImage} style={styles.techImage} />
            <View style={styles.techDetails}>
              <Text style={styles.techName}>{appointment.techName}</Text>
              <Text style={styles.techSpecialty}>{appointment.service}</Text>
              <TouchableOpacity onPress={() => router.push({ pathname: '/(customer)/tech-profile', params: { id: appointment.techName } })}>
                <Text style={styles.viewProfileText}>View Profile</Text>
              </TouchableOpacity>
              <Text style={styles.techContact}>Contact via app</Text>
            </View>
          </View>
        </View>

        {/* Appointment Details Card */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Details</Text>
          <View style={styles.detailsContainer}>
            <View style={styles.detailItem}>
              <Ionicons name="calendar-outline" size={20} color={Colors.text.secondary} /> 
              <Text style={styles.detailText}>{`${appointment.date} at ${appointment.time}`}</Text>
            </View>
            <View style={styles.detailItem}>
              <Ionicons name="location-outline" size={20} color={Colors.text.secondary} />
              <Text style={styles.detailText}>{appointment.location}</Text>
            </View>
            <View style={styles.detailItem}>
              <Ionicons name="pricetag-outline" size={20} color={Colors.text.secondary} />
              <Text style={styles.detailText}>{appointment.service || 'Service Details N/A'}</Text>
              <Text style={styles.infoValue}>$50</Text>
            </View>
          </View>
        </View>

        {/* Status Card */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Status</Text>
          <View style={styles.statusContainer}>
            <View style={[styles.statusIndicator, { backgroundColor: 
              appointment.status === 'confirmed' ? Colors.status.confirmed : 
              (appointment.status === 'completed' ? Colors.status.completed : 
              (appointment.status === 'cancelled' ? Colors.status.error : 
              (appointment.status === 'pending' ? Colors.status.pending : Colors.text.secondary))) // Fallback color
              }]} />
            <Text style={[styles.statusText, { 
              color: 
                  appointment.status === 'confirmed' ? Colors.status.confirmed : 
                  (appointment.status === 'completed' ? Colors.status.completed : 
                  (appointment.status === 'cancelled' ? Colors.status.error : 
                  (appointment.status === 'pending' ? Colors.status.pending : Colors.text.secondary))) // Fallback color
              }]}>{appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}</Text>
          </View>
        </View>

        {/* Cancelled Message */} 
        {isCancelled && (
          <View style={styles.cancelledContainer}> 
            <Text style={styles.cancelledText}>This appointment was cancelled.</Text>
          </View>
        )}

        {/* Review Card */}
        {!isCancelled && isCompleted && (
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>{hasReview ? "Your Review" : "Feedback"}</Text>
            {hasReview && review ? (
              <>
                <View style={styles.reviewHeader}>
                  <View style={styles.reviewRating}>
                    {[...Array(5)].map((_, i) => (
                      <Ionicons
                        key={i}
                        name={i < review.rating ? 'star' : 'star-outline'}
                        size={18}
                        color={Colors.primary}
                        style={{ marginRight: 2 }}
                      />
                    ))}
                  </View>
                  <Text style={styles.reviewDate}>{new Date(review.date).toLocaleDateString()}</Text>
                </View>
                
                <Text style={styles.reviewText}>{review.text || "No comment provided."}</Text>
                
                {/* Review Photos */}
                {review.photos && review.photos.length > 0 && (
                  <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.reviewPhotosContainer}>
                    {review.photos.map((photoSource, index) => (
                      <TouchableOpacity key={index} onPress={() => openImageViewer(index)}>
                        <Image
                          source={photoSource as any}
                          style={styles.reviewPhotoThumbnail}
                        />
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                )}
              </>
            ) : (
              <Text style={styles.noReviewText}>You haven't left a review yet.</Text>
            )}
          </View>
        )}

        {/* Chat Button Card - Only show for confirmed/pending appointments */}
        {(appointment.status === 'confirmed' || appointment.status === 'pending') && (
          <View style={styles.card}>
            <TouchableOpacity 
              style={styles.chatButtonContainer}
              onPress={() => Alert.alert('Coming Soon', 'Chat functionality will be available soon!')}
            >
              <Ionicons name="chatbubble-outline" size={20} color={Colors.text.primary} style={{ marginRight: 8 }} />
              <Text style={styles.chatButtonContainerText}>Chat with {appointment.techName}</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Bottom Space */}
        <View style={{height: 100}} />
      </ScrollView>

      {/* Fixed Action Buttons at bottom */}
      {(appointment.status === 'completed' && !hasReview) || (appointment.status === 'confirmed' || appointment.status === 'pending') ? (
        <View style={styles.fixedButtonContainer}>
          {appointment.status === 'completed' && !hasReview && (
            // Completed & No Review: Show only Leave Feedback
            <TouchableOpacity 
              style={styles.fixedPrimaryButton} 
              onPress={() => router.push({ 
                pathname: '/(customer)/review', 
                params: { 
                  bookingId: appointment.id, 
                  techId: appointment.techId,
                  techName: appointment.techName,
                  date: `${appointment.date} at ${appointment.time}` 
                }
              })}
            >
              <Ionicons name="star-outline" size={20} color={Colors.button.primary.text} style={{ marginRight: 8 }} />
              <Text style={styles.primaryButtonText}>Leave a Review</Text>
            </TouchableOpacity>
          )}

          {(appointment.status === 'confirmed' || appointment.status === 'pending') && (
            // Confirmed or Pending: Show Reschedule and Cancel
            <View style={styles.fixedButtonRow}>
              <TouchableOpacity 
                style={styles.fixedSecondaryButton} 
                onPress={() => Alert.alert('Reschedule', 'Reschedule functionality to be implemented.')}
              >
                <Ionicons name="calendar-outline" size={20} color={Colors.text.primary} style={{ marginRight: 8 }} />
                <Text style={styles.secondaryButtonText}>Reschedule</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.fixedDangerButton} 
                onPress={handleCancel}
              >
                <Ionicons name="close-circle-outline" size={20} color={Colors.status.error} style={{ marginRight: 8 }} />
                <Text style={styles.dangerButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      ) : null}

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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary, 
  },
  containerCentered: { // For Loading/Error states
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background.primary,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: Colors.background.primary,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.light,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text.primary,
  },
  placeholderRight: {
    width: 24 + 10, // Icon size + padding
  },
  errorText: {
    fontSize: 16,
    color: Colors.status.error,
    marginBottom: 20,
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
    backgroundColor: Colors.background.secondary,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100, // Extra space at bottom for buttons
  },
  card: {
    backgroundColor: Colors.background.primary,
    borderRadius: 12,
    marginBottom: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  techInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailsContainer: {
    marginTop: 8,
  },
  cancelledContainer: {
    alignItems: 'center',
    padding: 12,
    backgroundColor: Colors.background.card,
    borderRadius: 8,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
    color: Colors.text.secondary,
  },
  techImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
    borderWidth: 1,
    borderColor: Colors.border.light,
  },
  techDetails: {
    flex: 1, // Take remaining space
  },
  techName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text.primary,
    marginBottom: 4,
  },
  techSpecialty: {
    fontSize: 14,
    color: Colors.text.secondary,
    marginBottom: 4,
  },
  viewProfileText: {
    fontSize: 14,
    color: Colors.primary, // Use primary color for links
    fontWeight: '500',
  },
  techContact: {
    fontSize: 14,
    color: Colors.text.secondary,
  },
  detailCard: {
    backgroundColor: Colors.background.card,
    borderRadius: 8,
    padding: 15,
    borderWidth: 1,
    borderColor: Colors.border.light,
    // Add shadow based on Colors.ts if desired
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12, // Space between detail items
  },
  detailText: {
    fontSize: 15,
    color: Colors.text.primary,
    marginLeft: 10,
    flex: 1, // Allow text to wrap
  },
  infoValue: {
    fontSize: 15,
    color: Colors.text.secondary,
    marginLeft: 10,
  },
  chatButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    paddingVertical: 8,
    borderRadius: 8,
  },
  chatButtonContainerText: {
    color: Colors.text.primary,
    fontSize: 16,
    fontWeight: '500',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background.secondary, // Background for status
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20, // Pill shape
    alignSelf: 'flex-start', // Don't stretch full width
  },
  statusIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '500',
    // Color is set dynamically inline
  },
  cancelledText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.status.error,
    textAlign: 'center',
    paddingVertical: 15,
    backgroundColor: Colors.background.secondary,
    borderRadius: 8,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  reviewRating: {
    flexDirection: 'row',
  },
  reviewDate: {
    fontSize: 12,
    color: Colors.text.tertiary,
  },
  reviewText: {
    fontSize: 14,
    color: Colors.text.primary,
    lineHeight: 20,
  },
  reviewPhotosContainer: {
    marginTop: 12,
  },
  reviewPhotoThumbnail: {
    width: 60,
    height: 60,
    borderRadius: 4,
    marginRight: 8,
    backgroundColor: Colors.background.secondary, // Placeholder background
  },
  noReviewText: {
    fontSize: 14,
    color: Colors.text.secondary,
    textAlign: 'center',
    paddingVertical: 10,
  },
  fixedButtonContainer: {
    position: 'absolute',
    bottom: 34, // Raised from bottom
    left: 0,
    right: 0,
    padding: 20, // Increased from 16
    backgroundColor: Colors.background.primary,
    // borderTopWidth: 0, // Removed border line
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: -2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 3,
    // elevation: 5,
  },
  fixedButtonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  fixedPrimaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.button.primary.background,
    paddingVertical: 15,
    borderRadius: 10,
    width: '100%',
  },
  fixedSecondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.background.secondary,
    paddingVertical: 15,
    borderRadius: 10,
    width: '48%',
    borderWidth: 1,
    borderColor: Colors.border.medium,
  },
  fixedDangerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.background.primary,
    paddingVertical: 15,
    borderRadius: 10,
    width: '48%',
    borderWidth: 1,
    borderColor: Colors.status.error,
  },
  // --- Button Styles --- //
  primaryButton: {
    backgroundColor: Colors.button.primary.background,
    paddingVertical: 15,
    borderRadius: 8,
    marginBottom: 10, // Space between buttons if stacked
  },
  primaryButtonText: {
    color: Colors.button.primary.text,
    fontSize: 17,
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: Colors.background.secondary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border.medium,
    flex: 1, // Make buttons share space
    marginHorizontal: 5, // Add gap between buttons
  },
  secondaryButtonText: {
    color: Colors.text.primary,
    fontSize: 16,
    fontWeight: '500',
  },
  dangerButton: {
    backgroundColor: Colors.background.primary, // Match background, red border/text
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.status.error,
    flex: 1,
    marginHorizontal: 5,
  },
  dangerButtonText: {
    color: Colors.status.error,
    fontSize: 16,
    fontWeight: '500',
  },
   primaryButtonSmall: { // For error screen
    backgroundColor: Colors.button.primary.background,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 15,
  },
  primaryButtonTextSmall: {
    color: Colors.button.primary.text,
    fontSize: 15,
    fontWeight: 'bold',
  },
  imageViewerFooter: { // Style for the image counter in the viewer
    textAlign: 'center',
    color: 'white',
    paddingBottom: 20,
    fontSize: 14,
  },
});

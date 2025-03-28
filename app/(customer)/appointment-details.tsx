import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';

import { FAVORITE_TECHS, Service } from '@/data/mockData';

// This would come from your actual data source based on appointmentId
const APPOINTMENT_DATA = {
  tech: FAVORITE_TECHS[0], // Sarah Johnson from mock data
  date: 'Thursday, March 15, 2025',
  time: '2:30 PM - 4:00 PM',
  services: [
    { id: '1', name: 'Gel Manicure', duration: 90, price: 45 },
    { id: '2', name: 'Nail Art', duration: 30, price: 25 },
  ],
  totalPrice: 70,
  notes: 'French tips with floral design on ring fingers. Client prefers soft gel.',
  status: 'confirmed', // could be: confirmed, pending, cancelled
};

export default function AppointmentDetailsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  
  // In a real app, you would fetch the appointment details using the appointmentId
  // const appointmentId = params.id;
  
  // For this example, we'll just use the mock data
  const appointment = APPOINTMENT_DATA;
  
  const formatDuration = (minutes: number): string => {
    return minutes >= 60 
      ? `${Math.floor(minutes / 60)} hr ${minutes % 60 > 0 ? `${minutes % 60} min` : ''}` 
      : `${minutes} min`;
  };
  
  const formatPrice = (price: number): string => {
    return `$${price}`;
  };

  const isCustomerView = true; // This would be determined by your app's auth or route

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#222" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Appointment Details</Text>
        <TouchableOpacity style={styles.moreButton}>
          <Ionicons name="ellipsis-vertical" size={24} color="#222" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {/* Tech Info */}
        <View style={styles.techSection}>
          <View style={styles.avatar}>
            {appointment.tech.profileImage ? (
              <Image source={appointment.tech.profileImage} style={styles.avatarImage} />
            ) : (
              <Ionicons name="person-outline" size={40} color="#666" />
            )}
          </View>
          <View style={styles.techInfo}>
            <Text style={styles.techName}>{appointment.tech.name}</Text>
            <Text style={styles.techSpecialty}>{appointment.tech.specialty}</Text>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={16} color="#FFD700" />
              <Text style={styles.ratingText}>{appointment.tech.rating} ({appointment.tech.reviews} reviews)</Text>
            </View>
          </View>
        </View>

        {/* Date & Time */}
        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Ionicons name="calendar-outline" size={24} color="#444" style={styles.infoIcon} />
            <Text style={styles.infoText}>{appointment.date}</Text>
          </View>
        </View>
        
        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Ionicons name="time-outline" size={24} color="#444" style={styles.infoIcon} />
            <Text style={styles.infoText}>{appointment.time}</Text>
          </View>
        </View>

        {/* Services */}
        <View style={[styles.sectionContainer, styles.servicesContainer]}>
          <Text style={styles.sectionTitle}>SERVICES</Text>
          
          {appointment.services.map((service, index) => (
            <View key={index} style={styles.serviceItem}>
              <View style={styles.serviceInfo}>
                <Text style={styles.serviceName}>{service.name}</Text>
                <Text style={styles.serviceDuration}>{formatDuration(service.duration)}</Text>
              </View>
              <Text style={styles.servicePrice}>{formatPrice(service.price)}</Text>
            </View>
          ))}
        </View>

        {/* Notes */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>NOTES</Text>
          <Text style={styles.notesText}>{appointment.notes}</Text>
        </View>

        {/* Status */}
        <View style={styles.statusContainer}>
          <View style={[styles.statusIndicator, { backgroundColor: '#4CAF50' }]} />
          <Text style={[styles.statusText, { color: '#4CAF50' }]}>Confirmed</Text>
        </View>
      </ScrollView>
      
      {/* Bottom Buttons */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.rescheduleButton}>
          <Text style={styles.rescheduleButtonText}>Reschedule</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cancelButton}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222',
  },
  moreButton: {
    padding: 8,
  },
  content: {
    flex: 1,
  },
  techSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  techInfo: {
    flex: 1,
  },
  techName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222',
    marginBottom: 4,
  },
  techSpecialty: {
    fontSize: 15,
    color: '#666',
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
  infoCard: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoIcon: {
    marginRight: 12,
  },
  infoText: {
    fontSize: 16,
    color: '#222',
  },
  sectionContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  servicesContainer: {
    paddingBottom: 8,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
    marginBottom: 12,
  },
  serviceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  serviceInfo: {
    flex: 1,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#222',
    marginBottom: 4,
  },
  serviceDuration: {
    fontSize: 14,
    color: '#666',
  },
  servicePrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
  },
  notesText: {
    fontSize: 16,
    color: '#222',
    lineHeight: 22,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4CAF50', // Green for confirmed status
    marginRight: 8,
  },
  statusText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#4CAF50', // Green for confirmed status
  },
  buttonsContainer: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  rescheduleButton: {
    flex: 1,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginRight: 8,
  },
  rescheduleButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#222',
  },
  cancelButton: {
    flex: 1,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#222',
    borderRadius: 8,
    marginLeft: 8,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
  },
});

import { StyleSheet, View, Text, FlatList, TouchableOpacity, Image, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { BOOKINGS, BookingItem } from '@/data/mockData';
import { Colors } from '@/constants/Colors';
import { useRouter } from 'expo-router';

export default function BookingsScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  
  // Filter bookings based on active tab
  const filteredBookings = BOOKINGS.filter(booking => 
    activeTab === 'upcoming' ? 
      (booking.status === 'confirmed' || booking.status === 'pending') : 
      booking.status === 'completed'
  );

  const renderBookingItem = ({ item }: { item: BookingItem }) => (
    <TouchableOpacity 
      style={styles.bookingCard}
      onPress={() => router.push({
        pathname: '/(customer)/appointment-details',
        params: { id: item.id }
      })}
    >
      {/* Tech Info */}
      <View style={styles.techInfoContainer}>
        <Image source={item.profileImage} style={styles.techImage} />
        <View style={styles.techDetails}>
          <Text style={styles.techName}>{item.techName}</Text>
          <Text style={styles.serviceText}>{item.service}</Text>
        </View>
        <View style={styles.statusContainer}>
          <Text style={[
            styles.statusText, 
            item.status === 'confirmed' ? styles.confirmedText : 
            item.status === 'pending' ? styles.pendingText : 
            styles.completedText
          ]}>
            {item.status === 'confirmed' ? 'Confirmed' : 
             item.status === 'pending' ? 'Pending' : 'Completed'}
          </Text>
        </View>
      </View>
      
      {/* Date & Time */}
      <View style={styles.infoRow}>
        <Ionicons name="calendar-outline" size={20} color={Colors.icon.secondary} />
        <Text style={styles.infoText}>{item.date} · {item.time}</Text>
      </View>
      
      {/* Location */}
      <View style={styles.infoRow}>
        <Ionicons name="location-outline" size={20} color={Colors.icon.secondary} />
        <Text style={styles.infoText}>{item.location}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Bookings</Text>
        <TouchableOpacity>
          <Ionicons name="ellipsis-vertical" size={24} color={Colors.icon.primary} />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'upcoming' && styles.activeTab]}
          onPress={() => setActiveTab('upcoming')}
        >
          <Text style={[styles.tabText, activeTab === 'upcoming' && styles.activeTabText]}>
            Upcoming
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'past' && styles.activeTab]}
          onPress={() => setActiveTab('past')}
        >
          <Text style={[styles.tabText, activeTab === 'past' && styles.activeTabText]}>
            Past
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredBookings}
        renderItem={renderBookingItem}
        keyExtractor={(item: BookingItem) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
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
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.text.primary,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.background.primary,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.light,
  },
  tab: {
    paddingVertical: 16,
    marginRight: 24,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.tab.active,
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.text.tertiary,
  },
  activeTabText: {
    color: Colors.text.primary,
  },
  listContainer: {
    padding: 16,
  },
  bookingCard: {
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
    marginBottom: 16,
  },
  techImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  techDetails: {
    flex: 1,
  },
  techName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text.primary,
    marginBottom: 2,
  },
  serviceText: {
    fontSize: 14,
    color: Colors.text.secondary,
  },
  statusContainer: {
    alignItems: 'flex-end',
  },
  statusText: {
    fontSize: 14,
    fontWeight: '500',
  },
  confirmedText: {
    color: Colors.status.confirmed,
  },
  pendingText: {
    color: Colors.status.pending,
  },
  completedText: {
    color: Colors.status.completed,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  infoText: {
    fontSize: 14,
    color: Colors.text.secondary,
    marginLeft: 8,
  },
});

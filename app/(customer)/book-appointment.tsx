import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Pressable,
} from 'react-native';

import { Colors } from '@/constants/Colors';
import { FAVORITE_TECHS } from '@/data/mockData';

type Service = {
  id: string;
  name: string;
  duration: number;
  price: number;
  selected: boolean;
};

type DateOption = {
  day: string;
  date: number;
  month: number;
  year: number;
  selected: boolean;
};

type TimeSlot = {
  time: string;
  selected: boolean;
};

export default function BookAppointmentScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ techId: string }>();
  const { techId } = params;
  
  // Find the tech with the matching id
  const tech = FAVORITE_TECHS.find((tech) => tech.id === techId) || FAVORITE_TECHS[0];

  // Services state
  const [services, setServices] = useState<Service[]>([
    { id: '1', name: 'Classic Manicure', duration: 45, price: 35, selected: false },
    { id: '2', name: 'Gel Manicure', duration: 60, price: 45, selected: false },
    { id: '3', name: 'Nail Art', duration: 30, price: 25, selected: false },
  ]);

  // Generate date options starting from today
  const generateDateOptions = (days: number) => {
    const options: DateOption[] = [];
    const today = new Date();
    
    for (let i = 0; i < days; i++) {
      const date = new Date();
      date.setDate(today.getDate() + i);
      
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      options.push({
        day: days[date.getDay()],
        date: date.getDate(),
        month: date.getMonth(),
        year: date.getFullYear(),
        selected: i === 1, // Select tomorrow by default
      });
    }
    
    return options;
  };
  
  // Date options - start with 5 days
  const [dateOptions, setDateOptions] = useState<DateOption[]>(generateDateOptions(5));
  const [visibleDays, setVisibleDays] = useState<number>(5);
  
  // Function to load more days
  const loadMoreDays = () => {
    const newVisibleDays = visibleDays + 5;
    setVisibleDays(newVisibleDays);
    setDateOptions(generateDateOptions(newVisibleDays));
  };

  // Time slots
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([
    { time: '10:00 AM', selected: false },
    { time: '11:00 AM', selected: true },
    { time: '2:00 PM', selected: false },
    { time: '3:00 PM', selected: false },
    { time: '4:00 PM', selected: false },
    { time: '5:00 PM', selected: false },
  ]);

  const toggleServiceSelection = (id: string) => {
    setServices(services.map(service => 
      service.id === id ? { ...service, selected: !service.selected } : service
    ));
  };

  const selectDate = (date: number, month: number, year: number) => {
    setDateOptions(dateOptions.map(option => 
      ({ ...option, selected: option.date === date && option.month === month && option.year === year })
    ));
  };

  const selectTimeSlot = (time: string) => {
    setTimeSlots(timeSlots.map(slot => 
      ({ ...slot, selected: slot.time === time })
    ));
  };

  const handleConfirmBooking = () => {
    // In a real app, this would validate the booking details before proceeding to payment
    // For now, just navigate to the payment screen
    router.replace(`/payment?techId=${techId}`);
    // Note: We'll need to use router.push here because this is STARTING a workflow (for now, in development it stays with .replace)
    // At the end of the payment workflow, we'll use router.replace to clear the stack
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={Colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Book Appointment</Text>
        <TouchableOpacity style={styles.notificationButton}>
          <Ionicons name="notifications-outline" size={24} color={Colors.text.primary} />
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.scrollContent}>
        {/* Services Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Services</Text>
          
          {services.map((service) => (
            <TouchableOpacity 
              key={service.id} 
              style={styles.serviceItem}
              onPress={() => toggleServiceSelection(service.id)}
            >
              <View>
                <Text style={styles.serviceName}>{service.name}</Text>
                <Text style={styles.serviceDetails}>
                  {service.duration} mins · ${service.price}
                </Text>
              </View>
              <View style={[styles.checkbox, service.selected && styles.checkboxSelected]}>
                {service.selected && (
                  <Ionicons name="checkmark" size={20} color="#fff" />
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Date Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Date</Text>
          <View style={styles.datePickerContainer}>
            <ScrollView 
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.dateScrollContainer}
            >
              {dateOptions.map((option) => (
                <TouchableOpacity 
                  key={`${option.day}-${option.date}-${option.month}-${option.year}`} 
                  style={[styles.dateOption, option.selected && styles.selectedDateOption]}
                  onPress={() => selectDate(option.date, option.month, option.year)}
                >
                  <Text style={[styles.dayText, option.selected && styles.selectedDateText]}>
                    {option.day}
                  </Text>
                  <Text style={[styles.dateText, option.selected && styles.selectedDateText]}>
                    {option.date}
                  </Text>
                </TouchableOpacity>
              ))}
              
              {visibleDays < 30 && (
                <TouchableOpacity 
                  style={styles.seeMoreButton}
                  onPress={loadMoreDays}
                >
                  <Ionicons name="chevron-forward" size={16} color="#222" />
                  <Text style={styles.seeMoreButtonText}>More</Text>
                </TouchableOpacity>
              )}
            </ScrollView>
          </View>
        </View>

        {/* Time Slots */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Available Time Slots</Text>
          <View style={styles.timeSlotGrid}>
            {timeSlots.map((slot, index) => (
              <TouchableOpacity 
                key={slot.time} 
                style={[styles.timeSlot, slot.selected && styles.selectedTimeSlot]}
                onPress={() => selectTimeSlot(slot.time)}
              >
                <Text style={[styles.timeSlotText, slot.selected && styles.selectedTimeSlotText]}>
                  {slot.time}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Confirm Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.confirmButton}
          onPress={handleConfirmBooking}
        >
          <Text style={styles.confirmButtonText}>Confirm Booking</Text>
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
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: Colors.background.primary,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text.primary,
  },
  notificationButton: {
    padding: 8,
  },
  scrollContent: {
    flex: 1,
  },
  section: {
    marginVertical: 16,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text.primary,
    marginBottom: 16,
  },
  serviceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.text.primary,
    marginBottom: 4,
  },
  serviceDetails: {
    fontSize: 14,
    color: Colors.text.tertiary,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxSelected: {
    backgroundColor: '#222',
    borderColor: '#222',
  },
  datePickerContainer: {
    marginBottom: 8,
  },
  dateScrollContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  seeMoreButton: {
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    marginRight: 10,
  },
  seeMoreButtonText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#222',
    marginTop: 4,
  },
  dateOption: {
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
    marginRight: 10,
  },
  selectedDateOption: {
    backgroundColor: '#222',
  },
  dayText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.text.primary,
    marginBottom: 4,
  },
  dateText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text.primary,
  },
  selectedDateText: {
    color: '#fff',
  },
  timeSlotGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: 16,
  },
  timeSlot: {
    width: '48%',
    paddingVertical: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    alignItems: 'center',
  },
  selectedTimeSlot: {
    backgroundColor: '#222',
    borderColor: '#222',
  },
  timeSlotText: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.text.primary,
  },
  selectedTimeSlotText: {
    color: '#fff',
  },
  buttonContainer: {
    backgroundColor: Colors.background.primary,
    padding: 16,
  },
  confirmButton: {
    backgroundColor: '#222',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

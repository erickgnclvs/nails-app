import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { APPOINTMENTS, Appointment } from '../../data/mockData';

export default function TechDashboard() {
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.businessInfo}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={24} color="#fff" />
          </View>
          <Text style={styles.businessName}>Sarah's Nails</Text>
        </View>
        <TouchableOpacity style={styles.notificationButton}>
          <Ionicons name="notifications-outline" size={24} color="#222" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Today's Summary */}
        <Text style={styles.sectionTitle}>Today's Summary</Text>
        <View style={styles.summaryContainer}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Today's Earnings</Text>
            <Text style={styles.earningsValue}>$245.00</Text>
          </View>
          
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Appointments</Text>
            <View style={styles.appointmentCountContainer}>
              <Text style={styles.appointmentCount}>8</Text>
            </View>
          </View>
        </View>

        {/* Today's Appointments */}
        <Text style={styles.sectionTitle}>Today's Appointments</Text>
        <View style={styles.appointmentsContainer}>
          {APPOINTMENTS.map((appointment) => (
            <View key={appointment.id} style={styles.appointmentCard}>
              <Text style={styles.appointmentTime}>{appointment.time}</Text>
              
              <View style={styles.appointmentDetails}>
                <View style={styles.clientAvatar}>
                  <Ionicons name="person" size={24} color="#fff" />
                </View>
                <View style={styles.appointmentInfo}>
                  <Text style={styles.clientName}>{appointment.client}</Text>
                  <Text style={styles.serviceType}>{appointment.service}</Text>
                </View>
                
                <View style={[
                  styles.statusBadge,
                  appointment.status === 'in-progress' ? styles.inProgressBadge : styles.upcomingBadge
                ]}>
                  <Text style={[
                    styles.statusText,
                    appointment.status === 'in-progress' ? styles.inProgressText : styles.upcomingText
                  ]}>
                    {appointment.status === 'in-progress' ? 'In Progress' : 'Upcoming'}
                  </Text>
                </View>
              </View>
            </View>
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
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  businessInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 12,
    backgroundColor: '#8a8d93',
    justifyContent: 'center',
    alignItems: 'center',
  },
  businessName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222',
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222',
    marginTop: 24,
    marginBottom: 16,
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 4,
  },
  summaryLabel: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  earningsValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#222',
  },
  appointmentCountContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  appointmentCount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
  },
  appointmentsContainer: {
    marginBottom: 24,
  },
  appointmentCard: {
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
  },
  appointmentTime: {
    fontSize: 16,
    fontWeight: '500',
    color: '#222',
    padding: 16,
    paddingBottom: 0,
  },
  appointmentDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  clientAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
    backgroundColor: '#8a8d93',
    justifyContent: 'center',
    alignItems: 'center',
  },
  appointmentInfo: {
    flex: 1,
  },
  clientName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#222',
    marginBottom: 4,
  },
  serviceType: {
    fontSize: 14,
    color: '#666',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  inProgressBadge: {
    backgroundColor: '#8a8d9380',
  },
  upcomingBadge: {
    backgroundColor: '#8a8d9380',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  inProgressText: {
    color: '#fff',
  },
  upcomingText: {
    color: '#fff',
  },
});

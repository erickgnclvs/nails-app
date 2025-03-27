import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Switch } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';

export default function NotificationsScreen() {
  const router = useRouter();
  const [pushNotifications, setPushNotifications] = useState(true);
  const [appointmentReminders, setAppointmentReminders] = useState(true);
  const [newTechsNotifications, setNewTechsNotifications] = useState(false);
  const [specialOffersNotifications, setSpecialOffersNotifications] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#222" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <View style={{ width: 40 }} />  {/* Empty view for alignment */}
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.settingItem}>
          <View style={styles.settingTextContainer}>
            <Text style={styles.settingTitle}>Push Notifications</Text>
            <Text style={styles.settingDescription}>Receive push notifications on your device</Text>
          </View>
          <Switch
            trackColor={{ false: '#d4d4d4', true: '#d4d4d4' }}
            thumbColor={pushNotifications ? '#222' : '#f4f3f4'}
            ios_backgroundColor="#d4d4d4"
            onValueChange={() => setPushNotifications(prev => !prev)}
            value={pushNotifications}
          />
        </View>

        <View style={styles.settingItem}>
          <View style={styles.settingTextContainer}>
            <Text style={styles.settingTitle}>Appointment Reminders</Text>
            <Text style={styles.settingDescription}>Receive reminders about upcoming appointments</Text>
          </View>
          <Switch
            trackColor={{ false: '#d4d4d4', true: '#d4d4d4' }}
            thumbColor={appointmentReminders ? '#222' : '#f4f3f4'}
            ios_backgroundColor="#d4d4d4"
            onValueChange={() => setAppointmentReminders(prev => !prev)}
            value={appointmentReminders}
          />
        </View>

        <View style={styles.settingItem}>
          <View style={styles.settingTextContainer}>
            <Text style={styles.settingTitle}>New Nail Techs</Text>
            <Text style={styles.settingDescription}>Be notified when new nail techs join</Text>
          </View>
          <Switch
            trackColor={{ false: '#d4d4d4', true: '#d4d4d4' }}
            thumbColor={newTechsNotifications ? '#222' : '#f4f3f4'}
            ios_backgroundColor="#d4d4d4"
            onValueChange={() => setNewTechsNotifications(prev => !prev)}
            value={newTechsNotifications}
          />
        </View>

        <View style={styles.settingItem}>
          <View style={styles.settingTextContainer}>
            <Text style={styles.settingTitle}>Special Offers</Text>
            <Text style={styles.settingDescription}>Receive notifications about deals and promotions</Text>
          </View>
          <Switch
            trackColor={{ false: '#d4d4d4', true: '#d4d4d4' }}
            thumbColor={specialOffersNotifications ? '#222' : '#f4f3f4'}
            ios_backgroundColor="#d4d4d4"
            onValueChange={() => setSpecialOffersNotifications(prev => !prev)}
            value={specialOffersNotifications}
          />
        </View>
      </ScrollView>
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
    paddingTop: 10,
    paddingBottom: 10,
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
  content: {
    flex: 1,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingTextContainer: {
    flex: 1,
    paddingRight: 16,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#222',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
    color: '#666',
  },
});

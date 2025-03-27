import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function TermsPrivacyScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#222" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Terms & Privacy</Text>
        <View style={{ width: 40 }} />  {/* Empty view for alignment */}
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Terms of Service</Text>
          <Text style={styles.paragraph}>
            Welcome to Nails App! These Terms of Service govern your use of our app and services.
          </Text>
          <Text style={styles.paragraph}>
            By using Nails App, you agree to these terms. Please read them carefully. The service is provided "as is" and we make no guarantees about its availability or functionality.
          </Text>
          <Text style={styles.paragraph}>
            Nail technicians listed on our platform are independent contractors and not employees of Nails App. We are not responsible for the quality of services provided by technicians.
          </Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Privacy Policy</Text>
          <Text style={styles.paragraph}>
            At Nails App, we take your privacy seriously. This policy describes how we collect, use, and share your personal information.
          </Text>
          <Text style={styles.paragraph}>
            We collect information you provide when creating an account, including your name, email address, phone number, and payment information. We also collect information about your bookings and interactions with nail technicians.
          </Text>
          <Text style={styles.paragraph}>
            We use your information to provide our services, process payments, communicate with you about appointments, and improve our app. We may share your information with nail technicians to facilitate appointments.
          </Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cookie Policy</Text>
          <Text style={styles.paragraph}>
            Our app uses cookies and similar technologies to enhance your experience and collect information about how you use our app.
          </Text>
        </View>
        
        <TouchableOpacity style={styles.fullButton}>
          <Text style={styles.fullButtonText}>Download Full Terms of Service</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.fullButton}>
          <Text style={styles.fullButtonText}>Download Full Privacy Policy</Text>
        </TouchableOpacity>
        
        <View style={styles.lastUpdated}>
          <Text style={styles.lastUpdatedText}>Last updated: March 27, 2025</Text>
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
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222',
    marginBottom: 12,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    color: '#444',
    marginBottom: 12,
  },
  fullButton: {
    backgroundColor: '#f8f8f8',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  fullButtonText: {
    fontSize: 16,
    color: '#222',
    textAlign: 'center',
  },
  lastUpdated: {
    marginVertical: 24,
  },
  lastUpdatedText: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
  },
});

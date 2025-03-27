import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function HelpSupportScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#222" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Help & Support</Text>
        <View style={{ width: 40 }} />  {/* Empty view for alignment */}
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>FAQs</Text>
          
          <TouchableOpacity style={styles.questionItem}>
            <Text style={styles.question}>How do I book an appointment?</Text>
            <Ionicons name="chevron-forward" size={20} color="#aaa" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.questionItem}>
            <Text style={styles.question}>How can I reschedule my appointment?</Text>
            <Ionicons name="chevron-forward" size={20} color="#aaa" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.questionItem}>
            <Text style={styles.question}>What is the cancellation policy?</Text>
            <Ionicons name="chevron-forward" size={20} color="#aaa" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.questionItem}>
            <Text style={styles.question}>How do I contact my nail technician?</Text>
            <Ionicons name="chevron-forward" size={20} color="#aaa" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Us</Text>
          
          <TouchableOpacity style={styles.contactItem}>
            <View style={styles.contactIconContainer}>
              <Ionicons name="mail-outline" size={22} color="#222" />
            </View>
            <View style={styles.contactInfo}>
              <Text style={styles.contactLabel}>Email</Text>
              <Text style={styles.contactValue}>support@nailsapp.com</Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.contactItem}>
            <View style={styles.contactIconContainer}>
              <Ionicons name="call-outline" size={22} color="#222" />
            </View>
            <View style={styles.contactInfo}>
              <Text style={styles.contactLabel}>Phone</Text>
              <Text style={styles.contactValue}>(555) 123-4567</Text>
            </View>
          </TouchableOpacity>
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
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222',
    marginHorizontal: 16,
    marginTop: 20,
    marginBottom: 16,
  },
  questionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  question: {
    fontSize: 16,
    color: '#222',
    flex: 1,
    paddingRight: 8,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  contactIconContainer: {
    width: 40,
    alignItems: 'center',
  },
  contactInfo: {
    flex: 1,
  },
  contactLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  contactValue: {
    fontSize: 16,
    color: '#222',
  },
});

import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

export default function WelcomeScreen() {
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Skip button */}
      <View style={styles.skipContainer}>
        <Link href="/auth/login" asChild>
          <TouchableOpacity style={styles.skipButton}>
            <Text style={styles.skipText}>Skip</Text>
            <Ionicons name="arrow-forward" size={16} color="#666" />
          </TouchableOpacity>
        </Link>
      </View>

      {/* Logo and app name */}
      <View style={styles.logoContainer}>
        <View style={styles.logoCircle}>
          <Text style={styles.logoPlaceholder}>?</Text>
        </View>
        <Text style={styles.appName}>NailsPro</Text>
      </View>

      {/* Tagline and description */}
      <View style={styles.textContainer}>
        <Text style={styles.tagline}>Beauty at Your Fingertips</Text>
        <Text style={styles.description}>
          Connect with professional nail technicians or grow your nail business. Book appointments, showcase your work, all in one place.
        </Text>
      </View>

      {/* User type selection */}
      <View style={styles.selectionContainer}>
        <Text style={styles.continueText}>Continue as</Text>
        
        <Link href="/auth/login?userType=customer" asChild>
          <TouchableOpacity style={styles.customerButton}>
            <Ionicons name="person" size={20} color="#fff" style={styles.buttonIcon} />
            <Text style={styles.customerButtonText}>Customer</Text>
            <Ionicons name="chevron-forward" size={20} color="#fff" style={styles.chevron} />
          </TouchableOpacity>
        </Link>

        <Link href="/auth/login?userType=technician" asChild>
          <TouchableOpacity style={styles.technicianButton}>
            <Ionicons name="color-palette" size={20} color="#222" style={styles.buttonIcon} />
            <Text style={styles.technicianButtonText}>Nail Technician</Text>
            <Ionicons name="chevron-forward" size={20} color="#222" style={styles.chevron} />
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 24,
  },
  skipContainer: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 10,
  },
  skipButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  skipText: {
    fontSize: 16,
    color: '#666',
    marginRight: 4,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 120,
  },
  logoCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#9DA3B4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoPlaceholder: {
    fontSize: 40,
    color: '#fff',
  },
  appName: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 16,
    color: '#222',
  },
  textContainer: {
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 40,
  },
  tagline: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
  selectionContainer: {
    marginTop: 'auto',
    marginBottom: 40,
  },
  continueText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
    textAlign: 'center',
  },
  customerButton: {
    backgroundColor: '#222',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  customerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    flex: 1,
  },
  technicianButton: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  technicianButtonText: {
    color: '#222',
    fontSize: 16,
    fontWeight: '500',
    flex: 1,
  },
  buttonIcon: {
    marginRight: 12,
  },
  chevron: {
    marginLeft: 'auto',
  },
});

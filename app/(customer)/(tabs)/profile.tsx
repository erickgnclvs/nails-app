import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

// Sample user data
const USER = {
  name: 'Jessica Smith',
  email: 'jessica.smith@example.com',
  phone: '(555) 123-4567',
  appointments: 8,
  favorites: 5,
};

export default function ProfileScreen() {
  const handleLogout = () => {
    // In a real app, you would implement logout functionality
    router.replace('/welcome');
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity style={styles.settingsButton}>
          <Ionicons name="settings-outline" size={24} color="#222" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.profileSection}>
          <View style={styles.profileAvatar}>
            <Ionicons name="person" size={50} color="#fff" />
          </View>
          <Text style={styles.profileName}>{USER.name}</Text>
          <TouchableOpacity style={styles.editProfileButton}>
            <Text style={styles.editProfileText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoSection}>
          <View style={styles.infoItem}>
            <Ionicons name="mail-outline" size={20} color="#555" style={styles.infoIcon} />
            <Text style={styles.infoText}>{USER.email}</Text>
          </View>
          <View style={styles.infoItem}>
            <Ionicons name="call-outline" size={20} color="#555" style={styles.infoIcon} />
            <Text style={styles.infoText}>{USER.phone}</Text>
          </View>
        </View>

        <View style={styles.statsSection}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{USER.appointments}</Text>
            <Text style={styles.statLabel}>Appointments</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{USER.favorites}</Text>
            <Text style={styles.statLabel}>Favorites</Text>
          </View>
        </View>

        <View style={styles.menuSection}>
          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="card-outline" size={22} color="#222" style={styles.menuIcon} />
            <Text style={styles.menuText}>Payment Methods</Text>
            <Ionicons name="chevron-forward" size={20} color="#aaa" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="notifications-outline" size={22} color="#222" style={styles.menuIcon} />
            <Text style={styles.menuText}>Notifications</Text>
            <Ionicons name="chevron-forward" size={20} color="#aaa" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="help-circle-outline" size={22} color="#222" style={styles.menuIcon} />
            <Text style={styles.menuText}>Help & Support</Text>
            <Ionicons name="chevron-forward" size={20} color="#aaa" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="document-text-outline" size={22} color="#222" style={styles.menuIcon} />
            <Text style={styles.menuText}>Terms & Privacy</Text>
            <Ionicons name="chevron-forward" size={20} color="#aaa" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={20} color="#ff4d4d" style={styles.logoutIcon} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
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
    paddingTop: 60,
    paddingBottom: 16,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#222',
  },
  settingsButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  profileAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
    backgroundColor: '#8a8d93',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileName: {
    fontSize: 22,
    fontWeight: '600',
    color: '#222',
    marginBottom: 12,
  },
  editProfileButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#222',
  },
  editProfileText: {
    fontSize: 14,
    color: '#222',
  },
  infoSection: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoIcon: {
    marginRight: 12,
  },
  infoText: {
    fontSize: 16,
    color: '#555',
  },
  statsSection: {
    flexDirection: 'row',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#f0f0f0',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '600',
    color: '#222',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#777',
  },
  menuSection: {
    paddingVertical: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuIcon: {
    marginRight: 16,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: '#222',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 24,
    marginHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ff4d4d',
  },
  logoutIcon: {
    marginRight: 8,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ff4d4d',
  },
});

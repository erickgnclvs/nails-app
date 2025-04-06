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
  Image,
  Alert,
} from 'react-native';

import { Colors } from '@/constants/Colors';

type PaymentMethod = {
  id: string;
  type: 'card' | 'pix';
  name: string;
  details: string;
  icon?: any;
  selected: boolean;
};

export default function PaymentScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ techId: string, services: string }>();
  
  // Mock total calculation - in a real app, this would come from the previous screen
  const [serviceSummary, setServiceSummary] = useState([
    { name: 'Gel Manicure', price: 45.00 },
    { name: 'Nail Art (3D)', price: 15.00 },
  ]);
  
  const total = serviceSummary.reduce((sum, item) => sum + item.price, 0);

  // Payment methods state
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    { 
      id: '1', 
      type: 'card', 
      name: 'Visa ending in 4242', 
      details: 'Expires 08/2025', 
      selected: true 
    },
    { 
      id: '2', 
      type: 'card', 
      name: 'Mastercard ending in 8353', 
      details: 'Expires 11/2025', 
      selected: false 
    },
    { 
      id: '3', 
      type: 'pix', 
      name: 'PIX', 
      details: 'Instant payment', 
      selected: false 
    },
  ]);

  const handlePaymentMethodSelect = (id: string) => {
    setPaymentMethods(paymentMethods.map(method => ({
      ...method,
      selected: method.id === id
    })));
  };

  const handleAddNewCard = () => {
    // This would open a screen to add a new card
    Alert.alert('Coming soon', 'Adding new cards will be available in the next update.');
  };

  const handlePayment = () => {
    // In a real app, this would process the payment
    // For now, just show a success message and navigate to bookings
    Alert.alert(
      'Payment Successful', 
      'Your booking has been confirmed!',
      [
        { 
          text: 'OK', 
          onPress: () => router.replace('/(customer)/(tabs)/bookings')
        }
      ]
    );
  };

  const handleBack = () => {
    router.back();
  };

  const getPaymentMethodIcon = (type: string) => {
    if (type === 'pix') {
      return (
        <View style={styles.pixIcon}>
          <Text style={styles.pixIconText}>PIX</Text>
        </View>
      );
    }
    if (type.includes('Visa')) {
      return <Ionicons name="card-outline" size={24} color="#1A1F71" />;
    }
    return <Ionicons name="card-outline" size={24} color="#000" />;
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={Colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payment</Text>
        <View style={styles.placeholderRight} />
      </View>
      
      <ScrollView style={styles.scrollContent}>
        {/* Service Summary */}
        <View style={styles.summaryContainer}>
          <Text style={styles.sectionTitle}>Service Summary</Text>
          
          {serviceSummary.map((service, index) => (
            <View key={index} style={styles.serviceSummaryRow}>
              <Text style={styles.serviceName}>{service.name}</Text>
              <Text style={styles.servicePrice}>${service.price.toFixed(2)}</Text>
            </View>
          ))}
          
          <View style={styles.totalRow}>
            <Text style={styles.totalText}>Total</Text>
            <Text style={styles.totalPrice}>${total.toFixed(2)}</Text>
          </View>
        </View>

        {/* Payment Method Selection */}
        <Text style={styles.paymentMethodTitle}>Payment Method</Text>
        
        {paymentMethods.map((method) => (
          <TouchableOpacity 
            key={method.id} 
            style={styles.paymentMethodCard}
            onPress={() => handlePaymentMethodSelect(method.id)}
          >
            <View style={styles.paymentMethodLeft}>
              <View style={styles.radioButton}>
                {method.selected && <View style={styles.radioButtonInner} />}
              </View>
              <View style={styles.paymentMethodInfo}>
                <View style={styles.paymentMethodRow}>
                  {method.type === 'pix' ? (
                    <View style={styles.pixIcon}>
                      <Text style={styles.pixIconText}>PIX</Text>
                    </View>
                  ) : method.name.includes('Visa') ? (
                    <View style={styles.cardIconContainer}>
                      <Ionicons name="card-outline" size={24} color="#1A1F71" />
                    </View>
                  ) : (
                    <View style={styles.masterCardIcon}>
                      <Text style={styles.mastercardImageText}>MC</Text>
                    </View>
                  )}
                  <Text style={styles.paymentMethodName}>{method.name}</Text>
                </View>
                <Text style={styles.paymentMethodDetails}>{method.details}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
        
        {/* Add New Card Button */}
        <TouchableOpacity 
          style={styles.addCardButton}
          onPress={handleAddNewCard}
        >
          <Ionicons name="add-circle-outline" size={20} color={Colors.text.primary} />
          <Text style={styles.addCardText}>Add New Card</Text>
        </TouchableOpacity>

        {/* Security Message */}
        <View style={styles.securityContainer}>
          <Text style={styles.securityTitle}>Secure Payment</Text>
          <Text style={styles.securityText}>
            Your payment information is encrypted and secure. We do not store your card details.
          </Text>
        </View>
      </ScrollView>

      {/* Pay Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.payButton}
          onPress={handlePayment}
        >
          <Text style={styles.payButtonText}>Pay ${total.toFixed(2)}</Text>
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
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#fff',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text.primary,
  },
  placeholderRight: {
    width: 40,
  },
  scrollContent: {
    flex: 1,
  },
  summaryContainer: {
    margin: 16,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.text.primary,
    marginBottom: 16,
  },
  serviceSummaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  serviceName: {
    fontSize: 14,
    color: Colors.text.primary,
  },
  servicePrice: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.text.primary,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    marginTop: 4,
  },
  totalText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text.primary,
  },
  totalPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text.primary,
  },
  paymentMethodTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.text.primary,
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 16,
  },
  paymentMethodCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 12,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  paymentMethodLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  radioButtonInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#222',
  },
  paymentMethodInfo: {
    flex: 1,
  },
  paymentMethodRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  paymentMethodName: {
    fontSize: 15,
    fontWeight: '500',
    color: Colors.text.primary,
    marginLeft: 8,
  },
  paymentMethodDetails: {
    fontSize: 13,
    color: Colors.text.tertiary,
    marginLeft: 32, // Align with text after icon
  },
  addCardButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 24,
  },
  addCardText: {
    fontSize: 15,
    color: Colors.text.primary,
    marginLeft: 8,
    fontWeight: '500',
  },
  securityContainer: {
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 32,
  },
  securityTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.text.primary,
    marginBottom: 8,
  },
  securityText: {
    fontSize: 13,
    lineHeight: 18,
    color: Colors.text.tertiary,
  },
  buttonContainer: {
    backgroundColor: Colors.background.primary,
    padding: 16,
  },
  payButton: {
    backgroundColor: Colors.button.primary.background,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  payButtonText: {
    color: Colors.button.primary.text,
    fontSize: 16,
    fontWeight: '600',
  },
  pixIcon: {
    width: 24,
    height: 24,
    backgroundColor: '#00B2A9',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#008B84',
  },
  pixIconText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  cardIconContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  masterCardIcon: {
    width: 24,
    height: 24,
    backgroundColor: '#FF5F00',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mastercardImageText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
});

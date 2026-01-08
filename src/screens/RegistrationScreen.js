import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function RegistrationScreen({ route, navigation }) {
  const { mobile } = route.params || {};
  const [formData, setFormData] = useState({
    name: '',
    address1: '',
    address2: '',
    pinCode: '',
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    const registrationData = { ...formData, mobile };
    navigation.navigate('RegistrationStep2', { registrationData });
  };

  const isFormValid = formData.name && formData.address1 && formData.pinCode;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter your details</Text>
      
      <View style={styles.form}>
        <Text style={styles.label}>Name*</Text>
        <TextInput
          style={styles.input}
          placeholder="antoine@soch.at"
          placeholderTextColor="#666"
          value={formData.name}
          onChangeText={(text) => handleInputChange('name', text)}
        />

        <Text style={styles.label}>Address*</Text>
        <TextInput
          style={styles.input}
          placeholder="Address Line 1"
          placeholderTextColor="#666"
          value={formData.address1}
          onChangeText={(text) => handleInputChange('address1', text)}
        />
        <TextInput
          style={[styles.input, styles.inputSpacing]}
          placeholder="Address Line 2 (Optional)"
          placeholderTextColor="#666"
          value={formData.address2}
          onChangeText={(text) => handleInputChange('address2', text)}
        />

        <Text style={styles.label}>Pin Code*</Text>
        <TextInput
          style={styles.input}
          placeholder="110224"
          placeholderTextColor="#666"
          keyboardType="number-pad"
          maxLength={6}
          value={formData.pinCode}
          onChangeText={(text) => handleInputChange('pinCode', text)}
        />
      </View>

      <TouchableOpacity 
        style={[styles.nextButton, isFormValid && styles.nextButtonActive]}
        onPress={handleNext}
        disabled={!isFormValid}
      >
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2A2A2A',
    paddingHorizontal: 24,
    paddingTop: 60,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 40,
  },
  form: {
    flex: 1,
  },
  label: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    marginTop: 20,
  },
  input: {
    backgroundColor: '#3A3A3A',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    color: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#3A3A3A',
  },
  inputSpacing: {
    marginTop: 12,
  },
  nextButton: {
    backgroundColor: '#4A4A4A',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 40,
  },
  nextButtonActive: {
    backgroundColor: '#007AFF',
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
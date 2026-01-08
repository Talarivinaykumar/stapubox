import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';

export default function RegistrationScreen({ route, navigation }) {
  const { mobile } = route.params || {};
  const [formData, setFormData] = useState({
    name: '',
    address1: '',
    address2: '',
    pinCode: '',
  });
  const [errors, setErrors] = useState({});
  const [focusedField, setFocusedField] = useState('');

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    
    if (!formData.address1.trim()) {
      newErrors.address1 = 'Address is required';
    }
    
    if (!formData.pinCode.trim()) {
      newErrors.pinCode = 'Pin code is required';
    } else if (!/^\d{6}$/.test(formData.pinCode)) {
      newErrors.pinCode = 'Pin code must be 6 digits';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      const registrationData = { ...formData, mobile };
      navigation.navigate('RegistrationStep2', { registrationData });
    }
  };

  const isFormValid = formData.name.trim() && formData.address1.trim() && formData.pinCode.trim();

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backButton}>‹</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Enter your details</Text>
          <View style={styles.placeholder} />
        </View>
        
        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Full Name*</Text>
            <TextInput
              style={[
                styles.input,
                focusedField === 'name' && styles.inputFocused,
                errors.name && styles.inputError
              ]}
              placeholder="Enter your full name"
              placeholderTextColor="#666"
              value={formData.name}
              onChangeText={(text) => handleInputChange('name', text)}
              onFocus={() => setFocusedField('name')}
              onBlur={() => setFocusedField('')}
              autoCapitalize="words"
              returnKeyType="next"
            />
            {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Address*</Text>
            <TextInput
              style={[
                styles.input,
                focusedField === 'address1' && styles.inputFocused,
                errors.address1 && styles.inputError
              ]}
              placeholder="House/Flat No, Street Name"
              placeholderTextColor="#666"
              value={formData.address1}
              onChangeText={(text) => handleInputChange('address1', text)}
              onFocus={() => setFocusedField('address1')}
              onBlur={() => setFocusedField('')}
              autoCapitalize="words"
              returnKeyType="next"
            />
            {errors.address1 && <Text style={styles.errorText}>{errors.address1}</Text>}
            
            <TextInput
              style={[
                styles.input,
                styles.inputSpacing,
                focusedField === 'address2' && styles.inputFocused
              ]}
              placeholder="Area, Landmark (Optional)"
              placeholderTextColor="#666"
              value={formData.address2}
              onChangeText={(text) => handleInputChange('address2', text)}
              onFocus={() => setFocusedField('address2')}
              onBlur={() => setFocusedField('')}
              autoCapitalize="words"
              returnKeyType="next"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Pin Code*</Text>
            <TextInput
              style={[
                styles.input,
                focusedField === 'pinCode' && styles.inputFocused,
                errors.pinCode && styles.inputError
              ]}
              placeholder="Enter 6-digit pin code"
              placeholderTextColor="#666"
              keyboardType="number-pad"
              maxLength={6}
              value={formData.pinCode}
              onChangeText={(text) => handleInputChange('pinCode', text.replace(/[^0-9]/g, ''))}
              onFocus={() => setFocusedField('pinCode')}
              onBlur={() => setFocusedField('')}
              returnKeyType="done"
            />
            {errors.pinCode && <Text style={styles.errorText}>{errors.pinCode}</Text>}
          </View>
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[styles.nextButton, isFormValid && styles.nextButtonActive]}
          onPress={handleNext}
          disabled={!isFormValid}
        >
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2A2A2A',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 20,
  },
  backButton: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '600',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  placeholder: {
    width: 24,
  },
  form: {
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#3A3A3A',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    color: '#FFFFFF',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  inputFocused: {
    borderColor: '#007AFF',
    backgroundColor: '#404040',
  },
  inputError: {
    borderColor: '#FF4444',
  },
  inputSpacing: {
    marginTop: 12,
  },
  errorText: {
    color: '#FF4444',
    fontSize: 14,
    marginTop: 4,
  },
  buttonContainer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
    backgroundColor: '#2A2A2A',
  },
  nextButton: {
    backgroundColor: '#4A4A4A',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
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
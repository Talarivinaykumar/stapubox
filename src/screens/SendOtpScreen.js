import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { sendOtp } from '../api/api';

export default function SendOtpScreen({ navigation }) {
  const [mobile, setMobile] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      // Clear success/error states when screen comes into focus
      setSuccess(false);
      setError('');
    }, [])
  );

  const validateMobile = (number) => {
    return /^[6-9]\d{9}$/.test(number);
  };

  const handleSendOtp = async () => {
    if (!validateMobile(mobile)) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }
    
    try {
      setLoading(true);
      setError('');
      await sendOtp(mobile);
      setSuccess(true);
      setTimeout(() => {
        navigation.navigate('VerifyOtp', { mobile });
      }, 1000);
    } catch (err) {
      setError('Failed to send OTP. Please try again.');
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAccount = () => {
    // Dummy UI - no functionality
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login to Your Account</Text>
      
      <View style={styles.inputRow}>
        <View style={styles.countryPicker}>
          <Text style={styles.countryCode}>+91</Text>
          <Text style={styles.dropdown}>▼</Text>
        </View>
        <TextInput
          style={[styles.phoneInput, error && styles.phoneInputError]}
          placeholder="9999999999"
          placeholderTextColor="#666"
          keyboardType="number-pad"
          maxLength={10}
          value={mobile}
          onChangeText={(text) => {
            setMobile(text);
            setError('');
            setSuccess(false);
          }}
        />
      </View>

      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : null}

      {success ? (
        <Text style={styles.successText}>OTP sent successfully!</Text>
      ) : null}

      <TouchableOpacity 
        style={[styles.sendButton, validateMobile(mobile) && styles.sendButtonActive]}
        onPress={handleSendOtp}
        disabled={loading || !validateMobile(mobile)}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.sendButtonText}>Send OTP</Text>
        )}
      </TouchableOpacity>

      <View style={styles.createAccountRow}>
        <Text style={styles.createAccountText}>Don't have account? </Text>
        <TouchableOpacity onPress={handleCreateAccount}>
          <Text style={styles.createAccountLink}>Create Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2A2A2A',
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 40,
  },
  inputRow: {
    flexDirection: 'row',
    marginBottom: 24,
    gap: 12,
  },
  countryPicker: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3A3A3A',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 8,
    minWidth: 80,
  },
  countryCode: {
    color: '#FFFFFF',
    fontSize: 16,
    marginRight: 8,
  },
  dropdown: {
    color: '#FFFFFF',
    fontSize: 12,
  },
  phoneInput: {
    flex: 1,
    backgroundColor: '#3A3A3A',
    color: '#FFFFFF',
    fontSize: 16,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  phoneInputError: {
    borderColor: '#FF4444',
  },
  errorText: {
    color: '#FF4444',
    fontSize: 14,
    marginBottom: 16,
    textAlign: 'center',
  },
  successText: {
    color: '#4CAF50',
    fontSize: 14,
    marginBottom: 16,
    textAlign: 'center',
  },
  sendButton: {
    backgroundColor: '#4A4A4A',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 24,
  },
  sendButtonActive: {
    backgroundColor: '#007AFF',
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  createAccountRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  createAccountText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  createAccountLink: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '600',
  },
  bottomIndicator: {
    position: 'absolute',
    bottom: 8,
    left: '50%',
    marginLeft: -67,
    width: 134,
    height: 5,
    backgroundColor: '#FFFFFF',
    borderRadius: 3,
  },
});
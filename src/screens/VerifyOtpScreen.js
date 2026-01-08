import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import OtpInput from '../components/OtpInput';
import { verifyOtp, resendOtp } from '../api/api';
import SmsRetriever from 'react-native-sms-retriever';

export default function VerifyOtpScreen({ route, navigation }) {
  const { mobile } = route.params || {};
  const [otp, setOtp] = useState(['','','','']);
  const [timer, setTimer] = useState(60);

  useEffect(() => {
    startSmsRetriever();
    return () => {
      try {
        SmsRetriever.removeSmsListener();
      } catch (e) {}
    };
  }, []);

  const startSmsRetriever = async () => {
    try {
      const registered = await SmsRetriever.startSmsRetriever();
      if (registered) {
        SmsRetriever.addSmsListener(event => {
          const otpMatch = event.message.match(/\b\d{4}\b/);
          if (otpMatch) {
            setOtp(otpMatch[0].split(''));
          }
        });
      }
    } catch (error) {
      console.log('SMS Retriever failed');
    }
  };

  useEffect(() => {
    if (timer > 0) {
      const t = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(t);
    }
  }, [timer]);

  useEffect(() => {
    if (otp.every(digit => digit !== '')) {
      handleVerify();
    }
  }, [otp]);

  const handleVerify = async () => {
    try {
      await verifyOtp(mobile, otp.join(''));
      // After OTP verification, go directly to registration
      navigation.navigate('Registration', { mobile });
    } catch (err) {
      setOtp(['','','','']);
    }
  };

  const handleResendOtp = async () => {
    if (timer > 0) return;
    try {
      await resendOtp(mobile);
      setTimer(60);
      setOtp(['','','','']);
    } catch (err) {}
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Phone Verification</Text>
      </View>

      <Text style={styles.title}>
        Enter 4 digit OTP sent to your phone number
      </Text>

      <OtpInput otp={otp} setOtp={setOtp} />

      <TouchableOpacity onPress={handleResendOtp} disabled={timer > 0}>
        <Text style={[styles.resendText, timer > 0 && styles.resendDisabled]}>
          Resend OTP
        </Text>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
  },
  backButton: {
    color: '#FFFFFF',
    fontSize: 24,
    marginRight: 16,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 40,
    lineHeight: 28,
  },
  resendText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '500',
    marginTop: 24,
  },
  resendDisabled: {
    color: '#666666',
  },
});
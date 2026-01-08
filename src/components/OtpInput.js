import React, { useRef, useEffect } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

export default function OtpInput({ otp, setOtp }) {
  const refs = useRef([]);

  useEffect(() => {
    if (refs.current[0]) {
      refs.current[0].focus();
    }
  }, []);

  const handleChange = (text, i) => {
    if (!/^\d*$/.test(text)) return;
    
    const newOtp = [...otp];
    newOtp[i] = text;
    setOtp(newOtp);
    
    if (text && i < 3) {
      refs.current[i + 1]?.focus();
    }
  };

  const handleKeyPress = (e, i) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[i] && i > 0) {
      refs.current[i - 1]?.focus();
    }
  };

  return (
    <View style={styles.container}>
      {otp.map((digit, i) => (
        <TextInput
          key={i}
          ref={r => (refs.current[i] = r)}
          keyboardType="number-pad"
          maxLength={1}
          value={digit}
          onChangeText={t => handleChange(t, i)}
          onKeyPress={e => handleKeyPress(e, i)}
          style={[
            styles.otpBox,
            digit && styles.otpBoxFilled
          ]}
          selectTextOnFocus
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  otpBox: {
    width: 60,
    height: 60,
    backgroundColor: '#3A3A3A',
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '600',
    color: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#3A3A3A',
  },
  otpBoxFilled: {
    backgroundColor: '#4A4A4A',
    borderColor: '#007AFF',
  },
});
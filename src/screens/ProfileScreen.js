import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert, StyleSheet } from 'react-native';

export default function ProfileScreen({ route, navigation }) {
  const { profileData } = route.params || {};

  const handleBackToLogin = () => {
    Alert.alert(
      'Registration Completed!',
      'Your registration has been completed successfully.',
      [
        {
          text: 'Back to Login',
          onPress: () => {
            navigation.reset({
              index: 0,
              routes: [{ name: 'SendOtp' }],
            });
          }
        }
      ]
    );
  };

  // Auto show completion message when screen loads
  React.useEffect(() => {
    handleBackToLogin();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your details</Text>
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Name</Text>
          <Text style={styles.sectionValue}>{profileData?.name || 'antoine@soch.at'}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Address</Text>
          <Text style={styles.sectionValue}>{profileData?.address1 || 'ABC'}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pin Code</Text>
          <Text style={styles.sectionValue}>{profileData?.pinCode || 'ABC'}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Playing Status</Text>
          <Text style={styles.sectionValue}>{profileData?.playingStatus || 'Looking for playground'}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sport you like</Text>
          <Text style={styles.sectionValue}>{profileData?.sport || 'Basketball'}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Feedback</Text>
          <Text style={styles.sectionValue}>
            {profileData?.feedback || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud'}
          </Text>
        </View>
      </ScrollView>
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
  content: {
    flex: 1,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  sectionValue: {
    color: '#CCCCCC',
    fontSize: 16,
    lineHeight: 22,
  },
});
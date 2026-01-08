import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function FeedbackScreen({ route, navigation }) {
  const { registrationData } = route.params || {};
  const [feedback, setFeedback] = useState('');

  const handleSubmit = () => {
    const finalData = { ...registrationData, feedback };
    navigation.navigate('ProfileScreen', { profileData: finalData });
  };

  const isFormValid = feedback.length > 0;
  const characterCount = feedback.length;
  const maxCharacters = 1000;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Share Your Feedback</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Feedback</Text>
        <View style={styles.textareaContainer}>
          <TextInput
            style={styles.textarea}
            placeholder="Write your suggestion"
            placeholderTextColor="#666"
            multiline
            numberOfLines={8}
            value={feedback}
            onChangeText={setFeedback}
            maxLength={maxCharacters}
          />
          <Text style={styles.characterCount}>
            {characterCount}/{maxCharacters}
          </Text>
        </View>
      </View>

      <TouchableOpacity 
        style={[styles.submitButton, isFormValid && styles.submitButtonActive]}
        onPress={handleSubmit}
        disabled={!isFormValid}
      >
        <Text style={styles.submitButtonText}>Submit</Text>
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
  title: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  form: {
    flex: 1,
  },
  label: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  textareaContainer: {
    position: 'relative',
  },
  textarea: {
    backgroundColor: '#3A3A3A',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    color: '#FFFFFF',
    height: 200,
    textAlignVertical: 'top',
  },
  characterCount: {
    color: '#666',
    fontSize: 14,
    textAlign: 'right',
    marginTop: 8,
  },
  submitButton: {
    backgroundColor: '#4A4A4A',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 40,
  },
  submitButtonActive: {
    backgroundColor: '#007AFF',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
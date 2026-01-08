import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';

export default function FeedbackScreen({ route, navigation }) {
  const { registrationData } = route.params || {};
  const [feedback, setFeedback] = useState('');

  const handleSubmit = () => {
    const finalData = { ...registrationData, feedback };
    navigation.navigate('ProfileScreen', { profileData: finalData });
  };

  const handleSkip = () => {
    const finalData = { ...registrationData, feedback: '' };
    navigation.navigate('ProfileScreen', { profileData: finalData });
  };

  const characterCount = feedback.length;
  const maxCharacters = 1000;

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Share Your Feedback</Text>
        <TouchableOpacity onPress={handleSkip}>
          <Text style={styles.skipButton}>Skip</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Feedback (Optional)</Text>
        <Text style={styles.helper}>
          Help us improve by sharing your thoughts and suggestions
        </Text>
        
        <View style={styles.textareaContainer}>
          <TextInput
            style={styles.textarea}
            placeholder="Share your thoughts, suggestions, or any feedback you'd like to give us..."
            placeholderTextColor="#666"
            multiline
            numberOfLines={8}
            value={feedback}
            onChangeText={setFeedback}
            maxLength={maxCharacters}
            textAlignVertical="top"
          />
          <View style={styles.characterCountContainer}>
            <Text style={styles.characterCount}>
              {characterCount}/{maxCharacters}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.submitButton}
          onPress={handleSubmit}
        >
          <Text style={styles.submitButtonText}>
            {feedback.length > 0 ? 'Submit Feedback' : 'Continue'}
          </Text>
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
  skipButton: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600',
  },
  form: {
    flex: 1,
    paddingHorizontal: 24,
  },
  label: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  helper: {
    color: '#CCCCCC',
    fontSize: 14,
    marginBottom: 16,
    lineHeight: 20,
  },
  textareaContainer: {
    flex: 1,
    maxHeight: 300,
  },
  textarea: {
    backgroundColor: '#3A3A3A',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    color: '#FFFFFF',
    flex: 1,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  characterCountContainer: {
    alignItems: 'flex-end',
    marginTop: 8,
  },
  characterCount: {
    color: '#666',
    fontSize: 14,
  },
  buttonContainer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  submitButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
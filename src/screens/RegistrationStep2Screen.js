import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, FlatList, Pressable } from 'react-native';

const playingStatusOptions = [
  'Looking for Playground',
  'Looking for Player',
];

const sportsOptions = [
  'Archery',
  'Badminton', 
  'Basketball',
  'Boxing',
  'Cricket',
  'Football',
  'Tennis',
  'Volleyball',
];

export default function RegistrationStep2Screen({ route, navigation }) {
  const { registrationData } = route.params || {};
  const [playingStatus, setPlayingStatus] = useState('');
  const [sport, setSport] = useState('');
  const [showPlayingStatusModal, setShowPlayingStatusModal] = useState(false);
  const [showSportModal, setShowSportModal] = useState(false);

  const handleNext = () => {
    const updatedData = { ...registrationData, playingStatus, sport };
    navigation.navigate('RegistrationReview', { registrationData: updatedData });
  };

  const isFormValid = playingStatus && sport;

  const renderPlayingStatusItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.dropdownItem}
      onPress={() => {
        setPlayingStatus(item);
        setShowPlayingStatusModal(false);
      }}
    >
      <Text style={styles.dropdownItemText}>{item}</Text>
    </TouchableOpacity>
  );

  const renderSportItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.dropdownItem}
      onPress={() => {
        setSport(item);
        setShowSportModal(false);
      }}
    >
      <Text style={styles.dropdownItemText}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Enter your details</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Playing Status</Text>
          <Text style={styles.helper}>What are you looking for?</Text>
          <TouchableOpacity 
            style={[styles.dropdown, playingStatus && styles.dropdownSelected]}
            onPress={() => setShowPlayingStatusModal(true)}
          >
            <Text style={[styles.dropdownText, !playingStatus && styles.placeholder]}>
              {playingStatus || 'Select your status'}
            </Text>
            <Text style={styles.dropdownArrow}>▼</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Sport you like *</Text>
          <Text style={styles.helper}>Choose your favorite sport</Text>
          <TouchableOpacity 
            style={[styles.dropdown, sport && styles.dropdownSelected]}
            onPress={() => setShowSportModal(true)}
          >
            <Text style={[styles.dropdownText, !sport && styles.placeholder]}>
              {sport || 'Select a sport'}
            </Text>
            <Text style={styles.dropdownArrow}>▼</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[styles.nextButton, isFormValid && styles.nextButtonActive]}
          onPress={handleNext}
          disabled={!isFormValid}
        >
          <Text style={styles.nextButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>

      {/* Playing Status Modal */}
      <Modal 
        visible={showPlayingStatusModal} 
        transparent 
        animationType="fade"
        onRequestClose={() => setShowPlayingStatusModal(false)}
      >
        <Pressable 
          style={styles.modalOverlay}
          onPress={() => setShowPlayingStatusModal(false)}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Playing Status</Text>
              <TouchableOpacity onPress={() => setShowPlayingStatusModal(false)}>
                <Text style={styles.modalClose}>✕</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={playingStatusOptions}
              renderItem={renderPlayingStatusItem}
              keyExtractor={(item) => item}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </Pressable>
      </Modal>

      {/* Sport Modal */}
      <Modal 
        visible={showSportModal} 
        transparent 
        animationType="fade"
        onRequestClose={() => setShowSportModal(false)}
      >
        <Pressable 
          style={styles.modalOverlay}
          onPress={() => setShowSportModal(false)}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Your Sport</Text>
              <TouchableOpacity onPress={() => setShowSportModal(false)}>
                <Text style={styles.modalClose}>✕</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={sportsOptions}
              renderItem={renderSportItem}
              keyExtractor={(item) => item}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </Pressable>
      </Modal>
    </View>
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
    flex: 1,
    paddingHorizontal: 24,
  },
  inputGroup: {
    marginBottom: 32,
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
    marginBottom: 12,
  },
  dropdown: {
    backgroundColor: '#3A3A3A',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  dropdownSelected: {
    borderColor: '#007AFF',
    backgroundColor: '#404040',
  },
  dropdownText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  placeholder: {
    color: '#666',
  },
  dropdownArrow: {
    color: '#FFFFFF',
    fontSize: 12,
  },
  buttonContainer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    maxHeight: 400,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
  },
  modalClose: {
    fontSize: 18,
    color: '#666666',
    fontWeight: '600',
  },
  dropdownItem: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  dropdownItemText: {
    fontSize: 16,
    color: '#000000',
  },
});
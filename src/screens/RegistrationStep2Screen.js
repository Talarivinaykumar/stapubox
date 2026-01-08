import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, FlatList } from 'react-native';

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
];

export default function RegistrationStep2Screen({ route, navigation }) {
  const { registrationData } = route.params || {};
  const [playingStatus, setPlayingStatus] = useState('');
  const [sport, setSport] = useState('');
  const [showPlayingStatusModal, setShowPlayingStatusModal] = useState(false);
  const [showSportModal, setShowSportModal] = useState(false);

  const handleNext = () => {
    const updatedData = { ...registrationData, playingStatus, sport };
    navigation.navigate('FeedbackScreen', { registrationData: updatedData });
  };

  const isFormValid = playingStatus && sport;

  const renderDropdownItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.dropdownItem}
      onPress={() => {
        if (showPlayingStatusModal) {
          setPlayingStatus(item);
          setShowPlayingStatusModal(false);
        } else {
          setSport(item);
          setShowSportModal(false);
        }
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
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Playing Status</Text>
        <TouchableOpacity 
          style={styles.dropdown}
          onPress={() => setShowPlayingStatusModal(true)}
        >
          <Text style={[styles.dropdownText, !playingStatus && styles.placeholder]}>
            {playingStatus || 'Looking for Playground'}
          </Text>
          <Text style={styles.dropdownArrow}>▼</Text>
        </TouchableOpacity>

        <Text style={styles.label}>Sport you like *</Text>
        <TouchableOpacity 
          style={styles.dropdown}
          onPress={() => setShowSportModal(true)}
        >
          <Text style={[styles.dropdownText, !sport && styles.placeholder]}>
            {sport || 'Badminton'}
          </Text>
          <Text style={styles.dropdownArrow}>▼</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity 
        style={[styles.nextButton, isFormValid && styles.nextButtonActive]}
        onPress={handleNext}
        disabled={!isFormValid}
      >
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>

      {/* Playing Status Modal */}
      <Modal visible={showPlayingStatusModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <FlatList
              data={playingStatusOptions}
              renderItem={renderDropdownItem}
              keyExtractor={(item) => item}
            />
          </View>
        </View>
      </Modal>

      {/* Sport Modal */}
      <Modal visible={showSportModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <FlatList
              data={sportsOptions}
              renderItem={renderDropdownItem}
              keyExtractor={(item) => item}
            />
          </View>
        </View>
      </Modal>
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
    marginTop: 20,
  },
  dropdown: {
    backgroundColor: '#3A3A3A',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    maxHeight: 300,
  },
  dropdownItem: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  dropdownItemText: {
    fontSize: 16,
    color: '#000000',
  },
});
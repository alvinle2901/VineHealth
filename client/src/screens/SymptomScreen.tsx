import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { colors } from '../constants/colors';
import { Dropdown } from 'react-native-element-dropdown';

type Props = {
  navigation: any
}

const SymptomScreen = ({navigation}: Props) => {
  const [selectedSymptom, setSelectedSymptom] = useState(null);
  const [selectedFrequency, setSelectedFrequency] = useState(null);

  const dataSymptom = [
    { label: 'Headache', value: 'headache' },
    { label: 'Nausea', value: 'nausea' },
    { label: 'Fatigue', value: 'fatigue' },
    // ... other symptoms
  ];

  const dataFrequency = [
    { label: 'every day', value: 'everyday' },
    { label: '3 times a week', value: '3timeweek' },
    // ... other frequency
  ];

  const handleNavigate = () => {
    if (selectedSymptom === 'headache') {
      navigation.navigate('HeadacheRemedy');
      // Add navigation for other symptoms as needed
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.question}>What is the symptom of your pain?</Text>
      <Dropdown
        style={styles.dropdown}
        data={dataSymptom}
        labelField="label"
        valueField="value"
        value={selectedSymptom}
        onChange={item => {
          setSelectedSymptom(item.value);
        }}
      />

      {/* Frequency Question */}
      <Text style={styles.question}>How often do you experience this pain?</Text>
      <Dropdown
        style={styles.dropdown}
        data={dataFrequency}
        labelField="label"
        valueField="value"
        value={selectedFrequency}
        onChange={item => setSelectedFrequency(item.value)}
      />

      <TouchableOpacity style={styles.submitButton} onPress={handleNavigate}>
        <Text style={styles.submitText}>SUBMIT</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SymptomScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.white,
    justifyContent: 'center',
  },
  question: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.heading,
    marginBottom: 20,
    textAlign: 'left',
  },
  dropdown: {
    // Style your dropdown
  },
  submitButton: {
    padding: 15,
    backgroundColor: colors.primary,
    borderRadius: 20,
    marginTop: 20,
  },
  submitText: {
    color: colors.white,
    textAlign: 'center',
    fontSize: 14,
  },
  // ... other styles
});
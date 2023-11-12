import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { colors } from '../constants/colors'
import { Dropdown } from 'react-native-element-dropdown'

type Props = {
  navigation: any
}

const SymptomScreen = ({ navigation }: Props) => {
  const [selectedSymptom, setSelectedSymptom] = useState('')
  const [selectedFrequency, setSelectedFrequency] = useState('')
  const [selectedGender, setSelectedGender] = useState('')
  const [selectedAge, setSelectedAge] = useState('')

  const dataSymptom = [
    { label: 'Headache', value: 'headache' },
    { label: 'Nausea', value: 'nausea' },
    { label: 'Fatigue', value: 'fatigue' }
    // ... other symptoms
  ]

  const dataFrequency = [
    { label: 'every day', value: 'everyday' },
    { label: '3 times a week', value: '3timeweek' }
    // ... other frequency
  ]

  const dataGender = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Rather not say', value: 'nosay' }
  ]

  const dataAge = Array.from({ length: 100 }, (_, i) => ({
    label: `${i + 1}`,
    value: i + 1
  }))

  const handleNavigate = () => {
    if (selectedSymptom === 'headache') {
      navigation.navigate('Remedy')
      // Add navigation for other symptoms as need ed
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.question}>How old are you?</Text>
      <Dropdown
        style={styles.dropdown}
        data={dataAge}
        labelField="label"
        valueField="value"
        value={selectedAge}
        onChange={(item) => {
          setSelectedAge(item.value)
        }}
      />

      <Text style={styles.question}>Gender</Text>
      <Dropdown
        style={styles.dropdown}
        data={dataGender}
        labelField="label"
        valueField="value"
        value={selectedGender}
        onChange={(item) => {
          setSelectedGender(item.value)
        }}
      />

      <Text style={styles.question}>What is the symptom of your pain?</Text>
      <Dropdown
        style={styles.dropdown}
        data={dataSymptom}
        labelField="label"
        valueField="value"
        value={selectedSymptom}
        onChange={(item) => {
          setSelectedSymptom(item.value)
        }}
      />

      {/* Frequency Question */}
      <Text style={styles.question}>
        How often do you experience this pain?
      </Text>
      <Dropdown
        style={styles.dropdown}
        data={dataFrequency}
        labelField="label"
        valueField="value"
        value={selectedFrequency}
        onChange={(item) => setSelectedFrequency(item.value)}
      />

      <TouchableOpacity style={styles.submitButton} onPress={handleNavigate}>
        <Text style={styles.submitText}>SUBMIT</Text>
      </TouchableOpacity>
    </View>
  )
}

export default SymptomScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 25,
    backgroundColor: colors.white,
    justifyContent: 'flex-start' // Distributes space evenly
  },
  question: {
    fontSize: 18, // Slightly reduced for better mobile readability
    fontWeight: '500', // Not too bold
    color: colors.heading, // Assuming you have a 'dark' color for text
    marginBottom: 10, // Reduced bottom margin
    marginTop: 20 // Space at the top for each question
  },
  dropdown: {
    backgroundColor: colors.whiteShadeBg,
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: colors.gray
  },
  submitButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: colors.primary,
    borderRadius: 30,
    shadowColor: colors.darkBg,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginTop: 30
  },
  submitText: {
    color: colors.white,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600'
  }
})

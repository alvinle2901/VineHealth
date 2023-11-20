import { Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { Dropdown } from 'react-native-element-dropdown'

import { colors } from '../constants/colors'
import {
  dataAge,
  dataGender,
  dataSymptom,
  dataFrequency
} from '../constants/data'
import { getAuth } from 'firebase/auth'
import { app, db } from '../../firebase.config'
import { doc, updateDoc } from 'firebase/firestore'

type Props = {
  navigation: any
}

const SymptomScreen = ({ navigation }: Props) => {
  const auth = getAuth(app)

  const [selectedAge, setSelectedAge] = useState('')
  const [selectedGender, setSelectedGender] = useState('')
  const [selectedSymptom, setSelectedSymptom] = useState('')
  const [selectedFrequency, setSelectedFrequency] = useState('')

  const handleNavigate = async () => {
    if (selectedSymptom === 'headache') {
      // navigation.navigate('Remedy')
      // Add navigation for other symptoms as need ed
    }

    // Update user health data
    if (auth.currentUser) {
      await updateDoc(doc(db, 'users', auth.currentUser.uid), {
        age: selectedAge,
        gender: selectedGender,
        symptom: selectedSymptom,
        frequency: selectedFrequency
      }).then(() => {
        navigation.navigate('Home')
      })
    }
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.question}>How old are you?</Text>
      <Dropdown
        style={styles.dropdown}
        data={dataAge}
        labelField="label"
        valueField="value"
        value={selectedAge}
        onChange={(item) => {
          const age: number = item.value
          setSelectedAge(age.toString())
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
        <Text style={styles.submitText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

export default SymptomScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.white
  },
  question: {
    fontSize: 16, // Slightly reduced for better mobile readability
    fontWeight: '500', // Not too bold
    color: colors.heading, // Assuming you have a 'dark' color for text
    marginBottom: 10, // Reduced bottom margin
    marginTop: 20 // Space at the top for each question
  },
  dropdown: {
    backgroundColor: colors.whiteShadeBg,
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#F9F9F9'
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
    fontSize: 16
  }
})

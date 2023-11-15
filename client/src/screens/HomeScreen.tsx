import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet
} from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { collection, query, onSnapshot } from 'firebase/firestore'
import { db } from '../../firebase.config'

import { Feedback } from '../constants/modal'
import { colors } from '../constants/colors'
import { remedies } from '../constants/data'

import FeedbackCard from '../components/FeedbackCard'
import CurrentStatus from '../components/CurrentStatus'
import PracticeCard from '../components/PracticeCard'

type Props = {
  navigation: any
}

const HomeScreen = ({ navigation }: Props) => {
  const [user, setUser] = useState('')
  const [feedback, setFeedback] = useState<Feedback[]>([
    { name: '', comment: '' }
  ])

  // fetch data from firebase
  const fetchFeedbackData = async () => {
    const q = query(collection(db, 'HealthVine'))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const recipes: Feedback[] = []
      querySnapshot.forEach((doc) => {
        const recipe = doc.data()
        recipes.push({
          name: recipe.name,
          comment: recipe.comment
        })
      })
      setFeedback(recipes)
    })
  }

  const getUserData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('my-key')
      const value = jsonValue != null ? JSON.parse(jsonValue) : {}
      const name = value.displayName
      setUser(name)
      return
    } catch (e) {
      // error reading value
    }
  }

  useEffect(() => {
    fetchFeedbackData()
    getUserData()
  }, [])

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={{ margin: 20, marginTop: -20 }}>
        <View style={styles.statusHeader}>
          {/* Header */}
          <Text style={styles.heading}>Hello, {user}!</Text>

          {/* Edit Button */}
          <TouchableOpacity onPress={() => navigation.navigate('Symptoms')}>
            <Text style={[styles.editText, { marginTop: 35 }]}>Edit {'>'}</Text>
          </TouchableOpacity>
        </View>
        {/* Current */}
        <CurrentStatus />

        {/* Practices */}
        <Text style={styles.header2}>Current Practices</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {remedies.map(({ title, img, id }, index) => {
            return (
              <PracticeCard
                user={user}
                title={title}
                img={img}
                id={id}
                navigation={navigation}
              />
            )
          })}
        </ScrollView>

        {/* Feedbacks */}
        <Text style={[styles.header2, { marginBottom: 20 }]}>
          What's happening
        </Text>
        {feedback.map(({ name, comment }, index) => {
          return <FeedbackCard name={name} comment={comment} />
        })}
        {/* More button */}
        <TouchableOpacity>
          <Text style={[styles.editText, { alignSelf: 'center' }]}>
            More {'>'}
          </Text>
        </TouchableOpacity>
      </View>
      {/* Header */}
    </ScrollView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: '#F9F9F9'
  },
  heading: {
    fontFamily: 'SFProText',
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 40
  },
  name: {
    fontWeight: 'bold'
  },
  header2: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 8
  },
  card: {
    backgroundColor: colors.white, // Assuming colors.white is the color of the card
    marginBottom: 20,
    marginTop: 20,
    borderRadius: 20,
    padding: 30, // Add padding to create space within the card
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
    overflow: 'hidden'
  },
  statusHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center' // This ensures vertical centering
  },
  editText: {
    fontSize: 14,
    textDecorationLine: 'underline'
  }
})

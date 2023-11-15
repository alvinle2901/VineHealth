import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet
} from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  collection,
  query,
  onSnapshot,
  orderBy,
  DocumentData
} from 'firebase/firestore'
import { db } from '../../firebase.config'

import { Feedback } from '../constants/modal'
import { colors } from '../constants/colors'
import { remedies } from '../constants/data'
import { timestampMillis } from '../utils/convertTime'

import FeedbackCard from '../components/FeedbackCard'
import CurrentStatus from '../components/CurrentStatus'
import PracticeCard from '../components/PracticeCard'

type Props = {
  navigation: any
}

const HomeScreen = ({ navigation }: Props) => {
  const [user, setUser] = useState('')
  const [photoURL, setPhotoURL] = useState('')
  const [expanded, setExpanded] = useState(false)
  const [feedback, setFeedback] = useState<Feedback[]>([])

  const collectIdsAndDocs = (doc: { id: any; data: () => any }) => {
    return { id: doc.id, ...doc.data() }
  }

  // fetch data from firebase
  const fetchFeedbackData = async () => {
    const q = query(collection(db, 'Feedback'), orderBy('timeCreated', 'desc'))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const recipes: Feedback[] = []
      const myPosts = querySnapshot.docs.map(collectIdsAndDocs)
      storeFeedback(myPosts)

      querySnapshot.forEach((doc) => {
        const recipe = doc.data()
        recipes.push({
          name: recipe.name,
          comment: recipe.comment,
          symptom: recipe.symptom,
          photoURL: recipe.photoURL,
          title: recipe.title,
          timeCreated: timestampMillis(recipe.timeCreated)
        })
      })
      setFeedback(recipes)
    })
  }

  // get UserData
  const getUserData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('my-key')
      const value = jsonValue != null ? JSON.parse(jsonValue) : {}
      setUser(value.displayName)
      setPhotoURL(value.photoURL)
      return
    } catch (e) {
      // error reading value
    }
  }

  // Store Feedbacks
  const storeFeedback = async (value: DocumentData) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('feedback', jsonValue)
    } catch (e) {
      // saving error
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
            <Text style={[styles.editText, { marginTop: 40 }]}>Edit {'>'}</Text>
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
                photoURL={photoURL}
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
        {expanded ? (
          <>
            {feedback.map(
              (
                { name, comment, symptom, photoURL, title, timeCreated },
                index
              ) => {
                return (
                  <FeedbackCard
                    name={name}
                    comment={comment}
                    symptom={symptom}
                    photoURL={photoURL}
                    title={title}
                    timeCreated={timeCreated}
                  />
                )
              }
            )}
          </>
        ) : (
          <>
            {feedback
              .slice(0, 3)
              .map(
                (
                  { name, comment, symptom, photoURL, title, timeCreated },
                  index
                ) => {
                  return (
                    <FeedbackCard
                      name={name}
                      comment={comment}
                      symptom={symptom}
                      photoURL={photoURL}
                      title={title}
                      timeCreated={timeCreated}
                    />
                  )
                }
              )}
          </>
        )}

        {/* More button */}
        {feedback.length > 3 && (
          <TouchableOpacity
            onPress={() => {
              setExpanded(!expanded)
            }}
          >
            {expanded ? (
              <Text style={[styles.editText, { alignSelf: 'center' }]}>
                Less {'>'}
              </Text>
            ) : (
              <Text style={[styles.editText, { alignSelf: 'center' }]}>
                More {'>'}
              </Text>
            )}
          </TouchableOpacity>
        )}
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
    backgroundColor: colors.white,
    marginBottom: 20,
    marginTop: 20,
    borderRadius: 20,
    padding: 30,
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
    alignItems: 'center'
  },
  editText: {
    fontSize: 14,
    textDecorationLine: 'underline'
  }
})

import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { db } from '../../firebase.config'
import { getAuth } from 'firebase/auth'
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore'

import { Feedback } from '../constants/modal'
import { colors } from '../constants/colors'
import { remedies } from '../constants/data'
import { storeFeedback } from '../utils/storage'
import { timestampMillis } from '../utils/convertTime'

import FeedbackCard from '../components/FeedbackCard'
import CurrentStatus from '../components/CurrentStatus'
import PracticeCard from '../components/PracticeCard'

type Props = {
  navigation: any
}

const HomeScreen = ({ navigation }: Props) => {
  const auth = getAuth()
  const user = auth.currentUser

  const [expanded, setExpanded] = useState(false)
  const [feedback, setFeedback] = useState<Feedback[]>([])

  // fetch feedback data from firebase
  const fetchFeedbackData = async () => {
    const q = query(collection(db, 'Feedback'), orderBy('timeCreated', 'desc'))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const feedbacks: Feedback[] = []
      querySnapshot.forEach((doc) => {
        const data = doc.data()
        feedbacks.push({
          comment: data.comment,
          symptom: data.symptom,
          title: data.title,
          timeCreated: timestampMillis(data.timeCreated)
        })
      })
      setFeedback(feedbacks)
      storeFeedback(feedbacks)
    })
  }

  useEffect(() => {
    fetchFeedbackData()
  }, [])

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={{ margin: 20, marginTop: -20 }}>
        <View style={styles.statusHeader}>
          {/* Header */}
          <Text style={styles.heading}>Hello, {user?.displayName}!</Text>

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
        {expanded ? (
          <>
            {feedback.map(({ comment, symptom, title, timeCreated }, index) => {
              return (
                <FeedbackCard
                  comment={comment}
                  symptom={symptom}
                  title={title}
                  timeCreated={timeCreated}
                />
              )
            })}
          </>
        ) : (
          <>
            {feedback
              .slice(0, 3)
              .map(({ comment, symptom, title, timeCreated }, index) => {
                return (
                  <FeedbackCard
                    comment={comment}
                    symptom={symptom}
                    title={title}
                    timeCreated={timeCreated}
                  />
                )
              })}
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

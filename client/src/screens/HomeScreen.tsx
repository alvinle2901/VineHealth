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
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([])

  // fetch feedbacks data from firebase
  const fetchFeedbackData = () => {
    const q = query(collection(db, 'Feedback'), orderBy('timeCreated', 'desc'))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const fbData: Feedback[] = []

      querySnapshot.forEach(async (document) => {
        const data = document.data()
        fbData.push({
          comment: data.comment,
          symptom: data.symptom,
          title: data.title,
          timeCreated: timestampMillis(data.timeCreated),
          uid: data.userId
        })
      })
      setFeedbacks(fbData)
      storeFeedback(fbData)
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
                key={index}
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
            {feedbacks.map((feedback, index) => {
              return <FeedbackCard key={index} feedback={feedback} />
            })}
          </>
        ) : (
          <>
            {feedbacks.slice(0, 3).map((feedback, index) => {
              return <FeedbackCard key={index} feedback={feedback} />
            })}
          </>
        )}

        {/* More button */}
        {feedbacks.length > 3 && (
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

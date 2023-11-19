import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView
} from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { colors } from '../constants/colors'
import { Feedback } from '../constants/modal'
import FeedbackCard from '../components/FeedbackCard'

type Props = {
  route: any
}

const DetailScreen = ({ route }: Props) => {
  const { item } = route.params
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([])
  const [expanded, setExpanded] = useState(false)

  // get Feedbacks
  const getFeedbacks = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('feedback')
      const value = jsonValue != null ? JSON.parse(jsonValue) : []
      // filter data
      const data: Feedback[] = value
      setFeedbacks(
        data.filter(
          (feedback: { title: string }) => feedback.title == item.title
        )
      )
      return
    } catch (e) {
      // error reading value
    }
  }

  useEffect(() => {
    getFeedbacks()
  }, [])

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Image */}
      <Image source={item.img} style={styles.image} />
      <View style={styles.contentContainer}>
        {/* Title */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <View style={styles.line}></View>
        </View>

        <View style={styles.infoSection}>
          {/* Duration */}
          <View style={styles.infoContainer}>
            <Image
              source={require('../../assets/icons/clock.png')}
              style={{ width: 18, height: 18 }}
            />
            <Text style={styles.infoText}>{item.duration} mins</Text>
          </View>
          {/* Calendar */}
          <View style={styles.infoContainer}>
            <Image
              source={require('../../assets/icons/calendar.png')}
              style={{ width: 18, height: 18 }}
            />
            <Text style={styles.infoText}>{item.calendar}</Text>
          </View>
        </View>

        {/* Info */}
        <Text style={styles.description}>{item.info}</Text>

        {/* Feedbacks */}
        <Text style={[styles.description, { marginTop: 15 }]}>
          1k+ people have done this remedy:
        </Text>
        {expanded ? (
          <>
            {feedbacks.map((feedback, index) => {
              return (
                <>
                  <FeedbackCard key={index} feedback={feedback} />
                  <View>
                    <View style={styles.verticalLine}></View>
                  </View>
                </>
              )
            })}
          </>
        ) : (
          <>
            {feedbacks.slice(0, 3).map((feedback, index) => {
              return (
                <>
                  <FeedbackCard key={index} feedback={feedback} />
                  <View>
                    <View style={styles.verticalLine}></View>
                  </View>
                </>
              )
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
              <Text style={styles.moreText}>
                Read less comment {'>'}
                {'>'}
              </Text>
            ) : (
              <Text style={styles.moreText}>
                Read more comment {'>'}
                {'>'}
              </Text>
            )}
          </TouchableOpacity>
        )}

        {/* Button */}
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => {
            //
          }}
        >
          <Text style={styles.actionButtonText}>I'll do it</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

export default DetailScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white'
  },
  contentContainer: {
    paddingVertical: 5,
    paddingHorizontal: 25
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  titleContainer: {
    marginBottom: 20
  },
  infoSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    alignContent: 'center',
    marginBottom: 20
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  infoText: {
    fontSize: 14,
    marginLeft: 5
  },
  description: {
    fontSize: 15,
    color: '#333',
    textAlign: 'justify',
    lineHeight: 21
  },
  image: {
    width: '100%',
    height: 180,
    marginBottom: 10
  },
  moreText: {
    color: colors.primary,
    fontWeight: '300',
    marginTop: 20,
    textDecorationLine: 'underline',
    marginLeft: 30,
    fontSize: 12
  },
  actionButton: {
    paddingVertical: 6,
    paddingHorizontal: 15,
    borderRadius: 10,
    alignSelf: 'center',
    borderColor: colors.primary,
    borderWidth: 1,
    marginVertical: 20
  },
  actionButtonText: {
    color: colors.primary,
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '300'
  },
  line: {
    width: '50%',
    height: 1,
    backgroundColor: colors.primary,
    alignSelf: 'center',
    marginTop: 5
  },
  verticalLine: {
    width: 6,
    height: 40,
    backgroundColor: colors.primary,
    marginVertical: -20,
    marginLeft: 30
  }
})

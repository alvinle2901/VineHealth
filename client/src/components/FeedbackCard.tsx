import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { getAuth } from 'firebase/auth'

import { colors } from '../constants/colors'
import { Feedback } from '../constants/modal'
import { formatTimeAgo } from '../utils/convertTime'

type Props = Feedback

const FeedbackCard = ({ comment, symptom, title, timeCreated }: Props) => {
  const date = new Date(timeCreated)
  const auth = getAuth()
  const user = auth.currentUser
  const uri: any = user?.photoURL

  return (
    <View style={styles.card}>
      <View style={{ marginRight: 15 }}>
        {/* Image */}
        <Image style={styles.avatar} source={{ uri: uri }} />

        {/* Time */}
        <Text style={styles.time}>{formatTimeAgo(date)}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <View style={styles.titleContainer}>
          {/* Title */}
          <Text style={styles.title}>{title}</Text>

          {/* Symptom */}
          <Text style={[styles.statusTag]}>{symptom}</Text>
        </View>
        <View style={styles.line}></View>

        {/* Name */}
        <View style={{ flexDirection: 'row', marginTop: 5 }}>
          <Text style={styles.header}>Name: </Text>
          <Text style={styles.content}>{user?.displayName}</Text>
        </View>

        {/* Comment */}
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.header}>Review: </Text>
          <Text
            style={[
              styles.content,
              {
                fontStyle: 'italic',
                textAlign: 'justify',
                overflow: 'hidden',
                flex: 1
              }
            ]}
          >
            "{comment}"
          </Text>
        </View>
      </View>
    </View>
  )
}

export default FeedbackCard

const styles = StyleSheet.create({
  title: {
    fontWeight: '500',
    fontSize: 14,
    textTransform: 'uppercase'
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 3
  },
  name: {
    fontWeight: 'bold'
  },
  time: {
    color: 'grey',
    alignSelf: 'center',
    fontSize: 11
  },
  statusTag: {
    color: colors.primary,
    borderRadius: 15,
    overflow: 'hidden',
    paddingHorizontal: 10,
    paddingVertical: 2,
    textAlign: 'center',
    backgroundColor: '#EDEFF1',
    fontWeight: '500'
  },
  header: {
    fontSize: 14,
    paddingVertical: 3,
    fontWeight: '500'
  },
  content: {
    fontSize: 14,
    paddingVertical: 3
  },
  card: {
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5
  },
  line: {
    width: '50%',
    height: 1,
    backgroundColor: colors.primary,
    overflow: 'hidden',
    marginTop :2
  }
})

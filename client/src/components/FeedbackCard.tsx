import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'

import { colors } from '../constants/colors'
import { Feedback } from '../constants/modal'

type Props = Feedback

const FeedbackCard = ({ name, comment }: Props) => {
  return (
    <View style={styles.card}>
      <View style={{ marginRight: 15 }}>
        {/* Image */}
        <Image
          style={styles.avatar}
          source={require('../../assets/images/image13.png')}
        />
        {/* Time */}
        <Text style={styles.time}>5m</Text>
      </View>
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          {/* Title */}
          <Text style={styles.title}>SauNA</Text>
          {/* Symptom */}
          <Text style={[styles.statusTag]}>Sinusitis</Text>
        </View>
        {/* Name */}
        <View style={{ flexDirection: 'row', marginTop: 8 }}>
          <Text style={styles.header}>Name: </Text>
          <Text style={styles.content}>"{name}"</Text>
        </View>
        {/* Comment */}
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.header}>Review: </Text>
          <Text style={styles.content}>"{comment}"</Text>
        </View>
      </View>
    </View>
  )
}

export default FeedbackCard

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    textTransform: 'uppercase'
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
    paddingVertical: 3,
    fontStyle: 'italic'
  },
  card: {
    backgroundColor: colors.white, // Assuming colors.white is the color of the card
    marginBottom: 10,
    marginTop: 10,
    borderRadius: 20,
    paddingHorizontal: 10, // Add padding to create space within the card
    paddingVertical: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
    overflow: 'hidden',
    flexDirection: 'row'
  }
})

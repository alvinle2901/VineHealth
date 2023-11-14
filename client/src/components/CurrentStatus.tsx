import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../constants/colors'

import CalendarStreak from './CalendarStreak'

const CurrentStatus = () => {
  const tags = [{ text: 'Sinusitis' }, { text: 'Women' }, { text: '38yr' }]
  const feelings = ['Wheezy breathing'] // This can be dynamic based on the state
  const userStreak = ['2023-11-12', '2023-11-13']

  return (
    <View style={styles.card}>
      <View style={styles.tagRow}>
        {tags.map((tag, index) => (
          <View key={index} style={[styles.tag]}>
            <Text style={styles.tagText}>{tag.text}</Text>
          </View>
        ))}
      </View>
      <View style={styles.tagRow}>
        <Text>Today, I'm feeling: </Text>
        {feelings.map((feeling, index) => (
          <View key={index} style={styles.tag}>
            <Text style={styles.tagText}>{feeling}</Text>
          </View>
        ))}
      </View>
      <CalendarStreak streak={userStreak} />
      <Text style={[{ textAlign: 'center', fontWeight: 'bold' }]}>
        {' '}
        {userStreak.length} day streak{' '}
      </Text>
    </View>
  )
}

export default CurrentStatus

const styles = StyleSheet.create({
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
  tagRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20
  },
  tag: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
    backgroundColor: colors.primary,
    marginRight: 8
  },
  tagText: {
    color: '#fff',
    fontSize: 14
  }
})

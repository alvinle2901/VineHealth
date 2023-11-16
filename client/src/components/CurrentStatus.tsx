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
      {/* Info tags */}
      <View style={styles.tagRow}>
        {tags.map((tag, index) => (
          <View key={index} style={styles.tag}>
            <Text style={styles.tagText}>{tag.text}</Text>
          </View>
        ))}
      </View>
      {/* Symptoms */}
      <View style={styles.tagRow}>
        <Text style={styles.header}>Today, I'm feeling:</Text>
        {feelings.map((feeling, index) => (
          <View key={index} style={styles.sympTag}>
            <Text style={styles.sympText}>{feeling}</Text>
          </View>
        ))}
      </View>
      {/* Streak */}
      <CalendarStreak streak={userStreak} />
      <Text style={[{ textAlign: 'center', fontWeight: 'bold' }]}>
        {userStreak.length} day streak
      </Text>
    </View>
  )
}

export default CurrentStatus

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white, // Assuming colors.white is the color of the card
    marginVertical: 20,
    borderRadius: 25,
    padding: 15, // Add padding to create space within the card
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
    marginBottom: 15
  },
  tag: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
    backgroundColor: '#EDEFF1',
    marginRight: 8
  },
  tagText: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: '500'
  },
  sympTag: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
    backgroundColor: colors.primary,
    marginRight: 8
  },
  sympText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600'
  },
  header: {
    fontSize: 16,
    textDecorationLine: 'underline',
    marginRight: 10,
  }
})

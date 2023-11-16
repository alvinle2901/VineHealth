import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import moment from 'moment'

import { colors } from '../constants/colors'

type Props = {
  streak: string[]
}

const CalendarStreak = ({ streak }: Props) => {
  const daysInWeek = Array.from({ length: 7 }, (_, i) =>
    moment().startOf('week').add(i, 'days')
  )

  return (
    <View style={styles.streakContainer}>
      {daysInWeek.map((day, index) => (
        <View key={index} style={styles.dayContainer}>
          <Text style={styles.dayLabel}>
            {day.format('ddd')} {/* First letter of the day */}
          </Text>
          <View
            style={[
              styles.dayIndicator,
              streak.includes(day.format('YYYY-MM-DD')) ? styles.activeDay : {}
            ]}
          >
            <Text
              style={[
                styles.dayNumber,
                streak.includes(day.format('YYYY-MM-DD'))
                  ? styles.activeNumber
                  : {}
              ]}
            >
              {day.format('D')}
            </Text>
          </View>
        </View>
      ))}
    </View>
  )
}

export default CalendarStreak

const styles = StyleSheet.create({
  streakContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
    marginBottom: 12
  },
  dayContainer: {
    alignItems: 'center'
  },
  dayLabel: {
    fontSize: 12,
    color: '#333',
    marginBottom: 4,
    textTransform: 'uppercase'
  },
  dayIndicator: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#EDEFF1',
    justifyContent: 'center',
    alignItems: 'center'
  },
  activeDay: {
    backgroundColor: colors.primary
  },
  dayNumber: {
    fontSize: 15,
    color: '#333'
  },
  activeNumber: {
    fontSize: 15,
    color: 'white'
  }
})

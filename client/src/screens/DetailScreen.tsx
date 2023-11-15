import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView
} from 'react-native'
import React from 'react'

import { colors } from '../constants/colors'

type Props = {
  route: any
  navigation: any
}

const DetailScreen = ({ route, navigation }: Props) => {
  const { item } = route.params

  return (
    <ScrollView>
      {/* Image */}
      <Image source={item.img} style={styles.image} />
      <View style={styles.contentContainer}>
        {/* Title */}
        <Text style={styles.title}>{item.title}</Text>

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


        {/* More button */}
        <TouchableOpacity onPress={() => {}}>
          <Text style={styles.moreText}>
            more {'>'}
            {'>'}
          </Text>
        </TouchableOpacity>

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
  contentContainer: {
    paddingVertical: 5,
    paddingHorizontal: 25
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20
  },
  infoSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 20
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  infoText: {
    fontSize: 12,
    marginLeft: 5
  },
  description: {
    fontSize: 14,
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
    marginTop: 5,
    alignSelf: 'center',
    textDecorationLine: 'underline'
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
  }
})

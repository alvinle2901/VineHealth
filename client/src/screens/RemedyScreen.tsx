import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import Carousel from 'react-native-snap-carousel'

import { colors } from '../constants/colors'
import { Remedy } from '../constants/modal'
import { sizes } from '../constants/theme'
import { getRemedyList } from '../utils/string'

type RemedyProps = {
  item: Remedy
  index: any
}

type Props = {
  navigation: any
  route: any
}

const RemedyScreen = ({ navigation, route }: Props) => {
  // filter the list of remedies based on symptom
  const { symptom, userData } = route.params
  const remedyList: Remedy[] = getRemedyList(symptom)
  const [selectedRemedies, setSelectedRemedies] = useState<boolean[]>([])

  const selectRemedy = (index: string | number) => {
    setSelectedRemedies((prevState) => ({
      ...prevState,
      [index]: !prevState[index]
    }))
  }

  const renderItem = ({ item, index }: RemedyProps) => {
    const isSelected = selectedRemedies[index]
    const infoPreview = `${item.info.substring(0, 200)}...`

    if (isSelected) {
      // Render the selected state of the card
      return (
        <>
          <View style={[styles.card, styles.cardSelected]}>
            <View style={{ top: '40%' }}>
              <Text style={styles.selectedTitle}>Good choice!</Text>
              <Text style={styles.selectedInfo}>
                “{item.title}” is in progress
              </Text>
            </View>
          </View>
          {/* Pagination */}
          <View style={styles.pagination}>
            <Text style={styles.paginationText}>
              {index + 1}/{remedyList.length}
            </Text>
          </View>
        </>
      )
    }

    return (
      <>
        <View style={styles.card}>
          <View>
            {/* Image */}
            <Image source={item.img} style={styles.image} />
            <View style={styles.contentContainer}>
              {/* Title */}
              <Text style={styles.title}>{item.title}</Text>
              <View style={styles.line}></View>

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
              <Text style={styles.description}>{infoPreview}</Text>

              {/* More button */}
              <TouchableOpacity
                onPress={() => {
                  // To Detail Screen
                  navigation.navigate('Detail', {
                    item: item,
                    userRemedy: userData.remedies
                  })
                }}
              >
                <Text style={styles.moreText}>
                  more {'>'}
                  {'>'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Button */}
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => selectRemedy(index)}
          >
            <Text style={styles.actionButtonText}>I'll do it</Text>
          </TouchableOpacity>
        </View>

        {/* Pagination */}
        <View style={styles.pagination}>
          <Text style={styles.paginationText}>
            {index + 1}/{remedyList.length}
          </Text>
        </View>
      </>
    )
  }

  return (
    <Carousel
      data={remedyList}
      renderItem={renderItem}
      sliderWidth={sizes.width}
      itemWidth={sizes.width * 0.75}
      activeSlideAlignment={'center'}
      containerCustomStyle={styles.carouselContainer}
      inactiveSlideScale={0.75}
      inactiveSlideOpacity={0.88}
      inactiveSlideShift={0}
      useScrollView={true}
    />
  )
}

const styles = StyleSheet.create({
  carouselContainer: {
    backgroundColor: '#F9F9F9'
  },
  card: {
    marginTop: 50,
    backgroundColor: 'white',
    borderRadius: 20,
    width: sizes.width * 0.75, // 75% of the screen width
    height: sizes.height * 0.68,
    paddingBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
    marginLeft: 5,
    justifyContent: 'space-between',
    overflow: 'hidden'
  },
  contentContainer: {
    paddingVertical: 5,
    paddingHorizontal: 15
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  line: {
    width: '50%',
    height: 1,
    backgroundColor: colors.primary,
    alignSelf: 'center',
    marginTop: 5,
    marginBottom: 14
  },
  infoSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 15
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
    lineHeight: 20
  },
  image: {
    width: '100%',
    height: 180,
    marginBottom: 10
  },
  actionButton: {
    paddingVertical: 6,
    paddingHorizontal: 15,
    borderRadius: 10,
    alignSelf: 'center',
    borderColor: colors.primary,
    borderWidth: 1
  },
  actionButtonText: {
    color: colors.primary,
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '300'
  },
  cardSelected: {
    backgroundColor: colors.primary
  },
  selectedTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 20
  },
  selectedInfo: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    paddingHorizontal: 20
  },
  moreText: {
    color: colors.primary,
    fontWeight: '300',
    marginTop: 5,
    alignSelf: 'center',
    textDecorationLine: 'underline'
  },
  pagination: {
    alignSelf: 'center',
    marginVertical: 30
  },
  paginationText: {
    color: 'grey',
    fontSize: 12
  }
})

export default RemedyScreen

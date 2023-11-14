import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView
} from 'react-native'
import Carousel from 'react-native-snap-carousel'

import { colors } from '../constants/colors'
import { Remedy } from '../constants/modal'
import { remedies } from '../constants/data'
import { sizes } from '../constants/theme'

type Props = {
  item: Remedy
  index: any
}

const RemedyScreen = () => {
  const [selectedRemedies, setSelectedRemedies] = useState<boolean[]>([])
  const [expandedCardIndex, setExpandedCardIndex] = useState(null)

  const selectRemedy = (index: string | number) => {
    setSelectedRemedies((prevState) => ({
      ...prevState,
      [index]: !prevState[index]
    }))
  } 

  const toggleCardExpansion = (index: React.SetStateAction<null>) => {
    setExpandedCardIndex(expandedCardIndex === index ? null : index)
  }

  const renderFeedback = () => {
    return (
      <View style={styles.feedbackCard}>
        <View style={styles.reviewHeader}>
          <Image
            style={styles.avatar}
            source={require('../../assets/images/image13.png')}
          />
          <View style={styles.headerContent}>
            <Text style={styles.name}>Daniel</Text>
            <Text style={styles.time}>5m</Text>
          </View>
          <Text style={styles.statusTag}>Sinusitis</Text>
        </View>
        <Text style={styles.reviewText}>
          “Today is only the 2nd day my sinuses felt much better.”
        </Text>
      </View>
    )
  }

  const renderItem = ({ item, index }: Props) => {
    const isSelected = selectedRemedies[index]
    const isExpanded = expandedCardIndex === index
    const infoPreview = `${item.info.substring(0, 100)}...`

    if (isSelected) {
      // Render the selected state of the card
      return (
        <View style={[styles.card, styles.cardSelected]}>
          <Text style={styles.selectedTitle}>Good choice!</Text>
          <Text style={styles.selectedInfo}>“{item.title}” is in progress</Text>
        </View>
      )
    }

    return (
      <ScrollView style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.title}>{item.title}</Text>
          <View style={styles.infoSection}>
            <Text style={styles.infoText}>{item.duration} minutes</Text>
            <Text style={styles.infoText}>{item.calendar}</Text>
          </View>
        </View>

        <Text style={styles.description}>
          {isExpanded ? item.info : infoPreview}
        </Text>

        {isExpanded && renderFeedback()}

        {item.info.length > 100 && ( // Only show "read more" if the info is longer than 100 characters
          <TouchableOpacity onPress={() => toggleCardExpansion(index)}>
            <Text style={styles.readMoreText}>
              {isExpanded ? 'read less' : 'read more'}
            </Text>
          </TouchableOpacity>
        )}

        <Image source={item.img} style={styles.image} />

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => selectRemedy(index)}
        >
          <Text style={styles.actionButtonText}>I'll do it</Text>
        </TouchableOpacity>
      </ScrollView>
    )
  }

  return (
    <Carousel
      data={remedies}
      renderItem={renderItem}
      sliderWidth={sizes.width}
      itemWidth={sizes.width * 0.75}
      activeSlideAlignment={'center'}
      containerCustomStyle={styles.carouselContainer}
      inactiveSlideScale={0.94}
      inactiveSlideOpacity={0.7}
    />
  )
}

const styles = StyleSheet.create({
  carouselContainer: {
    backgroundColor: 'white'
  },
  card: {
    marginTop: 50,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    width: sizes.width * 0.76, // 75% of the screen width
    height: sizes.height * 0.7,
    paddingBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.22,
    shadowRadius: 1,
    elevation: 2,
    marginBottom: 20 // Space between cards
  },
  cardHeader: {
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10
  },
  infoSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 10
  },
  infoText: {
    // Styles for the info texts
  },
  description: {
    fontSize: 14,
    color: '#333',
    textAlign: 'justify',
    marginBottom: 10
  },
  image: {
    width: '100%',
    height: 200, // Adjust the height as necessary
    borderRadius: 10, // Optional: if you want rounded corners
    marginBottom: 10
  },
  actionButton: {
    backgroundColor: colors.primary, // Use your primary color here
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignSelf: 'center'
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center'
  },
  cardSelected: {
    backgroundColor: colors.primary
  },
  selectedTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 10
  },
  selectedInfo: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    paddingHorizontal: 20
  },
  readMoreText: {
    color: colors.primary,
    fontWeight: 'bold',
    marginTop: 5
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10, // Add some margin at the top
    paddingHorizontal: 10 // Add some padding on the sides
  },
  avatar: {
    width: 40, // Adjust the size as needed
    height: 40, // Adjust the size as needed
    borderRadius: 20, // Half the size of width/height to make it circular
    marginRight: 10 // Add some margin between the avatar and the text
  },
  headerContent: {
    flex: 1,
    justifyContent: 'center' // Center the content vertically
  },
  name: {
    fontWeight: 'bold',
    fontSize: 14 // Adjust the font size as needed
  },
  time: {
    color: 'grey',
    fontSize: 12
  },
  statusTag: {
    color: 'white',
    backgroundColor: colors.primary,
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignSelf: 'flex-start'
  },
  reviewText: {
    marginTop: 10,
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
    textAlign: 'left'
  },
  feedbackCard: {
    backgroundColor: '#f0fff', // Slightly different color from the main card
    borderRadius: 10, // Less rounded than the main card
    padding: 10, // Less padding than the main card
    marginTop: 10, // Space from the main card content
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
    width: '90%', // Smaller width than the main card
    alignSelf: 'center' // Center the card within the main card
  }
})

export default RemedyScreen

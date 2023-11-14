import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { colors } from '../constants/colors'
import { Feedback } from '../constants/modal'

type Props = Feedback

const FeedbackCard = ({ name, comment }: Props) => {
  return (
    <View style={{ marginBottom: 50 }}>
      {/* Profile img */}
      <View style={[styles.card, { marginBottom: 10 }]}>
        <Text style={styles.title}>{}</Text>
        <View style={styles.reviewHeader}>
          <Image
            style={styles.avatar}
            source={require('../../assets/images/image13.png')}
          />
          <View style={styles.headerContent}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.time}>5m</Text>
          </View>
          <Text style={[styles.statusTag]}>Sinusitis</Text>
        </View>
        <Text style={styles.reviewText}>{comment}</Text>
      </View>
    </View>
  )
}

export default FeedbackCard

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 15
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25
  },
  headerContent: {
    flex: 1,
    marginHorizontal: 10
  },
  name: {
    fontWeight: 'bold'
  },
  time: {
    color: 'grey'
  },
  statusTag: {
    color: 'white',
    borderRadius: 15,
    overflow: 'hidden',
    paddingHorizontal: 10,
    paddingVertical: 2,
    textAlign: 'center',
    backgroundColor: colors.primary
  },
  reviewText: {
    marginTop: 8,
    fontSize: 18
  },
  likeIcon: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    fontSize: 24
  },
  header2: {
    fontWeight: 'bold',
    fontSize: 22,
    marginBottom: 8
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
  },
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
  }
})

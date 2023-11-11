import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet
} from 'react-native'
import React from 'react'
import { colors } from '../constants/colors'

type Props = {}

const HomeScreen = (props: Props) => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Logo */}
      <Image
        style={styles.logo}
        source={require('../../assets/images/logo.png')}
      />
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.heading}>Good Morning, Khoa</Text>
        <Text style={styles.subHeading}>How do you feel today?</Text>
      </View>
      {/* Content */}
      <View style={styles.sectionWrapper1}>
        <View style={styles.item1}>
          <Image
            style={styles.basicImg}
            source={require('../../assets/images/basicImg.png')}
          />
          <View style={styles.cardContent}>
            <Text style={[styles.cardTitle, { color: colors.whiteShade }]}>
              Basic
            </Text>
            {/* <Text style={[styles.cardSubTitle, { color: colors.whiteShade }]}>
              COURSE
            </Text> */}
          </View>
          <View style={styles.cardFooterWrapper}>
            <View>
              <Text
                style={[styles.footerTitle, { color: colors.whiteShadeBg }]}
              >
                3-10 MIN
              </Text>
            </View>
            <View>
              <TouchableOpacity
                style={[
                  styles.cardBtn,
                  { backgroundColor: colors.whiteShadeBg }
                ]}
              >
                <Text style={styles.btnLabel}>START</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.item2}>
          <Image source={require('../../assets/images/relaxationimg.png')} />
          <View style={styles.cardContent}>
            <Text style={[styles.cardTitle, { color: colors.heading }]}>
              Relaxation
            </Text>
            {/* <Text style={[styles.cardSubTitle, { color: colors.heading }]}>
              MUSIC
            </Text> */}
          </View>
          <View style={styles.cardFooterWrapper}>
            <View>
              <Text style={[styles.footerTitle, { color: colors.heading }]}>
                3-10 MIN
              </Text>
            </View>
            <View>
              <TouchableOpacity
                style={[styles.cardBtn, { backgroundColor: colors.heading }]}
              >
                <Text style={[styles.btnLabel, { color: colors.whiteShadeBg }]}>
                  START
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      {/* Recommended for you */}
      <View style={styles.recommendContainer}>
        <Text style={styles.recommendTitle}>Recommended for you</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={[styles.recommendCard]}>
            <View
              style={[styles.recommendImage, { backgroundColor: '#afdbc5' }]}
            >
              <Image source={require('../../assets/images/recommend1.png')} />
            </View>
            <View>
              <Text style={styles.recommendContentTitle}>Focus</Text>
              <Text style={styles.recommendContentSubTitle}>
                MEDITATION - 3-10 MIN
              </Text>
            </View>
          </View>
          <View style={[styles.recommendCard]}>
            <View
              style={[styles.recommendImage, { backgroundColor: '#fcdea5' }]}
            >
              <Image source={require('../../assets/images/recommend2.png')} />
            </View>
            <View>
              <Text style={styles.recommendContentTitle}>Happiness</Text>
              <Text style={styles.recommendContentSubTitle}>
                MEDITATION - 3-10 MIN
              </Text>
            </View>
          </View>
          <View style={[styles.recommendCard]}>
            <View
              style={[styles.recommendImage, { backgroundColor: '#afdbc5' }]}
            >
              <Image source={require('../../assets/images/recommend1.png')} />
            </View>
            <View>
              <Text style={styles.recommendContentTitle}>Focus</Text>
              <Text style={styles.recommendContentSubTitle}>
                MEDITATION - 3-10 MIN
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </ScrollView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    padding: 20,
    backgroundColor: colors.white
  },
  logo: {
    alignSelf: 'center',
    marginTop: 30
  },
  header: {},
  heading: {
    fontFamily: 'HelveticaNeue',
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 30
  },
  subHeading: {
    fontFamily: 'HelveticaNeue',
    fontSize: 20,
    fontWeight: '300',
    marginTop: 10,
  },
  sectionWrapper1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    marginBottom: 30
  },
  item1: {
    backgroundColor: '#8E97FD',
    flex: 1,
    marginRight: 10,
    marginBottom: 10,
    marginTop: 10,
    borderRadius: 20,
    justifyContent: 'space-between',
    overflow: 'hidden'
  },
  item2: {
    backgroundColor: '#FFC97E',
    flex: 1,
    marginLeft: 10,
    marginBottom: 10,
    marginTop: 10,
    borderRadius: 20,
    overflow: 'hidden'
  },
  basicImg: {
    alignSelf: 'flex-end'
  },
  cardContent: {
    position: 'absolute',
    top: '35%',
    padding: 15
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'HelveticaNeue'
  },
  cardFooterWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    marginTop: '0%',
    alignItems: 'center'
  },
  footerTitle: {
    fontSize: 11,
    fontFamily: 'HelveticaNeue'
  },
  cardBtn: {
    borderRadius: 50
  },
  btnLabel: {
    fontFamily: 'HelveticaNeue',
    fontSize: 12,
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 15,
    marginRight: 15,
    color: colors.heading
  },
  recommendContainer: {
    paddingBottom: 40
  },
  recommendTitle: {
    fontSize: 24,
    fontFamily: 'HelveticaNeue',
    color: colors.heading,
    fontWeight: 'bold',
    marginBottom: 20
  },
  recommendCard: {
    width: 160,
    marginRight: 20
  },
  recommendContentTitle: {
    fontSize: 18,
    fontFamily: 'HelveticaNeue',
    fontWeight: 'bold',
    color: colors.heading,
    paddingTop: 10,
    paddingBottom: 5
  },
  recommendContentSubTitle: {
    fontSize: 11,
    fontFamily: 'HelveticaNeue',
    color: colors.gray
  },
  recommendImage: {
    borderRadius: 20,
    overflow: 'hidden'
  }
})

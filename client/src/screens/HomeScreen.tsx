import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet
} from 'react-native'
import React, { useState } from 'react'

import { colors } from '../constants/colors'
import { TextInput } from 'react-native-gesture-handler'
import { getAuth } from 'firebase/auth'
import { app } from '../../firebase.config'

type Props = {
  navigation: any
}

const HomeScreen = ({ navigation }: Props) => {
  const [feeling, setFeeling] = useState('')

  const auth = getAuth(app)
  console.log(auth)
  

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Logo */}
      {/* Header */}
      <View>
        <Text style={styles.heading}>Hello, Khoa</Text>
        <Text style={styles.subHeading}>How do you feel today?</Text>
      </View>
      {/* Stats */}
      <TouchableOpacity onPress={() => navigation.navigate('Symptoms')}>
        <View
          style={[
            styles.attempts,
            { backgroundColor: colors.primary, height: 200 }
          ]}
        >
          <Text>Symptoms</Text>
          <Text>Sexuality</Text>
          <Text>Age</Text>
          <Text>Frequencies</Text>
          <Text>Streak</Text>
        </View>
      </TouchableOpacity>

      {/* Attempts */}
      <View style={styles.attempts}>
        {/* Card Title */}
        <View style={[styles.cardContent, { top: '0%' }]}>
          <Text
            style={[
              styles.cardTitle,
              {
                color: colors.heading,
                fontSize: 20,
                fontWeight: 'normal'
              }
            ]}
          >
            Attempting solution: Remedy 1
          </Text>
        </View>
        {/* Text Input */}
        <TextInput
          value={feeling}
          style={styles.attemptInput}
          placeholder={'How do you feel about it?'}
          onChangeText={(e) => setFeeling(e)}
        />
        {/* Buttons */}
        <View
          style={{
            bottom: '10%',
            position: 'absolute',
            flexDirection: 'row'
          }}
        >
          <View style={{ flex: 1, alignItems: 'center' }}>
            <TouchableOpacity
              style={[
                styles.cardBtn,
                {
                  backgroundColor: colors.whiteShadeBg,
                  padding: 5,
                  alignItems: 'center',
                  justifyContent: 'center'
                }
              ]}
            >
              <Text style={[styles.btnLabel, { fontSize: 18 }]}>POST</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <TouchableOpacity
              style={[
                styles.cardBtn,
                {
                  backgroundColor: colors.whiteShadeBg,
                  padding: 5,
                  alignItems: 'center',
                  justifyContent: 'center'
                }
              ]}
            >
              <Text style={[styles.btnLabel, { fontSize: 18 }]}>FINISH</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Feedback */}
      <Text style={styles.header2}>What's happening</Text>
      <View style={{ marginBottom: 50 }}>
        {/* Profile img */}
      <View style={styles.card}>
        <Text style={styles.title}>Going to the sauna</Text>
        <View style={styles.reviewHeader}>
        <Image style={styles.avatar} source={require('../../assets/images/image13.png')} />
          <View style={styles.headerContent}>
            <Text style={styles.name}>Daniel</Text>
            <Text style={styles.time}>5m</Text>
          </View>
          <Text style={[styles.statusTag]}>
          Sinusitis
          </Text>
        </View>
        <Text style={styles.reviewText}>“Today is only the 2nd day my sinuses felt much better.”</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.title}>Moisten Sinus</Text>
        <View style={styles.reviewHeader}>
        <Image style={styles.avatar} source={require('../../assets/images/image15.png')} />
          <View style={styles.headerContent}>
            <Text style={styles.name}>User123</Text>
            <Text style={styles.time}>3h</Text>
          </View>
          <Text style={[styles.statusTag]}>
          Wheezy breathing
          </Text>
        </View>
        <Text style={styles.reviewText}>“It’s just not for me.”</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.title}>Rinse nasal passages</Text>
        <View style={styles.reviewHeader}>
        <Image style={styles.avatar} source={require('../../assets/images/image14.png')} />
          <View style={styles.headerContent}>
            <Text style={styles.name}>Linda</Text>
            <Text style={styles.time}>4h</Text>
          </View>
          <Text style={[styles.statusTag]}>
          Sinusitis
          </Text>
        </View>
        <Text style={styles.reviewText}>“Just try it for one day friends. Finally can breathe now.”</Text>
      </View>
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
    marginTop: 10
  },
  section1: {
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
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    marginTop: '0%',
    alignItems: 'center'
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
  attempts: {
    backgroundColor: '#afdbc5',
    marginBottom: 10,
    marginTop: 20,
    borderRadius: 20,
    width: 'auto',
    height: 250
  },
  attemptInput: {
    top: '30%',
    position: 'absolute',
    height: 70,
    backgroundColor: colors.whiteShade,
    borderRadius: 20,
    paddingHorizontal: 50,
    alignSelf: 'center'
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.1,
    elevation: 2,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 8,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  headerContent: {
    flex: 1,
    marginHorizontal: 10,
  },
  name: {
    fontWeight: 'bold',
  },
  time: {
    color: 'grey',
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
    fontSize: 11,
  },
  likeIcon: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    fontSize: 24,
  },
  header2: {
    fontWeight: 'bold',
    fontSize: 17,
    marginBottom: 8,
  }
})

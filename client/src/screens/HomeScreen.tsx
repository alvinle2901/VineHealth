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

type Props = {
  navigation: any
}

const HomeScreen = ({ navigation }: Props) => {
  const [feeling, setFeeling] = useState('')

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
      <Text>What's happening</Text>
      <View style={{ marginBottom: 50 }}>
        {/* Profile img */}
        <Text>Username</Text>
        <Text>Comment</Text>
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
})

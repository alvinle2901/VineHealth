import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { RadioButton } from 'react-native-paper'
import { TextInput } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { collection, addDoc, query, onSnapshot } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { app, db } from '../../firebase.config'

import { Feedback } from '../constants/modal'
import { colors } from '../constants/colors'

import FeedbackCard from '../components/FeedbackCard'
import CurrentStatus from '../components/CurrentStatus'

type Props = {
  navigation: any
}

const HomeScreen = ({ navigation }: Props) => {
  const [feeling, setFeeling] = useState('')
  const [visible, setVisible] = useState(true)
  const [user, setUser] = useState('')
  const [data, setData] = useState<Feedback[]>([
    { name: 'abc', comment: '123' }
  ])
  const [checked, setChecked] = React.useState('')

  const uploadData = async () => {
    const docRef = await addDoc(collection(db, 'HealthVine'), {
      name: user,
      comment: feeling
    })
  }

  // fetch data from firebase
  const fetchData = async () => {
    const q = query(collection(db, 'HealthVine'))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const recipes: Feedback[] = []
      querySnapshot.forEach((doc) => {
        const recipe = doc.data()
        recipes.push({
          name: recipe.name,
          comment: recipe.comment
        })
      })
      setData(recipes)
    })
  }

  const getUserData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('my-key')
      const value = jsonValue != null ? JSON.parse(jsonValue) : {}
      const name = value.displayName
      setUser(name)
      return
    } catch (e) {
      // error reading value
    }
  }

  useEffect(() => {
    fetchData()
    getUserData()
  }, [])

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={{ margin: 20, marginTop: -20 }}>
        <View style={styles.statusHeader}>
          <Text style={styles.heading}>Hello, {user}!</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Symptoms')}>
            <Text style={[styles.editText, { marginTop: 40 }]}> Edit </Text>
          </TouchableOpacity>
        </View>
        {/* Current */}
        <CurrentStatus />
        <Text style={styles.header2}>Current Practices</Text>
        {/* Practices */}
        <ScrollView horizontal>
          {visible ? (
            <View
              style={[
                styles.card,
                {
                  marginLeft: 2,
                  marginRight: 15,
                  padding: 0,
                  alignItems: 'center',
                  width: 300,
                  height: 250
                }
              ]}
            >
              <Image
                source={require('../../assets/images/saunas.png')}
                style={{ width: 300, height: 130 }}
              />
              <Text
                style={{
                  textTransform: 'uppercase',
                  fontSize: 19,
                  marginTop: 10,
                  fontWeight: 'bold'
                }}
              >
                Going to the sauna
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  marginTop: 10
                }}
              >
                Did you do this practice today?
              </Text>
              <View style={{ flexDirection: 'row', marginVertical: 10 }}>
                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    flexDirection: 'row'
                  }}
                >
                  <RadioButton
                    value="first"
                    status={checked === 'first' ? 'checked' : 'unchecked'}
                    onPress={() => {
                      setChecked('first')
                      setVisible(!visible)
                    }}
                  />
                  <Text>Yes</Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    flexDirection: 'row'
                  }}
                >
                  <RadioButton
                    value="second"
                    status={checked === 'second' ? 'checked' : 'unchecked'}
                    onPress={() => setChecked('second')}
                  />
                  <Text>No</Text>
                </View>
              </View>
            </View>
          ) : (
            <View
              style={[
                styles.card,
                { width: 300, height: 250, backgroundColor: colors.primary }
              ]}
            >
              {/* Card Title */}
              <View style={[styles.cardContent]}>
                <Text
                  style={{
                    color: colors.white,
                    fontSize: 18,
                    fontWeight: 'normal'
                  }}
                >
                  How is your sleep quality?
                </Text>
              </View>
              {/* Text Input */}
              <TextInput
                value={feeling}
                style={styles.attemptInput}
                placeholder={'How do you feel about it?'}
                onChangeText={(e) => setFeeling(e)}
              />
              {/* Button */}
              <View style={{ alignItems: 'center' }}>
                <TouchableOpacity
                  onPress={() => {
                    setVisible(!visible)
                    uploadData()
                  }}
                  style={[
                    styles.cardBtn,
                    {
                      padding: 10,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderColor: 'white'
                    }
                  ]}
                >
                  <Text
                    style={[
                      {
                        fontSize: 18,
                        color: 'white',
                        fontWeight: '300',
                        marginTop: 20
                      }
                    ]}
                  >
                    SAVE
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </ScrollView>
        {/* Feedback */}
        <Text style={styles.header2}>What's happening</Text>
        {data.map(({ name, comment }, index) => {
          return <FeedbackCard name={name} comment={comment} />
        })}
      </View>
      {/* Header */}
    </ScrollView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: colors.white
  },
  heading: {
    fontFamily: 'SFProText',
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 30
  },
  subHeading: {
    fontFamily: 'SFProText',
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
    marginBottom: 20
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'SFProText'
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
    fontFamily: 'SFProText',
    fontSize: 12,
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 15,
    marginRight: 15,
    color: colors.heading
  },
  attempts: {
    backgroundColor: 'white',
    marginBottom: 10,
    marginTop: 20,
    borderRadius: 20,
    width: 'auto',
    height: 250
  },
  attemptInput: {
    height: 100,
    width: 250,
    borderRadius: 10,
    backgroundColor: 'white',
    paddingHorizontal: 50,
    alignSelf: 'center'
  },
  name: {
    fontWeight: 'bold'
  },
  header2: {
    fontWeight: 'bold',
    fontSize: 22,
    marginBottom: 8
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
  },
  statusHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center' // This ensures vertical centering
  },
  editText: {
    fontSize: 14
  }
})

import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image
} from 'react-native'
import React, { useState } from 'react'
import { RadioButton } from 'react-native-paper'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../../firebase.config'

import { colors } from '../constants/colors'

type Props = {
  user: string
  img: any
  title: string
}

const PracticeCard = ({ user, title, img }: Props) => {
  const [visible, setVisible] = useState(true)
  const [uploaded, setUploaded] = useState(false)
  const [checked, setChecked] = useState('')
  const [feeling, setFeeling] = useState('')

  const uploadData = async () => {
    const docRef = await addDoc(collection(db, 'Feedback'), {
      name: user,
      comment: feeling
    })
  }

  return (
    <>
      {visible ? (
        <View style={styles.card}>
          <Image source={img} style={{ width: 300, height: 130 }} />
          <Text
            style={{
              textTransform: 'uppercase',
              fontSize: 19,
              marginTop: 10,
              fontWeight: 'bold'
            }}
          >
            {title}
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
            <View style={styles.radioContainer}>
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
            <View style={styles.radioContainer}>
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
        <>
          {uploaded ? (
            <View
              style={[
                styles.card,
                {
                  backgroundColor: colors.primary
                }
              ]}
            >
              <TouchableOpacity
                style={{ alignSelf: 'flex-end', margin: 15 }}
                onPress={() => setVisible(true)}
              >
                <Image
                  source={require('../../assets/icons/x.png')}
                  style={{ width: 20, height: 15, tintColor: 'white' }}
                />
              </TouchableOpacity>
            </View>
          ) : (
            <View
              style={[
                styles.card,
                {
                  backgroundColor: colors.primary
                }
              ]}
            >
              <TouchableOpacity
                style={{ alignSelf: 'flex-end', margin: 15 }}
                onPress={() => setVisible(true)}
              >
                <Image
                  source={require('../../assets/icons/x.png')}
                  style={{ width: 20, height: 15, tintColor: 'white' }}
                />
              </TouchableOpacity>
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
                    setUploaded(true)
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
        </>
      )}
    </>
  )
}

export default PracticeCard

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white, // Assuming colors.white is the color of the card
    marginBottom: 20,
    marginTop: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
    overflow: 'hidden',
    width: 300,
    height: 250,
    marginLeft: 2,
    marginRight: 15,
    padding: 0,
    alignItems: 'center'
  },
  cardContent: {
    marginBottom: 20
  },
  attemptInput: {
    height: 100,
    width: 250,
    borderRadius: 10,
    backgroundColor: 'white',
    paddingHorizontal: 50,
    alignSelf: 'center'
  },
  cardBtn: {
    borderRadius: 50
  },
  radioContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20
  }
})

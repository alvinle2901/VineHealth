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

import CloseButton from './CloseButton'
import RadioSleepQuality from './RadioSleepQuality'

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

  const handleVisible = () => {
    setVisible(true)
  }

  return (
    <>
      {visible ? (
        <View style={styles.card}>
          <Image source={img} style={{ width: 300, height: 130 }} />
          <Text style={styles.cardTitle}>{title}</Text>
          <Text style={styles.cardSubTitle}>
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
              <CloseButton handleVisible={handleVisible} />
              {/* Content */}
              <View style={{ top: '40%' }}>
                <Text style={[styles.cardText, { alignSelf: 'center' }]}>
                  Thank you
                </Text>
                <Text style={styles.cardText}>
                  Your session has been saved!
                </Text>
              </View>
            </View>
          ) : (
            <View
              style={[
                styles.card,
                {
                  backgroundColor: colors.primary,
                  alignItems: 'flex-start',
                  paddingHorizontal: 10,
                  paddingTop: 20
                }
              ]}
            >
              <CloseButton handleVisible={handleVisible} />
              {/* Sleep Quality */}
              <Text style={[styles.cardText]}>How is your sleep quality?</Text>

              {/* Radio Buttons */}
              <RadioSleepQuality />

              {/* Comment */}
              <Text style={[styles.cardText]}>Comment</Text>
              <TextInput
                value={feeling}
                style={styles.attemptInput}
                placeholder={'Your feedback'}
                onChangeText={(e) => setFeeling(e)}
                multiline
              />

              {/* Button */}
              <View style={styles.cardBtn}>
                <TouchableOpacity
                  onPress={() => {
                    setUploaded(true)
                    uploadData()
                  }}
                >
                  <Text style={styles.buttonText}>SAVE</Text>
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
    backgroundColor: colors.white,
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
    height: 260,
    marginLeft: 2,
    marginRight: 15,
    alignItems: 'center'
  },
  attemptInput: {
    width: '100%',
    height: 100,
    borderRadius: 10,
    backgroundColor: 'white',
    padding: 10,
    textAlignVertical: 'top'
  },
  cardBtn: {
    borderRadius: 20,
    padding: 10,
    alignSelf: 'center'
  },
  radioContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20
  },
  cardTitle: {
    textTransform: 'uppercase',
    fontSize: 19,
    marginTop: 10,
    fontWeight: 'bold'
  },
  cardSubTitle: {
    fontSize: 15,
    marginTop: 10
  },
  cardText: {
    fontSize: 16,
    color: 'white',
    fontWeight: '500',
    marginBottom: 5
  },
  buttonText: {
    fontSize: 17,
    color: 'white'
  }
})

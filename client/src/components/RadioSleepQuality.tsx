import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { RadioButton } from 'react-native-paper'

const RadioSleepQuality = () => {
  const [checked, setChecked] = useState('')

  return (
    <View style={{ flexDirection: 'row', marginBottom: 5 }}>
      <View style={styles.radioContainer}>
        <RadioButton
          value={'1'}
          status={checked === '1' ? 'checked' : 'unchecked'}
          uncheckedColor="white"
          color="white"
          onPress={() => {
            setChecked('1')
          }}
        />
        <Text style={styles.text}>1</Text>
      </View>
      <View style={styles.radioContainer}>
        <RadioButton
          value={'2'}
          status={checked === '2' ? 'checked' : 'unchecked'}
          uncheckedColor="white"
          color="white"
          onPress={() => {
            setChecked('2')
          }}
        />
        <Text style={styles.text}>2</Text>
      </View>
      <View style={styles.radioContainer}>
        <RadioButton
          value={'3'}
          status={checked === '3' ? 'checked' : 'unchecked'}
          uncheckedColor="white"
          color="white"
          onPress={() => {
            setChecked('3')
          }}
        />
        <Text style={styles.text}>3</Text>
      </View>
      <View style={styles.radioContainer}>
        <RadioButton
          value={'4'}
          status={checked === '4' ? 'checked' : 'unchecked'}
          uncheckedColor="white"
          color="white"
          onPress={() => {
            setChecked('4')
          }}
        />
        <Text style={styles.text}>4</Text>
      </View>
      <View style={styles.radioContainer}>
        <RadioButton
          value={'5'}
          status={checked === '5' ? 'checked' : 'unchecked'}
          uncheckedColor="white"
          color="white"
          onPress={() => {
            setChecked('5')
          }}
        />
        <Text style={styles.text}>5</Text>
      </View>
    </View>
  )
}

export default RadioSleepQuality

const styles = StyleSheet.create({
  text: {
    color: 'white'
  },
  radioContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row'
  }
})

import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { Dispatch, SetStateAction } from 'react'
import { colors } from '../constants/colors'

type FormInputProps = {
  placeHolder: string
  value: string
  setValue: Dispatch<SetStateAction<string>>
}

const FormInput = ({ placeHolder, value, setValue }: FormInputProps) => {
  return (
    <View>
      <View style={styles.container}>
        <TextInput
          value={value}
          style={styles.input}
          placeholder={placeHolder}
          onChangeText={(e) => setValue(e)}
        />
      </View>
    </View>
  )
}

export default FormInput

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: colors.bg,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    padding: 15,
    fontSize: 16
  }
})

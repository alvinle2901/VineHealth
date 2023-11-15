import { TouchableOpacity, Image } from 'react-native'
import React from 'react'

type Props = {
  handleVisible: () => void
}

const CloseButton = ({ handleVisible }: Props) => {
  return (
    <TouchableOpacity
      style={{
        alignSelf: 'flex-end',
        position: 'absolute',
        right: '5%',
        top: '7%'
      }}
      onPress={handleVisible}
    >
      <Image
        source={require('../../assets/icons/x.png')}
        style={{ width: 20, height: 15, tintColor: 'white' }}
      />
    </TouchableOpacity>
  )
}

export default CloseButton

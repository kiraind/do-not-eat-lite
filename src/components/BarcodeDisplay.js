import React from 'react'
import { Dimensions, Text, View } from 'react-native'

import { secondaryTextColor } from '../constants.js'

// todo draw code using https://lindell.me/JsBarcode/
const BarcodeDisplay = ({
  barcode
}) => {
  const bodyHeight = Dimensions.get('window').width

  return (
    <View
      style={{
        height: 0.5 * bodyHeight,
        width: bodyHeight,

        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <View
        style={{
          height: 0.4 * bodyHeight,
          width: 0.65 * bodyHeight,

          borderColor: secondaryTextColor,
          borderWidth: 2,
          borderRadius: 5,

          justifyContent: 'flex-end',
          alignItems: 'center'
        }}
      >
        {barcode && (
          <Text
            style={{
              color: secondaryTextColor,
              fontSize: 18,
              fontWeight: 'bold',
              marginBottom: 10
            }}
          >{barcode}
          </Text>
        )}
      </View>
    </View>
  )
}

export default BarcodeDisplay

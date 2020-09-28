import React from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { accentColor, backgroundColor, backgroundDepthColor } from '../constants'

const ShortSelect = ({
  options,
  selected,
  onSelect
}) => {
  return (
    <View style={styles.body}>
      {options.map((option, i) => (
        <TouchableOpacity
          key={i}
          onPress={() => onSelect && onSelect(i)}
        >
          <View
            style={{
              ...styles.option,

              ...(i === 0 ? styles.optionFirst : {}),
              ...(i === options.length - 1 ? styles.optionLast : {}),
              ...(i === selected ? styles.optionSelected : {}),
              ...(i === selected - 1 ? styles.optionBeforeSelected : {})
            }}
          >
            <Text>{option}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  body: {
    flexDirection: 'row'
  },
  option: {
    height: 50,
    backgroundColor,

    borderWidth: 2,
    borderLeftWidth: 0,

    paddingHorizontal: 20,
    fontSize: 18,
    justifyContent: 'center',

    // borderColor: backgroundDepthColor not working because of
    // https://github.com/facebook/react-native/issues/12403
    borderTopColor: backgroundDepthColor,
    borderRightColor: backgroundDepthColor,
    borderBottomColor: backgroundDepthColor,
    borderLeftColor: backgroundDepthColor
  },
  optionFirst: {
    borderLeftWidth: 2,
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25
  },
  optionLast: {
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25
  },
  optionSelected: {
    borderTopColor: accentColor,
    borderRightColor: accentColor,
    borderBottomColor: accentColor,
    borderLeftColor: accentColor
  },
  optionBeforeSelected: {
    borderRightColor: accentColor
  }
})

export default ShortSelect

import React, { useState } from 'react'
import { Text, View, TextInput, Switch, Button } from 'react-native'
import { Slider } from '@miblanchard/react-native-slider'

import {
  secondaryTextColor,
  accentColor,
} from '../constants.js'

const Settings = ({ route }) => {
  const [ nameFocused, setNameFocused ] = useState(false)
  const [ name, setName ] = useState('')

  const [ calories, setCalories ] = useState(2200)

  const [ logLocation, setLogLocation ] = useState(true)

  return (
    <View style={{
      flex:1,
      backgroundColor: 'white',
      padding: 16
    }}>
      <Text style={style.label}>Ваше имя</Text>
      <TextInput
        style={{
          ...style.settingsInput,
          
          borderColor: nameFocused ? '#42eb42' : '#f5f5f5',
          backgroundColor: nameFocused ? 'white' : '#f5f5f5' ,
        }}
        onFocus={() => setNameFocused(true)}
        onBlur={() => setNameFocused(false)}
        
        value={name}
        onChangeText={setName}

        placeholder={'Елизавета'}
      />

      <View style={style.spacer} />

      <Text style={style.label}>Цель (ккал/день)</Text>
      <Slider
        minimumTrackTintColor={accentColor}
        maximumTrackTintColor={'#f5f5f5'}
        thumbTintColor={accentColor}
        thumbStyle={{
          elevation: 3
        }}

        minimumValue={1000}
        maximumValue={3000}
        step={10}
        value={calories}
        
        onValueChange={cal => setCalories(cal[0])}

        renderAboveThumbComponent={() => <Text style={style.sliderLabel}>{calories}</Text>}
      />

      <View style={style.spacer} />

      <View style={style.switchBody}>
        <Text style={style.switchLabel}>Сохранять местоположение</Text>
        <Switch
          trackColor={{
            false: '#f5f5f5',
            true:  '#d4f3d4'
          }}
          thumbColor={accentColor}
          onValueChange={setLogLocation}
          value={logLocation}
        />
      </View>

      <View style={{
        marginTop: 'auto'
      }}>
        <Button
          title="Готово"
          disabled={!name}
          color={accentColor}
          onPress={() => console.log('click')}
        />
      </View>      
    </View>
  )
}

const style = {
  label: {
    fontSize: 14,
    color: secondaryTextColor,
    marginBottom: 8,
  },
  settingsInput: {
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    paddingHorizontal: 20,
    fontSize: 18
  },
  spacer: {
    height: 24
  },
  sliderLabel: {
    color: secondaryTextColor,
    transform: [{ translate: [ -7, 55 ] }]
  },
  switchBody: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  switchLabel: {
    fontSize: 14,
    color: secondaryTextColor,
  }
}

export default Settings
import React, { useState } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Text, View, TextInput, Switch, Button, DevSettings, AsyncStorage } from 'react-native'
import { deleteAsync, documentDirectory } from 'expo-file-system'
import { Slider } from '@miblanchard/react-native-slider'

import {
  secondaryTextColor,
  accentColor,
  backgroundColor,
  backgroundDepthColor,

  targetCaloriesMax,
  targetCaloriesMin
} from '../constants.js'
import mixColors from '../utils/mixColors.js'

import {
  saveSettings,
  completeOnboarding
} from '../store/actions.js'

const Settings = ({
  route,

  currentName,
  currentTargetCalories,
  currentLogLocation,

  saveSettings,
  completeOnboarding
}) => {
  const [nameFocused, setNameFocused] = useState(false)
  const [name, setName] = useState(currentName)

  const [targetCalories, setTargetCalories] = useState(currentTargetCalories)

  const [logLocation, setLogLocation] = useState(currentLogLocation)

  const onSaveSettings = async () => {
    await saveSettings({
      name,
      targetCalories,
      logLocation
    })

    if (route.name === 'initialSettings') {
      await completeOnboarding()
    }
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        padding: 16
      }}
    >
      <Text style={style.label}>Ваше имя</Text>
      <TextInput
        style={{
          ...style.settingsInput,

          borderColor: nameFocused ? accentColor : backgroundDepthColor,
          backgroundColor: nameFocused ? backgroundColor : backgroundDepthColor
        }}
        onFocus={() => setNameFocused(true)}
        onBlur={() => setNameFocused(false)}

        value={name}
        onChangeText={setName}

        placeholder='Елизавета'
      />

      <View style={style.spacer} />

      <Text style={style.label}>Цель (ккал/день)</Text>
      <Slider
        minimumTrackTintColor={accentColor}
        maximumTrackTintColor={backgroundDepthColor}
        thumbTintColor={accentColor}
        thumbStyle={{
          elevation: 3
        }}

        minimumValue={targetCaloriesMin}
        maximumValue={targetCaloriesMax}
        step={10}
        value={targetCalories}

        onValueChange={cal => setTargetCalories(cal[0])}

        renderAboveThumbComponent={() => <Text style={style.sliderLabel}>{targetCalories}</Text>}
      />

      <View style={style.spacer} />

      <View style={style.switchBody}>
        <Text style={style.switchLabel}>Сохранять местоположение</Text>
        <Switch
          trackColor={{
            false: backgroundDepthColor,
            true: mixColors(accentColor, backgroundDepthColor)
          }}
          thumbColor={accentColor}
          onValueChange={setLogLocation}
          value={logLocation}
        />
      </View>

      {/* eslint-disable-next-line no-undef */}
      {__DEV__ && (
        <View style={style.switchBody}>
          <Text style={style.switchLabel}>Очистить данные [debug]</Text>
          <Switch
            trackColor={{
              false: backgroundDepthColor,
              true: mixColors(accentColor, backgroundDepthColor)
            }}
            thumbColor={accentColor}
            onValueChange={async () => {
              AsyncStorage.clear()
              await deleteAsync(documentDirectory + '/SQLite/do-not-eat-lite.db')
              DevSettings.reload()
            }}
            value={false}
          />
        </View>
      )}

      <View
        style={{
          marginTop: 'auto'
        }}
      >
        <Button
          title='Готово'
          disabled={
            !name || (
              name === currentName &&
              targetCalories === currentTargetCalories &&
              logLocation === currentLogLocation)
          }
          color={accentColor}
          onPress={onSaveSettings}
        />
      </View>
    </View>
  )
}

const style = {
  label: {
    fontSize: 14,
    color: secondaryTextColor,
    marginBottom: 8
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
    transform: [{ translate: [-7, 55] }]
  },
  switchBody: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  switchLabel: {
    fontSize: 14,
    color: secondaryTextColor
  }
}

const mapStateToProps = state => ({
  currentName: state.name,
  currentTargetCalories: state.targetCalories,
  currentLogLocation: state.logLocation
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({ saveSettings, completeOnboarding }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Settings)

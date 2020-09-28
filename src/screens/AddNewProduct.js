import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  ScrollView,
  Button
} from 'react-native'

import ShortSelect from '../components/ShortSelect.js'

import {
  accentColor,
  backgroundColor,
  backgroundDepthColor,
  primaryTextColor,
  secondaryTextColor
} from '../constants.js'

import * as MeasureUnit from '../models/MeasureUnit.js'

const AddNewProduct = ({ navigation, route }) => {
  // data
  const barcodePreset = !!route.params.barcode
  const [barcode, setBarcode] = useState(barcodePreset ? route.params.barcode : '')

  const [title, setTitle] = useState('')

  const [batchAmount, setBatchAmount] = useState('')
  const [measureUnit, setMeasureUnit] = useState(MeasureUnit.GRAMS)
  const [specificEnergy, setSpecificEnergy] = useState('')
  const [proteinsPct, setProteinsPct] = useState('')
  const [fatsPct, setFatsPct] = useState('')
  const [carbohydratesPct, setCarbohydratesPct] = useState('')

  // ui
  const [barcodeFocused, setBarcodeFocused] = useState(false)
  const [titleFocused, setTitleFocused] = useState(false)
  const [batchAmountFocused, setBatchAmountFocused] = useState(false)
  const [specificEnergyFocused, setSpecificEnergyFocused] = useState(false)
  const [proteinsPctFocused, setProteinsPctFocused] = useState(false)
  const [fatsPctFocused, setFatsPctFocused] = useState(false)
  const [carbohydratesPctFocused, setCarbohydratesPctFocused] = useState(false)

  return (

    <View style={styles.body}>
      <ScrollView>
        <Text style={styles.label}>Штрих-код</Text>
        <TextInput
          style={{
            ...styles.textInput,

            borderColor: barcodeFocused ? accentColor : backgroundDepthColor,
            backgroundColor: barcodeFocused ? backgroundColor : backgroundDepthColor,

            color: barcodePreset ? primaryTextColor : undefined
          }}
          onFocus={() => setBarcodeFocused(true)}
          onBlur={() => setBarcodeFocused(false)}
          editable={!barcodePreset}

          value={barcode}
          onChangeText={setBarcode}

          placeholder='0123456789012'
          autoFocus={!barcodePreset}
        />
        <View style={styles.spacer} />

        <Text style={styles.label}>Название</Text>
        <TextInput
          style={{
            ...styles.textInput,

            borderColor: titleFocused ? accentColor : backgroundDepthColor,
            backgroundColor: titleFocused ? backgroundColor : backgroundDepthColor
          }}
          onFocus={() => setTitleFocused(true)}
          onBlur={() => setTitleFocused(false)}

          value={title}
          onChangeText={setTitle}

          placeholder='Сок «Злой» Ежевичный'
          autoFocus={barcodePreset}
        />
        <View style={styles.spacer} />

        <Text style={styles.label}>Измеряется в</Text>
        <ShortSelect
          selected={measureUnit}
          options={MeasureUnit.MeasureUnitString}
          onSelect={setMeasureUnit}
        />
        <View style={styles.spacer} />

        <Text style={styles.label}>Объем упаковки ({MeasureUnit.MeasureUnitString[measureUnit]})</Text>
        <TextInput
          keyboardType='number-pad'
          style={{
            ...styles.textInput,

            borderColor: batchAmountFocused ? accentColor : backgroundDepthColor,
            backgroundColor: batchAmountFocused ? backgroundColor : backgroundDepthColor
          }}
          onFocus={() => setBatchAmountFocused(true)}
          onBlur={() => setBatchAmountFocused(false)}

          value={batchAmount}
          onChangeText={setBatchAmount}

          placeholder='100'
        />
        <View style={styles.spacer} />

        <Text style={styles.label}>Пищевая ценность на 100 г</Text>
        <View style={styles.parallelInputs}>
          <View style={styles.parallelInputContainer}>
            <TextInput
              keyboardType='number-pad'
              style={{
                ...styles.textInput,

                borderColor: specificEnergyFocused ? accentColor : backgroundDepthColor,
                backgroundColor: specificEnergyFocused ? backgroundColor : backgroundDepthColor
              }}
              onFocus={() => setSpecificEnergyFocused(true)}
              onBlur={() => setSpecificEnergyFocused(false)}

              value={specificEnergy}
              onChangeText={setSpecificEnergy}

              placeholder='100'
            />
            <Text style={styles.centerLabel}>ккал.</Text>
          </View>

          <View style={styles.parallelInputContainer}>
            <TextInput
              keyboardType='number-pad'
              style={{
                ...styles.textInput,

                borderColor: proteinsPctFocused ? accentColor : backgroundDepthColor,
                backgroundColor: proteinsPctFocused ? backgroundColor : backgroundDepthColor
              }}
              onFocus={() => setProteinsPctFocused(true)}
              onBlur={() => setProteinsPctFocused(false)}

              value={proteinsPct}
              onChangeText={setProteinsPct}

              placeholder='20'
            />
            <Text style={styles.centerLabel}>белки</Text>
          </View>

          <View style={styles.parallelInputContainer}>
            <TextInput
              keyboardType='number-pad'
              style={{
                ...styles.textInput,

                borderColor: fatsPctFocused ? accentColor : backgroundDepthColor,
                backgroundColor: fatsPctFocused ? backgroundColor : backgroundDepthColor
              }}
              onFocus={() => setFatsPctFocused(true)}
              onBlur={() => setFatsPctFocused(false)}

              value={fatsPct}
              onChangeText={setFatsPct}

              placeholder='20'
            />
            <Text style={styles.centerLabel}>жиры</Text>
          </View>

          <View style={styles.parallelInputContainer}>
            <TextInput
              keyboardType='number-pad'
              style={{
                ...styles.textInput,

                borderColor: carbohydratesPctFocused ? accentColor : backgroundDepthColor,
                backgroundColor: carbohydratesPctFocused ? backgroundColor : backgroundDepthColor
              }}
              onFocus={() => setCarbohydratesPctFocused(true)}
              onBlur={() => setCarbohydratesPctFocused(false)}

              value={carbohydratesPct}
              onChangeText={setCarbohydratesPct}

              placeholder='20'
            />
            <Text style={styles.centerLabel}>углеводы</Text>
          </View>
        </View>

      </ScrollView>
      <Button
        title='Готово'
        disabled={false}
        color={accentColor}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  body: {
    backgroundColor,
    padding: 16,
    flex: 1
  },
  label: {
    fontSize: 14,
    color: secondaryTextColor,
    marginBottom: 8
  },
  textInput: {
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    paddingHorizontal: 20,
    fontSize: 18
  },
  spacer: {
    height: 24
  },
  parallelInputs: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  parallelInputContainer: {
    width: (Dimensions.get('screen').width - 2 * 16 - 3 * 16) / 4
  },
  centerLabel: {
    fontSize: 12,
    color: secondaryTextColor,
    marginBottom: 8,
    alignSelf: 'center'
  }
})

export default AddNewProduct

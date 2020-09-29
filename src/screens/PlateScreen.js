import React from 'react'
import {
  View,
  Text,
  StyleSheet, Button
} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { connect } from 'react-redux'

import {
  accentColor,
  backgroundColor,
  primaryTextColor,
  secondaryTextColor
} from '../constants.js'
import toReadableNumber from '../utils/toReadableNumber.js'
import { ProductItem } from '../models/Product.js'

import { ProductItemAdapter, MealItemAdapter } from '../components/PlateItemAdapters.js'

const PlateScreen = ({ plate }) => {
  const totalCalories = plate.reduce(
    (sum, item) => sum + item.toCalories(item.amount),
    0
  )

  const items = plate.map((item, i) => (
    item instanceof ProductItem
      ? (
        <ProductItemAdapter
          key={item.id}
          product={item}
        />
      ) : (
        <MealItemAdapter
          key={-item.id}
          product={item}
        />
      )
  ))

  return (
    <View style={styles.root}>
      <ScrollView style={styles.body}>
        {items}
      </ScrollView>
      <View style={styles.bottomDrawer}>
        <Text style={styles.totalTextLabel}>
          Итого:&nbsp;
          <Text style={styles.totalText}>{
            toReadableNumber(totalCalories)
          }&nbsp;ккал
          </Text>
        </Text>
        <Button
          title='Съесть'
          color={accentColor}
          disabled={totalCalories === 0}
          onPress={() => console.log('съел')}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1
  },
  body: {
    flex: 1,
    padding: 16,
    backgroundColor
  },
  bottomDrawer: {
    marginTop: 'auto',
    backgroundColor,
    elevation: 10,
    paddingVertical: 10,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  totalTextLabel: {
    color: secondaryTextColor
  },
  totalText: {
    color: primaryTextColor
  }
})

const mapStateToProps = state => ({
  plate: state.plate
})

export default connect(mapStateToProps)(PlateScreen)

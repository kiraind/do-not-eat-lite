import React, { useContext, useState } from 'react'
import {
  View,
  Text,
  StyleSheet, Button, ActivityIndicator
} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { connect } from 'react-redux'

import { eatPlate } from '../store/actions.js'

import TabNavigationContext from '../tabs/TabNavigationContext.js'
import {
  accentColor,
  backgroundColor,
  primaryTextColor,
  secondaryTextColor
} from '../constants.js'
import toReadableNumber from '../utils/toReadableNumber.js'
import { ProductItem } from '../models/Product.js'

import PlateItemAdapter from '../components/PlateItemAdapter.js'
import WarningBlock from '../components/WarningBlock.js'

const PlateScreen = ({ plate, eatPlate }) => {
  const tabNavigation = useContext(TabNavigationContext)

  const [loading, setLoading] = useState(false)

  if (plate.length === 0) {
    return (
      <WarningBlock text='В тарелке пусто' />
    )
  }

  const totalCalories = plate.reduce(
    (sum, item) => sum + item.toCalories(item.amount),
    0
  )

  const items = plate.map((item, i) => (
    <PlateItemAdapter
      key={item instanceof ProductItem ? item.id : -item.id}
      item={item}
    />
  ))

  const handleEat = async () => {
    setLoading(true)

    await eatPlate()

    setLoading(false)
    tabNavigation.navigate('feed')
  }

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

        {loading && (
          <ActivityIndicator color={accentColor} size={30} />
        )}
        <View style={styles.buttonContainer}>
          <Button
            title='Съесть'
            color={accentColor}
            disabled={loading || totalCalories === 0}
            onPress={handleEat}
          />
        </View>
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
    color: secondaryTextColor,
    marginRight: 'auto'
  },
  totalText: {
    color: primaryTextColor
  },
  buttonContainer: {
    marginLeft: 10
  }
})

const mapStateToProps = state => ({
  plate: state.plate
})

const mapDispatchToProps = {
  eatPlate
}

export default connect(mapStateToProps, mapDispatchToProps)(PlateScreen)

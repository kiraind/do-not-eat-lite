import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Button, StyleSheet, Text, View } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { connect } from 'react-redux'

import { enplateMeal } from '../store/actions.js'

import { accentColor, backgroundColor, secondaryTextColor } from '../constants.js'

import BarcodeDisplay from '../components/BarcodeDisplay.js'
import ProductPage from '../components/ProductPage.js'
import MealActions from '../components/MealActions.js'

import Product from '../models/Product.js'
import { ScrollView } from 'react-native-gesture-handler'

const ScanResultScreen = ({
  route,
  navigation,

  enplateMeal
}) => {
  const { barcode } = route.params

  const [loading, setLoading] = useState(true)
  const [product, setProduct] = useState(null)

  useEffect(() => {
    (async () => {
      setProduct(await Product.getByBarcode(barcode))
      setLoading(false)
    })()
  }, [])

  const addNewProduct = () => {
    navigation.navigate('addNewProduct', {
      barcode
    })
  }

  return (
    <View style={styles.body}>
      {loading ? (
        <>
          <BarcodeDisplay barcode={barcode} />
          <View style={styles.loadingBody}>
            <ActivityIndicator size='large' color={accentColor} />
          </View>
        </>
      ) : (
        product ? (
          <>
            <ScrollView>
              <BarcodeDisplay barcode={barcode} />
              <View style={styles.normalBody}>
                <ProductPage product={product} />
              </View>
            </ScrollView>
            <MealActions
              item={product}
              onEat={amount => enplateMeal(product, amount)}
              onThrow={() => console.log('throw')}
              onAcquire={() => console.log('aquire')}
            />
          </>
        ) : (
          <>
            <BarcodeDisplay barcode={barcode} />
            <View style={styles.notFoundBody}>
              <View style={styles.notFoundMessageBody}>
                <MaterialIcons
                  name='error-outline'
                  size={24}
                  color={secondaryTextColor}
                />
                <Text
                  style={styles.notFoundText}
                >
                Неизвестный продукт, хотите его добавить?
                </Text>
              </View>
              <View style={styles.notFoundAction}>
                <Button
                  title='Добавить'
                  color={accentColor}
                  onPress={addNewProduct}
                />
              </View>
            </View>
          </>
        )
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor
  },
  loadingBody: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  notFoundBody: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16
  },
  notFoundMessageBody: {
    flexDirection: 'row'
  },
  notFoundText: {
    color: secondaryTextColor,
    marginLeft: 7
  },
  notFoundAction: {
    alignSelf: 'stretch'
  },
  normalBody: {
    flex: 1,
    padding: 16
  }
})

const mapDispatchToProps = {
  enplateMeal
}

export default connect(null, mapDispatchToProps)(ScanResultScreen)

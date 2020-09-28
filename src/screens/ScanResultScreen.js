import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Button, StyleSheet, Text, View } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

import { accentColor, backgroundColor, secondaryTextColor } from '../constants.js'

import BarcodeDisplay from '../components/BarcodeDisplay.js'
import ProductPage from '../components/ProductPage.js'

import Product from '../models/Product.js'

const ScanResultScreen = ({ route, navigation }) => {
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
      <BarcodeDisplay barcode={barcode} />
      {loading ? (
        <View style={styles.loadingBody}>
          <ActivityIndicator size='large' color={accentColor} />
        </View>
      ) : (
        product ? (
          <View style={styles.normalBody}>
            <ProductPage product={product} />
          </View>
        ) : (
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

export default ScanResultScreen

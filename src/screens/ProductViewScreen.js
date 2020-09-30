import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Button, StyleSheet, Text, View } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { connect } from 'react-redux'

import { enplateMeal, acquireProduct, loadProduct } from '../store/actions.js'

import { accentColor, backgroundColor, secondaryTextColor } from '../constants.js'

import BarcodeDisplay from '../components/BarcodeDisplay.js'
import ProductPage from '../components/ProductPage.js'
import ProductActions from '../components/ProductActions.js'

import { ScrollView } from 'react-native-gesture-handler'

const ProductViewScreen = ({
  route,
  navigation,

  enplateMeal,
  acquireProduct,
  loadProduct,

  products
}) => {
  const { barcode } = route.params

  const [loading, setLoading] = useState(true)
  const [productId, setProductId] = useState(null)
  const product = products[productId]

  useEffect(() => {
    (async () => {
      const product = await loadProduct({ barcode })

      setProductId(product !== null ? product.id : -1)
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
            <ProductActions
              item={product}
              onEat={amount => enplateMeal(product, amount)}
              onThrow={amount => acquireProduct(product, -amount)}
              onAcquire={amount => acquireProduct(product, amount)}
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

const mapStateToProps = state => ({
  products: state.products
})

const mapDispatchToProps = {
  enplateMeal,
  acquireProduct,
  loadProduct
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductViewScreen)

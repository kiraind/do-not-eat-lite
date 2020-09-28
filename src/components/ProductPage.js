import React from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'
import { secondaryTextColor } from '../constants.js'

const ProductPage = ({ product }) => {
  return (
    <View style={styles.body}>
      <Text style={styles.title}>{product.title} <Text style={styles.batchAmount}>{product.readableBatchAmount}</Text></Text>

      <Text style={styles.info}>Штрихкод: {product.barcode}</Text>
      <Text style={styles.info}>У вас есть: {product.readableLeftAmount}</Text>

      <Text style={styles.label}>Пищевая ценность на 100 г:</Text>
      <Text style={styles.info}>К: {product.specificEnergy} ккал</Text>
      <Text style={styles.info}>Б: {product.proteinsPct} г</Text>
      <Text style={styles.info}>Ж: {product.fatsPct} г</Text>
      <Text style={styles.info}>У: {product.carbohydratesPct} г</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  body: {
    flex: 1
  },
  title: {
    fontSize: 18,
    marginBottom: 5
  },
  batchAmount: {
    color: secondaryTextColor
  },
  info: {
    color: secondaryTextColor
  },
  label: {
    marginTop: 5
  }
})

export default ProductPage

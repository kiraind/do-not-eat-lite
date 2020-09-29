import React from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'
import { connect } from 'react-redux'

import { secondaryTextColor } from '../constants.js'
import * as MeasureUnit from '../models/MeasureUnit.js'
import { ProductItem } from '../models/Product.js'

const ProductPage = ({ product, plate }) => {
  const inPlate = plate.find(item => (item instanceof ProductItem) && item.id === product.id)

  return (
    <View style={styles.body}>
      <Text style={styles.title}>{product.title} <Text style={styles.batchAmount}>{product.readableBatchAmount}</Text></Text>

      {inPlate && (<Text style={styles.info}>В тарелке: {inPlate.amount} {product.measureUnitString}</Text>)}
      <Text style={styles.info}>Штрихкод: {product.barcode}</Text>
      <Text style={styles.info}>У вас есть: {product.readableLeftAmount}</Text>
      {product.measureUnit !== MeasureUnit.GRAMS && (
        product.measureUnit === MeasureUnit.PIECES
          ? <Text style={styles.info}>Масса одной штуки: {product.density} г</Text>
          : <Text style={styles.info}>Плотность: {product.density} г/{product.measureUnitString}</Text>
      )}

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

const mapStateToProps = state => ({
  plate: state.plate
})

export default connect(mapStateToProps)(ProductPage)

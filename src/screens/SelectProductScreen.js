import React from 'react'
import { connect } from 'react-redux'
import {
  StyleSheet
} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

import { backgroundColor } from '../constants.js'
import FrigdeItemAdapter from '../components/FrigdeItemAdapter.js'

const SelectProductScreen = ({
  navigation,
  route,

  fridge
}) => {
  const products = fridge.filter(meal => meal.isProduct)

  const onSelected = async meal => {
    if (!meal.products) {
      await meal.loadProducts()
    }

    navigation.pop()
    route.params.handleProductSelected(
      meal.products[0]
    )
  }

  return (
    <ScrollView style={styles.body}>
      {products.map(product => (
        <FrigdeItemAdapter
          key={product.id}
          meal={product}
          // todo cast to product
          onSelect={() => onSelected(product)}
        />
      ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor,
    padding: 16
  }
})

const mapStateToProps = state => ({
  fridge: state.fridge
})

export default connect(mapStateToProps)(SelectProductScreen)

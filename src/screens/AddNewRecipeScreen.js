import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet, ActivityIndicator, Button
} from 'react-native'
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import { MaterialIcons } from '@expo/vector-icons'

import ShortSelect from '../components/ShortSelect.js'
import RecipeItemAdapter from '../components/RecipeItemAdapter.js'

import {
  accentColor,
  backgroundColor,
  backgroundDepthColor,
  iconColor,
  primaryTextColor,
  secondaryTextColor
} from '../constants.js'
import * as CookingMethod from '../models/CookingMethod.js'
import toReadableNumber from '../utils/toReadableNumber'
import Product, { IngredientProduct } from '../models/Product.js'
import * as MeasureUnit from '../models/MeasureUnit.js'

const AddNewRecipeScreen = ({ navigation }) => {
  // id -
  // title
  // cookingMethod
  // measureUnit g
  // density ()
  // specificEnergy ()
  // proteinsPct ()
  // fatsPct ()
  // carbohydratesPct ()
  // leftAmount
  // products

  // data

  const [title, setTitle] = useState('')
  const [cookingMethod, setCookingMethod] = useState(CookingMethod.RAW)
  const [products, setProducts] = useState([
    new Product(
      1,
      'Картофель',
      null,
      200,
      MeasureUnit.GRAMS,
      1,
      77,
      3,
      2,
      30,
      200
    ),
    new Product(
      2,
      'Сладкие апельсины',
      null,
      1,
      MeasureUnit.PIECES,
      150,
      36,
      3,
      6,
      30,
      40
    )
  ])
  const [productsAmounts, setProductsAmounts] = useState([
    500,
    3
  ])

  // calculated
  const totalKcal = products.reduce(
    (sum, product, i) => sum + product.toCalories(productsAmounts[i]),
    0
  )
  const totalMass = productsAmounts.reduce(
    (sum, amount, i) => sum + amount * products[i].density,
    0
  )

  // ui
  const [loading, setLoading] = useState(false)
  const [titleFocused, setTitleFocused] = useState(false)

  // methods
  const handleRemove = i => {
    setProducts([
      ...products.slice(0, i),
      ...products.slice(i + 1)
    ])
    setProductsAmounts([
      ...productsAmounts.slice(0, i),
      ...productsAmounts.slice(i + 1)
    ])
  }

  const handleAdd = async () => {
    setLoading(true)

    // todo
    const n = new IngredientProduct()
  }

  return (
    <View style={styles.root}>
      <ScrollView style={styles.body}>
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

          placeholder='Пицца'
          autoFocus
        />
        <View style={styles.spacer} />

        <Text style={styles.label}>Обработка</Text>
        <ShortSelect
          selected={cookingMethod}
          options={CookingMethod.String}
          onSelect={setCookingMethod}
        />
        <View style={styles.spacer} />

        <Text style={styles.label}>Состав</Text>

        {products.map((product, i) => (
          <RecipeItemAdapter
            key={product.id}
            product={product}
            amount={productsAmounts[i]}
            onRemove={() => handleRemove(i)}
          />
        ))}

        <View style={styles.addButton}>
          <MaterialIcons name='add' size={24} color={iconColor} />
          <Text style={styles.addButtonText}>Добавить</Text>
        </View>
      </ScrollView>
      <View style={styles.bottomDrawer}>
        <Text style={styles.totalTextLabel}>
          <Text style={styles.totalText}>{
            toReadableNumber(totalKcal / totalMass * 100)
          }&nbsp;ккал
          </Text>
          &nbsp;/&nbsp;100&nbsp;г
        </Text>

        {loading && (
          <ActivityIndicator color={accentColor} size={30} />
        )}
        <View style={styles.buttonContainer}>
          <Button
            title='Добавить'
            color={accentColor}
            disabled={loading || 1 === 0}
            onPress={handleAdd}
          />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    backgroundColor,
    flex: 1
  },
  body: {
    padding: 16
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
  addButton: {
    backgroundColor: backgroundDepthColor,
    borderRadius: 8,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  addButtonText: {
    color: iconColor,
    marginLeft: 4
  }
})

export default AddNewRecipeScreen

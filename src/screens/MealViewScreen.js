import React, { useEffect, useState } from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'
import { connect } from 'react-redux'
import { ScrollView } from 'react-native-gesture-handler'

import { enplateMeal, cookMeal, loadProduct } from '../store/actions.js'

import { accentColor, backgroundColor, secondaryTextColor } from '../constants.js'

import MealPage from '../components/MealPage.js'
import MealActions from '../components/MealActions.js'
import { MealItem } from '../models/Meal.js'

const MealViewScreen = ({
  route,
  navigation,

  enplateMeal,
  cookMeal,

  fridge,
  plate
}) => {
  const { id } = route.params

  const [loading, setLoading] = useState(true)
  const meal = fridge.find(meal => meal.id === id)

  useEffect(() => {
    (async () => {
      if (meal.products === null) {
        await meal.loadProducts()
      }

      setLoading(false)
    })()
  }, [])

  return (
    <View style={styles.body}>
      {loading ? (
        <>
          <View style={styles.loadingBody}>
            <ActivityIndicator size='large' color={accentColor} />
          </View>
        </>
      ) : (
        <>
          <ScrollView>
            <View style={styles.normalBody}>
              <MealPage meal={meal} />
            </View>
          </ScrollView>
          <MealActions
            item={meal}
            currentAmount={
              plate.find(item => item instanceof MealItem && item.id === id)?.amount
            }

            onEat={amount => enplateMeal(meal, amount)}
            onThrow={amount => cookMeal(meal, -amount)}
            onCook={
              amount => navigation.navigate('cookMeal', {
                meal,
                amount
              })
            }
          />
        </>
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
  fridge: state.fridge,
  plate: state.plate
})

const mapDispatchToProps = {
  enplateMeal,
  cookMeal,
  loadProduct
}

export default connect(mapStateToProps, mapDispatchToProps)(MealViewScreen)

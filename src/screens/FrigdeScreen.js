import React, { useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableNativeFeedback, Dimensions
} from 'react-native'
import { connect } from 'react-redux'
import { ScrollView } from 'react-native-gesture-handler'
import { MaterialIcons } from '@expo/vector-icons'

import {
  accentColor,
  backgroundColor,
  backgroundDepthColor,
  iconColor,
  secondaryTextColor
} from '../constants.js'
import { loadFrigde } from '../store/actions.js'

import FrigdeItemAdapter from '../components/FrigdeItemAdapter.js'
import WarningBlock from '../components/WarningBlock.js'

const FrigdeScreen = ({
  navigation,

  fridge,

  loadFrigde
}) => {
  useEffect(() => {
    loadFrigde()
  }, [])

  useEffect(() => {
    const focusCleanup = navigation.addListener(
      'focus',
      () => loadFrigde()
    )

    return focusCleanup
  }, [])

  const viewItem = item => {
    if (item.isProduct) {
      navigation.navigate('viewProduct', {
        id: item.products[0].id,
        title: item.title
      })
    } else {
      navigation.navigate('viewMeal', {
        id: item.id,
        title: item.title
      })
    }
  }

  // presorted
  const available = fridge?.filter(item => item.leftAmount > 0)
  const known = fridge?.filter(item => item.leftAmount === 0)

  return (
    <View style={styles.root}>
      {fridge === null ? (
        <View style={styles.loading}>
          <ActivityIndicator size='large' color={accentColor} />
        </View>
      ) : (
        <ScrollView>
          <View style={styles.body}>
            <View style={styles.ui}>
              <TouchableNativeFeedback
                onPress={() => navigation.navigate('addNewProduct')}
                background={TouchableNativeFeedback.Ripple(backgroundColor)}
              >
                <View style={styles.uiButton}>
                  <MaterialIcons
                    name='add'
                    size={24}
                    color={iconColor}
                  />
                  <Text style={styles.uiButtonText}>Добавить продукт</Text>
                </View>
              </TouchableNativeFeedback>

              <TouchableNativeFeedback
                onPress={() => navigation.navigate('addNewRecipe')}
                background={TouchableNativeFeedback.Ripple(backgroundColor)}
              >
                <View style={styles.uiButton}>
                  <MaterialIcons
                    name='receipt'
                    size={24}
                    color={iconColor}
                  />
                  <Text style={styles.uiButtonText}>Добавить рецепт</Text>
                </View>
              </TouchableNativeFeedback>
            </View>

            {available.length !== 0 && (
              <>
                <View style={styles.separator}>
                  <Text style={styles.separatorText}>В наличии</Text>
                </View>

                {available.map(
                  item => (
                    <FrigdeItemAdapter
                      key={item.id}
                      meal={item}
                      onView={() => viewItem(item)}
                    />
                  )
                )}
              </>
            )}

            {known.length !== 0 && (
              <>
                <View style={styles.separator}>
                  <Text style={styles.separatorText}>
                    {available.length !== 0
                      ? 'Остальное'
                      : 'Добавленные'}
                  </Text>
                </View>

                {known.map(
                  item => (
                    <FrigdeItemAdapter
                      key={item.id}
                      meal={item}
                      onView={() => viewItem(item)}
                    />
                  )
                )}
              </>
            )}

            {available.length === 0 && known.length === 0 && (
              <WarningBlock text='Добавьте продукт' />
            )}
          </View>
        </ScrollView>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor
  },
  body: {
    flex: 1,
    padding: 16,
    paddingBottom: 0
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  ui: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap'
  },
  uiButton: {
    marginBottom: 16,
    backgroundColor: backgroundDepthColor,
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    width: (Dimensions.get('window').width - 3 * 16) / 2,
    overflow: 'hidden'
  },
  uiButtonText: {
    color: iconColor
  },
  separator: {
    marginBottom: 5
  },
  separatorText: {
    color: secondaryTextColor
  }
})

const mapStateToProps = state => ({
  fridge: state.fridge
})

const mapDispatchToProps = {
  loadFrigde
}

export default connect(mapStateToProps, mapDispatchToProps)(FrigdeScreen)

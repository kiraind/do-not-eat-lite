import React, { useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator
} from 'react-native'
import { connect } from 'react-redux'

import { accentColor, backgroundColor } from '../constants.js'
import { loadFrigde } from '../store/actions.js'

import FrigdeItemAdapter from '../components/FrigdeItemAdapter.js'
import { ScrollView } from 'react-native-gesture-handler'

const FrigdeScreen = ({
  fridge,

  loadFrigde
}) => {
  useEffect(() => {
    (async () => {
      await loadFrigde()
    })()
  }, [])

  return (
    <View style={styles.root}>
      {fridge === null ? (
        <View style={styles.loading}>
          <ActivityIndicator size='large' color={accentColor} />
        </View>
      ) : (
        <ScrollView style={styles.body}>

          {fridge.map(
            item => <FrigdeItemAdapter key={item.id} meal={item} />
          )}
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
    padding: 16
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

const mapStateToProps = state => ({
  fridge: state.fridge
})

const mapDispatchToProps = {
  loadFrigde
}

export default connect(mapStateToProps, mapDispatchToProps)(FrigdeScreen)

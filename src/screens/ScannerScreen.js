import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Dimensions, Text, View } from 'react-native'

import { secondaryTextColor, backgroundColor } from '../constants'

import BarCodeScanner from '../components/BarCodeScanner.js'

const ScannerScreen = ({ navigation, route }) => {
  const onScan = barcode => {
    navigation.navigate('scannedResult', {
      barcode
    })
  }

  return (
    <View style={styles.container}>
      <StatusBar style='auto' />

      <BarCodeScanner
        onScanned={onScan}
      />

      <View
        style={{
          height: Dimensions.get('window').height - BarCodeScanner.getHeight(),

          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Text style={styles.actionText}>Просканируйте штрихкод</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor
  },
  actionText: {
    color: secondaryTextColor
  }
})

export default ScannerScreen

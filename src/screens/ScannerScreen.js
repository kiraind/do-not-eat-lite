import React, { useEffect, useState } from 'react'
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

  const [scannerActive, setScannerActive] = useState(true)

  useEffect(() => {
    const blurCleanup = navigation.addListener(
      'blur',
      () => setScannerActive(false)
    )

    const focusCleanup = navigation.addListener(
      'focus',
      () => setScannerActive(true)
    )

    // cleanup
    return () => {
      blurCleanup()
      focusCleanup()
    }
  }, [])

  return (
    <View style={styles.container}>
      <StatusBar style='auto' />

      <BarCodeScanner
        onScanned={scannerActive ? onScan : undefined}
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

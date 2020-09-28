import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  Dimensions,
  Text,
  View,
  ActivityIndicator
} from 'react-native'
import Constants from 'expo-constants'
import { MaterialIcons } from '@expo/vector-icons'
import { BarCodeScanner } from 'expo-barcode-scanner'

import {
  accentColor,
  errorColor,
  backgroundDepthColor
} from '../constants.js'

const MyBarCodeScanner = ({
  onScanned,
  onError
}) => {
  const cameraWidth = Dimensions.get('window').width

  const [hasPermission, setHasPermission] = useState(null)

  useEffect(() => {
    if (!hasPermission) {
      (async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync()
        setHasPermission(status === 'granted')

        if (status !== 'granted') {
          onError()
        }
      })()
    }
  }, [hasPermission])

  if (hasPermission === null) {
    // Requesting for camera permission
    return (
      <CameraLoadingOverlay />
    )
  }
  if (hasPermission === false) {
    // No access to camera
    return (
      <CameraErrorOverlay />
    )
  }

  const onBarCodeScanned = ({ type, data }) => {
    onScanned && onScanned(data)
  }

  return (
    <View
      style={styles.root}
    >
      <BarCodeScanner
        onBarCodeScanned={onBarCodeScanned}

        style={{
          height: cameraWidth / 9 * 16,
          width: cameraWidth,
          alignItems: 'center',
          justifyContent: 'center'
        }}

        barCodeTypes={[
          BarCodeScanner.Constants.BarCodeType.ean13,
          BarCodeScanner.Constants.BarCodeType.ean8
        ]}
      >
        <ScannerOverlay
          cameraWidth={cameraWidth}
        />
      </BarCodeScanner>
    </View>
  )
}

MyBarCodeScanner.getHeight = function () {
  return Dimensions.get('window').width
}

const styles = StyleSheet.create({
  root: {
    height: Dimensions.get('window').width + Constants.statusBarHeight,
    width: Dimensions.get('window').width,

    alignItems: 'center',
    justifyContent: 'center',

    overflow: 'hidden'
  }
})

const ScannerOverlay = ({
  cameraWidth,
  barcode
}) => {
  const color = 'rgba(255, 255, 255, 0.5)'
  const bodyHeight = cameraWidth

  return (
    <View
      style={{
        height: bodyHeight + Constants.statusBarHeight,
        width: cameraWidth
      }}
    >
      <View
        style={{
          height: Constants.statusBarHeight,
          backgroundColor: 'rgba(255, 255, 255, 0.5)'
        }}
      />

      <View
        style={{
          height: bodyHeight,
          width: cameraWidth,

          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <View
          style={{
            height: 0.4 * cameraWidth,
            width: 0.65 * cameraWidth,

            borderColor: color,
            borderWidth: 2,
            borderRadius: 5,

            justifyContent: 'flex-end',
            alignItems: 'center'
          }}
        />
      </View>
    </View>
  )
}

const CameraLoadingOverlay = () => (
  <View
    style={[styles.root, {
      backgroundColor: backgroundDepthColor
    }]}
  >
    <ActivityIndicator
      size='large'
      color={accentColor}
    />
  </View>
)

const CameraErrorOverlay = () => (
  <View
    style={[styles.root, {
      backgroundColor: backgroundDepthColor,
      flexDirection: 'row'
    }]}
  >
    <MaterialIcons
      name='error-outline'
      size={24}
      color={errorColor}
    />
    <Text
      style={{
        color: errorColor,
        marginLeft: 7
      }}
    >
      Нет доступа к камере
    </Text>
  </View>
)

export default MyBarCodeScanner

import React from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { connect } from 'react-redux'

import { accentColor, backgroundColor } from '../constants.js'

const PlateIconBadged = ({
  size,
  color,
  focused,
  count,
  shown
}) => (
  <View style={styles.body}>
    <MaterialIcons name='room-service' size={size} color={color} />
    {!focused && shown && (
      <View style={styles.badge}>
        <Text style={styles.badgeText}>{count}</Text>
      </View>
    )}
  </View>
)

const size = 12
const styles = StyleSheet.create({
  body: {
    flex: 1
  },
  badge: {
    height: size,
    width: size,
    borderRadius: size / 2,
    backgroundColor: accentColor,
    position: 'absolute',
    top: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  badgeText: {
    color: backgroundColor,
    fontSize: 8
  }
})

const mapStateToProps = state => ({
  count: state.plate.length,
  shown: state.plate.length > 0
})

const Connected = connect(mapStateToProps)(PlateIconBadged)

// wrapper because react navigation doesn't accept react memo
export default props => <Connected {...props} />

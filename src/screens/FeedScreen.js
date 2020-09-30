import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'
import { connect } from 'react-redux'

import { loadEatings } from '../store/actions.js'

const FeedScreen = ({ loadEatings, eatings }) => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    (async () => {
      await loadEatings(20)
      setLoading(false)
    })()
  }, [])

  return (
    <View style={styles.body}>
      <Text>Hello, World</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  body: {
    flex: 1
  }
})

const mapStateToProps = state => ({
  eatings: state.eatings
})

const mapDispatchToProps = {
  loadEatings
}

export default connect(mapStateToProps, mapDispatchToProps)(FeedScreen)

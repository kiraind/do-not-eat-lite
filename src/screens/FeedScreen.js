import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  StyleSheet, Dimensions, ActivityIndicator
} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { connect } from 'react-redux'
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'

import {
  accentColor,
  backgroundColor,
  backgroundDepthColor,
  daysInMs,
  iconColor,
  monthGenitive,
  primaryTextColor,
  secondaryTextColor
} from '../constants.js'

import { loadEatings } from '../store/actions.js'
import toReadableNumber from '../utils/toReadableNumber.js'
import * as EatingLabel from '../models/EatingLabel.js'
import FeedItemAdapter from '../components/FeedItemAdapter.js'

const NONE = 0
const GOOD = 1
const BAD = 2

const FeedScreen = ({
  loadEatings,

  name,
  target,
  eatings
}) => {
  const [loading, setLoading] = useState(eatings === null)

  useEffect(() => {
    (async () => {
      if (loading) {
        await loadEatings(20)
        setLoading(false)
      }
    })()
  }, [])

  const now = new Date()
  const todayEatings =
    loading
      ? []
      : eatings.filter(
        eating => eating.date.valueOf() > now.valueOf() - 1 * daysInMs
      )

  const eatenToday = todayEatings.reduce(
    (sum, eating) => sum + eating.kcal,
    0
  )
  const percentEaten = Math.min(eatenToday / target, 1) * 100

  const currentLabel = EatingLabel.getCurrent()
  const suggestionType =
    loading
      ? NONE
      : todayEatings.some(eating => eating.label === currentLabel)
        ? NONE
        : eatenToday > target
          ? BAD
          : GOOD

  // render
  const feedItems = []

  if (loading) {
    feedItems.push(
      <View key='loading' style={styles.loadingContainer}>
        <ActivityIndicator color={accentColor} size='large' />
      </View>
    )
  } else {
    let currDay

    for (const eating of eatings) {
      const day = eating.date.toISOString().split('T')[0]

      if (day !== currDay) {
        currDay = day

        feedItems.push(
          <DayLabel key={day} date={day} />
        )
      }

      feedItems.push(
        <FeedItemAdapter key={eating.id} eating={eating} />
      )
    }
  }

  return (
    <ScrollView style={styles.root}>
      <View style={styles.hungerGraph} />
      <View style={styles.body}>
        <View style={styles.status}>
          <Text style={styles.statusName}>{name},</Text>
          <View style={styles.statusProgressBar}>
            <View style={{
              ...styles.statusProgressBarBody,
              width: `${percentEaten}%`
            }}
            />
          </View>
          <View style={styles.statusInfo}>
            <Text style={styles.statusLabel}>За эти сутки вы съели</Text>
            <View>
              <Text style={styles.statusCount}>
                {toReadableNumber(eatenToday)}<Text style={styles.statusTarget}>/{target}</Text>
              </Text>
            </View>
          </View>
          {suggestionType !== NONE && (
            <View style={styles.statusSuggestion}>
              <MaterialIcons
                name='error-outline'
                size={20}
                color={accentColor}
              />
              <Text
                style={{
                  ...styles.statusSuggestionText,
                  color: accentColor
                }}
              >
                {suggestionType === GOOD ? 'Самое' : 'Не самое'} время для {EatingLabel.StringGenitive[currentLabel]}
              </Text>
            </View>
          )}
        </View>
        <View style={styles.ui}>
          <View style={styles.uiButton}>
            <MaterialIcons
              name='local-mall'
              size={24}
              color={iconColor}
            />
            <Text style={styles.uiButtonText}>Добавить продукт</Text>
          </View>
          <View style={styles.uiButton}>
            <MaterialCommunityIcons
              name='microwave'
              size={24}
              color={iconColor}
            />
            <Text style={styles.uiButtonText}>Приготовить блюдо</Text>
          </View>
          <View style={styles.uiButton}>
            <MaterialIcons
              name='receipt'
              size={24}
              color={iconColor}
            />
            <Text style={styles.uiButtonText}>Добавить рецепт</Text>
          </View>
          <View style={styles.uiButton}>
            <MaterialIcons
              name='crop-free'
              size={24}
              color={iconColor}
            />
            <Text style={styles.uiButtonText}>Сканировать код</Text>
          </View>
        </View>
        {feedItems}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1
  },
  hungerGraph: {
    height: 250
  },
  body: {
    flex: 1,
    backgroundColor,
    padding: 16,
    minHeight: Dimensions.get('window').height - 250 - 20
  },
  status: {

  },
  statusProgressBar: {
    marginTop: 6,
    backgroundColor: backgroundDepthColor,
    height: 6,
    borderRadius: 3,
    overflow: 'hidden'
  },
  statusProgressBarBody: {
    backgroundColor: accentColor,
    height: '100%'
  },
  statusName: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  statusInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  },
  statusLabel: {
    color: primaryTextColor,
    fontSize: 16,
    marginBottom: 4
  },
  statusCount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: accentColor
  },
  statusTarget: {
    fontSize: 18,
    color: secondaryTextColor
  },
  statusSuggestion: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5
  },
  statusSuggestionText: {
    marginLeft: 4,
    fontSize: 14
  },
  ui: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginBottom: 16
  },
  uiButton: {
    marginTop: 16,
    backgroundColor: backgroundDepthColor,
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    width: (Dimensions.get('window').width - 3 * 16) / 2
  },
  uiButtonText: {
    color: iconColor
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center'
  }
})

const mapStateToProps = state => ({
  eatings: state.eatings,
  name: state.name,
  target: state.targetCalories
})

const mapDispatchToProps = {
  loadEatings
}

export default connect(mapStateToProps, mapDispatchToProps)(FeedScreen)

const DayLabel = ({ date }) => {
  let displayDay

  const dt = new Date()
  const today = dt.toISOString().split('T')[0]
  const yesterday = new Date(dt.valueOf() - 1 - daysInMs).toISOString().split('T')[0]

  if (date === today) {
    displayDay = 'Сегодня'
  } else if (date === yesterday) {
    displayDay = 'Вчера'
  } else {
    const [year, month, day] = date.split('-')
    const [currentYear] = today.split('-')

    displayDay = `${day} ${monthGenitive[+month - 1]}${year !== currentYear ? ` ${year}` : ''}`
  }

  return (
    <View
      style={{
        marginBottom: 4
      }}
    >
      <Text
        style={{
          color: secondaryTextColor
        }}
      >{displayDay}
      </Text>
    </View>
  )
}

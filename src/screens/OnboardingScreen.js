import React, { useState } from 'react'
import { Text, View, TouchableWithoutFeedback, StatusBar } from 'react-native'
import PaginationDot from 'react-native-animated-pagination-dot'
import { MaterialIcons } from '@expo/vector-icons'

import {
  accentColor,
  secondaryTextColor
} from '../constants.js'

const Page1 = () => (
  <View style={style.page}>
    <MaterialIcons name='crop-free' size={200} color={accentColor} />
    <Text>Сканируйте штрихкоды</Text>
  </View>
)

const Page2 = () => (
  <View style={style.page}>
    <MaterialIcons name='kitchen' size={200} color={accentColor} />
    <Text>Следите за продуктами в холодильнике</Text>
  </View>
)

const Page3 = () => (
  <View style={style.page}>
    <MaterialIcons name='receipt' size={200} color={accentColor} />
    <Text>Сохраняйте рецепты</Text>
  </View>
)

const OnboardingScreen = ({ navigation }) => {
  const pages = [Page1, Page2, Page3]

  const [currentPage, setCurrentPage] = useState(0)

  const PageComponent = pages[currentPage]

  const goToSettings = () => navigation.navigate('initialSettings')
  const prevPage = () => setCurrentPage(currentPage - 1)
  const nextPage = () => setCurrentPage(currentPage + 1)

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'flex-end'
      }}
    >
      <View style={style.body}>
        <PageComponent />
      </View>

      <View style={style.pagination}>
        <TouchableWithoutFeedback
          onPress={currentPage === 0 ? goToSettings : prevPage}
        >
          <View
            style={style.paginationButton}
          >
            <Text
              style={style.paginationTextLeft}
            >
              {currentPage === 0 ? 'Пропустить' : 'Назад'}
            </Text>
          </View>
        </TouchableWithoutFeedback>

        <PaginationDot
          activeDotColor={accentColor}
          curPage={currentPage}
          maxPage={pages.length}
        />

        <TouchableWithoutFeedback
          onPress={currentPage === pages.length - 1 ? goToSettings : nextPage}
        >
          <View
            style={style.paginationButton}
          >
            <Text
              style={style.paginationTextRight}
            >
              Далее
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  )
}

const style = {
  body: {
    marginTop: StatusBar.currentHeight,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 14,
    marginBottom: 16
  },
  paginationButton: {
    width: '33%'
  },
  paginationTextLeft: {
    fontSize: 14,
    color: secondaryTextColor
  },
  paginationTextRight: {
    fontSize: 14,
    textAlign: 'right',
    color: accentColor
  },

  page: {
    alignItems: 'center'
  }
}

export default OnboardingScreen

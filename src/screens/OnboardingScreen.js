import React, { useState } from 'react'
import { Text, View, TouchableWithoutFeedback, StatusBar } from 'react-native'
import PaginationDot from 'react-native-animated-pagination-dot'

import {
  accentColor,
  secondaryTextColor
} from '../constants.js'

const Page1 = () => (
  <View>
    <Text>Карточка приветствия №1</Text>
  </View>
)

const Page2 = () => (
  <View>
    <Text>Карточка приветствия №2</Text>
  </View>
)

const Page3 = () => (
  <View>
    <Text>Карточка приветствия №3</Text>
  </View>
)

const OnboardingScreen = ({ navigation }) => {
  const pages = [ Page1, Page2, Page3 ]

  const [ currentPage, setCurrentPage ] = useState(0)

  const PageComponent = pages[currentPage]

  const goToSettings = () => navigation.navigate('initialSettings')
  const prevPage = () => setCurrentPage(currentPage - 1)
  const nextPage = () => setCurrentPage(currentPage + 1)

  return (
    <View style={{
      flex:1,
      backgroundColor: 'white',
      justifyContent: 'flex-end'
    }}>
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
            >{currentPage === 0 ? 'Пропустить' : 'Назад'}</Text>
          </View>
        </TouchableWithoutFeedback>
        
        <PaginationDot 
          activeDotColor={accentColor} 
          curPage={currentPage} 
          maxPage={pages.length}
        />

        <TouchableWithoutFeedback
          onPress={currentPage === pages.length-1 ? goToSettings : nextPage}  
        >
          <View
            style={style.paginationButton}
          >
            <Text
              style={style.paginationTextRight}
            >Далее</Text>
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
    alignItems: 'center',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 14,
    marginBottom: 16,
  },
  paginationButton: {
    width: '33%',
  },
  paginationTextLeft: {
    fontSize: 14,
    color: secondaryTextColor,
  },
  paginationTextRight: {
    fontSize: 14,
    textAlign: 'right',
    color: accentColor,
  },
}

export default OnboardingScreen
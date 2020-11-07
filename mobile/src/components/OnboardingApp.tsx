import React from 'react'
import Onboarding from 'react-native-onboarding-swiper'
import {useAsyncStorage}from '@react-native-community/async-storage'
import {Image} from 'react-native'
import { useNavigation } from '@react-navigation/native'
export default function OnboardingApp(){
  const navigation = useNavigation()
  
  function startApp(){
    navigation.navigate('OrphanagesMap')
  }
  return (
    <Onboarding
  pages={[
    {
      backgroundColor: '#3685fa',
      image: <Image source={require('../../assets/ilustra01.png')} />,
      title: 'Leve a felicidade para o mundo',
      subtitle: 'Visite crianças nos orfanatos',
      titleStyles:{
        fontFamily: 'Nunito_800ExtraBold',
        fontSize: 29,
        marginRight: 10
        
      },
      subTitleStyles:{
        fontFamily: 'Nunito_600SemiBold',
        fontSize: 20,
        marginRight: 10
      }
      
    },
    {
      backgroundColor: '#3685fa',
      image: <Image source={require('../../assets/ilustra02.png')} />,
      title: 'Vamos lá!',
      titleStyles:{
        fontFamily: 'Nunito_800ExtraBold',
        fontSize: 29,
        marginRight: 10
        
      },
      subTitleStyles:{
        fontFamily: 'Nunito_600SemiBold',
        fontSize: 20,
        marginRight: 10
      },
      subtitle: 'Escolha um orfanato no mapa e agende uma visita :)',
    }
    
  ]}
  bottomBarColor='#3685fa'
  onDone={startApp}
  onSkip={startApp}
  />
  )
}
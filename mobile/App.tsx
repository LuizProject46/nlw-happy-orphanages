
import React from 'react';
import {Image} from 'react-native'
import {useFonts} from 'expo-font'
import {Nunito_600SemiBold,Nunito_700Bold,Nunito_800ExtraBold} from '@expo-google-fonts/nunito'

import Routes from './src/routes'
import Onboarding from 'react-native-onboarding-swiper'
export default function App() {

  const [fonstLoaded] = useFonts({
    Nunito_600SemiBold,
    Nunito_700Bold,
    Nunito_800ExtraBold
  })
if(!fonstLoaded){
  return null;
}
  return (
   
    <Routes/>
    
  );
}


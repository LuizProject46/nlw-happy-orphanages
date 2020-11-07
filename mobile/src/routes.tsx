import React from 'react'

import {NavigationContainer} from  '@react-navigation/native'


import { createStackNavigator} from  '@react-navigation/stack'
import OrphanagesMap from './pages/OrphanagesMap'
import OrphanageDetails from './pages/OrphanageDetails'
import SelectMapPosition from './pages/CreateOrphanage/SelectMapPosition'
import OrphanageData from './pages/CreateOrphanage/OrphangeData'
import Header from './components/Header'
import OnboardingApp from './components/OnboardingApp'
const {Navigator,Screen} = createStackNavigator()

export default function Routes(){
  return(
    <NavigationContainer>
      <Navigator screenOptions={{headerShown: false,cardStyle:{backgroundColor:'#f2f3f5'}}}>
        <Screen name='Onboarding' component={OnboardingApp}/>
        <Screen name='OrphanagesMap' component={OrphanagesMap}/>
        
        <Screen name='OrphanageDetails' 
        component={OrphanageDetails}
        options={{
          headerShown: true,
          header: ()=><Header showCancel={false} title="Orfanato"/>
        }}
        />
        
        <Screen 
          name='SelectMapPos' 
          component={SelectMapPosition}
          options={{
            headerShown: true,
            header: ()=><Header title="Selecione o local no mapa"/>
          }}
          />
        
        <Screen 
        name='OrphanageData' 
        component={OrphanageData}
        options={{
          headerShown: true,
          header: ()=><Header title="Informe os dados do orfanato"/>
        }}
        />


      </Navigator>
    </NavigationContainer>
  )
}

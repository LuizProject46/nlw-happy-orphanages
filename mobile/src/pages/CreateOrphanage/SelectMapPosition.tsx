import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, Text ,ImageBackground} from 'react-native';

import { useNavigation, useRoute } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import MapView, { MapEvent, Marker } from 'react-native-maps';

import instrucaoImg from '../../../assets/instr_add.png'

import mapMarkerImg from '../../images/map-marker.png';

interface Location{
 
    latitude: number,
    longitude: number
  
}
export default function SelectMapPosition(prop:Location) {
  const navigation = useNavigation();
  const [position,setPosition] = useState({latitude: 0, longitude:0})
  
  const routes = useRoute()
  const currentLocation = routes.params as Location
  console.log(currentLocation)


  function handleNextStep() {
    navigation.navigate('OrphanageData',{position});
  }

  function handleSelectPosition(event: MapEvent){
    setPosition(event.nativeEvent.coordinate)

  }

  return (
    <View style={styles.container}>
      <ImageBackground style={styles.instrucaoDiv} source={instrucaoImg}>

      </ImageBackground>
        <MapView 
          initialRegion={{
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
            latitudeDelta: 0.008,
            longitudeDelta: 0.008, 
          }}
          style={styles.mapStyle}
          onPress={handleSelectPosition}
        >
        {position.latitude != 0 && (
            <Marker 
            icon={mapMarkerImg}
            coordinate={{ latitude: position.latitude, longitude: position.longitude }}
          />
        )}
        </MapView>
      
     

      {position.latitude != 0 && (
          <RectButton style={styles.nextButton} onPress={handleNextStep}>
          <Text style={styles.nextButtonText}>Próximo</Text>
        </RectButton>
      )}
      
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    
  },

  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },

  nextButton: {
    backgroundColor: '#0d6fff',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,

    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 40,
  },

  nextButtonText: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 16,
    color: '#FFF',
  },
  instrucaoDiv: {
    width: 50,
    height: 50
  
  }
})
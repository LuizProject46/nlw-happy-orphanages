import React,{useEffect,useState} from 'react'
import { StyleSheet, Text, View,Dimensions, TouchableOpacity } from 'react-native';
import MapView,{PROVIDER_GOOGLE,Marker,Callout} from 'react-native-maps'

import mapMarker from '../images/map-marker.png'
import {Feather} from '@expo/vector-icons'
import {useFonts} from 'expo-font'
import {Nunito_600SemiBold,Nunito_700Bold,Nunito_800ExtraBold} from '@expo-google-fonts/nunito'
import { useNavigation,useFocusEffect, useRoute } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import api from '../services/api';

import * as Location from 'expo-location'


interface Orphanage{
  id: number;
  name: string;
  latitude: number;
  longitude: number;

}

interface LocationGPS{
  latitude: number;
  longitude: number;

}




export default function OrphanagesMap(){
  const navigation = useNavigation()
  const [orphanages,setOrphanages] = useState<Orphanage[]>([])
  const [location,setLocation] = useState<LocationGPS>({latitude: 0,longitude: 0});

  
  

  useFocusEffect(()=>{
 
    api.get('orphanages').then(res=>{
      
      setOrphanages(res.data)
      
    })
  })

  useEffect(()=>{
    (async () =>{
      let { status } = await Location.requestPermissionsAsync()
     
      if (status != 'granted') {
        alert('Permission to access location was denied');
        return;
      }

      let local = await Location.getCurrentPositionAsync({});
     
      const {latitude,longitude} = local.coords 
    
      
      console.log(local.coords)
      
      setLocation({
        latitude:latitude,
        longitude: longitude
      });
    })
    
    
    
   
  },[])

  function handleNavigateCreateOrphanage(){
    navigation.navigate('SelectMapPos',location)
  }
  function  handleNavigateDetails(id: number){
    navigation.navigate('OrphanageDetails',{id})
  }
  return (
    <View style={styles.container}>
   
    <MapView 
    provider={PROVIDER_GOOGLE}
    style={styles.map} 
    initialRegion={{
      latitude:  location.latitude,
      longitude:  location.longitude,
      latitudeDelta: 0.008,
      longitudeDelta: 0.008
    }}>
      {orphanages.map(orphanage =>{
        return (  
          <Marker
          key={orphanage.id}
          calloutAnchor={{
            x: 2.7,
            y: 0.8
          }}
          icon={mapMarker}
          coordinate={
            {
              latitude: orphanage.latitude,
              longitude: orphanage.longitude,
            }
          }
          >
          <Callout onPress={()=>handleNavigateDetails(orphanage.id)
          } tooltip={true}>
            <View style={styles.calloutContainer}>
              <Text style={styles.calloutText}>{orphanage.name}</Text>
            </View>
            
            
          </Callout>
        </Marker>
        )
      })}
     
     

     
    </MapView>

    <View style={styles.footer}>
        <Text style={styles.footerText}>
         {orphanages.length} orfanatos encontrado(s)
        </Text>
        <RectButton
        style={styles.createOrphanage} onPress={handleNavigateCreateOrphanage}
        >
          <Feather name='plus' size={20} color='#fff'/>
        </RectButton>
    </View>
    
      
  </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
   
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },

  calloutContainer:{
    width: 160,
    height: 46,
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 16,
    justifyContent: 'center',
    elevation: 3
  },
  calloutText:{
    color: '#3685fa',
    fontSize: 16,
    fontFamily: 'Nunito_700Bold',
  },
  footer:{
    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 32,

    backgroundColor: '#fff',
    borderRadius: 20,
    height: 56,
    paddingLeft: 24,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 3
  },
  footerText:{
    color: '#8fa7b3',
    fontFamily: 'Nunito_700Bold',
    
  },
  createOrphanage:{
    width:56,
    height: 56,
    backgroundColor: '#3685fa',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',

  }
});

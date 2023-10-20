import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import AppNavigator from './src/routes/AppNavigator'
import SplashScreen from 'react-native-splash-screen'

const App = () => {


  useEffect(()=>{
  SplashScreen.hide();
  })


  return (
    <>
    
    <AppNavigator/>
    </>
  )
}

export default App

const styles = StyleSheet.create({})
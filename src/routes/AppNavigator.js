import {StyleSheet} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Dashboard from './Dashboard';

const AppNavigator = () => {
  return (
    <>
      <NavigationContainer>
        <Dashboard />
      </NavigationContainer>
    </>
  );
};

export default AppNavigator;

const styles = StyleSheet.create({});

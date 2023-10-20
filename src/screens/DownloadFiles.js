import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Header from '../components/Header';
import BackIcon from '../assets/Icon/BackIcon';
import {useNavigation} from '@react-navigation/native';

const DownloadFiles = ({route}) => {
  const viewPolicyImages = route.params.images;

  console.log('my page', viewPolicyImages);
  const navigation = useNavigation();
  return (
    <View style={{backgroundColor: '#fff', height: '100%'}}>
      <Header />

      <View style={{padding: 20}}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Tab');
          }}>
          <BackIcon />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DownloadFiles;

const styles = StyleSheet.create({});

import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import CrossIcon from '../assets/drawer/CrossIcon';
import ProfileIcon from '../assets/drawer/ProfileIcon';
import ContactIcon from '../assets/drawer/ContactIcon';
import LogoutIcon from '../assets/drawer/LogoutIcon';
import {DrawerActions} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL} from '../screens/Api';
import PencilIcon from '../assets/Icon/PencilIcon';
import axios from 'axios';

const CustomDrawer = () => {
  const navigation = useNavigation();

  const [profile, setProfile] = useState();
  const [name, setName] = useState();
  const getUserData = async () => {
    const user = await AsyncStorage.getItem('userInfo');
    const userId = JSON.parse(user).data.id;

    fetch(`${BASE_URL}/user-details?user_id=${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(res => {
        setProfile(res.data.user_data.profile_image);
        setName(res.data.user_data.first_name);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  useEffect(() => {
    getUserData();
  }, [navigation.getState()]);
  //logOut

  const logOut = async () => {
    await AsyncStorage.removeItem('userInfo');
    navigation.navigate('Login');
  };
  return (
    <View style={{padding: 20}}>
      <View style={styles.firstContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.dispatch(DrawerActions.closeDrawer());
          }}>
          <CrossIcon style={styles.crossButton} />
        </TouchableOpacity>
        <Image
          source={
            profile ==
            'https://dev.codesmile.in/bimahelpdesk/public/user_images'
              ? require('../assets/images/profile.png')
              : {uri: profile}
          }
          resizeMode="contain"
          style={{
            alignSelf: 'center',
            width: 120,
            height: 120,
            borderWidth: 2,
            borderColor: '#F76031',
            borderRadius: 150,
          }}
        />
        <Text style={styles.heading}>{name != null ? name : ''}</Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('EditProfile');
        }}>
        <View style={styles.secondContainer}>
          <View style={styles.thirdContainer}>
            <ProfileIcon />
            <Text>Profile</Text>
          </View>
          <View>
            <Image
              source={require('../assets/images/drawer-icon.png')}
              style={{marginTop: 4}}
            />
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Contact');
        }}>
        <View style={[styles.secondContainer, {marginTop: 9}]}>
          <View style={styles.thirdContainer}>
            <ContactIcon />
            <Text>Contact Us</Text>
          </View>
          <View>
            <Image
              source={require('../assets/images/drawer-icon.png')}
              style={{marginTop: 4}}
            />
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Privacy');
        }}>
        <View style={[styles.secondContainer, {marginTop: 9}]}>
          <View style={styles.thirdContainer}>
            <PencilIcon style={{marginTop: 4}} />
            <Text>Privacy Policy</Text>
          </View>
          <View>
            <Image
              source={require('../assets/images/drawer-icon.png')}
              style={{marginTop: 4}}
            />
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          logOut();
        }}>
        <View style={[styles.secondContainer, {marginTop: 9}]}>
          <View style={styles.thirdContainer}>
            <LogoutIcon style={{marginTop: 2}} />
            <Text>Log Out</Text>
          </View>
          <View>
            <Image
              source={require('../assets/images/drawer-icon.png')}
              style={{marginTop: 4}}
            />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  firstContainer: {
    alignSelf: 'center',
    backgroundColor: '#fff7e7',
    width: '100%',
    borderRadius: 10,
    paddingTop: 40,
    paddingBottom: 30,
  },
  heading: {
    fontFamily: 'Poppins',
    fontWeight: 900,
    fontSize: 25,
    color: '#F76031',
    textAlign: 'center',
    marginTop: 15,
  },
  crossButton: {
    position: 'absolute',
    top: -20,
    right: 15,
  },
  secondContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F6F6F6',
    borderRadius: 10,
    padding: 15,
    marginTop: 20,
  },
  thirdContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
  },
});

import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import MenuIcon from '../assets/headericon/MenuIcon';
import {useNavigation} from '@react-navigation/native';
import {DrawerActions} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL} from '../screens/Api';
import NotificationIcon from '../assets/headericon/Notification';
import axios from 'axios';
// import Spinner from 'react-native-loading-spinner-overlay/lib';

const Header = () => {
  const navigation = useNavigation();
  const [profile, setProfile] = useState();
  let [loading, setLoading] = useState(true);
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
      .then(data => {
        setProfile(data.data.user_data.profile_image);
      })
      .catch(error => {
        console.error('Error:', error);
        // setLoading(false);
      });
  };

  //Notification Data
  const [totalNotification, setTotalNotification] = useState();
  const getNotificationData = async () => {
    const user = await AsyncStorage.getItem('userInfo');
    const userId = JSON.parse(user).data.id;
    try {
      axios
        .get(`${BASE_URL}/get-notification?current_user_id=${userId}`)
        .then(res => {
          setTotalNotification(res.data.message);
        })
        .catch(e => {
          console.log('Error');
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
    getNotificationData();
  }, [navigation.getState()]);

  return (
    <View>
      <View style={styles.firstView}>
        <View
          style={{
            marginTop: 19,
            marginLeft: 20,
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.dispatch(DrawerActions.openDrawer());
            }}>
            <MenuIcon />
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Home');
            }}>
            <Image
              source={require('../assets/images/login-logo.png')}
              style={styles.image}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            gap: 10,
            marginTop: 13,
            paddingRight: 10,
          }}>
          <View>
            <Text
              style={{
                backgroundColor: '#F76031',
                color: '#fff',
                height: 17,
                width: 17,
                alignSelf: 'center',
                textAlign: 'center',
                borderRadius: 30,
                position: 'absolute',
                zIndex: 1,
                left: 14,
                top: 5,
                fontSize: 10,
                paddingTop: 1,
              }}>
              {totalNotification}
            </Text>
            <NotificationIcon
              style={{marginTop: 6}}
              onPress={() => {
                navigation.navigate('Notification');
              }}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('EditProfile');
            }}>
            <Image
              source={
                profile ==
                'https://dev.codesmile.in/bimahelpdesk/public/user_images'
                  ? require('../assets/images/profile.png')
                  : {uri: profile}
              }
              resizeMode="contain"
              style={styles.imageTwo}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  firstView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    elevation: 3,
    paddingTop: 5,
    paddingBottom: 5,
  },
  image: {
    marginLeft: 50,
    width: 75,
    height: 70,
  },
  imageTwo: {
    width: 50,
    height: 50,
    borderWidth: 2,
    borderColor: '#F76031',
    borderRadius: 50,
    marginTop: -2,
  },
});

import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {BASE_URL} from '../Api';
import Toaster from '../../components/Toaster';

const Login = () => {
  const [phone, setPhone] = useState('');

  const sendOtp = () => {
    axios
      .post(`${BASE_URL}/post-login`, {phone})
      .then(res => {
        let userInfo = res?.data;
        AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
        console.log(res.data.data.otp);
        console.log(res.data.data.phone);
        Toaster('please enter otp');
        navigation.navigate('Otp', {
          userPhone: res.data.data.phone,
          userOtp: res.data.data.otp,
        });
      })
      .catch(e => {
        Toaster('Error');
      });
  };

  const navigation = useNavigation();
  return (
    <ScrollView contentContainerStyle={{flex: 1, borderWidth: 1}}>
      <View style={styles.firstContainer}>
        <Image
          source={require('../../assets/images/login-logo.png')}
          style={styles.firstImage}
        />
        <Image
          source={require('../../assets/images/login.png')}
          style={styles.secondImage}
        />

        <Text style={styles.loginHeading}>Login with Phone Number</Text>
        <View>
          <View style={styles.loginInput}>
            <TextInput
              placeholder="Enter Mobile Number"
              style={{width: '90%'}}
              keyboardType="numeric"
              value={phone}
              onChangeText={e => setPhone(e)}
            />
            <Image
              source={require('../../assets/images/login-input.png')}
              style={{marginTop: 15, marginRight: 10}}
            />
          </View>
          <TouchableOpacity
            style={styles.loginBtn}
            onPress={() => {
              if (!phone) {
                Toaster('enter the required field');
              } else if (phone.length !== 10) {
                Toaster('enter valid number');
              } else {
                sendOtp();
              }
            }}>
            <Text
              style={{
                textAlign: 'center',
                color: '#fff',
                fontWeight: 700,
                fontFamily: 'Poppins',
                fontSize: 13,
              }}>
              Send OTP
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Login;

const styles = StyleSheet.create({
  firstContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  firstImage: {
    alignSelf: 'center',
  },
  secondImage: {
    height: 230,
    width: 250,
    alignSelf: 'center',
    marginTop: 30,
  },
  loginHeading: {
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontWeight: 900,
    fontSize: 20,
    color: '#000',
    lineHeight: 27,
    marginTop: 25,
  },
  loginInput: {
    backgroundColor: '#E9E9E9',
    borderRadius: 10,
    margin: 20,
    paddingLeft: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  loginBtn: {
    backgroundColor: '#009C9D',
    borderRadius: 5,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    alignSelf: 'center',
  },
});

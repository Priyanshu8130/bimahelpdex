import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import OtpInputs from 'react-native-otp-inputs';
import {useNavigation} from '@react-navigation/native';
import OtpBack from '../../assets/useicon/OtpBack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {BASE_URL} from '../Api';
import Toaster from '../../components/Toaster';
const Otp = ({route}) => {
  const navigation = useNavigation();
  const phone = route.params.userPhone;
  const userOtp = route.params.userOtp;
  console.log(userOtp);
  const [otp, setOtp] = useState();
  console.log(otp);
  const submitOtp = () => {
    axios
      .post(`${BASE_URL}/post-login-otp`, {otp, phone})
      .then(res => {
        let userInfo = res.data;
        AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));

        if (userInfo.data.is_active == 1) {
          navigation.navigate('Tab');
        } else {
          navigation.navigate('Profile', {
            userId: userInfo.data.id,
          });
        }
      })
      .catch(e => {
        Toaster('Error');
      });
  };
  return (
    <View style={styles.firstContainer}>
      <TouchableOpacity
        style={{
          position: 'absolute',
          top: 30,
          left: 30,
        }}
        onPress={() => {
          navigation.goBack();
        }}>
        <OtpBack />
      </TouchableOpacity>

      <Image
        source={require('../../assets/images/login-logo.png')}
        style={styles.firstImage}
      />

      <Text style={styles.loginHeading}>
        Phone Number{'\n'}
        Verification
      </Text>
      <Text style={styles.paraHeading}>
        Enter 6 digit code has been sent to {'\n'}
        +91-xxxxxxxxxx
      </Text>
      <Text style={{marginBottom: 10}}>Please Use This Otp: {userOtp}</Text>
      <View style={{height: 80, marginTop: -20}}>
        <OtpInputs
          handleChange={code => {
            setOtp(code);
          }}
          numberOfInputs={6}
          autofillFromClipboard
          inputStyles={{
            marginHorizontal: 6,
            backgroundColor: '#E9E9E9',
            width: 40,
            height: 40,
            borderRadius: 10,
            paddingLeft: 15,
          }}
        />
      </View>

      <TouchableOpacity
        style={styles.loginBtn}
        onPress={() => {
          if (otp.length !== 6) {
            Toaster('please fill the valid otp');
          } else if (userOtp == otp) {
            submitOtp();
          } else {
            Toaster('wrong otp');
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
          Submit OTP
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Otp;

const styles = StyleSheet.create({
  firstContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  firstImage: {
    alignSelf: 'center',
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
  paraHeading: {
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontWeight: 400,
    fontSize: 14,
    color: '#000',
    lineHeight: 21,
    marginTop: 25,
    marginBottom: 25,
  },

  loginBtn: {
    backgroundColor: '#009C9D',
    width: '30%',
    borderRadius: 5,
    padding: 10,
    alignSelf: 'center',
  },
});

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../components/Header';
import {Dropdown} from 'react-native-element-dropdown';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Support from '../components/Support';

const AddPolicy = () => {
  const navigation = useNavigation();
  const [value, setValue] = useState();

  //get user
  const getUserValue = async () => {
    const user = await AsyncStorage.getItem('userInfo');
    const userId = JSON.parse(user).data;
    setValue(userId.first_name);
  };
  useEffect(() => {
    getUserValue();
  }, []);

  return (
    <View style={{height: '100%'}}>
      <View>
        <Header />

        <ScrollView>
          <View style={{padding: 15}}>
            <View style={[styles.inputView, {marginTop: 10}]}>
              <Text
                style={{
                  fontFamily: 'Poppins',
                  fontWeight: 900,
                  fontSize: 15,
                  marginLeft: 7,
                  color: '#000',
                }}>
                {' '}
                Who are you uploading this policy for
              </Text>
              <View style={styles.secondView}></View>

              <Text style={styles.profileInputHeading}>
                Policy Holder Details
              </Text>
              <Text style={styles.dropdown}>{value}</Text>

              <TouchableOpacity
                style={styles.loginBtn}
                onPress={() => {
                  navigation.navigate('UploadPolicy');
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    color: '#fff',
                    fontWeight: 700,
                    fontFamily: 'Poppins',
                    fontSize: 13,
                  }}>
                  Confirm
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>

      <View
        style={{
          position: 'absolute',
          bottom: 10,
          left: 10,
        }}>
        <Support />
      </View>
    </View>
  );
};

export default AddPolicy;

const styles = StyleSheet.create({
  inputView: {
    marginTop: 20,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
    elevation: 1,
    margin: 5,
  },
  loginBtn: {
    backgroundColor: '#009C9D',
    width: '100%',
    borderRadius: 5,
    padding: 10,
    alignSelf: 'center',
    marginTop: 10,
  },
  profileInput: {
    backgroundColor: '#F6F6F6',
    borderRadius: 10,
    paddingLeft: 20,
    marginTop: 10,
    height: 200,
  },
  profileInputHeading: {
    fontFamily: 'Poppins',
    fontWeight: 400,
    fontSize: 12,
    color: '#000',
    marginLeft: 8,
    marginTop: 10,
  },
  radioView: {
    height: 40,
    width: 40,
    borderRadius: 7,
    paddingTop: 10,
    marginTop: 10,
    marginLeft: 6,
    backgroundColor: '#fff',
    elevation: 1,
  },
  radioMainView: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
  },
  radioImage: {
    alignSelf: 'center',
  },
  dropdown: {
    height: 45,
    borderColor: '#F6F6F6',
    borderWidth: 0.5,
    borderRadius: 8,

    marginTop: 10,
    backgroundColor: '#F6F6F6',
    paddingHorizontal: 20,
    paddingTop: 13,
  },

  placeholderStyle: {
    fontSize: 16,
    fontFamily: 'Poppins',
    fontWeight: 400,
    fontSize: 14,
  },
  selectedTextStyle: {
    fontSize: 16,
    fontFamily: 'Poppins',
    fontWeight: 400,
    fontSize: 14,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    fontFamily: 'Poppins',
    fontWeight: 400,
    fontSize: 14,
  },
  secondView: {
    borderBottomWidth: 1,
    borderBottomColor: '#DFDFDF',
    borderStyle: 'dashed',
    marginHorizontal: 10,
    marginTop: 20,
    marginBottom: 7,
  },
  deviceView: {
    height: 40,
    width: 40,
    borderRadius: 7,
    paddingTop: 10,
    marginTop: 10,
    marginLeft: 6,
    backgroundColor: '#fff',
    elevation: 1,
  },
  deviceHeading: {
    fontFamily: 'Poppins',
    fontWeight: 400,
    fontSize: 11,
    marginTop: 4,
    textAlign: 'center',
    width: 50,
  },
});

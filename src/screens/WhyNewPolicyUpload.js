import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../components/Header';
import {Dropdown} from 'react-native-element-dropdown';
import {useIsFocused, useNavigation} from '@react-navigation/native';

import {BASE_URL} from './Api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Toaster from '../components/Toaster';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import BackIconContact from '../assets/Icon/BackIconContact';
import Support from '../components/Support';
import Spinner from 'react-native-loading-spinner-overlay/lib';

const WhyNewPolicyUpload = () => {
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [family, setFamily] = useState(null);
  const [message, setMessage] = useState();
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const myData = date;
  const newData = moment(myData).format('YYYY-MM-DD');

  const data = [
    {label: 'Adult', value: 'Adult'},
    {label: 'Child', value: 'Child'},
    {label: 'Parents', value: 'Parents'},
    {label: 'In laws', value: 'In laws'},
  ];
  const emailRegex = new RegExp(
    '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$',
  );

  const newPolicy = async () => {
    const user = await AsyncStorage.getItem('userInfo');
    const userId = JSON.parse(user).data.id;
    setLoading(true);

    axios
      .post(`${BASE_URL}/save-buy-policy`, {
        user_id: userId,
        name: name,
        email: email,
        phone: phone,
        dob: newData,
        family_size: family,
        message: message,
        adult: adultValue,
        child: childValue,
        parent: parentsValue,
        in_laws: inlawsValue,
      })
      .then(res => {
        setLoading(false);

        Toaster('new policy save sucessfully');
        navigation.navigate('Tab');
        setName('');
        setEmail('');
        setPhone('');
        setFamily(null);
        setMessage('');
        setDate(new Date());
        setAdultValue(0);
        setChildValue(0);
        setParentsValue(0);
        setInlawsValue(0);
      })
      .catch(e => {
        console.log(`Error${e}`);
        setLoading(false);
      });
  };
  // famliy size

  const [childValue, setChildValue] = useState(0);
  const childIncreament = () => {
    setChildValue(childValue + 1);
  };

  const childDecreament = () => {
    const minValue = 0;
    if (childValue > minValue) {
      setChildValue(childValue - 1);
    }
  };
  const [adultValue, setAdultValue] = useState(0);
  const adultIncreament = () => {
    setAdultValue(adultValue + 1);
  };

  const adultDecreament = () => {
    const minValue = 0;
    if (adultValue > minValue) {
      setAdultValue(adultValue - 1);
    }
  };
  const [parentsValue, setParentsValue] = useState(0);
  const parentsIncreament = () => {
    setParentsValue(parentsValue + 1);
  };

  const parentsDecreament = () => {
    const minValue = 0;
    if (parentsValue > minValue) {
      setParentsValue(parentsValue - 1);
    }
  };
  const [inlawsValue, setInlawsValue] = useState(0);
  const inlawsIncreament = () => {
    setInlawsValue(inlawsValue + 1);
  };

  const inlawsDecreament = () => {
    const minValue = 0;
    if (inlawsValue > minValue) {
      setInlawsValue(inlawsValue - 1);
    }
  };
  return (
    <View>
      <Spinner visible={loading} color="#009C9D" />

      <View style={{marginBottom: 100}}>
        <Header />

        <ScrollView>
          <View style={{padding: 15, paddingBottom: 150, paddingTop: 30}}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Tab');
              }}
              style={{
                flexDirection: 'row',
                position: 'absolute',
                top: 10,
                left: 20,
                gap: 4,
              }}>
              <BackIconContact
                style={{
                  color: '#F76031',
                  marginTop: 3,
                }}
              />
              <Text
                style={{
                  color: '#F76031',
                  fontSize: 14,
                  fontWeight: 800,
                }}>
                Go Back
              </Text>
            </TouchableOpacity>
            <View style={styles.inputView}>
              <Text style={styles.profileInputHeading}>Name</Text>
              <TextInput
                style={styles.profileInput}
                placeholder="Name"
                value={name}
                onChangeText={e => setName(e)}
              />
              <Text style={styles.profileInputHeading}>Email</Text>
              <TextInput
                style={styles.profileInput}
                placeholder="Email"
                value={email}
                onChangeText={e => setEmail(e)}
              />
              <Text style={styles.profileInputHeading}>Phone</Text>
              <TextInput
                style={styles.profileInput}
                placeholder="Phone"
                keyboardType="numeric"
                value={phone}
                onChangeText={e => setPhone(e)}
              />
              <Text style={styles.profileInputHeading}>Date of Birth</Text>
              <View style={styles.loginInput}>
                <DatePicker
                  modal
                  open={open}
                  date={date}
                  mode="date"
                  onConfirm={date => {
                    setOpen(false);
                    setDate(date);
                  }}
                  onCancel={() => {
                    setOpen(false);
                  }}
                />
                <TouchableOpacity
                  onPress={() => {
                    setOpen(true);
                  }}
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingVertical: 18,
                    flex: 1,
                    paddingRight: 20,
                  }}>
                  <Text>{newData}</Text>

                  <Image source={require('../assets/images/calendar.png')} />
                </TouchableOpacity>
              </View>
              <View style={styles.secondView}></View>
              <Text style={styles.profileInputHeading}>Family Size</Text>

              <View style={styles.familyInput}>
                <View>
                  <Text style={styles.familyText}>Child</Text>
                </View>
                <View style={styles.increament}>
                  <TouchableOpacity
                    onPress={() => {
                      childDecreament();
                    }}>
                    <Text style={styles.firstText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.middleText}>{childValue}</Text>
                  <TouchableOpacity
                    onPress={() => {
                      childIncreament();
                    }}>
                    <Text style={styles.secondText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.familyInput}>
                <View>
                  <Text style={styles.familyText}>Adult</Text>
                </View>
                <View style={styles.increament}>
                  <TouchableOpacity
                    onPress={() => {
                      adultDecreament();
                    }}>
                    <Text style={styles.firstText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.middleText}>{adultValue}</Text>
                  <TouchableOpacity
                    onPress={() => {
                      adultIncreament();
                    }}>
                    <Text style={styles.secondText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.familyInput}>
                <View>
                  <Text style={styles.familyText}>Parents</Text>
                </View>
                <View style={styles.increament}>
                  <TouchableOpacity
                    onPress={() => {
                      parentsDecreament();
                    }}>
                    <Text style={styles.firstText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.middleText}>{parentsValue}</Text>
                  <TouchableOpacity
                    onPress={() => {
                      parentsIncreament();
                    }}>
                    <Text style={styles.secondText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.familyInput}>
                <View>
                  <Text style={styles.familyText}>In-Laws</Text>
                </View>
                <View style={styles.increament}>
                  <TouchableOpacity
                    onPress={() => {
                      inlawsDecreament();
                    }}>
                    <Text style={styles.firstText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.middleText}>{inlawsValue}</Text>
                  <TouchableOpacity>
                    <Text
                      style={styles.secondText}
                      onPress={() => {
                        inlawsIncreament();
                      }}>
                      +
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.secondView}></View>
              <TextInput
                style={styles.profileInputMessage}
                placeholder="Message"
                value={message}
                onChangeText={e => setMessage(e)}
              />
              <View style={styles.secondView}></View>

              <TouchableOpacity
                style={styles.loginBtn}
                onPress={() => {
                  if (!name || !message) {
                    Toaster('enter the require fields');
                  } else if (phone?.length !== 10) {
                    Toaster('invalid phone');
                  } else if (!emailRegex.test(email)) {
                    Toaster('invalid email');
                  } else {
                    newPolicy();
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
                  Submit
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: 100,
          left: 10,
        }}>
        <Support />
      </View>
    </View>
  );
};

export default WhyNewPolicyUpload;

const styles = StyleSheet.create({
  familyInput: {
    padding: 8,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  familyText: {
    fontSize: 15,
    marginTop: 4,
    color: '#000',
  },
  increament: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
  },
  inputView: {
    marginTop: 20,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
    elevation: 1,
    margin: 5,
  },
  profileInput: {
    backgroundColor: '#F6F6F6',
    borderRadius: 10,
    paddingLeft: 20,
    marginTop: 10,
  },
  loginBtn: {
    backgroundColor: '#009C9D',
    width: '100%',
    borderRadius: 5,
    padding: 10,
    alignSelf: 'center',
    marginTop: 10,
  },
  profileInputMessage: {
    backgroundColor: '#F6F6F6',
    borderRadius: 10,
    paddingLeft: 20,
    marginTop: 10,
    height: 200,
    textAlignVertical: 'top',
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
    paddingHorizontal: 10,
    marginHorizontal: 6,
    marginTop: 10,
    backgroundColor: '#F6F6F6',
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
  thirdView: {
    borderWidth: 1,
    borderColor: '#E9E9E9',
    borderRadius: 10,
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    marginTop: 10,
  },
  right: {
    width: 30,
    height: 30,
    position: 'absolute',
    right: 0,
    top: -15,
  },
  loginInput: {
    backgroundColor: '#F6F6F6',
    borderRadius: 10,
    paddingLeft: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  middleText: {
    backgroundColor: '#F5F5F5',
    width: 50,
    fontSize: 15,
    textAlign: 'center',
    paddingTop: 5,
    paddingBottom: 5,
    color: '#000',
    alignSelf: 'center',
  },
  firstText: {
    backgroundColor: '#F76031',
    color: '#fff',
    width: 20,
    fontSize: 20,
    borderRadius: 3,
    textAlign: 'center',
    paddingTop: 2,
    paddingBottom: 2,
  },
  secondText: {
    backgroundColor: '#F76031',
    color: '#fff',
    width: 20,
    fontSize: 20,
    borderRadius: 3,
    textAlign: 'center',
    paddingTop: 2,
    paddingBottom: 2,
  },
});

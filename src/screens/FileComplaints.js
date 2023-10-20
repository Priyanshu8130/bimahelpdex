import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../components/Header';
import {Dropdown} from 'react-native-element-dropdown';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import LifeIcon from '../assets/useicon/LifeIcon';
import HealthIcon from '../assets/useicon/HealthIcon';
import GeneralIcon from '../assets/useicon/GeneralIcon';
import {BASE_URL} from './Api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Toaster from '../components/Toaster';
import PolicyGeneralIcon from '../assets/Icon/PolicyGeneralIcon';
import PolicyLifeIcon from '../assets/Icon/PolicyLifeIcon';
import PolicyHealthIcon from '../assets/Icon/PolicyHealthIcon';
import DeviceIcon from '../assets/useicon/DeviceIcon';
import DocumentPicker from 'react-native-document-picker';
import Spinner from 'react-native-loading-spinner-overlay/lib';

import ImageIcon from '../assets/useicon/ImageIcon';
import Support from '../components/Support';
import {RefreshControl} from 'react-native-gesture-handler';
const FileComplaints = ({route}) => {
  const navigation = useNavigation();
  const [selectLife, setSelectLife] = useState(0);
  const [typeLife, setTypeLife] = useState('Life');
  const [selectHealth, setSelectHealth] = useState(1);
  const [typeHealth, setTypeHealth] = useState('Health');
  const [selectGeneral, setSelectGeneral] = useState(2);
  const [typeGeneral, setTypeGeneral] = useState('General');
  const [description, setDescription] = useState();
  const [complaint_type, setComplaintsType] = useState(null);
  const [loading, setLoading] = useState(false);

  const data = [
    {label: 'Mis-Selling', value: 'Mis-Selling'},
    {label: 'Claim Rejection', value: 'Claim Rejection'},
    {label: 'Insurance Fraud', value: 'Insurance Fraud'},
  ];

  const insuranceTypeLife = [
    {
      id: 1,
      icon: <LifeIcon />,
      name: 'Life',
    },
    {
      id: 2,
      icon: <HealthIcon />,
      name: 'Health',
    },
    {
      id: 3,
      icon: <GeneralIcon />,
      name: 'General',
    },
  ];
  const insuranceTypeHealth = [
    {
      id: 1,
      icon: <LifeIcon />,
      name: 'Life',
    },
    {
      id: 2,
      icon: <HealthIcon />,
      name: 'Health',
    },
    {
      id: 3,
      icon: <GeneralIcon />,
      name: 'General',
    },
  ];
  const insuranceTypeGenereal = [
    {
      id: 1,
      icon: <LifeIcon />,
      name: 'Life',
    },
    {
      id: 2,
      icon: <HealthIcon />,
      name: 'Health',
    },
    {
      id: 3,
      icon: <GeneralIcon />,
      name: 'General',
    },
  ];

  const policyId = route.params.policyId;
  const policyType = route.params.policyType;
  const policyName = route.params.policyName;
  const policyNumber = route.params.policyNumber;
  const policyCompany = route.params.policyCompany;

  //upload image
  const [multipleFile, setMultipleFile] = useState();
  const selectMultipleFile = async () => {
    try {
      const results = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.allFiles],
        allowMultiSelection: true,
      });
      for (const res of results) {
        console.log('res : ' + JSON.stringify(res));
        console.log('URI : ' + res.uri);
        console.log('Type : ' + res.type);
        console.log('File Name : ' + res.name);
        console.log('File Size  : ' + res.size);
      }

      setMultipleFile(results);
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        console.log('User Cancelled the upload', error);
      } else {
        console.log(error);
      }
    }
  };
  const [multipleImage, setMultipleImage] = useState();
  const selectMultipleImage = async () => {
    try {
      const results = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.images],
        allowMultiSelection: true,
      });
      for (const res of results) {
        console.log('res : ' + JSON.stringify(res));
        console.log('URI : ' + res.uri);
        console.log('Type : ' + res.type);
        console.log('File Name : ' + res.name);
        console.log('File Size  : ' + res.size);
      }

      setMultipleImage(results);
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        console.log('User Cancelled the upload', error);
      } else {
        console.log(error);
      }
    }
  };

  const uploadFileComplaint = async () => {
    const user = await AsyncStorage.getItem('userInfo');
    const userId = JSON.parse(user).data.id;

    try {
      const formData = new FormData();
      if (multipleFile != undefined && multipleFile.length > 0) {
        multipleFile.forEach((image, index) => {
          formData.append('images[]', {
            uri: image.uri,
            type: image.type,
            name:
              image.fileName ||
              `images${index}.${image.type.split('/')[1] || 'dat'}`,
          });
        });
      }
      if (multipleImage != undefined && multipleImage.length > 0) {
        multipleImage.forEach((image, index) => {
          formData.append('images[]', {
            uri: image.uri,
            type: image.type,
            name: image.fileName || `image${index}.jpg`,
          });
        });
      }
      formData.append(`complaint_type`, complaint_type);
      if (policyType == 'Life') {
        formData.append(`type`, typeLife);
      } else if (policyType == 'Health') {
        formData.append(`type`, typeHealth);
      } else {
        formData.append(`type`, typeGeneral);
      }

      formData.append(`policy_id`, policyId);
      formData.append(`description`, description);
      formData.append(`user_id`, userId.toString());

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      console.log('data=>', formData);
      setLoading(true);
      axios
        .post(`${BASE_URL}/user-save-complaint`, formData, config)
        .then(res => {
          setLoading(false);
          Toaster('complaint submit sucessfully');
          navigation.navigate('Complaint');
          setComplaintsType('');
          setDescription('');
          setMultipleFile(null);
          setMultipleImage(null);
        })
        .catch(e => {
          setLoading(false);

          console.log(`Errore${e}`);
        });
    } catch (err) {
      setLoading(false);

      console.log(err);
    }
  };

  return (
    <View style={{flex: 1}}>
      <View>
        <Spinner visible={loading} color="#009C9D" />
        <Header />
        <ScrollView>
          <View style={{padding: 15, paddingBottom: 150}}>
            <View style={styles.inputView}>
              <Text style={styles.profileInputHeading}>Insurance Type</Text>
              {policyType == 'General' ? (
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 10,
                    marginTop: 10,
                  }}>
                  {insuranceTypeGenereal.map((item, index) => {
                    return (
                      <View key={index}>
                        <TouchableOpacity
                          style={[
                            styles.deviceView,
                            {
                              backgroundColor:
                                selectGeneral === index ? '#F76031' : '#fff',
                            },
                          ]}
                          key={index}
                          onPress={() => {
                            setSelectGeneral(index), setTypeGeneral(item.name);
                          }}>
                          <Text style={{alignSelf: 'center'}}>{item.icon}</Text>
                        </TouchableOpacity>
                        <Text style={styles.deviceHeading}>{item.name}</Text>
                      </View>
                    );
                  })}
                </View>
              ) : policyType == 'Life' ? (
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 10,
                    marginTop: 10,
                  }}>
                  {insuranceTypeLife.map((item, index) => {
                    return (
                      <View key={index}>
                        <TouchableOpacity
                          style={[
                            styles.deviceView,
                            {
                              backgroundColor:
                                selectLife === index ? '#F76031' : '#fff',
                            },
                          ]}
                          key={index}
                          onPress={() => {
                            selectLife(index), setTypeLife(item.name);
                          }}>
                          <Text style={{alignSelf: 'center'}}>{item.icon}</Text>
                        </TouchableOpacity>
                        <Text style={styles.deviceHeading}>{item.name}</Text>
                      </View>
                    );
                  })}
                </View>
              ) : policyType == 'Health' ? (
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 10,
                    marginTop: 10,
                  }}>
                  {insuranceTypeHealth.map((item, index) => {
                    return (
                      <View key={index}>
                        <TouchableOpacity
                          style={[
                            styles.deviceView,
                            {
                              backgroundColor:
                                selectHealth === index ? '#F76031' : '#fff',
                            },
                          ]}
                          key={index}
                          onPress={() => {
                            setSelectHealth(index), setTypeHealth(item.name);
                          }}>
                          <Text style={{alignSelf: 'center'}}>{item.icon}</Text>
                        </TouchableOpacity>
                        <Text style={styles.deviceHeading}>{item.name}</Text>
                      </View>
                    );
                  })}
                </View>
              ) : (
                ''
              )}

              <Text style={[styles.profileInputHeading, {marginTop: 20}]}>
                Select Policy
              </Text>
              <View style={styles.thirdView}>
                <Image
                  source={require('../assets/images/right.png')}
                  style={styles.right}
                />
                <View
                  style={{
                    borderRightWidth: 1,
                    borderColor: '#E9E9E9',
                    width: 50,
                    alignItems: 'center',
                  }}>
                  {policyType == 'General' ? (
                    <PolicyGeneralIcon style={{}} />
                  ) : policyType == 'Life' ? (
                    <PolicyLifeIcon />
                  ) : policyType == 'Health' ? (
                    <PolicyHealthIcon />
                  ) : (
                    ''
                  )}
                  <Text
                    style={{
                      fontSize: 11,
                      color: '#000',
                      marginTop: 6,
                      alignSelf: 'center',
                    }}>
                    {policyType}
                  </Text>
                </View>
                <View
                  style={{
                    borderRightWidth: 1,
                    borderColor: '#E9E9E9',
                    width: 70,
                    marginLeft: 10,
                  }}>
                  <Text
                    style={{
                      fontSize: 11,
                      color: '#000',
                      marginTop: 4,
                      fontWeight: 700,
                    }}>
                    Nickname
                  </Text>
                  <Text
                    style={{
                      fontSize: 8,
                      color: '#000',
                      marginTop: 4,
                    }}>
                    {policyName}
                  </Text>
                </View>
                <View
                  style={{
                    borderRightWidth: 1,
                    borderColor: '#E9E9E9',
                    width: 70,
                    marginLeft: 10,
                  }}>
                  <Text
                    style={{
                      fontSize: 11,
                      color: '#000',
                      marginTop: 4,
                      fontWeight: 700,
                    }}>
                    Policy Number
                  </Text>
                  <Text
                    style={{
                      fontSize: 8,
                      color: '#000',
                      marginTop: 4,
                    }}>
                    {policyNumber}
                  </Text>
                </View>
                <View style={{width: 70, marginLeft: 10}}>
                  <Text
                    style={{
                      fontSize: 11,
                      color: '#000',
                      marginTop: 4,
                      fontWeight: 700,
                    }}>
                    Company
                  </Text>
                  <Text
                    style={{
                      fontSize: 8,
                      color: '#000',
                      marginTop: 4,
                    }}>
                    {policyCompany}
                  </Text>
                </View>
              </View>

              <View style={styles.secondView}></View>
              <Text style={styles.profileInputHeading}>Complaints Type</Text>
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                data={data}
                maxHeight={300}
                labelField="label"
                valueField="value"
                value={complaint_type}
                onChange={item => {
                  setComplaintsType(item.value);
                }}
              />
              <View style={styles.secondView}></View>
              <TextInput
                style={styles.profileInput}
                placeholder="Message"
                value={description}
                onChangeText={e => setDescription(e)}
              />
              <View style={styles.secondView}></View>
              <Text style={styles.profileInputHeading}>Select Image *</Text>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: 10,
                  marginTop: 10,
                }}>
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      selectMultipleFile();
                    }}>
                    <View
                      style={[styles.deviceView, {backgroundColor: '#F76031'}]}>
                      <DeviceIcon style={{alignSelf: 'center'}} />
                    </View>
                  </TouchableOpacity>
                  <Text style={styles.deviceHeading}>Device</Text>
                </View>
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      selectMultipleImage();
                    }}>
                    <View style={styles.deviceView}>
                      <ImageIcon style={{alignSelf: 'center'}} />
                    </View>
                  </TouchableOpacity>
                  <Text style={styles.deviceHeading}>Image</Text>
                </View>
                <View style={{marginTop: 25, marginLeft: 10}}>
                  {/* <Text>{image}</Text> */}
                </View>
              </View>
              <View style={{marginTop: 20, paddingLeft: 10}}>
                <FlatList
                  data={multipleFile}
                  renderItem={({item}) => {
                    return (
                      <>
                        <Text
                          style={{
                            fontSize: 12,
                            paddingRight: 15,
                            marginTop: 5,
                          }}>
                          {item.name}
                        </Text>
                        {/* <Image
                          source={{uri: item.uri}}
                          style={{
                            height: 100,
                            width: 100,
                            margin: 10,
                            marginLeft: 0,
                          }}
                        /> */}
                      </>
                    );
                  }}
                />
                <FlatList
                  data={multipleImage}
                  renderItem={({item}) => {
                    return (
                      <>
                        <Text
                          style={{
                            fontSize: 12,
                            paddingRight: 15,
                            marginTop: 5,
                          }}>
                          {item.name}
                        </Text>
                      </>
                    );
                  }}
                />
              </View>
              <View style={styles.secondView}></View>
              <TouchableOpacity
                style={styles.loginBtn}
                onPress={() => {
                  // if (!description || !complaint_type) {
                  //   Toaster(`"please fill all the required field"`);
                  // } else if (!multipleFile) {
                  //   Toaster(`"please upload files"`);
                  // } else {
                  //   uploadFileComplaint();
                  // }
                  if (!description || !complaint_type) {
                    Toaster('please fill all the required field');
                  } else {
                    uploadFileComplaint();
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
          bottom: 60,
          left: 10,
        }}>
        <Support />
      </View>
    </View>
  );
};

export default FileComplaints;

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
});

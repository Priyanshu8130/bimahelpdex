import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';

import React, {useState} from 'react';
import Header from '../components/Header';
import {Dropdown} from 'react-native-element-dropdown';
import DeviceIcon from '../assets/useicon/DeviceIcon';
import ImageIcon from '../assets/useicon/ImageIcon';
import LifeIcon from '../assets/useicon/LifeIcon';
import HealthIcon from '../assets/useicon/HealthIcon';
import GeneralIcon from '../assets/useicon/GeneralIcon';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {BASE_URL} from './Api';
import Toaster from '../components/Toaster';

import DocumentPicker from 'react-native-document-picker';
import {FlatList} from 'react-native-gesture-handler';
import FormData from 'form-data';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import Support from '../components/Support';

const UploadPolicy = () => {
  const navigation = useNavigation();
  const [select, setSelect] = useState(0);

  const [insurance_type, setMyInsuranceType] = useState('Life');
  const [policy_company, setInsuranceCompany] = useState(null);
  const [policy_number, setPolicyNumber] = useState();
  const [policy_name, setNickName] = useState();
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);

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

  const UploadPolicy = async () => {
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
      formData.append(`policy_company`, policy_company);
      formData.append(`policy_name`, policy_name);
      formData.append(`policy_number`, policy_number.toString());
      formData.append(`insurance_type`, insurance_type);
      formData.append(`user_id`, userId.toString());

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      console.log('data=>', formData);
      setLoading(true);

      axios
        .post(`${BASE_URL}/user-save-policy`, formData, config)
        .then(res => {
          setLoading(false);
          Toaster('policy saved sucessfully');
          navigation.navigate('Portfolio');
          setInsuranceCompany('');
          setPolicyNumber('');
          setNickName('');
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

  const insurance = [
    {
      label: 'Life Insurance Corporation of India',
      value: 'Life Insurance Corporation of India',
    },
    {
      label: 'HDFC Life Insurance Co. Ltd',
      value: 'HDFC Life Insurance Co. Ltd',
    },
    {
      label: 'Max Life Insurance Co. Ltd.',
      value: 'Max Life Insurance Co. Ltd.',
    },
    {
      label: 'ICICI Prudential Life Insurance Co. Ltd',
      value: 'ICICI Prudential Life Insurance Co. Ltd',
    },
    {
      label: 'Kotak Mahindra Life Insurance Co. Ltd.',
      value: 'Kotak Mahindra Life Insurance Co. Ltd.',
    },
    {
      label: 'Aditya Birla SunLife Insurance Co. Ltd.',
      value: 'Aditya Birla SunLife Insurance Co. Ltd.',
    },
    {
      label: 'TATA AIA Life Insurance Co. Ltd.',
      value: 'TATA AIA Life Insurance Co. Ltd.',
    },
    {
      label: 'SBI Life Insurance Co. Ltd.',
      value: 'SBI Life Insurance Co. Ltd.',
    },
    {
      label: 'Exide Life Insurance Co. Ltd.',
      value: 'Exide Life Insurance Co. Ltd.',
    },
    {
      label: 'Bajaj Allianz Life Insurance Co. Ltd.',
      value: 'Bajaj Allianz Life Insurance Co. Ltd.',
    },
    {
      label: 'PNB MetLife India Insurance Co. Ltd.',
      value: 'PNB MetLife India Insurance Co. Ltd.',
    },
    {
      label: 'Reliance Nippon Life Insurance Company Limited',
      value: 'Reliance Nippon Life Insurance Company Limited',
    },
    {
      label: 'Aviva Life Insurance Company India Ltd.',
      value: 'Aviva Life Insurance Company India Ltd.',
    },
    {
      label: 'Sahara India Life Insurance Co. Ltd.',
      value: 'Sahara India Life Insurance Co. Ltd.',
    },
    {
      label: 'Shriram Life Insurance Co. Ltd.',
      value: 'Shriram Life Insurance Co. Ltd.',
    },
    {
      label: 'Bharti AXA Life Insurance Company Ltd',
      value: 'Bharti AXA Life Insurance Company Ltd',
    },
    {
      label: 'Future Generali India Life Insurance Company Limited',
      value: 'Future Generali India Life Insurance Company Limited',
    },
    {
      label: 'IDBI Federal Life Insurance Company Limited',
      value: 'IDBI Federal Life Insurance Company Limited',
    },
    {
      label:
        'Canara HSBC Oriental Bank of Commerce Life Insurance Company Limited',
      value:
        'Canara HSBC Oriental Bank of Commerce Life Insurance Company Limited',
    },
    {
      label: 'Aegon Life Insurance Company Limited',
      value: 'Aegon Life Insurance Company Limited',
    },
    {
      label: 'Pramerica Life Insurance Co. Ltd.',
      value: 'Pramerica Life Insurance Co. Ltd.',
    },
    {
      label: 'Star Union Dai-Ichi Life Insurance Co. Ltd.',
      value: 'Star Union Dai-Ichi Life Insurance Co. Ltd.',
    },
    {
      label: 'IndiaFirst Life Insurance Company Ltd.',
      value: 'IndiaFirst Life Insurance Company Ltd.',
    },
    {
      label: 'Edelweiss Tokio Life Insurance Company Limited',
      value: 'Edelweiss Tokio Life Insurance Company Limited',
    },
    {
      label: 'Acko General Insurance Limited	',
      value: 'Acko General Insurance Limited	',
    },
    {
      label: 'Aditya Birla Health Insurance Company Limited',
      value: 'Aditya Birla Health Insurance Company Limited',
    },
    {
      label: 'Apollo Munich Health Insurance Company Limited',
      value: 'Apollo Munich Health Insurance Company Limited',
    },
    {
      label: 'Bajaj Allianz General Insurance Company Limited	',
      value: 'Bajaj Allianz General Insurance Company Limited	',
    },
    {
      label: 'Cholamandalam MS General Insurance Company Limited',
      value: 'Cholamandalam MS General Insurance Company Limited',
    },
    {
      label: 'Manipal Cigna Health Insurance Company Limited',
      value: 'Manipal Cigna Health Insurance Company Limited',
    },
    {
      label: 'DHFL General Insurance Limited',
      value: 'DHFL General Insurance Limited',
    },
    {
      label: 'Edelweiss General Insurance Company Limited',
      value: 'Edelweiss General Insurance Company Limited',
    },
    {
      label: 'Future Generali India Insurance Company Limited	',
      value: 'Future Generali India Insurance Company Limited	',
    },
    {
      label: 'Go Digit General Insurance Limited',
      value: 'Go Digit General Insurance Limited',
    },
    {
      label: 'HDFC Ergo General Insurance Company Limited',
      value: 'HDFC Ergo General Insurance Company Limited',
    },
    {
      label: 'ICICI Lombard General Insurance Company Limited	',
      value: 'ICICI Lombard General Insurance Company Limited	',
    },
    {
      label: 'IFFCO Tokio General Insurance Company Limited',
      value: 'IFFCO Tokio General Insurance Company Limited',
    },
    {
      label: 'Kotak Mahindra General Insurance Company Limited	',
      value: 'Kotak Mahindra General Insurance Company Limited',
    },

    {
      label: 'Liberty General Insurance Limited',
      value: 'Liberty General Insurance Limited',
    },
    {
      label: 'Magma HDI General Insurance Company Limited	',
      value: 'Magma HDI General Insurance Company Limited	',
    },
    {
      label: 'Max Bupa Health Insurance Company Limited',
      value: 'Max Bupa Health Insurance Company Limited',
    },
    {
      label: 'National Insurance Company Limited',
      value: 'National Insurance Company Limited',
    },
    {
      label: 'Raheja QBE General Insurance Company Limited',
      value: 'Raheja QBE General Insurance Company Limited',
    },
    {
      label: 'Reliance General Insurance Company Limited',
      value: 'Reliance General Insurance Company Limited	',
    },
    {
      label: 'Religare Health Insurance Company Limited',
      value: 'Religare Health Insurance Company Limited',
    },
    {
      label: 'Royal Sundaram General Insurance Company Limited',
      value: 'Royal Sundaram General Insurance Company Limited',
    },

    {
      label: 'SBI General Insurance Company Limited',
      value: 'SBI General Insurance Company Limited',
    },
    {
      label: 'Shriram General Insurance Company Limited	',
      value: 'Shriram General Insurance Company Limited',
    },

    {
      label: 'Star Health & Allied Insurance Company Limited',
      value: 'Star Health & Allied Insurance Company Limited',
    },
    {
      label: 'TATA AIG General Insurance Company Limited',
      value: 'TATA AIG General Insurance Company Limited',
    },
    {
      label: 'The New India Assurance Company Limited	',
      value: 'The New India Assurance Company Limited	',
    },
    {
      label: 'The Oriental Insurance Company Limited',
      value: 'The Oriental Insurance Company Limited',
    },
    {
      label: 'United India Insurance Company Limited',
      value: 'United India Insurance Company Limited',
    },
    {
      label: 'Universal Sompo General Insurance Company Limited',
      value: 'Universal Sompo General Insurance Company Limited	',
    },
    {
      label: 'Aditya Birla Health Insurance Co.Ltd.',
      value: 'Aditya Birla Health Insurance Co.Ltd.',
    },
    {
      label: 'Care Health Insurance Ltd',
      value: 'Care Health Insurance Ltd',
    },

    {
      label: ' 4 Niva Bupa Health Insurance Co Ltd.',
      value: ' 4 Niva Bupa Health Insurance Co Ltd.	',
    },
    {
      label: 'Star Health & Allied InsuranceCo.Ltd.	',
      value: 'Star Health & Allied InsuranceCo.Ltd.	',
    },
    {
      label: 'HDFC Ergo Health Insurance Company Limited',
      value: 'HDFC Ergo Health Insurance Company Limited',
    },
  ];

  const insuranceType = [
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

  //search

  const [isFocus, setIsFocus] = useState(false);
  const [value, setValue] = useState(null);
  const data = [
    {label: 'Item 1', value: '1'},
    {label: 'Item 2', value: '2'},
    {label: 'Item 3', value: '3'},
    {label: 'Item 4', value: '4'},
    {label: 'Item 5', value: '5'},
    {label: 'Item 6', value: '6'},
    {label: 'Item 7', value: '7'},
    {label: 'Item 8', value: '8'},
  ];
  return (
    <View style={{flex: 1}}>
      <View style={{marginBottom: 100}}>
        <Spinner visible={loading} color="#009C9D" />

        <Header />

        <ScrollView>
          <View style={{padding: 15, paddingBottom: 150}}>
            <View style={[styles.inputView, {paddingBottom: 20}]}>
              <Text style={styles.profileInputHeading}>Insurance Type</Text>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: 10,
                  marginTop: 10,
                }}>
                {insuranceType.map((item, index) => {
                  return (
                    <View key={index}>
                      <TouchableOpacity
                        style={[
                          styles.deviceView,
                          {
                            backgroundColor:
                              select === index ? '#F76031' : '#fff',
                          },
                        ]}
                        key={index}
                        onPress={() => {
                          setSelect(index), setMyInsuranceType(item.name);
                        }}>
                        <Text style={{alignSelf: 'center'}}>{item.icon}</Text>
                      </TouchableOpacity>
                      <Text style={styles.deviceHeading}>{item.name}</Text>
                    </View>
                  );
                })}
              </View>

              <Text style={styles.profileInputHeading}>Insurance Company</Text>

              <Dropdown
                style={[
                  {
                    height: 60,
                    borderColor: '#dfdfdf',
                    borderWidth: 0.5,
                    borderRadius: 8,
                    paddingHorizontal: 8,
                    marginTop: 10,
                  },
                  isFocus && {borderColor: 'blue'},
                ]}
                placeholderStyle={{
                  fontSize: 16,
                }}
                selectedTextStyle={{
                  fontSize: 13,
                  paddingLeft: 10,
                }}
                inputSearchStyle={{
                  height: 40,
                  fontSize: 16,
                }}
                iconStyle={{
                  width: 20,
                  height: 20,
                }}
                data={insurance}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? 'Select item' : '...'}
                searchPlaceholder="Search..."
                value={policy_company}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                  setInsuranceCompany(item.value);
                  setIsFocus(false);
                }}
              />
              <Text style={styles.profileInputHeading}>Policy Number</Text>
              <TextInput
                style={styles.profileInput}
                placeholder="Policy Number"
                keyboardType="numeric"
                value={policy_number}
                onChangeText={e => setPolicyNumber(e)}
              />

              <Text style={styles.profileInputHeading}>Policy Nick Name</Text>
              <TextInput
                style={styles.profileInput}
                placeholder="Nick Name"
                value={policy_name}
                onChangeText={e => setNickName(e)}
              />
            </View>
            <View style={[styles.inputView, {marginTop: 10}]}>
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
                  <Text>{image}</Text>
                </View>
              </View>
              <View style={{marginTop: 20, paddingLeft: 10}}>
                <FlatList
                  data={multipleFile}
                  // horizontal
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
                        <View></View>
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
                  if (
                    !insurance_type ||
                    !policy_company ||
                    !policy_number ||
                    !policy_name
                  ) {
                    Toaster('please fill all the required field');
                  } else {
                    UploadPolicy();
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

export default UploadPolicy;

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
    height: 55,
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
});

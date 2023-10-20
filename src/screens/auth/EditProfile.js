import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Pressable,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import React, {createRef, useEffect, useState} from 'react';
import BackIcon from '../../assets/Icon/BackIcon';
import EditIcon from '../../assets/Icon/EditIcon';
import Calendar from '../../assets/Icon/Calendar';
import AddressIcon from '../../assets/Icon/AddressIcon';
import EmailIcon from '../../assets/Icon/EmailIcon';
import PhoneIcon from '../../assets/Icon/PhoneIcon';
import PanIcon from '../../assets/Icon/PanIcon';
import AadharIcon from '../../assets/Icon/AadharIcon';
import PencilIcon from '../../assets/Icon/PencilIcon';
import {useNavigation} from '@react-navigation/native';
import GenderIcon from '../../assets/Icon/GenderIcon';
import {ScrollView} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import {BASE_URL} from '../Api';
import CameraIcon from '../../assets/Icon/CameraIcon';
import DocumentPicker from 'react-native-document-picker';
import ImagePicker from 'react-native-image-crop-picker';
import ActionSheet from 'react-native-actions-sheet';
import RNFetchBlob from 'rn-fetch-blob';
import DeviceIcon from '../../assets/useicon/DeviceIcon';
import ImageIcon from '../../assets/useicon/ImageIcon';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import Toaster from '../../components/Toaster';
import {Dropdown} from 'react-native-element-dropdown';

const selectionCamera = createRef();

const EditProfile = () => {
  const navigation = useNavigation();
  let [loading, setLoading] = useState(true);

  const [profileData, setProfileData] = useState({});
  const [imageFile, setImageFile] = useState();
  const [image, setimage] = useState();
  //update edit profile
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [gender, setGenrder] = useState();
  const [dob, setDob] = useState();
  const [address, setAddress] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [pan, setPan] = useState();
  const [aadhar, setAadhar] = useState();
  const todayDate = new Date();
  const todayUpdatedDate = moment(todayDate).format('YYYY-MM-DD');
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const myData = date;
  const newData = moment(myData).format('YYYY-MM-DD');

  //get profile values
  const getUserData = async () => {
    setLoading(true);
    const user = await AsyncStorage.getItem('userInfo');

    const userId = JSON.parse(user).data.id;
    try {
      axios
        .get(`${BASE_URL}/user-details?user_id=${userId}`)
        .then(res => {
          console.log('user ka detail', res.data.data.user_data.profile_image);
          setProfileData(res.data.data.user_data);
          setFirstName(res.data.data.user_data.first_name);
          setLastName(res.data.data.user_data.last_name);
          setGenrder(res.data.data.user_data.gender);
          setDob(res.data.data.user_data.dob);
          setAddress(res.data.data.user_data.address);
          setEmail(res.data.data.user_data.email);
          setPhone(res.data.data.user_data.phone.toString());
          setPan(res.data.data.user_data.pancard_no);
          setAadhar(res.data.data.user_data.aadhar_no);
          setimage(
            res.data.data.user_data.profile_image !== null
              ? `${res.data.data.user_data.profile_image}`
              : '',
          );
          setLoading(false);
        })
        .catch(e => {
          setLoading(false);
          console.log('Error');
        });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserData();
  }, [navigation.getState()]);

  const updateProfile = async () => {
    console.log('hello', imageFile);
    const user = await AsyncStorage.getItem('userInfo');
    const userId = JSON.parse(user).data.id;

    try {
      //with imagefile
      const d = [
        imageFile,
        {
          name: 'first_name',
          data: firstName.toString(),
        },
        {
          name: 'last_name',
          data: lastName.toString(),
        },
        {
          name: 'email',
          data: email.toString(),
        },
        {
          name: 'gender',
          data: gender.toString(),
        },
        {
          name: 'id',
          data: userId.toString(),
        },
        {
          name: 'dob',
          data: newData.toString(),
        },
        {
          name: 'aadhar_no',
          data: aadhar.toString(),
        },
        {
          name: 'pancard_no',
          data: pan.toString(),
        },
        {
          name: 'address',
          data: address.toString(),
        },
      ];
      //without imagefile
      const e = [
        {
          name: 'first_name',
          data: firstName.toString(),
        },
        {
          name: 'last_name',
          data: lastName.toString(),
        },
        {
          name: 'email',
          data: email.toString(),
        },
        {
          name: 'gender',
          data: gender.toString(),
        },
        {
          name: 'id',
          data: userId.toString(),
        },
        {
          name: 'dob',
          data: newData.toString(),
        },
        {
          name: 'aadhar_no',
          data: aadhar.toString(),
        },
        {
          name: 'pancard_no',
          data: pan.toString(),
        },
        {
          name: 'address',
          data: address.toString(),
        },
      ];
      if (imageFile == undefined) {
        setimage(image);
        console.log('data=>', e);
        setLoading(true);
        RNFetchBlob.fetch(
          'POST',
          `${BASE_URL}/edit-profile`,
          {
            'Content-Type': 'multipart/form-data',
          },
          e,
        )
          .then(resp => {
            // =AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
            setLoading(false);
            if (JSON.parse(resp.data).status == 200) {
              getUserData();
              Toaster('profile update successfully');
              console.log('sucess ');
            }
          })
          .catch(err => {
            setLoading(false);
          });
      } else {
        console.log('data with image=>', d);
        setLoading(true);
        RNFetchBlob.fetch(
          'POST',
          `${BASE_URL}/edit-profile`,
          {
            'Content-Type': 'multipart/form-data',
          },
          d,
        )
          .then(resp => {
            // AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
            setLoading(false);
            if (JSON.parse(resp.data).status == 200) {
              getUserData();
              Toaster('profile update successfully');
              console.log('sucess with image');
            }
          })
          .catch(err => {
            setLoading(false);
          });
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const launchCamera = () => {
    setTimeout(() => {
      ImagePicker.openCamera({
        width: 300,
        height: 300,
        mediaType: 'photo',
        cropping: true,
      }).then(image => {
        const data = {
          name: 'image',
          filename: image.path.toString(),
          type: image.mime,
          data: RNFetchBlob.wrap(image.path),
        };
        setimage(image.path);
        setImageFile(data);
      });
    }, 500);
  };

  const launchImageLibrary = () => {
    setTimeout(() => {
      ImagePicker.openPicker({
        width: 300,
        height: 300,
        cropping: true,
      }).then(image => {
        const data = {
          name: 'image',
          filename: image.path.toString(),
          type: image.mime,
          data: RNFetchBlob.wrap(image.path),
        };
        console.log(data, '====>');
        setimage(image.path);
        setImageFile(data);
      });
    }, 500);
  };
  const strongRegex = new RegExp(
    '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$',
  );
  const adharRegex =
    /^([0-9]{4}[0-9]{4}[0-9]{4}$)|([0-9]{4}\s[0-9]{4}\s[0-9]{4}$)|([0-9]{4}-[0-9]{4}-[0-9]{4}$)/;

  var panregex = /[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
  const data = [
    {label: 'Male ', value: 'Male'},
    {label: 'Female', value: 'Female'},
    {label: 'Other', value: 'Other'},
  ];
  return (
    <View>
      <Spinner visible={loading} color="#009C9D" />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{marginBottom: 50}}>
          <View style={styles.firstView}>
            <View>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Tab');
                }}>
                <BackIcon />
              </TouchableOpacity>
            </View>

            <View style={{display: 'flex', flexDirection: 'row', gap: 5}}>
              <EditIcon />
              <Text
                style={{
                  fontFamily: 'Poppins',
                  fontWeight: 900,
                  fontSize: 15,
                  color: '#000',
                  marginTop: -3,
                }}>
                User Profile
              </Text>
            </View>
          </View>
          <View style={styles.imageView}>
            <View style={{position: 'relative'}}>
              <Image
                source={
                  image ==
                  'https://dev.codesmile.in/bimahelpdesk/public/user_images'
                    ? require('../../assets/images/profile.png')
                    : {uri: image}
                }
                style={{
                  height: 120,
                  width: 120,
                  borderWidth: 2,
                  borderRadius: 100,
                  borderColor: '#F76031',
                  resizeMode: 'contain',
                  alignSelf: 'center',
                }}
              />

              <TouchableOpacity
                onPress={() => selectionCamera.current?.show()}
                style={{position: 'absolute', bottom: 1, right: 5}}>
                <CameraIcon />
              </TouchableOpacity>
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignSelf: 'center',
              }}>
              <Text
                style={{
                  fontFamily: 'Poppins',
                  fontWeight: 900,
                  fontSize: 16,
                  color: '#000',
                  alignSelf: 'center',
                  marginTop: 10,
                }}>
                {profileData.name}
              </Text>
            </View>
          </View>
          <View style={styles.inputView}>
            <View style={styles.inputSecondView}>
              <View style={styles.thirdView}>
                <PencilIcon style={{marginTop: 6}} />
                <Text style={styles.inputHeading}>First Name</Text>
              </View>
              <View style={{width: '60%'}}>
                <TextInput
                  style={styles.input}
                  value={firstName}
                  onChangeText={e => setFirstName(e)}
                />
              </View>
            </View>
            <View style={styles.inputSecondView}>
              <View style={styles.thirdView}>
                <PencilIcon style={{marginTop: 6}} />
                <Text style={styles.inputHeading}>Last Name</Text>
              </View>
              <View style={{width: '60%'}}>
                <TextInput
                  style={styles.input}
                  value={lastName}
                  onChangeText={e => setLastName(e)}
                />
              </View>
            </View>
            <View style={styles.inputSecondView}>
              <View style={styles.thirdView}>
                <GenderIcon />
                <Text style={styles.inputHeading}>Gender</Text>
              </View>
              <View>
                {/* <TextInput
                  style={styles.input}
                  value={gender}
                  onChangeText={e => setGenrder(e)}
                /> */}
                <Dropdown
                  style={styles.dropdown}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  data={data}
                  maxHeight={300}
                  labelField="label"
                  iconStyle={{display: 'none'}}
                  valueField="value"
                  value={gender}
                  onChange={item => {
                    setGenrder(item.value);
                  }}
                />
              </View>
            </View>
            <View style={styles.inputSecondView}>
              <View style={styles.thirdView}>
                <Calendar />
                <Text style={styles.inputHeading}>Date of Birth</Text>
              </View>

              <View style={{width: '60%'}}>
                <DatePicker
                  modal
                  open={open}
                  date={date}
                  mode="date"
                  onConfirm={choose => {
                    setOpen(false);
                    setDate(choose);
                  }}
                  onCancel={() => {
                    setOpen(false);
                  }}
                />
                <TouchableOpacity
                  onPress={() => {
                    setOpen(true);
                  }}>
                  <Text style={{textAlign: 'right', marginTop: 5}}>
                    {newData == todayUpdatedDate ? dob : newData}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.inputSecondView}>
              <View style={styles.thirdView}>
                <AddressIcon />
                <Text style={styles.inputHeading}>Address</Text>
              </View>
              <View style={{width: '60%'}}>
                <TextInput
                  style={styles.input}
                  value={address}
                  onChangeText={e => setAddress(e)}
                />
              </View>
            </View>
            <View style={styles.inputSecondView}>
              <View style={styles.thirdView}>
                <EmailIcon />
                <Text style={styles.inputHeading}>Email</Text>
              </View>
              <View style={{width: '60%'}}>
                <TextInput
                  style={styles.input}
                  value={email}
                  onChangeText={e => setEmail(e)}
                />
              </View>
            </View>
            <View style={styles.inputSecondView}>
              <View style={styles.thirdView}>
                <PhoneIcon />
                <Text style={styles.inputHeading}>Phone</Text>
              </View>
              <View style={{width: '60%'}}>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  value={phone}
                  onChangeText={e => setPhone(e)}
                />
              </View>
            </View>
            <View style={styles.inputSecondView}>
              <View style={styles.thirdView}>
                <PanIcon />
                <Text style={styles.inputHeading}>PAN Number</Text>
              </View>
              <View style={{width: '60%'}}>
                <TextInput
                  style={styles.input}
                  value={pan}
                  onChangeText={e => setPan(e)}
                />
              </View>
            </View>
            <View style={styles.inputSecondView}>
              <View style={styles.thirdView}>
                <AadharIcon />
                <Text style={styles.inputHeading}>Aadhar Number</Text>
              </View>
              <View style={{width: '50%'}}>
                <TextInput
                  style={styles.input}
                  value={aadhar}
                  onChangeText={e => setAadhar(e)}
                  keyboardType="number-pad"
                />
              </View>
            </View>
            <TouchableOpacity
              style={styles.loginBtn}
              onPress={() => {
                if (!firstName || !lastName || !address) {
                  Toaster('please enter all the require fields');
                } else if (!strongRegex.test(email)) {
                  Toaster('invalid email');
                } else if (phone.length !== 10) {
                  Toaster('invalid phone');
                } else if (!adharRegex.test(aadhar)) {
                  Toaster('invalid aadhar');
                } else if (!panregex.test(pan)) {
                  Toaster('invalid pan');
                } else {
                  updateProfile();
                }
                // updateProfile();
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
      <ActionSheet
        ref={selectionCamera}
        containerStyle={{
          backgroundColor: '#F5F5F5',
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
          height: 200,
        }}>
        <View
          style={{
            paddingHorizontal: 20,
            paddingTop: 15,
          }}>
          <TouchableOpacity
            style={{
              width: '100%',
              alignItems: 'center',
              backgroundColor: '#FFB411',
              padding: 10,
              borderRadius: 10,
              marginTop: 10,
              alignSelf: 'center',
            }}
            onPress={() => {
              launchCamera();
              selectionCamera.current?.hide();
            }}>
            {/* <DeviceIcon /> */}

            <Text
              style={{
                color: '#fff',
                fontSize: 15,
                fontWeight: '500',
                fontFamily: 'Poppins-SemiBold',
              }}>
              Take a Picture
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              alignSelf: 'center',
              alignItems: 'center',
              backgroundColor: '#FFB411',
              padding: 10,
              width: '100%',
              borderRadius: 10,
              marginTop: 10,
            }}
            onPress={() => {
              launchImageLibrary();
              selectionCamera.current?.hide();
            }}>
            <Text
              style={{
                color: '#fff',
                fontSize: 15,
                fontWeight: '500',
                fontFamily: 'Poppins-SemiBold',
                textAlign: 'center',
              }}>
              Choose from gallery
            </Text>
          </TouchableOpacity>
          <Pressable
            onPress={() => {
              selectionCamera.current?.hide();
            }}
            style={{
              backgroundColor: '#FFB411',
              padding: 10,
              borderRadius: 10,
              marginTop: 10,
            }}>
            <Text
              style={{
                color: '#fff',
                fontSize: 15,
                fontWeight: '500',
                fontFamily: 'Poppins-SemiBold',
                textAlign: 'center',
              }}>
              Cancel
            </Text>
          </Pressable>
        </View>
      </ActionSheet>
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  firstView: {
    display: 'flex',
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'space-between',
    marginTop: 10,
  },
  imageView: {
    alignSelf: 'center',
    marginTop: 20,
  },
  loginBtn: {
    backgroundColor: '#009C9D',
    width: '100%',
    borderRadius: 5,
    padding: 10,
    alignSelf: 'center',
    marginTop: 10,
  },
  inputView: {
    marginTop: 20,
    padding: 20,
    borderRadius: 8,
    backgroundColor: '#fff',
    elevation: 2,
    margin: 20,
  },
  inputSecondView: {
    backgroundColor: '#F6F6F6',
    borderRadius: 8,
    display: 'flex',
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between',
    marginTop: 10,
  },
  thirdView: {
    flexDirection: 'row',
    gap: 9,
    marginTop: 4,
  },
  inputHeading: {
    fontFamily: 'Poppins',
    fontWeight: 400,
    fontSize: 13,
    marginTop: 3,
    lineHeight: 18,
  },
  input: {
    padding: 0,
    margin: 0,
    textAlign: 'right',
    color: '#787878',
    fontSize: 13,
  },
  placeholderStyle: {
    fontSize: 1,
    fontFamily: 'Poppins',
    fontWeight: 400,
  },
  selectedTextStyle: {
    fontFamily: 'Poppins',
    fontWeight: 400,
    fontSize: 13,
    textAlign: 'right',
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 1,
    fontFamily: 'Poppins',
    fontWeight: 400,
  },
  dropdown: {
    width: 100,
    fontSize: 1,
  },
});

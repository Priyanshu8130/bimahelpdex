import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import CheckBox from '@react-native-community/checkbox';
import {useNavigation} from '@react-navigation/native';
import DatePicker from 'react-native-date-picker';
import MaleIcon from '../../assets/useicon/MaleIcon';
import FemaleIcon from '../../assets/useicon/FemaleIcon';
import OthersIcon from '../../assets/useicon/OthersIcon';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {BASE_URL} from '../Api';
import Toaster from '../../components/Toaster';
import moment from 'moment';
import Spinner from 'react-native-loading-spinner-overlay/lib';

const Profile = ({route}) => {
  const id = route.params.userId;
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [open, setOpen] = useState(false);
  const [select, setSelect] = useState(0);

  const [first_name, setFirstName] = useState(null);
  const [last_name, setLastName] = useState(null);
  const [email, setEmail] = useState(null);
  const [gender, setGender] = useState('Male');
  const [date, setDate] = useState(new Date());
  const [aadhar_no, setAadhar] = useState(null);
  const [pancard_no, setPan] = useState(null);
  const [address, setAddress] = useState(null);
  const myData = date;

  const newData = moment(myData).format('YYYY-MM-DD');

  const completeProfile = () => {
    setLoading(true);

    axios
      .post(`${BASE_URL}/profile-complete`, {
        id: id,
        first_name,
        last_name,
        email,
        gender,
        dob: newData,
        aadhar_no,
        pancard_no,
        address,
      })
      .then(res => {
        setLoading(false);

        let userInfo = res.data;
        AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
        Toaster(res.data.message);
        navigation.navigate('Tab');
      })
      .catch(e => {
        Toaster('user email already registered');
        console.log(`Error email${e}`);
        setLoading(false);
      });
  };

  const genderValue = [
    {
      id: 1,
      icon: <MaleIcon />,
      name: 'Male',
    },
    {
      id: 2,
      icon: <FemaleIcon />,
      name: 'Female',
    },
    {
      id: 3,
      icon: <OthersIcon />,
      name: 'Others',
    },
  ];
  const strongRegex = new RegExp(
    '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$',
  );
  const adharRegex =
    /^([0-9]{4}[0-9]{4}[0-9]{4}$)|([0-9]{4}\s[0-9]{4}\s[0-9]{4}$)|([0-9]{4}-[0-9]{4}-[0-9]{4}$)/;

  var panregex = /[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

  return (
    <View style={{padding: 20}}>
      <Spinner visible={loading} color="#009C9D" />

      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.profileHeading}>Complete Your Profile</Text>

        <View style={styles.inputView}>
          <Text style={styles.profileInputHeading}>Name</Text>
          <TextInput
            style={styles.profileInput}
            placeholder="First Name"
            value={first_name}
            onChangeText={e => setFirstName(e)}
          />
          <TextInput
            style={styles.profileInput}
            placeholder="Last Name"
            value={last_name}
            onChangeText={e => setLastName(e)}
          />

          <Text style={styles.profileInputHeading}>Email</Text>
          <TextInput
            style={styles.profileInput}
            placeholder="Email"
            value={email}
            onChangeText={e => setEmail(e)}
          />
          <Text style={styles.profileInputHeading}>Gender</Text>

          <View style={[styles.radioMainView, {marginBottom: 20}]}>
            {genderValue.map((item, index) => {
              return (
                <TouchableOpacity
                  style={{
                    height: 40,
                    width: 40,
                    borderRadius: 7,
                    paddingTop: 10,
                    marginTop: 10,
                    marginLeft: 6,
                    backgroundColor: select === index ? '#009C9D' : '#fff',
                    elevation: 1,
                  }}
                  key={index}
                  onPress={() => {
                    setSelect(index), setGender(item.name);
                  }}>
                  <Text style={{alignSelf: 'center'}}>{item.icon}</Text>
                  <Text
                    style={{
                      marginTop: 13,
                      textAlign: 'center',
                      fontFamily: 'Poppins',
                      fontWeight: 400,
                      fontSize: 12,
                      color: '#000',
                    }}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

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

              <Image source={require('../../assets/images/calendar.png')} />
            </TouchableOpacity>
          </View>
          <Text style={styles.profileInputHeading}>Aadhar Number</Text>
          <TextInput
            style={styles.profileInput}
            placeholder=" xxxxxxxxxxxx"
            value={aadhar_no}
            onChangeText={e => setAadhar(e)}
            keyboardType="numeric"
          />
          <Text style={styles.profileInputHeading}>PAN Number</Text>
          <TextInput
            style={styles.profileInput}
            placeholder="xxxxxxxxxxxx"
            value={pancard_no}
            onChangeText={e => setPan(e)}
          />
          <Text style={styles.profileInputHeading}>Address</Text>
          <TextInput
            style={styles.profileInput}
            value={address}
            onChangeText={e => setAddress(e)}
          />
        </View>
        <View style={[styles.inputView, {marginTop: 8}]}>
          <View style={styles.checkView}>
            <CheckBox
              disabled={false}
              value={toggleCheckBox}
              onValueChange={newValue => setToggleCheckBox(newValue)}
              tintColors={{true: '#FFB411', false: 'black'}}
            />
            <Text
              style={{
                color: '#000',
                fontFamily: 'Poppins',
                fontWeight: 400,
                fontSize: 12,
                lineHeight: 16,
              }}>
              I hereby accept the{' '}
              <Text style={{color: '#F76031'}}>Term & Conditions</Text> and have
              read the <Text style={{color: '#F76031'}}> Privacy Policy</Text>
            </Text>
          </View>
          <TouchableOpacity
            style={styles.loginBtn}
            onPress={() => {
              if (!first_name || !last_name || !address) {
                Toaster('please enter all the require fields');
              } else if (!strongRegex.test(email)) {
                Toaster('invalid email');
              } else if (!adharRegex.test(aadhar_no)) {
                Toaster('invalid aadhar');
              } else if (!panregex.test(pancard_no)) {
                Toaster('invalid pan');
              } else if (!toggleCheckBox) {
                Toaster('please check the terms & conditions');
              } else {
                completeProfile();
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
      </ScrollView>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  profileHeading: {
    fontFamily: 'Poppins',
    fontWeight: 900,
    fontSize: 18,
    color: '#000',
    marginLeft: 8,
  },
  profileInputHeading: {
    fontFamily: 'Poppins',
    fontWeight: 400,
    fontSize: 12,
    color: '#000',
    marginLeft: 8,
    marginTop: 10,
  },
  profileInput: {
    backgroundColor: '#F6F6F6',
    borderRadius: 10,
    paddingLeft: 20,
    marginTop: 10,
  },
  inputView: {
    marginTop: 20,
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    elevation: 2,
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
  checkView: {
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
    paddingRight: 27,
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
  loginInput: {
    backgroundColor: '#F6F6F6',
    borderRadius: 10,
    paddingLeft: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});

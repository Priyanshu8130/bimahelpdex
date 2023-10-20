import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../components/Header';
import {BASE_URL} from './Api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {FlatList} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import Support from '../components/Support';

const Notification = () => {
  const navigation = useNavigation();
  const [notificationData, setNotificationData] = useState();
  const [toalNotification, setTotalNotification] = useState();
  const [loading, setLoading] = useState(false);

  const getNotification = async () => {
    setLoading(true);

    const user = await AsyncStorage.getItem('userInfo');
    const userId = JSON.parse(user).data.id;
    try {
      axios
        .get(`${BASE_URL}/get-notification?current_user_id=${userId}`)
        .then(res => {
          setTotalNotification(res.data.message);
          setNotificationData(res.data.data);
          setLoading(false);
        })
        .catch(e => {
          console.log('Error');
        });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getNotification();
  }, []);

  return (
    <>
      <View>
        <View style={{marginBottom: 170}}>
          <Spinner visible={loading} color="#009C9D" />

          <Header />

          <View style={{padding: 20}}>
            <Text style={styles.heading}>Notification({toalNotification})</Text>

            <FlatList
              data={notificationData}
              renderItem={({item}) => {
                return (
                  <TouchableWithoutFeedback
                    onPress={() => {
                      navigation.navigate('ViewComplaint', {
                        notificationId: item.complaint_id,
                      });
                    }}>
                    <View style={styles.box}>
                      <View>
                        <Image
                          source={require('../assets/images/profile.png')}
                          style={{width: 50, height: 50}}
                        />
                      </View>
                      <View>
                        <Text style={styles.name}>admin</Text>
                        <Text style={styles.para}>{item.message}</Text>
                      </View>
                    </View>
                  </TouchableWithoutFeedback>
                );
              }}
            />
          </View>
        </View>
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: 30,
          left: 10,
        }}>
        <Support />
      </View>
    </>
  );
};

export default Notification;

const styles = StyleSheet.create({
  heading: {
    fontFamily: 'Poppins',
    fontWeight: 900,
    fontSize: 19,
    color: '#000',
    textAlign: 'center',
  },
  box: {
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 2,
    marginTop: 15,
    padding: 20,
    display: 'flex',
    flexDirection: 'row',
    gap: 15,
  },
  name: {
    color: '#FFB411',
    fontFamily: 'Poppins',
    fontWeight: 500,
    fontSize: 14,
    marginTop: 4,
    width: 200,
  },
  para: {
    color: '#000',
    fontFamily: 'Poppins',
    fontWeight: 500,
    fontSize: 10,
    marginTop: 6,
    width: 200,
  },
});

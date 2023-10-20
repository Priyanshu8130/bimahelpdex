import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../components/Header';
import {BASE_URL} from './Api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import Support from '../components/Support';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import Toaster from '../components/Toaster';
import SendIcon from '../assets/Icon/SendIcon';

const ViewComplaint = ({route}) => {
  const navigation = useNavigation();
  const complaintId = route.params.notificationId;
  const [loading, setLoading] = useState(false);

  const [complaintSingleData, setComplaintSingleData] = useState('');
  const [chatData, setChatData] = useState();
  const [userProfileId, setUserProfileId] = useState();

  const getComplaintsDetails = () => {
    setLoading(true);

    try {
      axios
        .get(`${BASE_URL}/user-complaint-detail?complaint_id=${complaintId}`)
        .then(res => {
          setComplaintSingleData(res.data.data);
          setChatData(res.data.data.get_chat_detail);
          setUserProfileId(res.data.data.get_user.id);
          setLoading(false);
        })
        .catch(e => {
          console.log('Error');
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  // const isFocused = useIsFocused;

  useEffect(() => {
    getComplaintsDetails();
  }, [navigation.getState()]);

  //add comment

  return (
    <View style={{flex: 1}}>
      <View>
        <Spinner visible={loading} color="#009C9D" />

        <Header />
        <ScrollView>
          <View style={{padding: 20, marginBottom: 150}}>
            <Text
              style={{
                color: '#000',
                fontSize: 15,
                fontWeight: 800,
              }}>
              <Text style={{color: '#F76031'}}>User </Text> Details
            </Text>
            <View style={styles.firstView}>
              <Text style={{color: '#000', fontWeight: 400, fontSize: 12}}>
                Name
              </Text>
              <Text style={{fontSize: 12}}>
                {complaintSingleData.get_user != undefined
                  ? complaintSingleData.get_user.first_name
                  : ''}{' '}
                {complaintSingleData.get_user != undefined
                  ? complaintSingleData.get_user.last_name
                  : ''}
              </Text>
            </View>

            <View style={styles.firstView}>
              <Text style={{color: '#000', fontWeight: 400, fontSize: 12}}>
                Phone{' '}
              </Text>
              <Text style={{fontSize: 12}}>
                {complaintSingleData.get_user != undefined
                  ? complaintSingleData.get_user.phone
                  : ''}
              </Text>
            </View>
            <View style={styles.firstView}>
              <Text style={{color: '#000', fontWeight: 400, fontSize: 12}}>
                Email
              </Text>
              <Text style={{fontSize: 12}}>
                {complaintSingleData.get_user != undefined
                  ? complaintSingleData.get_user.email
                  : ''}
              </Text>
            </View>
            <Text
              style={{
                color: '#000',
                fontSize: 15,
                fontWeight: 800,
                marginBottom: 5,
                marginTop: 10,
              }}>
              <Text style={{color: '#F76031'}}>Complaint </Text> Details
            </Text>
            <View style={styles.firstView}>
              <Text style={{color: '#000', fontWeight: 400, fontSize: 12}}>
                Complaint Type
              </Text>
              <Text style={{fontSize: 12}}>
                {complaintSingleData.complaint_type}
              </Text>
            </View>
            <View style={styles.firstView}>
              <Text style={{color: '#000', fontWeight: 400, fontSize: 12}}>
                Description
              </Text>
              <Text style={{fontSize: 12}}>
                {complaintSingleData.description}
              </Text>
            </View>
            <View style={{marginTop: 20}}>
              <FlatList
                horizontal
                data={complaintSingleData.get_complaint_image}
                renderItem={({item}) => {
                  return (
                    <Image
                      source={
                        item.image.split('.').pop().toLowerCase() == 'pdf'
                          ? require('../assets/images/pdf.png')
                          : {
                              uri: `https://dev.codesmile.in/bimahelpdesk/public/user_images/${item.image}`,
                            }
                      }
                      resizeMode="contain"
                      style={{
                        width: 70,
                        height: 70,
                        borderRadius: 10,
                        marginTop: 10,
                        margin: 10,
                        marginLeft: 0,
                      }}
                    />
                  );
                }}
              />
            </View>
            <Text
              style={{
                color: '#000',
                fontSize: 15,
                fontWeight: 800,
                marginBottom: 5,
                marginTop: 10,
              }}>
              <Text style={{color: '#F76031'}}>Policy </Text> Details
            </Text>

            <View style={styles.firstView}>
              <Text style={{color: '#000', fontWeight: 400, fontSize: 12}}>
                Insurance Type
              </Text>
              <Text style={{fontSize: 12}}>
                {complaintSingleData.get_policy != undefined
                  ? complaintSingleData.get_policy.insurance_type
                  : ''}
              </Text>
            </View>
            <View style={styles.firstView}>
              <Text style={{color: '#000', fontWeight: 400, fontSize: 12}}>
                Policy Company
              </Text>
              <Text style={{fontSize: 12, paddingLeft: 10}}>
                {complaintSingleData.get_policy != undefined
                  ? complaintSingleData.get_policy.policy_company
                  : ''}
              </Text>
            </View>
            <View style={styles.firstView}>
              <Text style={{color: '#000', fontWeight: 400, fontSize: 12}}>
                Policy Name
              </Text>
              <Text style={{fontSize: 12}}>
                {complaintSingleData.get_policy != undefined
                  ? complaintSingleData.get_policy.policy_name
                  : ''}
              </Text>
            </View>
            <View style={styles.firstView}>
              <Text style={{color: '#000', fontWeight: 400, fontSize: 12}}>
                Policy Number
              </Text>
              <Text style={{fontSize: 12}}>
                {complaintSingleData.get_policy != undefined
                  ? complaintSingleData.get_policy.policy_number
                  : ''}
              </Text>
            </View>
            <View style={{marginTop: 20}}>
              <FlatList
                horizontal
                data={complaintSingleData.get_policy_image}
                renderItem={({item}) => {
                  return (
                    <Image
                      source={
                        item.image.split('.').pop().toLowerCase() == 'pdf'
                          ? require('../assets/images/pdf.png')
                          : {
                              uri: `https://dev.codesmile.in/bimahelpdesk/public/user_images/${item.image}`,
                            }
                      }
                      resizeMode="contain"
                      style={{
                        width: 70,
                        height: 70,
                        borderRadius: 10,
                        marginTop: 10,
                        margin: 10,
                        marginLeft: 0,
                      }}
                    />
                  );
                }}
              />
            </View>

            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Chat', {
                  complaintSingleId: complaintSingleData.id,
                  chatData: chatData,
                  myProfileId: userProfileId,
                });
              }}
              style={{
                backgroundColor: '#009C9D',
                padding: 15,
                marginTop: 20,
                borderRadius: 10,
              }}>
              <Text
                style={{textAlign: 'center', color: '#fff', fontWeight: 700}}>
                Chat with Admin
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>

      <View
        style={{
          position: 'absolute',
          bottom: 20,
          left: 10,
        }}>
        <Support />
      </View>
    </View>
  );
};

export default ViewComplaint;

const styles = StyleSheet.create({
  firstView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#DFDFDF',
    borderStyle: 'dashed',
    paddingBottom: 8,
  },
  modalInput: {
    backgroundColor: '#e6e6e6',
    height: 40,
    borderRadius: 10,
    paddingLeft: 20,
    textAlignVertical: 'top',
  },
  loginBtn: {
    backgroundColor: '#FFB411',
    width: '100%',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    marginBottom: 50,
  },
  letterHeading: {
    backgroundColor: '#ffb411',
    width: 40,
    height: 40,
    borderRadius: 30,
    fontWeight: 900,
    fontSize: 25,
    color: '#fff',
    paddingTop: 2,
    paddingLeft: 3,
    textAlign: 'center',
  },
});

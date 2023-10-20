import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {BASE_URL} from './Api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toaster from '../components/Toaster';
import WhiteBackIcon from '../assets/Icon/WhiteBackIcon';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay/lib';

const Chat = ({route}) => {
  const navigation = useNavigation();
  //routes
  const complaintSingleId = route.params.complaintSingleId;
  const userProfileId = route.params.myProfileId;

  const [comment, setComment] = useState();
  const addComment = async () => {
    setComment('');
    const user = await AsyncStorage.getItem('userInfo');
    const userId = JSON.parse(user).data.id;
    try {
      axios
        .post(`${BASE_URL}/send-message`, {
          sender_id: userId,
          complaint_id: complaintSingleId,
          message: comment,
        })
        .then(res => {
          // Toaster(`"message send succesfully"`);
          getComplaintsDetails();
        })
        .catch(e => {
          console.log(`Error view complaint${e}`);
        });
    } catch (error) {
      console.log(error);
    }
  };

  //refresh
  const [loading, setLoading] = useState(false);

  const [chatData, setChatData] = useState();
  console.log(chatData);
  const getComplaintsDetails = () => {
    setLoading(true);

    try {
      axios
        .get(
          `${BASE_URL}/user-complaint-detail?complaint_id=${complaintSingleId}`,
        )
        .then(res => {
          setChatData(res.data.data.get_chat_detail);

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
  const isFocused = useIsFocused;

  useEffect(() => {
    getComplaintsDetails();
  }, [navigation.getState()]);

  return (
    <View style={{flex: 1}}>
      <Spinner visible={loading} color="#009C9D" />

      <ImageBackground
        source={require('../assets/images/chat.jpg')}
        style={{
          flex: 1,
          paddingBottom: 60,
        }}>
        <View
          style={{
            backgroundColor: '#009C9D',
            padding: 15,
            display: 'flex',
            flexDirection: 'row',
            gap: 5,
          }}>
          <WhiteBackIcon style={{marginTop: 4}} />
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Tab');
            }}>
            <Text style={{color: '#fff'}}>Go Back</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          inverted={true}
          style={{
            padding: 20,
          }}
          contentContainerStyle={{paddingBottom: 50}}
          data={chatData}
          renderItem={({item}) => {
            return (
              <>
                {item.sender_id == userProfileId ? (
                  <Text style={styles.rightText}>{item.message}</Text>
                ) : (
                  <Text style={styles.leftText}>{item.message}</Text>
                )}
              </>
            );
          }}
        />
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            marginTop: 30,
            position: 'absolute',
            bottom: 10,
            padding: 15,
            gap: 10,
          }}>
          <TextInput
            placeholder="send message"
            style={{
              width: '77%',
              backgroundColor: '#e9e9e9',
              borderRadius: 10,
              color: '#000',
              paddingLeft: 20,
              fontSize: 12,
              height: 40,
            }}
            value={comment}
            onChangeText={e => setComment(e)}
          />
          <TouchableOpacity
            onPress={() => {
              addComment();
            }}
            style={{
              backgroundColor: '#009C9D',
              height: 39,
              borderRadius: 10,
              width: '20%',
              paddingTop: 8,
            }}>
            <Text
              style={{
                color: '#fff',
                alignSelf: 'center',
              }}>
              Send
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({
  rightText: {
    textAlign: 'right',
    fontSize: 12,
    fontWeight: 700,
    marginTop: 10,
    backgroundColor: '#F76031',
    color: '#fff',
    alignSelf: 'flex-end',
    padding: 8,
    borderRadius: 5,
  },
  leftText: {
    textAlign: 'left',
    fontSize: 12,
    fontWeight: 700,
    marginTop: 10,
    backgroundColor: '#fff',
    color: '#000',
    padding: 8,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
});

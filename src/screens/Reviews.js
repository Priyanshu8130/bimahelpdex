import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  FlatList,
  TouchableOpacity,
  Button,
  TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../components/Header';
import Review from '../assets/Reviews/Review';
import Support from '../components/Support';
import {BASE_URL} from './Api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import {Rating, AirbnbRating} from 'react-native-ratings';
import Modal from 'react-native-modal';
import ModalIcon from '../assets/Icon/ModalIcon';
import CrossModalIcon from '../assets/Icon/CrossModalIcon';
import Toaster from '../components/Toaster';
import {useNavigation, useIsFocused} from '@react-navigation/native';
const Reviews = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [userName, setUserName] = useState();
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  let [loading, setLoading] = useState(true);
  const [reviewData, setReviewData] = useState();

  const getReviews = async () => {
    const user = await AsyncStorage.getItem('userInfo');
    const userId = JSON.parse(user).data.id;
    const userFirstName = JSON.parse(user).data.first_name;
    setUserName(userFirstName);
    try {
      axios
        .get(`${BASE_URL}/user-get-reviews`)
        .then(res => {
          setReviewData(res.data.data.review_data);
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
  const isFocused = useIsFocused();
  useEffect(() => {
    getReviews();
  }, [isFocused]);

  //post reviews
  const [reviewInput, setReviewInput] = useState();
  const [rating, setRating] = useState();
  const submitReviews = async () => {
    const user = await AsyncStorage.getItem('userInfo');
    const userId = JSON.parse(user).data.id;

    axios
      .post(`${BASE_URL}/user-save-reviews`, {
        user_id: userId,
        review: reviewInput,
        rating: rating,
      })
      .then(res => {
        Toaster('review sucessfully edit');
        navigation.navigate('Tab');
      })
      .catch(e => {
        console.log(`Errore${e}`);
      });
  };

  const navigation = useNavigation();
  return (
    <View style={{flex: 1}}>
      <View style={{marginBottom: 245}}>
        <Spinner visible={loading} color="#009C9D" />

        <Header />

        <View style={{padding: 30, paddingRight: 25, paddingTop: 15}}>
          <Text style={styles.heading}>Reviews</Text>

          <FlatList
            data={reviewData}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => {
              return (
                <View style={styles.box}>
                  <View
                    style={{
                      backgroundColor: '#009C9D',
                      width: 40,
                      height: 40,
                      borderRadius: 100,
                      position: 'absolute',
                      left: -12,
                      top: 8,
                      alignSelf: 'center',
                      alignItems: 'center',
                      textAlign: 'center',
                    }}>
                    <Text style={styles.letterHeading}>
                      {item.user_details.first_name.charAt(0)}
                    </Text>
                  </View>
                  <View style={styles.imagetwo}>
                    <Image
                      source={require('../assets/images/home/review.png')}
                    />
                  </View>

                  <Text style={styles.name}>
                    {item.user_details.first_name}
                  </Text>
                  <Text style={styles.para}>{item.review}</Text>
                  <View
                    style={{
                      position: 'absolute',
                      bottom: 6,
                      right: 10,
                    }}>
                    <AirbnbRating
                      size={14}
                      showRating={false}
                      count={item.rating}
                      unSelectedColor="#F76031"
                      selectedColor="#F76031"
                    />
                  </View>
                </View>
              );
            }}
          />

          <Modal isVisible={isModalVisible}>
            <View style={styles.modal}>
              <TouchableOpacity
                onPress={toggleModal}
                style={{
                  position: 'absolute',
                  right: -5,
                  top: -12,
                }}>
                <CrossModalIcon />
              </TouchableOpacity>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  gap: 5,
                  marginBottom: 10,
                }}>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 5,
                  }}>
                  <ModalIcon />
                  <Text style={{fontWeight: 900, color: '#000', marginTop: 6}}>
                    {userName}
                  </Text>
                </View>
                <View style={{marginTop: 3}}>
                  <AirbnbRating
                    count={5}
                    size={14}
                    defaultRating={0}
                    showRating={false}
                    onFinishRating={rating => setRating(rating)}
                  />
                </View>
              </View>
              <TextInput
                placeholder="Type review"
                style={styles.modalInput}
                value={reviewInput}
                onChangeText={e => setReviewInput(e)}
              />
              <TouchableOpacity
                style={styles.loginBtn}
                onPress={() => {
                  if (!reviewInput) {
                    Toaster('please fill the field');
                  } else if (!rating) {
                    Toaster('please give rating');
                  } else {
                    submitReviews();
                    toggleModal();
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
          </Modal>

          <View
            style={{
              alignSelf: 'flex-end',
              position: 'absolute',
              bottom: 45,
              right: 20,
            }}>
            <TouchableOpacity onPress={toggleModal}>
              <View
                style={{
                  backgroundColor: '#F76031',
                  height: 50,
                  width: 50,
                  borderRadius: 50,
                  marginTop: 10,
                  paddingTop: 15,
                }}>
                <Review
                  style={{
                    alignSelf: 'center',
                  }}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
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

export default Reviews;

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
    padding: 40,
    paddingTop: 10,
    paddingBottom: 40,
    borderRadius: 10,
    elevation: 0,
    marginTop: 20,
    marginLeft: 15,
    marginRight: 8,
  },
  name: {
    color: '#F76031',
    fontFamily: 'Poppins',
    fontWeight: 700,
    fontSize: 15,
  },
  para: {
    color: '#000',
    fontFamily: 'Poppins',
    fontWeight: 500,
    fontSize: 12,
    lineHeight: 13,
    marginTop: 6,
  },
  image: {
    position: 'absolute',
    top: 13,
    left: -15,
  },
  imagetwo: {
    position: 'absolute',
    top: -14,
    right: 15,
    backgroundColor: '#fff',
    height: 25,
    width: 25,
    borderRadius: 30,
    elevation: 3,
    alignItems: 'center',
    paddingTop: 8,
  },
  letterHeading: {
    fontWeight: 900,
    fontSize: 25,
    color: '#fff',
    alignSelf: 'center',
  },
  modalInput: {
    backgroundColor: '#e6e6e6',
    height: 200,
    borderRadius: 10,
    paddingLeft: 20,
    textAlignVertical: 'top',
  },
  loginBtn: {
    backgroundColor: '#009C9D',
    width: '100%',
    borderRadius: 5,
    padding: 10,
    alignSelf: 'center',
    marginTop: 10,
  },
  modal: {
    backgroundColor: '#fff',
    padding: 25,
    borderRadius: 10,
  },
});

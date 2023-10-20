import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  ScrollView,
  ImageBackground,
  Image,
  TouchableOpacity,
  BackHandler,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../components/Header';
import ProfileIcon from '../assets/home/ProfileIcon';
import Complaints from '../assets/home/Complaints';
import PolicyIcon from '../assets/home/PolicyIcon';
import FileIcon from '../assets/home/FileIcon';
import {FlatList} from 'react-native-gesture-handler';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL} from './Api';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import NewPolicyIcon from '../assets/home/NewPolicyIcon';
import Support from '../components/Support';
const width = Dimensions.get('screen');
console.log(width);
const Home = () => {
  const [bannerTextData, setBannerTextData] = useState();
  let [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const bannerData = async () => {
    setLoading(true);

    try {
      axios
        .get(`${BASE_URL}/user-dashboard`)
        .then(res => {
          console.log(res.data.data.whyus);
          setBannerTextData(res.data.data.whyus);
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
  const [reviewData, setReviewData] = useState();

  const getReviews = async () => {
    const user = await AsyncStorage.getItem('userInfo');
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
  useEffect(() => {
    const handleBackButton = () => {
      navigation.navigate('Tab');
      return true;
    };

    BackHandler.addEventListener('hardwareBackPress', handleBackButton);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
    };
  }, []);
  const isFocused = useIsFocused;
  useEffect(() => {
    bannerData();
    getReviews();
  }, [navigation.getState()]);

  const data = [{}];
  const imageUrl = 'https://dev.codesmile.in/bimahelpdesk/public/user_images';

  return (
    <>
      <View>
        <View style={{marginBottom: 50}}>
          <Spinner visible={loading} color="#009C9D" />

          <Header />

          <ScrollView>
            <View style={styles.firstContainer}>
              <Text style={styles.heading}>Why Us ?</Text>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={bannerTextData}
                renderItem={({item}) => {
                  return (
                    <>
                      <ImageBackground
                        resizeMode="contain"
                        source={{
                          uri: `${imageUrl}/${item.image}`,
                        }}
                        style={styles.bannerImage}>
                        <Text style={styles.bannerText}>
                          {item.description}
                        </Text>
                      </ImageBackground>
                    </>
                  );
                }}
              />
            </View>
            <View style={{padding: 8, paddingTop: 0}}>
              <Text style={[styles.heading, {marginLeft: 10}]}>
                Quick Links
              </Text>
              <View style={styles.quickView}>
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('EditProfile');
                    }}>
                    <ProfileIcon />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('Complaint');
                  }}>
                  <Complaints />
                </TouchableOpacity>
              </View>
              <View style={styles.quickView}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('Portfolio');
                  }}>
                  <PolicyIcon />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('Portfolio');
                  }}>
                  <FileIcon />
                </TouchableOpacity>
              </View>
              <View style={styles.quickView}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('WhyNewPolicyUpload');
                  }}>
                  <NewPolicyIcon />
                </TouchableOpacity>
              </View>
            </View>
            <View style={{padding: 8, paddingTop: 0}}>
              <Text style={[styles.heading, {marginLeft: 10}]}>Reviews</Text>
              <FlatList
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={reviewData}
                renderItem={({item}) => {
                  console.log(item, 'asdhkj');
                  return (
                    <>
                      <View style={styles.box}>
                        <View style={styles.image}>
                          {/* <Image
                            source={require('../assets/images/home/review-image.png')}
                            style={{
                              height: 30,
                              width: 30,
                              alignSelf: 'center',
                            }}
                          /> */}
                          <Text
                            style={{
                              fontFamily: 'Poppins',
                              fontWeight: 800,
                              color: '#000',
                              textAlign: 'center',
                              fontSize: 12,
                              backgroundColor: '#009C9D',
                              color: '#fff',
                              height: 25,
                              width: 25,
                              borderRadius: 30,
                              paddingTop: 4,
                              textTransform: 'uppercase',
                            }}>
                            {item.user_details.first_name.charAt(0)}
                          </Text>
                          <Text
                            style={{
                              fontFamily: 'Poppins',
                              fontWeight: 800,
                              color: '#000',
                              textAlign: 'center',
                              fontSize: 8,
                            }}>
                            {item.user_details.first_name}
                          </Text>
                        </View>

                        <Text style={styles.para}>{item.review}</Text>
                      </View>
                    </>
                  );
                }}
              />
            </View>
          </ScrollView>
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
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  firstContainer: {
    padding: 20,
    paddingBottom: 0,
    paddingRight: 0,
  },
  heading: {
    fontFamily: 'Poppins',
    fontWeight: 900,
    fontSize: 16,
    color: '#000',
  },

  quickView: {
    display: 'flex',
    flexDirection: 'row',
  },
  box: {
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 2,
    marginTop: 20,
    padding: 10,
    width: 200,
    paddingRight: 10,
    paddingLeft: 45,
    margin: 15,
    paddingBottom: 20,
    marginBottom: 200,
  },

  para: {
    color: '#000',
    fontFamily: 'Poppins',
    fontWeight: 500,
    fontSize: 13,
    lineHeight: 13,
    marginTop: 6,
  },
  image: {
    position: 'absolute',
    top: 13,
    left: -15,
    backgroundColor: '#fff',
    padding: 5,
    elevation: 2,
    width: 50,
    borderRadius: 6,
  },
  bannerImage: {
    width: 300,
    height: 200,
    paddingRight: 150,
    margin: 10,
    marginTop: -20,
    marginLeft: 0,
    marginBottom: 0,
  },
  bannerText: {
    fontSize: 12,
    color: '#000',
    fontWeight: 500,
    position: 'absolute',
    top: 55,
    left: 20,
  },
});

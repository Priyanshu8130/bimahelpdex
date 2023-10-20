import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../components/Header';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import AddIcon from '../assets/useicon/AddIcon';
import FileIcon from '../assets/useicon/FileIcon';
import {BASE_URL} from './Api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import DeleteIcon from '../assets/Icon/DeleteIcon';
import Toaster from '../components/Toaster';
import PolicyGeneralIcon from '../assets/Icon/PolicyGeneralIcon';
import PolicyLifeIcon from '../assets/Icon/PolicyLifeIcon';
import PolicyHealthIcon from '../assets/Icon/PolicyHealthIcon';
import Modal from 'react-native-modal';
import CrossModalIcon from '../assets/Icon/CrossModalIcon';
import Support from '../components/Support';
import RNFetchBlob from 'rn-fetch-blob';
import MotorIcon from '../assets/useicon/MotorIcon';

const Portfolio = () => {
  const navigation = useNavigation();
  let [loading, setLoading] = useState(true);
  const [policyData, setPolicyData] = useState();
  const [user, setUser] = useState();
  //get Policy Data

  const getPolicyData = async () => {
    const user = await AsyncStorage.getItem('userInfo');
    const userId = JSON.parse(user).data.id;
    const userName = JSON.parse(user).data.first_name;
    setUser(userName);
    try {
      axios
        .get(`${BASE_URL}/user-get-policy?user_id=${userId}`)
        .then(res => {
          setPolicyData(res.data.data.policy_data);

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

  // useEffect(() => {

  // }, [navigation.getState()]);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getPolicyData();
    });

    return unsubscribe;
  }, [navigation]);

  //delete policy data
  const deletePolicy = async () => {
    try {
      axios
        .get(`${BASE_URL}/user-delete-policy?id=${deleteItem}`)
        .then(res => {
          Toaster('policy delete succesfully');
          closeDeleteModal();
          getPolicyData();
        })
        .catch(e => {
          console.log('Error');
        });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  //Modal for image
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState([]);

  const openModal = item => {
    setSelectedItem(item.get_policy_images);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };
  const [isModalVisibleDelete, setModalVisibleDelete] = useState(false);
  const [deleteItem, setDeleteItem] = useState();
  const openDeleteModal = id => {
    setDeleteItem(id);
    setModalVisibleDelete(true);
  };

  const closeDeleteModal = () => {
    setModalVisibleDelete(false);
  };

  //download Images
  const downloadInvoice = async image => {
    let date = new Date();

    let FILE_URL = `https://dev.codesmile.in/bimahelpdesk/public/user_images/${image}`;
    let file_ext = getFileExtention(FILE_URL);

    file_ext = '.' + file_ext[0];

    const {config, fs} = RNFetchBlob;
    let RootDir = fs.dirs.PictureDir;
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        path:
          RootDir +
          '/file_' +
          Math.floor(date.getTime() + date.getSeconds() / 2) +
          file_ext,
        description: 'downloading file...',
        notification: true,
        useDownloadManager: true,
      },
    };
    config(options)
      .fetch('GET', FILE_URL)
      .then(res => {
        console.log('res -> ', JSON.stringify(res));

        Toaster('file download successfully');
      });
  };
  const getFileExtention = fileUrl => {
    // To get the file extension
    return /[.]/.exec(fileUrl) ? /[^.]+$/.exec(fileUrl) : undefined;
  };
  return (
    <View style={{flex: 1}}>
      <View style={{marginBottom: 170}}>
        <Spinner visible={loading} color="#009C9D" />

        <Header />

        <View style={[styles.firstContainer, {paddingBottom: 209}]}>
          <TouchableOpacity
            style={[
              styles.loginBtn,
              {
                width: '95%',
                paddingTop: 15,
                paddingBottom: 15,
                marginBottom: 20,
              },
            ]}
            onPress={() => {
              navigation.navigate('AddPolicy');
            }}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignSelf: 'center',
                gap: 10,
              }}>
              <AddIcon style={{marginTop: 4}} />
              <Text
                style={{
                  color: '#fff',
                  fontWeight: 700,
                  fontFamily: 'Poppins',
                  fontSize: 17,
                }}>
                Add Policy
              </Text>
            </View>
          </TouchableOpacity>

          <FlatList
            showsVerticalScrollIndicator={false}
            data={policyData}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => {
              return (
                <View style={[styles.inputView, {marginTop: 8}]}>
                  <View style={styles.thirdView}>
                    <View
                      style={{
                        borderRightWidth: 1,
                        borderRightColor: '#E9E9E9',
                        width: 50,
                        alignItems: 'center',
                        alignSelf: 'center',
                      }}>
                      {item.insurance_type == 'General' ? (
                        <PolicyGeneralIcon />
                      ) : item.insurance_type == 'Life' ? (
                        <PolicyLifeIcon />
                      ) : item.insurance_type == 'Health' ? (
                        <PolicyHealthIcon />
                      ) : (
                        ''
                      )}

                      <Text
                        style={{
                          fontSize: 11,
                          color: '#000',
                        }}>
                        {item.insurance_type}
                      </Text>
                    </View>
                    <View>
                      <Text
                        style={{
                          fontSize: 14,
                          color: '#000',
                          fontWeight: 900,
                          lineHeight: 19,
                          width: 120,
                        }}>
                        {item.policy_company}
                      </Text>
                    </View>

                    <TouchableOpacity
                      onPress={() => openModal(item)}
                      style={{
                        borderLeftWidth: 1,
                        borderLeftColor: '#E9E9E9',
                        width: 40,
                        alignItems: 'center',
                        alignSelf: 'center',
                      }}>
                      <View style={{alignItems: 'center'}}>
                        <Image
                          source={require('../assets/images/home/eye.png')}
                        />

                        <Text
                          style={{
                            fontSize: 11,
                            color: '#000',
                          }}>
                          View
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.secondView}>
                    <Text style={styles.secondHeading}>
                      Policy Holder Name:
                    </Text>
                    <Text style={[styles.secondHeading, {textAlign: 'right'}]}>
                      {user}
                    </Text>
                  </View>
                  <View style={styles.secondView}>
                    <Text style={styles.secondHeading}>Policy Number:</Text>
                    <Text style={[styles.secondHeading, {textAlign: 'right'}]}>
                      {item.policy_number}
                    </Text>
                  </View>
                  <View style={styles.secondView}>
                    <Text style={styles.secondHeading}>Policy Nick Name:</Text>
                    <Text style={[styles.secondHeading, {textAlign: 'right'}]}>
                      {item.policy_name}
                    </Text>
                  </View>
                  <View
                    style={{display: 'flex', flexDirection: 'row', gap: 10}}>
                    <TouchableOpacity
                      style={styles.loginBtn}
                      onPress={() => {
                        navigation.navigate('FileComplaints', {
                          policyId: item.id,
                          policyType: item.insurance_type,
                          policyName: item.policy_name,
                          policyNumber: item.policy_number,
                          policyCompany: item.policy_company,
                        });
                      }}>
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignSelf: 'center',
                          gap: 10,
                        }}>
                        <FileIcon style={{marginTop: 2}} />
                        <Text
                          style={{
                            textAlign: 'center',
                            color: '#fff',
                            fontWeight: 100,
                            fontFamily: 'Poppins',
                            fontSize: 13,
                          }}>
                          File a Complaint
                        </Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        openDeleteModal(item.id);
                      }}>
                      <DeleteIcon style={{marginTop: 12}} />
                    </TouchableOpacity>
                  </View>
                </View>
              );
            }}
          />

          <Modal
            animationType="slide"
            backdropColor="rgba(0,0,0,0.3)"
            isVisible={isModalVisibleDelete}>
            <View
              style={{
                backgroundColor: '#fff',
                borderRadius: 10,
                paddingVertical: 20,
                paddingHorizontal: 20,
              }}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: 800,
                  color: '#000',
                }}>
                Are you really want to delete policy?
              </Text>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 60,
                }}>
                <TouchableOpacity
                  style={{
                    backgroundColor: '#009C9D',
                    padding: 5,
                    borderRadius: 20,
                    paddingHorizontal: 20,
                  }}
                  onPress={() => {
                    closeDeleteModal();
                  }}>
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 12,
                      fontWeight: 800,
                    }}>
                    Cancel
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    backgroundColor: '#000',
                    padding: 5,
                    borderRadius: 20,
                    paddingHorizontal: 20,
                  }}
                  onPress={() => {
                    deletePolicy();
                  }}>
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 12,
                      fontWeight: 800,
                    }}>
                    Delete
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          <Modal
            animationType="slide"
            backdropColor="rgba(0,0,0,0.3)"
            isVisible={isModalVisible}>
            <View>
              <TouchableOpacity
                onPress={() => closeModal()}
                style={{
                  position: 'absolute',
                  right: -10,
                  top: -10,
                  zIndex: 1,
                }}>
                <CrossModalIcon />
              </TouchableOpacity>
              <FlatList
                data={selectedItem}
                horizontal
                renderItem={newItem => {
                  return (
                    <View
                      style={{
                        backgroundColor: '#fff',
                        borderRadius: 10,
                        margin: 5,
                        padding: 10,
                        paddingBottom: 20,
                      }}>
                      <TouchableOpacity
                        onPress={() => {
                          downloadInvoice(newItem.item.image);
                        }}>
                        <Image
                          source={require('../assets/images/download.png')}
                          style={{
                            height: 20,
                            width: 20,
                            position: 'absolute',
                            left: 1,
                            zIndex: 1,
                            top: -4,
                          }}
                        />
                        <Image
                          source={
                            newItem.item.image.split('.').pop().toLowerCase() ==
                            'pdf'
                              ? require('../assets/images/pdf.png')
                              : newItem.item.image
                                  .split('.')
                                  .pop()
                                  .toLowerCase() == 'jpg' ||
                                newItem.item.image
                                  .split('.')
                                  .pop()
                                  .toLowerCase() == 'jpeg' ||
                                newItem.item.image
                                  .split('.')
                                  .pop()
                                  .toLowerCase() == 'jpg'
                              ? {
                                  uri: `https://dev.codesmile.in/bimahelpdesk/public/user_images/${newItem.item.image}`,
                                }
                              : require('../assets/images/other.png')
                          }
                          resizeMode="contain"
                          style={{
                            width: 150,
                            height: 150,
                            borderRadius: 10,
                            marginTop: 20,
                          }}
                        />
                      </TouchableOpacity>
                    </View>
                  );
                }}
              />
            </View>
          </Modal>
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

export default Portfolio;

const styles = StyleSheet.create({
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
    width: '85%',
    borderRadius: 5,
    padding: 10,
    alignSelf: 'center',
    marginTop: 10,
  },
  firstContainer: {
    padding: 20,
  },
  secondView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#DFDFDF',
    borderStyle: 'dashed',
    padding: 5,
  },
  secondHeading: {
    fontSize: 12,
    fontFamily: 'Poppins',
    fontWeight: 500,
    color: '#000',
    width: 130,
  },
  thirdView: {
    borderWidth: 1,
    borderColor: '#E9E9E9',
    borderRadius: 10,
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modal: {
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

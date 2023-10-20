import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../components/Header';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {BASE_URL} from './Api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import HistoryIcon from '../assets/useicon/HistoryIcon';
import MainLogoIcon from '../assets/Icon/MainLogoIcon';
import PolicyGeneralIcon from '../assets/Icon/PolicyGeneralIcon';
import PolicyLifeIcon from '../assets/Icon/PolicyLifeIcon';
import PolicyHealthIcon from '../assets/Icon/PolicyHealthIcon';
import Modal from 'react-native-modal';
import CrossModalIcon from '../assets/Icon/CrossModalIcon';
import DeleteIcon from '../assets/Icon/DeleteIcon';
import Toaster from '../components/Toaster';
import Support from '../components/Support';
import RNFetchBlob from 'rn-fetch-blob';

const Complaint = () => {
  const [complaintData, setComplaintData] = useState([]);

  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  //Modal for image
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState([]);
  const [isModalVisibleDelete, setModalVisibleDelete] = useState(false);
  const [deleteItem, setDeleteItem] = useState();

  const getComplaintData = async () => {
    setLoading(true);
    const user = await AsyncStorage.getItem('userInfo');
    const userId = JSON.parse(user).data.id;
    try {
      axios
        .get(`${BASE_URL}/user-get-complaints?user_id=${userId}`)
        .then(res => {
          setComplaintData(res.data.data.complaint_data);
          setLoading(false);
        })
        .catch(e => {
          console.log(`Error complaint ${e}`);
        });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getComplaintData();
    });

    return unsubscribe;
  }, [navigation]);

  const toggleModal = item => {
    setSelectedItem(item.get_complaint_image);

    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
  };

  //delete policy data
  const deletePolicy = async () => {
    try {
      axios
        .get(`${BASE_URL}/user-delete-complaint?id=${deleteItem}`)
        .then(res => {
          if (res.data.status == 200) {
            setModalVisibleDelete(false);
            Toaster('complaint delete succesfully');
            getComplaintData();
          }
        })
        .catch(e => {
          console.log('Error delete');
        });
    } catch (error) {
      console.log(error);
    }
  };

  const openDeleteModal = id => {
    setDeleteItem(id);
    setModalVisibleDelete(true);
  };

  const closeDeleteModal = () => {
    setModalVisibleDelete(false);
  };

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
  const isFocused = useIsFocused;

  return (
    <View style={{borderWidth: 1, flex: 1}}>
      <View style={{marginBottom: 80}}>
        <Spinner visible={loading} color="#009C9D" />
        <Header />
        <ScrollView>
          <View style={{paddingBottom: 50}}>
            <View style={[styles.firstContainer, {marginBottom: 100}]}>
              {complaintData && complaintData.length > 0 ? (
                <FlatList
                  data={complaintData}
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
                              paddingRight: 10,
                            }}>
                            {item.type == 'General' ? (
                              <PolicyGeneralIcon />
                            ) : item.type == 'Life' ? (
                              <PolicyLifeIcon />
                            ) : item.type == 'Health' ? (
                              <PolicyHealthIcon />
                            ) : (
                              ''
                            )}
                            <Text
                              style={{
                                fontSize: 10,
                                color: '#000',

                                marginTop: 6,
                              }}>
                              {item.type}
                            </Text>
                          </View>
                          <View>
                            <Text
                              style={{
                                fontSize: 14,
                                color: '#000',
                                fontWeight: 900,
                                lineHeight: 19,
                                width: 140,
                              }}>
                              {item.get_policy?.policy_company}
                            </Text>
                          </View>
                          <Modal isVisible={isModalVisible}>
                            <View style={styles.modal}>
                              <TouchableOpacity
                                onPress={() => {
                                  closeModal();
                                }}
                                style={{
                                  position: 'absolute',
                                  right: 0,
                                  top: -5,
                                  zIndex: 1,
                                }}>
                                <CrossModalIcon />
                              </TouchableOpacity>
                              <FlatList
                                data={selectedItem}
                                horizontal
                                renderItem={newItem => {
                                  console.log(
                                    '1238716238216389cb812  7cg98172y3',
                                    newItem,
                                  );
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
                                            newItem.item.image
                                              .split('.')
                                              .pop()
                                              .toLowerCase() == 'pdf'
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
                                          // source={
                                          //   newItem.item.image
                                          //     .split('.')
                                          //     .pop()
                                          //     .toLowerCase() == 'pdf'
                                          //     ? require('../assets/images/pdf.png')
                                          //     : {
                                          //         uri: `https://dev.codesmile.in/bimahelpdesk/public/user_images/${newItem.item.image}`,
                                          //       }
                                          // }
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
                          <TouchableOpacity
                            onPress={() => {
                              toggleModal(item);
                            }}
                            style={{
                              borderLeftWidth: 1,
                              borderLeftColor: '#E9E9E9',
                              width: 40,
                              alignItems: 'center',
                              alignSelf: 'center',
                            }}>
                            <View
                              style={{
                                borderLeftColor: '#E9E9E9',
                                width: 50,
                                alignItems: 'center',
                              }}>
                              <Image
                                source={require('../assets/images/home/eye.png')}
                                style={{marginTop: 6}}
                              />

                              <Text
                                style={{
                                  fontSize: 11,
                                  color: '#000',
                                  marginTop: 4,
                                }}>
                                View
                              </Text>
                            </View>
                          </TouchableOpacity>
                        </View>
                        <View style={styles.secondView}>
                          <Text style={styles.secondHeading}> Name:</Text>
                          <Text style={styles.secondHeading}>
                            {' '}
                            {item.get_policy?.policy_name}
                          </Text>
                        </View>
                        <View style={styles.secondView}>
                          <Text style={styles.secondHeading}>Complaints:</Text>
                          <Text style={styles.secondHeading}>
                            {item.complaint_type}
                          </Text>
                        </View>
                        <View style={styles.secondView}>
                          <Text style={styles.secondHeading}>
                            Policy Number:
                          </Text>
                          <Text style={styles.secondHeading}>
                            {' '}
                            {item.get_policy?.policy_number}
                          </Text>
                        </View>
                        <View style={styles.secondView}>
                          <Text style={styles.secondHeading}>Status:</Text>
                          {item.status == 0 ? (
                            <Text style={styles.secondHeading}>Pending</Text>
                          ) : item.status == 1 ? (
                            <Text style={styles.secondHeading}>Apporoved</Text>
                          ) : (
                            ''
                          )}
                        </View>
                        <View
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}>
                          <TouchableOpacity
                            style={styles.loginBtn}
                            onPress={() => {
                              navigation.navigate('ViewComplaint', {
                                notificationId: item.id,
                              });
                            }}>
                            <View
                              style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignSelf: 'center',
                                gap: 10,
                              }}>
                              <HistoryIcon style={{marginTop: 4}} />
                              <Text
                                style={{
                                  textAlign: 'center',
                                  color: '#fff',
                                  fontWeight: 100,
                                  fontFamily: 'Poppins',
                                  fontSize: 13,
                                }}>
                                Case History
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
                              Are you really want to delete Complaint?
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
                      </View>
                    );
                  }}
                />
              ) : (
                <View
                  style={{
                    alignSelf: 'center',
                    marginTop: 100,
                  }}>
                  <MainLogoIcon
                    style={{
                      alignSelf: 'center',
                    }}
                  />
                  <Text
                    style={{
                      textAlign: 'center',
                      fontFamily: 'Poppins',
                      fontWeight: 800,
                      fontSize: 18,
                      color: '#3F3F3F',
                      marginTop: 10,
                    }}>
                    You Have Not Any Complaint Yet
                  </Text>
                  <TouchableOpacity
                    style={{
                      fontSize: 12,
                      fontFamily: 500,
                      alignSelf: 'center',
                      marginTop: 15,
                      backgroundColor: '#009C9D',
                      padding: 10,
                      borderRadius: 6,
                    }}
                    onPress={() => {
                      navigation.navigate('Portfolio');
                    }}>
                    <Text style={{color: '#fff', fontWeight: 800}}>
                      Go To Policy
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
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

export default Complaint;

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
});

import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import React, {useEffect, useState} from 'react';
import CustomDrawer from './CustomDrawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Profile from '../screens/auth/Profile';
import Complaints from '../screens/Complaints';
import Reviews from '../screens/Reviews';
import Portfolio from '../screens/Portfolio';
import TabReviewIcon from '../assets/tabicon/TabReviewIcon';
import TabHomeIcon from '../assets/tabicon/TabHomeIcon';
import TabComIcon from '../assets/tabicon/TabComIcon';
import TabPortfolioIcon from '../assets/tabicon/TabPortfolioIcon';
import StackNavigation from './StackNavigation';
import Login from '../screens/auth/Login';
import Otp from '../screens/auth/Otp';
import EditProfile from '../screens/auth/EditProfile';
import AsyncStorage from '@react-native-async-storage/async-storage';
import WhyNewPolicyUpload from '../screens/WhyNewPolicyUpload';
import Contact from '../screens/Contact';
import UploadPolicy from '../screens/UploadPolicy';
import AddPolicy from '../screens/AddPolicy';
import FileComplaints from '../screens/FileComplaints';
import Privacy from '../screens/Privacy';
import Notification from '../screens/Notification';
import ViewComplaint from '../screens/ViewComplaint';
import DownloadFiles from '../screens/DownloadFiles';
import {BASE_URL} from '../screens/Api';
import Chat from '../screens/Chat';

const Tab = createBottomTabNavigator();

const Drawer = createDrawerNavigator();

const Dashboard = () => {
  const [firstScreen, setFirstScreen] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem('userInfo')
      .then(data => {
        setFirstScreen(JSON.parse(data).data.is_active == 1 ? 'Tab' : 'Login');
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
        setFirstScreen('Login');
      });
  }, []);
  if (loading) {
    return null;
  }
  const user = {
    username: 'John Doe',
  };

  return (
    <>
      <Drawer.Navigator
        initialRouteName={firstScreen}
        drawerContent={props => <CustomDrawer {...props} />}
        screenOptions={{
          drawerActiveBackgroundColor: 'transparent',
          drawerStyle: {
            width: '80%',
          },
          swipeEnabled: false,
          keyboardDismissMode: 'none',
          headerShown: false,
        }}>
        <Drawer.Screen name="Login" component={Login} />

        <Drawer.Screen name="Profile" component={Profile} />

        <Drawer.Screen name="Otp" component={Otp} />

        <Drawer.Screen name="EditProfile" component={EditProfile} />
        <Drawer.Screen name="Contact" component={Contact} />
        <Drawer.Screen name="UploadPolicy" component={UploadPolicy} />

        <Drawer.Screen name="AddPolicy" component={AddPolicy} />

        <Drawer.Screen name="FileComplaints" component={FileComplaints} />
        <Drawer.Screen name="Privacy" component={Privacy} />
        <Drawer.Screen name="Notification" component={Notification} />
        <Drawer.Screen name="ViewComplaint" component={ViewComplaint} />
        <Drawer.Screen name="DownloadFiles" component={DownloadFiles} />
        <Drawer.Screen name="Chat" component={Chat} />

        <Drawer.Screen
          name="WhyNewPolicyUpload"
          component={WhyNewPolicyUpload}
        />

        <Drawer.Screen name="Tab">
          {() => (
            <Tab.Navigator
              initialRouteName="Home"
              screenOptions={{
                tabBarHideOnKeyboard: true,
                headerShown: false,
                tabBarLabelStyle: {
                  fontSize: 11,
                  fontFamily: 'Poppins',
                  color: '#000000',
                  paddingBottom: 10,
                  fontWeight: 900,
                },
                tabBarStyle: {
                  position: 'absolute',
                  bottom: 0,
                  height: 60,
                  padding: 10,
                },
              }}>
              <Tab.Screen
                name="Stack"
                component={StackNavigation}
                options={{
                  tabBarIcon: ({focused}) => {
                    return <TabHomeIcon />;
                  },
                  tabBarLabel: ({focused}) => {
                    return (
                      <Text
                        style={{
                          borderBottomWidth: 4,
                          borderColor: focused ? '#FE434F' : 'transparent',
                          borderTopLeftRadius: 10,
                          width: 60,
                          fontSize: 12,
                          fontFamily: 'Poppins',
                          color: '#000000',
                          paddingBottom: 5,
                          fontWeight: 900,
                          textAlign: 'center',
                        }}>
                        Home
                      </Text>
                    );
                  },
                }}
              />

              <Tab.Screen
                name="Complaint"
                component={Complaints}
                options={{
                  tabBarIcon: ({focused}) => {
                    return <TabComIcon />;
                  },
                  tabBarLabel: ({focused}) => {
                    return (
                      <Text
                        style={{
                          borderBottomWidth: 4,
                          borderColor: focused ? '#FE434F' : 'transparent',
                          borderTopLeftRadius: 10,
                          width: 100,
                          fontSize: 12,
                          fontFamily: 'Poppins',
                          color: '#000000',
                          paddingBottom: 5,
                          fontWeight: 900,
                          textAlign: 'center',
                        }}>
                        Complaints
                      </Text>
                    );
                  },
                }}
              />
              <Tab.Screen
                name="Portfolio"
                component={Portfolio}
                options={{
                  tabBarIcon: ({focused}) => {
                    return <TabPortfolioIcon />;
                  },
                  tabBarLabel: ({focused}) => {
                    return (
                      <Text
                        style={{
                          borderBottomWidth: 4,
                          borderColor: focused ? '#009C9D' : 'transparent',
                          borderTopLeftRadius: 10,
                          width: 60,
                          fontSize: 12,
                          fontFamily: 'Poppins',
                          color: '#000000',
                          paddingBottom: 5,
                          fontWeight: 900,
                          textAlign: 'center',
                        }}>
                        Portfolio
                      </Text>
                    );
                  },
                }}
              />
              <Tab.Screen
                name="Reviews"
                component={Reviews}
                options={{
                  tabBarIcon: ({focused}) => {
                    return <TabReviewIcon />;
                  },
                  tabBarLabel: ({focused}) => {
                    return (
                      <Text
                        style={{
                          borderBottomWidth: 4,
                          borderColor: focused ? '#009C9D' : 'transparent',
                          borderTopLeftRadius: 10,
                          width: 60,
                          fontSize: 12,
                          fontFamily: 'Poppins',
                          color: '#000000',
                          paddingBottom: 5,
                          fontWeight: 900,
                          textAlign: 'center',
                        }}>
                        Reviews
                      </Text>
                    );
                  },
                }}
              />
            </Tab.Navigator>
          )}
        </Drawer.Screen>
      </Drawer.Navigator>
    </>
  );
};

export default Dashboard;

const styles = StyleSheet.create({});

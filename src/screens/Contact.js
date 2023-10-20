import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
} from 'react-native';
import React from 'react';
import Header from '../components/Header';
import PhoneIcon from '../assets/contact/PhoneIcon';
import WhatsappIcon from '../assets/contact/WhatsappIcon';
import EmailIcon from '../assets/Icon/EmailIcon';
import ContactPageIcon from '../assets/Icon/ContactPageIcon';
import {useNavigation} from '@react-navigation/native';
import BackIconContact from '../assets/Icon/BackIconContact';
import Support from '../components/Support';

const Contact = () => {
  const navigation = useNavigation();
  return (
    <View style={{height: '100%'}}>
      <View>
        <Header />
        <View>
          <View
            style={{
              alignSelf: 'center',
              marginTop: 10,
              borderTopLeftRadius: 50,
              borderTopRightRadius: 50,
            }}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Tab');
              }}
              style={{
                flexDirection: 'row',
                position: 'absolute',
                top: 10,
                left: -40,
                gap: 4,
              }}>
              <BackIconContact
                style={{
                  color: '#F76031',
                  marginTop: 3,
                }}
              />
              <Text
                style={{
                  color: '#F76031',
                  fontSize: 14,
                  fontWeight: 800,
                }}>
                Go Back
              </Text>
            </TouchableOpacity>
            <ContactPageIcon />
          </View>
          <View
            style={{
              padding: 20,
              backgroundColor: '#009C9D',
              height: '100%',
              marginTop: 40,
              paddingTop: 70,
              borderRadius: 90,
            }}>
            <Text style={styles.heading}>Contact</Text>
            <View style={styles.box}>
              <View style={styles.boxTwo}>
                <PhoneIcon style={{marginTop: 2}} />
                <Text style={styles.para}>Call Us </Text>
              </View>
              <View>
                <Text style={styles.para}>
                  <TouchableOpacity
                    onPress={() => {
                      Linking.openURL('tel:9871412413');
                    }}>
                    <Text style={{fontSize: 13}}>+91-9871412413</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      Linking.openURL('tel:9871413414');
                    }}>
                    <Text style={{fontSize: 13}}> +91-9871413414</Text>
                  </TouchableOpacity>
                </Text>
              </View>
            </View>
            <View style={styles.box}>
              <View style={styles.boxTwo}>
                <WhatsappIcon style={{marginTop: 2}} />
                <Text style={styles.para}> Whatsapp </Text>
              </View>
              <View>
                <Text style={styles.para}>
                  <TouchableOpacity
                    onPress={() => {
                      Linking.openURL(
                        'whatsapp://send?text=hello&phone=9871413414',
                      );
                    }}>
                    <Text style={{fontSize: 13}}> +91-9871413414</Text>
                  </TouchableOpacity>
                </Text>
              </View>
            </View>
            <View style={styles.box}>
              <View style={styles.boxTwo}>
                <EmailIcon style={{marginTop: 2}} />
                <Text style={[styles.para, {marginTop: 4}]}> Email </Text>
              </View>
              <View>
                <TouchableOpacity
                  onPress={() => {
                    Linking.openURL(
                      'mailto:support@bimahelpdesk.com?subject=SendMail&body=Description',
                    );
                  }}>
                  <Text style={{fontSize: 13}}>support@bimahelpdesk.com</Text>
                </TouchableOpacity>
              </View>
            </View>
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
    </View>
  );
};

export default Contact;

const styles = StyleSheet.create({
  heading: {
    fontFamily: 'Poppins',
    fontWeight: 900,
    fontSize: 19,
    color: '#fff',
    textAlign: 'center',
  },
  box: {
    borderRadius: 10,
    marginTop: 15,
    padding: 15,
    display: 'flex',
    flexDirection: 'row',
    gap: 15,
    borderWidth: 2,
    borderColor: '#fff',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },

  para: {
    color: '#787878',
    fontFamily: 'Poppins',
    fontWeight: 300,
    fontSize: 13,
  },
  boxTwo: {
    display: 'flex',
    flexDirection: 'row',
    gap: 4,
  },
});

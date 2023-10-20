import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Linking,
} from 'react-native';
import React, {useState} from 'react';
import PhoneIcon from '../assets/suppport/PhoneIcon';
import WhatsappIcon from '../assets/suppport/WhatsappIcon';
import EmailIcon from '../assets/suppport/EmailIcon';
import SupportIcon from '../assets/suppport/SupportIcon';

const Support = () => {
  const [show, setShow] = useState(true);
  return (
    <View style={styles.mainView}>
      {show ? null : (
        <View
          style={{
            backgroundColor: '#fff',
            alignSelf: 'center',
            paddingHorizontal: 10,
            paddingVertical: 10,
            borderRadius: 50,
          }}>
          <PhoneIcon
            style={{marginTop: 3}}
            onPress={() => {
              Linking.openURL('tel:9871413414');
            }}
          />
          <WhatsappIcon
            style={{marginTop: 5}}
            onPress={() => {
              Linking.openURL('whatsapp://send?text=hello&phone=9871413414');
            }}
          />
          <EmailIcon
            style={{marginTop: 5}}
            onPress={() => {
              Linking.openURL(
                'mailto:support@bimahelpdesk.com?subject=SendMail&body=Description',
              );
            }}
          />
        </View>
      )}
      <TouchableOpacity
        onPress={() => {
          setShow(!show);
        }}>
        <SupportIcon />
      </TouchableOpacity>
    </View>
  );
};

export default Support;

const styles = StyleSheet.create({});

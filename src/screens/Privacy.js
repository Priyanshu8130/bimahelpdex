import {Linking, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Header from '../components/Header';
import {ScrollView} from 'react-native-gesture-handler';
import Support from '../components/Support';

const Privacy = () => {
  return (
    <View>
      <View style={{marginBottom: 100}}>
        <Header />

        <ScrollView style={{padding: 20}}>
          <View style={{marginBottom: 150}}>
            <Text style={{color: '#000', fontSize: 15, fontWeight: 800}}>
              <Text style={{color: '#F76031'}}>Privacy</Text> Policy
            </Text>
            <Text style={styles.para}>
              At BimaHelpDex, we are committed to protecting your privacy and
              ensuring the security of your personal information. This Privacy
              Policy outlines how we collect, use, and safeguard the information
              you provide to us through our mobile application.
            </Text>
            <Text
              style={{
                color: '#000',
                fontSize: 15,
                fontWeight: 800,
                marginTop: 20,
              }}>
              <Text style={{color: '#F76031'}}>Information</Text> We Collect:
            </Text>
            <Text style={styles.para}>
              Personal Information: We may collect personal information, such as
              your name, contact details, and policy-related information when
              you interact with our app.
            </Text>
            <Text style={styles.para}>
              Usage Data: We collect information about how you use our app,
              including your interactions, preferences, and device information.
            </Text>
            <Text
              style={{
                color: '#000',
                fontSize: 15,
                fontWeight: 800,
                marginTop: 20,
              }}>
              <Text style={{color: '#F76031'}}>Use of</Text> Information:
            </Text>
            <Text style={styles.para}>
              Fraud Support: We may use the information you provide to offer
              insurance fraud support and assistance in identifying and
              preventing fraudulent activities.
            </Text>
            <Text style={styles.para}>
              Claim Rejection Support: Your information helps us provide support
              in cases of claim rejection, offering guidance and solutions to
              address claim-related issues.
            </Text>
            <Text style={styles.para}>
              Improve Our Services: We may analyze usage data to enhance our
              app's functionality, user experience, and overall performance.
            </Text>
            <Text
              style={{
                color: '#000',
                fontSize: 15,
                fontWeight: 800,
                marginTop: 20,
              }}>
              <Text style={{color: '#F76031'}}>Data </Text>Sharing:
            </Text>
            <Text style={styles.para}>
              We do not sell, rent, or share your personal information with
              third parties for marketing purposes.
            </Text>
            <Text style={styles.para}>
              We may share your information with trusted partners, service
              providers, or affiliates to fulfill the services you request or as
              required by law.
            </Text>
            <Text
              style={{
                color: '#000',
                fontSize: 15,
                fontWeight: 800,
                marginTop: 20,
              }}>
              <Text style={{color: '#F76031'}}>Data </Text>Retention:
            </Text>
            <Text style={styles.para}>
              We retain your personal information only for as long as necessary
              to fulfill the purposes outlined in this Privacy Policy and as
              required by law.
            </Text>
            <Text
              style={{
                color: '#000',
                fontSize: 15,
                fontWeight: 800,
                marginTop: 20,
              }}>
              <Text style={{color: '#F76031'}}>Your</Text> Choices:
            </Text>
            <Text style={styles.para}>
              You have the right to review, update, or delete your personal
              information. Please contact us to exercise your rights or if you
              have any concerns.
            </Text>
            <Text style={styles.para}>
              You can opt out of receiving promotional communications from us by
              following the unsubscribe instructions provided in our
              communications.
            </Text>
            <Text
              style={{
                color: '#000',
                fontSize: 15,
                fontWeight: 800,
                marginTop: 20,
              }}>
              <Text style={{color: '#F76031'}}>Third-Party</Text> Links:
            </Text>
            <Text style={styles.para}>
              Our app may contain links to third-party websites or services. We
              are not responsible for the privacy practices or content of those
              websites.
            </Text>
            <Text
              style={{
                color: '#000',
                fontSize: 15,
                fontWeight: 800,
                marginTop: 20,
              }}>
              <Text style={{color: '#F76031'}}>Updates to the</Text> Privacy
              Policy:
            </Text>
            <Text style={styles.para}>
              We may update this Privacy Policy from time to time to reflect
              changes in our practices. We encourage you to review this policy
              periodically.
            </Text>
            <Text style={styles.para}>
              By using the BimaHelpDex app, you consent to the collection, use,
              and disclosure of information as described in this Privacy Policy.
              If you have any questions or concerns regarding our privacy
              practices, please contact us at
            </Text>
            <TouchableOpacity
              onPress={() => {
                Linking.openURL(
                  'mailto:support@bimahelpdesk.com?subject=SendMail&body=Description',
                );
              }}>
              <Text
                style={{
                  color: '#F76031',
                  fontSize: 12,
                }}>
                support@bimahelpdex.com.
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>

      <View
        style={{
          position: 'absolute',
          bottom: 120,
          left: 10,
        }}>
        <Support />
      </View>
    </View>
  );
};

export default Privacy;

const styles = StyleSheet.create({
  para: {
    textAlign: 'justify',
    marginTop: 4,
    fontSize: 12,
    lineHeight: 16,
  },
});

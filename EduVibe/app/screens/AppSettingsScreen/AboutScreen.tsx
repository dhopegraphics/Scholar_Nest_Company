import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Linking } from 'react-native';
import ContactsCard from '../../../components/ContactsCard';
import Icon from 'react-native-vector-icons/FontAwesome';

const teamMembers = [
  {
    name: 'Mensah Isaac - CEO',
    img: 'https://www.akamai.com/site/im-demo/perceptual-standard.jpg?imbypass=true', // Replace with actual image URL
  },
  {
    name: 'Paapa Cobold - CTO',
    img: 'https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg', // Replace with actual image URL
  },
  {
    name: 'Sam - Lead Developer',
    img: 'https://statusneo.com/wp-content/uploads/2023/02/MicrosoftTeams-image551ad57e01403f080a9df51975ac40b6efba82553c323a742b42b1c71c1e45f1.jpg', // Replace with actual image URL
  },
];

const AboutScreen: React.FC = () => {
  const handleLinkPress = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Image source={require('../../../assets/images/EduVibeColored.png')} style={styles.logo} />
      </View>
      <Text style={styles.version}>Version 1.0.0</Text>
      <Text style={styles.description}>
        EduVibe is an innovative learning management system designed to provide an engaging and intuitive educational experience for students and educators. Our mission is to empower learning through technology, making education accessible and enjoyable for everyone.
      </Text>
      <View style={styles.contactContainer}>
        <Text style={styles.contactHeader}>Contact Us</Text>
        <Text style={styles.contactText}>Email: support@eduvibe.com</Text>
        <Text style={styles.contactText}>Website: www.eduvibe.com</Text>
      </View>
      <View style={styles.socialMediaContainer}>
        <Text style={styles.socialMediaHeader}>Follow Us</Text>
        <View style={styles.socialMediaLinks}>
        <TouchableOpacity onPress={() => handleLinkPress('https://facebook.com/eduvibe')} style={styles.socialMediaButton}>
            <Icon name="facebook" size={24} color="#1e90ff" />
            <Text style={styles.socialMediaText}>Facebook</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleLinkPress('https://twitter.com/eduvibe')} style={styles.socialMediaButton}>
            <Icon name="twitter" size={24} color="#1e90ff" />
            <Text style={styles.socialMediaText}>Twitter</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleLinkPress('https://linkedin.com/company/eduvibe')} style={styles.socialMediaButton}>
            <Icon name="linkedin" size={24} color="#1e90ff" />
            <Text style={styles.socialMediaText}>LinkedIn</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.teamContainer}>
        <Text style={styles.teamHeader}>Meet the Team</Text>
        {teamMembers.map((member, index) => (
          <ContactsCard
            key={index}
            name={member.name}
            img={member.img}
            onPress={() => handleLinkPress('https://www.eduvibe.com/team')} // Adjust the URL as needed
          />
        ))}
      </View>
      <View style={styles.acknowledgmentsContainer}>
        <Text style={styles.acknowledgmentsHeader}>Acknowledgments</Text>
        <Text style={styles.acknowledgmentsText}>
          We would like to thank our partners and contributors for their invaluable support and collaboration in the development of EduVibe.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 300,
    height: 100,
    margin: 10,
    resizeMode: 'contain',
  },
  version: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  contactContainer: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingTop: 20,
  },
  contactHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  contactText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 5,
  },
  socialMediaButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  socialMediaText: {
    fontSize: 16,
    color: '#1e90ff',
    marginLeft: 5,
  },
  socialMediaContainer: {
    marginTop: 20,
    paddingTop: 20,
  },
  socialMediaHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  socialMediaLinks: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  
  teamContainer: {
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  teamHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  acknowledgmentsContainer: {
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  acknowledgmentsHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  acknowledgmentsText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 5,
  },
});

export default AboutScreen;

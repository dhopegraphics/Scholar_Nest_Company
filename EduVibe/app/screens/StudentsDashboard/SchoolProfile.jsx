import React, { useContext, useState } from 'react';
import {
  SafeAreaView,
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useUsers } from '../../../contexts/UsersContext';
import { UserAccountStyling } from '../../../themes/UserAccountStyle';
import PlaceCard from '../../../components/PlaceCard';
import { EducationPlaceContext } from '../../../contexts/EducationPlaceContext';

const SchoolProfile = ({ navigation }) => {
  const { users, stats  , currentUserId  , } = useUsers();
  const { places } = useContext(EducationPlaceContext);

  const currentUser = users.find((user) => user.id === currentUserId );

  // State to manage tags dynamically

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={UserAccountStyling.container}>
        <View style={UserAccountStyling.header}>
          <View style={UserAccountStyling.headerAction}>
          </View>

          <View style={UserAccountStyling.search}>
            
            { currentUser &&
            <Text style={UserAccountStyling.profileTitle}>{currentUser.name}</Text>
                 }
          </View>

          <View style={[UserAccountStyling.headerAction, { alignItems: 'flex-end' }]}>
          </View>
        </View>

        <ScrollView>
          <View style={UserAccountStyling.content}>
            <View style={UserAccountStyling.profile}>
              <View style={UserAccountStyling.profileTop}>
                <View style={UserAccountStyling.avatar}>
                  <Image
                    alt=""
                    source={{ uri: currentUser.img }}
                    style={UserAccountStyling.avatarImg}
                  />
                  <View style={UserAccountStyling.avatarNotification} />
                </View>

                <View style={UserAccountStyling.profileBody}>
                  <Text style={UserAccountStyling.profileTitle}>
                    {currentUser.name}
                  </Text>
                  <Text style={UserAccountStyling.profileSubtitle}>
                   
                    <Text style={{ color: '#266EF1', flex: 1 }}>
                      @{currentUser.username.toLowerCase().replace(/\s/g, '')}
                    </Text>
                  </Text>
                </View>
              </View>

              <View style={UserAccountStyling.profileTags}>
              </View>
            </View>

            <View style={UserAccountStyling.stats}>
                
              </View>
            <View style={{ marginTop: 16 }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 8 }}>Education</Text>
              <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                {places.map((place) => (
                  <PlaceCard
                    key={place.id}
                    id={place.id}
                    img={place.img}
                    name={place.name}
                    description={place.description}
                  />
                ))}
              </ScrollView>
            </View>

          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default SchoolProfile;

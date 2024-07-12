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
import ExperienceCard from '../../../components/ExperienceCard';
import { useUsers } from '../../../contexts/UsersContext';
import { UserAccountStyling } from '../../../themes/UserAccountStyle';
import { useTagContext } from '../../../contexts/TagContext';
import PlaceCard from '../../../components/PlaceCard';
import { PlacesContext } from '../../../contexts/PlacesContext';
import { TextInput } from 'react-native-gesture-handler';

const MainUserAccountScreen = ({ navigation }) => {
  const { users, stats  , currentUserId } = useUsers();
  const { setTag } = useTagContext();
  const { places } = useContext(PlacesContext);

  const currentUser = users.find((user) => user.id === currentUserId );

  // State to manage tags dynamically
  const [tags, setTags] = useState(['ios', 'android', 'web', 'ui', 'ux']);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={UserAccountStyling.container}>
        <View style={UserAccountStyling.header}>
          <View style={UserAccountStyling.headerAction}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <FeatherIcon name="chevron-left" size={24} />
            </TouchableOpacity>
          </View>

          <View style={UserAccountStyling.search}>
            <View style={UserAccountStyling.searchIcon}></View>
            <Text style={UserAccountStyling.profileTitle}>{currentUser.name}</Text>
          </View>

          <View style={[UserAccountStyling.headerAction, { alignItems: 'flex-end' }]}>
            <TouchableOpacity onPress={() => { /* handle onPress */ }}>
              <FeatherIcon name="more-vertical" size={24} />
            </TouchableOpacity>
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
                    {currentUser.portfolio} {' · '}
                    <Text style={{ color: '#266EF1', flex: 1 }}>
                      @{currentUser.username.toLowerCase().replace(/\s/g, '')}
                    </Text>
                  </Text>
                </View>
              </View>

              <Text style={UserAccountStyling.profileDescription}>
                {currentUser.bio}
              </Text>

              <View style={UserAccountStyling.profileTags}>
                {tags.map((tag, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      setTag({ title: tag });
                      navigation.navigate('TagDetails');
                    }}
                  >
                    <Text style={UserAccountStyling.profileTagsItem}>
                      #{tag}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={UserAccountStyling.stats}>
                {stats[currentUser.id] &&
                  stats[currentUser.id].map((stat, index) => (
                    <View
                      key={index}
                      style={[
                        UserAccountStyling.statsItem,
                        index === 0 && { borderLeftWidth: 0 },
                      ]}
                    >
                      <Text style={UserAccountStyling.statsItemText}>
                        {stat.label}
                      </Text>
                      <Text style={UserAccountStyling.statsItemValue}>
                        {stat.value}
                      </Text>
                    </View>
                  ))}
              </View>
            <ExperienceCard navigation={navigation} />

            {/* Worked Places Section */}
            <View style={{ marginTop: 16 }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 8 }}>Worked Places</Text>
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

export default MainUserAccountScreen;

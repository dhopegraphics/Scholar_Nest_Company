import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Text,
  Image,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import ExperienceCard from '../../../components/ExperienceCard';
import { useUsers } from '../../../contexts/UsersContext';
import { UserAccountStyling } from '../../../themes/UserAccountStyle';
import { useTagContext } from '../../../contexts/TagContext'; // Import the context

const tags = ['ios', 'android', 'web', 'ui', 'ux'];

const UserAccount = ({ navigation, route }) => {
  const { users, stats } = useUsers();
  const { userId } = route.params;
  const { setTag } = useTagContext(); // Use the context

  const currentUser = users.find((user) => user.id === userId);

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
            <View style={UserAccountStyling.searchIcon}>
              <FeatherIcon color="#778599" name="search" size={17} />
            </View>

            <TextInput
              autoCapitalize="words"
              autoComplete="name"
              placeholder="Search..."
              placeholderTextColor="#778599"
              style={UserAccountStyling.searchControl}
            />
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
                  <Text style={UserAccountStyling.profileTitle}>{currentUser.name}</Text>

                  <Text style={UserAccountStyling.profileSubtitle}>
                    {currentUser.portfolio} {' · '}
                    <Text style={{ color: '#266EF1' }}>
                      @{currentUser.username.toLowerCase().replace(/\s/g, '')}
                    </Text>
                  </Text>
                </View>
              </View>

              <Text style={UserAccountStyling.profileDescription}>{currentUser.bio}</Text>

              <View style={UserAccountStyling.profileTags}>
                {tags.map((tag, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      setTag({ title: tag }); // Set the selected tag
                      navigation.navigate('TagDetails'); // Navigate to the TagDetails screen
                    }}
                  >
                    <Text style={UserAccountStyling.profileTagsItem}>#{tag}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={UserAccountStyling.stats}>
              {stats[userId] &&
                stats[userId].map((stat, index) => (
                  <View
                    key={index}
                    style={[
                      UserAccountStyling.statsItem,
                      index === 0 && { borderLeftWidth: 0 },
                    ]}
                  >
                    <Text style={UserAccountStyling.statsItemText}>{stat.label}</Text>
                    <Text style={UserAccountStyling.statsItemValue}>{stat.value}</Text>
                  </View>
                ))}
            </View>

            <View style={UserAccountStyling.contentActions}>
              <TouchableOpacity onPress={() => { /* handle onPress */ }} style={{ flex: 1, paddingHorizontal: 6 }}>
                <View style={UserAccountStyling.btn}>
                  <Text style={UserAccountStyling.btnText}>Follow</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => { /* handle onPress */ }} style={{ flex: 1, paddingHorizontal: 6 }}>
                <View style={UserAccountStyling.btnPrimary}>
                  <Text style={[UserAccountStyling.btnText, { color: '#fff' }]}>Hire Me</Text>
                </View>
              </TouchableOpacity>
            </View>

            <ExperienceCard navigation={navigation} />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default UserAccount;

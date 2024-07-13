import React, { useCallback, useState, useContext } from 'react';
import { Text, View, ScrollView, TouchableOpacity, RefreshControl, SafeAreaView } from 'react-native';
import { CourseCard } from '../../../components';
import { Ionicons } from '@expo/vector-icons';
import DashboardStyles from '../../../themes/DashboardStyles';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { ParticipantContext } from '../../../contexts/ParticipantContext';
import { useCourseContext } from '../../../contexts/useCourseContext';

const TeacherDashboard = () => {
  const navigation = useNavigation();
  const { setCourse } = useCourseContext();
  const participantContext = useContext(ParticipantContext);
  const [refreshing, setRefreshing] = useState(false);

  const handlePress = (course) => {
    setCourse(course);
    if (participantContext) {
      participantContext.setParticipants(course.participants);
    }
    //@ts-ignore
    navigation.navigate('Course_Information');
  };

  const handleButtonPress = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate a network request
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <SafeAreaView style={DashboardStyles.safeArea}>
      <View style={DashboardStyles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={DashboardStyles.scrollViewContent}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
          <Text style={DashboardStyles.title}>Dashboard</Text>

          <View style={{alignSelf : "center"}}>
        
              {participantContext?.courses.map((course, index) => (
                <CourseCard
                  key={index}
                  title={course.title}
                  creator={course.creator}
                  participantsCount={course.participants.length}
                  onPress={() => handlePress(course)}
                  imageSource={{ uri: course.image }} // Pass the image source dynamically
                />
              ))}
         
          </View>
        </ScrollView>
        <TouchableOpacity style={DashboardStyles.roundedButton} onPress={handleButtonPress}>
          <Ionicons name="chevron-back-circle" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default TeacherDashboard;

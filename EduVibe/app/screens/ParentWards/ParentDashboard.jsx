import React, { useCallback, useState, useContext } from 'react';
import { Text, View, ScrollView, TouchableOpacity, RefreshControl, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DashboardStyles from '../../../themes/DashboardStyles';

const ParentDashboard = () => {

  const [refreshing, setRefreshing] = useState(false);

  
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
      <Text style={DashboardStyles.title}>Dashboard</Text>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={DashboardStyles.scrollViewContent}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
      
        
        </ScrollView>
      
      </View>
    </SafeAreaView>
  );
};

export default ParentDashboard;

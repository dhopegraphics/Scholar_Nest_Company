import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign, FontAwesome, SimpleLineIcons } from '@expo/vector-icons';
import { View } from 'react-native';
import Colors from '../constants/Colors';
import PiePage from './Page';
import ProfileSection from './Profile';
import TransactionsSection from './Transactions';

const Tab = createBottomTabNavigator();

const FinanceTab = () => {
  return (
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            backgroundColor: Colors.grey,
            position: 'absolute',
            bottom: 40,
            justifyContent: 'center',
            alignSelf: 'center',
            height: 63,
            marginHorizontal: 120,
            paddingHorizontal: 10,
            paddingVertical: 8,
            paddingBottom: 8,
            borderRadius: 40,
            borderWidth: 1,
            borderTopWidth: 1,
            borderColor: '#333',
            borderTopColor: '#333',
          },
          tabBarShowLabel: false,
          tabBarInactiveTintColor: '#999',
          tabBarActiveTintColor: Colors.white,
        }}
      >
        <Tab.Screen
          name="PiePage"
          component={PiePage}
          options={{
            tabBarIcon: ({ color, size, focused }) => (
              <View
                style={{
                  padding: 12,
                  borderRadius: 30,
                  backgroundColor: focused ? Colors.tintColor : Colors.grey,
                }}
              >
                <SimpleLineIcons name="pie-chart" size={18} color={color} />
              </View>
            ),
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="TransactionsSection"
          component={TransactionsSection}
          options={{
            tabBarIcon: ({ color, size, focused }) => (
              <View
                style={{
                  padding: 12,
                  borderRadius: 30,
                  backgroundColor: focused ? Colors.tintColor : Colors.grey,
                }}
              >
                <AntDesign name="swap" size={18} color={color} />
              </View>
            ),
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="ProfileSection"
          component={ProfileSection}
          options={{
            tabBarIcon: ({ color, size, focused }) => (
              <View
                style={{
                  padding: 12,
                  borderRadius: 30,
                  backgroundColor: focused ? Colors.tintColor : Colors.grey,
                }}
              >
                <FontAwesome name="user-o" size={18} color={color} />
              </View>
            ),
            headerShown: false,
          }}
        />
      </Tab.Navigator>

  );
};

export default FinanceTab;

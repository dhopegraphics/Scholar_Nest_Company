import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

export default function Index() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.replace('Home'); // Replace current screen with Home screen
  }, [navigation]);

  return null; // No UI is needed
}

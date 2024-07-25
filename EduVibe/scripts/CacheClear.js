import AsyncStorage from '@react-native-async-storage/async-storage';

const clearAsyncStorage = async () => {
  try {
    await AsyncStorage.clear();
    console.log('AsyncStorage has been cleared.');
  } catch (error) {
    console.error('Failed to clear AsyncStorage:', error.message);
  }
};

export default clearAsyncStorage;
import AsyncStorage from '@react-native-async-storage/async-storage';

const getCacheSize = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const result = await AsyncStorage.multiGet(keys);
    let totalSize = 0;

    result.forEach(([key, value]) => {
      totalSize += key.length + value.length;
    });

    // Convert bytes to megabytes
    const totalSizeInMB = totalSize / (1024 * 1024);
    return totalSizeInMB;
  } catch (error) {
    console.error('Failed to get cache size:', error.message);
    return 0;
  }
};

export default getCacheSize;

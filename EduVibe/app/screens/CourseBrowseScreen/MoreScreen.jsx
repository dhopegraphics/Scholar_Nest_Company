// import React, { useRef, useMemo, useState } from 'react';
// import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
// import BottomSheet from '@gorhom/bottom-sheet';

// const MoreScreen = () => {
//   const bottomSheetRef = useRef(null);
//   const [selectedItem, setSelectedItem] = useState(null);

//   // Define the snap points
//   const snapPoints = useMemo(() => ['25%', '50%', '90%'], []);

//   const renderContent = () => (
//     <ScrollView contentContainerStyle={styles.contentContainer}>
//       {selectedItem === 'About this course' && (
//         <View>
//           <Text style={styles.sheetText}>Course Description: Detailed description of the course content and objectives.</Text>
//           <Text style={styles.sheetText}>Instructors: Information about the instructors, including their bios and credentials.</Text>
//           <Text style={styles.sheetText}>Syllabus: Overview of the course structure and schedule.</Text>
//         </View>
//       )}
//       {selectedItem === 'Course certificate' && (
//         <View>
//           <Text style={styles.sheetText}>Certificate Information: Explanation of how to earn the certificate.</Text>
//           <Text style={styles.sheetText}>Download Option: Link to download or view the certificate.</Text>
//           <Text style={styles.sheetText}>Share Options: Buttons to share the certificate on social media or via email.</Text>
//         </View>
//       )}
//       {/* Add content for other items similarly */}
//     </ScrollView>
//   );

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity style={styles.button} onPress={() => { setSelectedItem('About this course'); bottomSheetRef.current.expand(); }}>
//         <Text>About this course</Text>
//       </TouchableOpacity>
//       <TouchableOpacity style={styles.button} onPress={() => { setSelectedItem('Course certificate'); bottomSheetRef.current.expand(); }}>
//         <Text>Course certificate</Text>
//       </TouchableOpacity>
//       {/* Add other items similarly */}

//       <BottomSheet
//         ref={bottomSheetRef}
//         index={-1} // Start closed
//         snapPoints={snapPoints}
//       >
//         {renderContent()}
//       </BottomSheet>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     backgroundColor: '#f0f0f0',
//   },
//   button: {
//     padding: 16,
//     backgroundColor: '#ffffff',
//     marginBottom: 8,
//     borderRadius: 8,
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.8,
//     shadowRadius: 2,
//     elevation: 1,
//   },
//   contentContainer: {
//     padding: 16,
//   },
//   sheetText: {
//     marginBottom: 8,
//     fontSize: 16,
//   },
// });

// export default MoreScreen;
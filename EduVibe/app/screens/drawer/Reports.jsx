import { StyleSheet , Text, View, SafeAreaView, ScrollView } from "react-native";
import React , {useEffect , useState} from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Appbar } from "react-native-paper";
import { getCurrentUser } from "../../../lib/appwrite";

const ProfileCard = () => {
  const [currentUser, setCurrentUser] = useState(null); // State to store the current user
  useEffect(() => {
    // Fetch the current user when the component mounts
    const fetchCurrentUser = async () => {
      try {
        const user = await getCurrentUser();
        setCurrentUser(user);
      } catch (error) {
        console.error("Failed to fetch current user:", error);
      }
    };

    fetchCurrentUser();
  }, []);


  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          { currentUser && (
          <Text style={styles.name}>{currentUser.username}</Text>
          )}
          <Text style={styles.grade}>Year Two</Text>
        </View>
        <Text style={styles.school}>Kwame Nkrumah University Of Science And Technology</Text>
        <Text style={styles.course}>Computer Science</Text>
      </View>

      <View style={styles.space}>
        {[
          { subject: 'English', grade: 'A-', comment: 'Your an excellent writer and consistently turns in high-quality work. You could improve on your reading comprehension.' },
          { subject: 'Math', grade: 'B+', comment: 'You are strong in algebra and geometry, but you need to improve your problem-solving skills.' },
          { subject: 'Science', grade: 'A', comment: 'Your very curious and engaged in class. You excels at understanding scientific concepts.' },
          { subject: 'History', grade: 'B', comment: 'You needs to work on his essay writing skills, but Your indeed demonstrates a strong understanding of historical events.' }
        ].map((item, index) => (
          <View key={index} style={styles.card}>
            <View style={styles.subjectHeader}>
              <Text style={styles.subject}>{item.subject}</Text>
              <Text style={styles.grade}>{item.grade}</Text>
            </View>
            <Text style={styles.comment}>{item.comment}</Text>
          </View>
        ))}
      </View>

      <View style={styles.card}>
        <View style={styles.overall}>
          <View>
            <Text style={styles.subject}>Overall GPA</Text>
            <Text style={styles.comment}>3.7</Text>
          </View>
          <View>
            <Text style={styles.subject}>Performance</Text>
            <Text style={styles.comment}>Excellent</Text>
          </View>
        </View>
      </View>
    </View>
  );
};






const Reports = ({ navigation }) => {
  return (
    <SafeAreaView style={ReportSpace.container}>
      <View style={ReportSpace.headerContainer}>
        <Appbar.Header style={ReportSpace.header}>
          <Appbar.BackAction onPress={() => navigation.goBack()} />
          <Appbar.Content title="Reports" />
        </Appbar.Header>
      </View>
      <ScrollView contentContainerStyle={ReportSpace.scrollContainer}>
        {/* <View style={ReportSpace.iconContainer}>
          <Icon name="bar-chart" size={100} style={ReportSpace.gradesIcon} />
        </View> */}
        <ProfileCard/>
      </ScrollView>
    </SafeAreaView>
  );
};

const ReportSpace = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  headerContainer: {
    marginTop: -45,
  },
  header: {
    height: 56,
    paddingHorizontal: 0,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  gradesIcon: {
    height: "auto",
  },
  headerText: {
    fontSize: 20,
    color: "black",
    fontWeight: "bold",
  },
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
  },
  grade: {
    fontSize: 14,
    color: '#6b7280',
  },
  school: {
    fontSize: 14,
    color: '#6b7280',
  },
  course: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight : "800"
  },
  space: {
    marginVertical: 16,
  },
  subjectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  subject: {
    fontSize: 16,
    fontWeight: '600',
  },
  comment: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 8,
  },
  overall: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default Reports;

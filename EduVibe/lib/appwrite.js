import {
  Account,
  Client,
  Avatars,
  Databases,
  ID,
  Query,
  Storage,
} from "react-native-appwrite";
import * as Network from 'expo-network';
import ENV from "../scripts/envConfig";

export const appwriteConfig = {
  endpoint: ENV.ENDPOINT,
  platform: ENV.PLATFORM,
  projectId: ENV.PROJECT_ID,
  profileStorageId: ENV.PROFILE_STORAGE_ID,
  resourcesStorageId: ENV.RESOURCES_STORAGE_ID,
  coursesStorageId: ENV.COURSES_STORAGE_ID,
  databaseId: ENV.DATABASE_ID,
  userCollectionId: ENV.USER_COLLECTION_ID,
  surveysCollectionId: ENV.SURVEYS_COLLECTION_ID,
  eventsCollectionId: ENV.EVENTS_COLLECTION_ID,
  messagesCollectionId: ENV.MESSAGES_COLLECTION_ID,
  tagsCollectionId: ENV.TAGS_COLLECTION_ID,
  videoCollectionId: ENV.VIDEO_COLLECTION_ID,
  statsCollectionId: ENV.STATS_COLLECTION_ID,
  userCoursesCollectionId: ENV.USER_COURSES_COLLECTION_ID,
  parentWardsCollectionId:ENV.PARENT_WARDS_COLLECTION_ID,
};

const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.platform);

export const account = new Account(client);
export const storage = new Storage(client);
const avatars = new Avatars(client);
export const databases = new Databases(client);

// Function to get the current session
export async function getSession() {
  try {
    const response = await account.get();
    return response;
  } catch (e) {
    return null;
  }
}


export async function createUser(email, password, username) {
  try {
    const userId = ID.unique(); // Generate a unique ID for the user
    const newAccount = await account.create(userId, email, password, username);

    if (!newAccount) throw new Error("Failed to create new account");

    const avatarUrl = avatars.getInitials(username);

    await signIn(email, password);

    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      userId, // Use the same userId for the document ID
      {
        userId: userId,
        email: email,
        password: password, // This might be sensitive; ensure proper security measures
        username: username,
        avatar: avatarUrl,
      }
    );

    return newUser;
  } catch (error) {
    throw new Error(error);
  }
}


export async function signIn(email, password) {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getAccount() {
  try {
    const currentAccount = await account.get();
    return currentAccount;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getCurrentUser() {
  try {
    const session = await getSession();
    if (!session) throw new Error("No active session");

    const currentAccount = await getAccount();
    if (!currentAccount) throw new Error("No current account");

    const userId = currentAccount.$id; // Assuming userId is stored as $id in Appwrite

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("userId", userId)]
    );

    if (!currentUser.documents || currentUser.documents.length === 0)
      throw new Error("No current user");

    return currentUser.documents[0];
  } catch (error) {
    throw new Error(error);
  }
}

export async function signOut() {
  try {
    const session = await account.deleteSession("current");
    return session;
  } catch (error) {
    console.error("Error signing out:", error);
    throw new Error("Failed to sign out. Please try again."); // Customize error message based on the specific scenario
  }
}


export async function getAllUsers() {
  try {
    // Fetch the current user's account information
    const currentUser = await getCurrentUser();
    const currentUserId = currentUser.userId;

    // Fetch all users
    const response = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId
    );

    // Filter out the current user from the list
    const users = response.documents.filter(
      (user) => user.userId !== currentUserId
    );

    return users;
  } catch (error) {
    throw new Error(`Failed to fetch all users: ${error.message}`);
  }
}

export async function getEmailByUsername(username) {
  try {
    const userDocuments = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("username", username)]
    );

    if (userDocuments.documents.length === 0) {
      throw new Error("No user found with this username");
    }

    return userDocuments.documents[0].email;
  } catch (error) {
    throw new Error(`Failed to fetch email: ${error.message}`);
  }
}

export async function updateAvatar(userId, newAvatarUrl) {
  try {
    // Update avatar in user document
    const updatedUser = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      userId,
      {
        avatar: newAvatarUrl,
      }
    );

    return updatedUser;
  } catch (error) {
    throw new Error(`Failed to update avatar: ${error.message}`);
  }
}



export async function uploadFile(file) {
  if (!file) {
    throw new Error("No file provided");
  }

  const { name, uri } = file; // Destructure the file object

  try {
    // Check network connectivity
    const networkState = await Network.getNetworkStateAsync();
    if (!networkState.isConnected) {
      throw new Error("No internet connection");
    }

    // Fetch the file from the URI and convert it to a Blob
    const response = await fetch(uri);
    const blob = await response.blob();

    // Create a File object from the Blob
    const fileToUpload = new File([blob], name, { type: blob.type });

    // Upload the file to Appwrite storage
    const uploadResponse = await storage.createFile(
      appwriteConfig.coursesStorageId,
      ID.unique(),
      fileToUpload
    );

    // Return the uploaded file details
    return uploadResponse;
  } catch (error) {
    console.error(`File upload failed: ${error.message}`);
    throw new Error(`File upload failed: ${error.message}`);
  }
}



export async function createCourse(courseData) {
  try {
    const courseId = ID.unique(); // Generate a unique ID for the course

    await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      courseId,
      {
        title: courseData.title,
        description: courseData.description,
        videos: courseData.videos,
        resources: courseData.resources,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        courseAvatar: courseData.courseAvatar,
        videoHeader: courseData.videoHeader,
        userId: courseData.userId, // Add userId to the course data
      }
    );

    return {
      title: courseData.title,
      courseAvatar: courseData.courseAvatar,
      userId: courseData.userId,
    };
  } catch (error) {
    throw new Error(`Failed to create course: ${error.message}`);
  }
}

export async function getCourses() {
  try {
    const response = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId
    );
    return response.documents;
  } catch (error) {
    throw new Error(`Failed to fetch courses: ${error.message}`);
  }
}

export async function deleteCourse(courseId) {
  try {
    await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      courseId
    );
    return { success: true };
  } catch (error) {
    throw new Error(`Failed to delete course: ${error.message}`);
  }
}

export const joinCourse = async (userId, courseId) => {
  try {
    if (!userId || !courseId) {
      throw new Error('Invalid userId or courseId');
    }
    await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCoursesCollectionId,
      ID.unique(), // Generate a unique ID for this document
      {
        userId: userId,
        courseId: courseId,
        joinedAt: new Date().toISOString() // Optional: Record the join date
      }
    );
    console.log('Course joined successfully.');
  } catch (error) {
    console.error('Failed to join course:', error.message);
    throw error; // Propagate error
  }
};


export const getUserJoinedCourses = async (userId) => {
  if (!userId) {
    throw new Error('Invalid userId provided');
  }

  try {
    console.log('Querying for userId:', userId); // Debugging line
    const response = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCoursesCollectionId,
      [Query.equal('userId', userId)]
    );

    const joinedCourses = response.documents;

    // Fetch the user details
    const user = await getUserDetails(userId);

    // Attach username to each joined course
    const joinedCoursesWithUser = joinedCourses.map(course => ({
      ...course,
      username: user.username
    }));

    console.log('Joined courses with user:', joinedCoursesWithUser); // Debugging line
    return joinedCoursesWithUser;
  } catch (error) {
    console.error('Failed to fetch joined courses:', error.message);
    throw error; // Propagate error
  }
};




export async function getUser(userId) {
  try {
    const user = await account.get(userId);
    return user;
  } catch (error) {
    throw new Error(`Failed to fetch user details: ${error.message}`);
  }
}

// Function to upload files to resourcesStorageId
export async function uploadResourceFile(file) {
  if (!file) {
    throw new Error("No file provided");
  }

  const { name, type, uri } = file; // Destructure the file object

  try {
    const response = await storage.createFile(
      appwriteConfig.resourcesStorageId,
      ID.unique(),
      new File([uri], name, { type })
    );

    // Return the uploaded file details
    return response;
  } catch (error) {
    throw new Error(`File upload failed: ${error.message}`);
  }
}

export async function sendMessage(senderId, receiverId, content) {
    try {
        const messageId = ID.unique();
        const createdAt = new Date().toISOString();
        const updatedAt = createdAt;

        const newMessage = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.messagesCollectionId,
            messageId,
            {
                senderId: senderId,
                receiverId: receiverId,
                content: content,
                createdAt: createdAt,
                updatedAt: updatedAt,
            }
        );

        return newMessage;
    } catch (error) {
        throw new Error(`Failed to send message: ${error.message}`);
    }
}


export async function getMessages(senderId, receiverId) {
    try {
        const messages = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.messagesCollectionId,
            [
                Query.or(
                    Query.and(Query.equal("senderId", senderId), Query.equal("receiverId", receiverId)),
                    Query.and(Query.equal("senderId", receiverId), Query.equal("receiverId", senderId))
                ),
                Query.orderAsc("createdAt")
            ]
        );

        return messages.documents;
    } catch (error) {
        throw new Error(`Failed to fetch messages: ${error.message}`);
    }
}

export async function fetchAllTagCollectionDocuments() {
  try {
      const documents = await databases.listDocuments(
          appwriteConfig.databaseId,
          appwriteConfig.tagsCollectionId
      );
      return documents.documents;
  } catch (error) {
      throw new Error(`Failed to fetch tag collection documents: ${error.message}`);
  }
}



export async function updateTagCollectionDocument(id, updatedData) {
  try {
      const updatedDocument = await databases.updateDocument(
          appwriteConfig.databaseId,
          appwriteConfig.tagsCollectionId,
          id,
          updatedData
      );
      return updatedDocument;
  } catch (error) {
      throw new Error(`Failed to update tag collection document: ${error.message}`);
  }
}


export const attachment = async (file, userId) => {
  try {
    // Upload file to storage
    const response = await storage.createFile(appwriteConfig.resourcesStorageId, ID.unique(), file);

    // Store file metadata in the database
    await databases.createDocument(appwriteConfig.databaseId, 'userUploads', ID.unique(), {
      fileId: response.$id,
      fileName: file.name,
      fileUrl: response.$id,
      uploaderId: userId,
    });

    return response;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};

export const fetchFiles = async () => {
  try {
    const response = await databases.listDocuments(appwriteConfig.databaseId, 'userUploads');
    return response.documents;
  } catch (error) {
    console.error('Error fetching files:', error);
    throw error;
  }
};

export async function getUserDetails(userId) {
  try {
    const userDocuments = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("userId", userId)]
    );

    if (userDocuments.documents.length === 0) {
      throw new Error("No user found with this userId");
    }

    return userDocuments.documents[0]; // Return the first matching user document
  } catch (error) {
    throw new Error(`Failed to fetch user details: ${error.message}`);
  }
}

export const getUsersInCourse = async (courseId) => {
  if (!courseId) {
    throw new Error('Invalid courseId provided');
  }

  try {
    const response = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCoursesCollectionId,
      [Query.equal('courseId', courseId)]
    );

    if (!response.documents) {
      throw new Error('No users found for this course');
    }

    return response.documents.map(doc => doc.userId); // Return only userIds
  } catch (error) {
    console.error('Failed to get users in course:', error.message);
    throw new Error('Failed to get users in course');
  }
};

// Function to fetch participants of a specific course
export const getParticipantsForCourse = async (courseId) => {
  if (!courseId) {
    throw new Error('Invalid courseId provided');
  }

  try {
    console.log('Querying for courseId:', courseId); // Debugging line

    // Get all users who have joined the specific course
    const response = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCoursesCollectionId,
      [Query.equal('courseId', courseId)]
    );

    const participants = response.documents;

    // Fetch user details for each participant
    const participantDetails = await Promise.all(participants.map(async (participant) => {
      const userDetails = await getUserDetails(participant.userId);
      return {
        ...participant,
        username: userDetails.username,
        img: userDetails.avatar, // Assuming `img` is part of user details
      };
    }));

    console.log('Participants for course:', participantDetails); // Debugging line
    return participantDetails;
  } catch (error) {
    console.error('Failed to fetch participants for course:', error.message);
    throw error; // Propagate error
  }
};

export const unjoinCourse = async (userId, courseId) => {
  try {
    if (!userId || !courseId) {
      throw new Error('Invalid userId or courseId');
    }

    // Query the document to find the correct user-course relationship
    const response = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCoursesCollectionId,
      [
        Query.equal('userId', userId),
        Query.equal('courseId', courseId)
      ]
    );

    const userCourseDocument = response.documents[0];
    
    if (!userCourseDocument) {
      throw new Error('No user-course relationship found');
    }

    // Delete the document
    await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCoursesCollectionId,
      userCourseDocument.$id
    );

    console.log('Course unjoined successfully.');
    return { success: true };
  } catch (error) {
    console.error('Failed to unjoin course:', error.message);
    throw error; // Propagate error
  }
};

export const createParentWard = async (WardsId, AddedBy) => {
  try {
    const response = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.parentWardsCollectionId,
      ID.unique(), // Unique ID for the document
      {
        WardsId: WardsId,
        AddedBy: AddedBy,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
    );
    return response;
  } catch (error) {
    console.error('Failed to create ParentWards document:', error);
    throw error;
  }
};

export const fetchParentWardsForUser = async (username) => {
  try {
    const response = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.parentWardsCollectionId,
      [
        Query.equal('AddedBy', username)
      ]
    );
    
    const documents = response.documents;
    
    // Fetch user details for each WardsId
    const documentsWithUsernames = await Promise.all(documents.map(async (doc) => {
      const userDetails = await getUserDetails(doc.WardsId);
      return {
        ...doc,
        WardsUsername: userDetails.username // Assuming the user details contain a 'username' field
      };
    }));

    return documentsWithUsernames;
  } catch (error) {
    console.error('Failed to fetch ParentWards documents:', error);
    throw error;
  }
};
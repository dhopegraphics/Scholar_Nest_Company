import {
  Account,
  Client,
  Avatars,
  Databases,
  ID,
  Query,
  Storage,
} from "react-native-appwrite";

export const appwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.edu.vibe",
  projectId: "66687f85003afa240a06",
  profileStorageId: "668fd0040007e542fb30",
  resourcesStorageId: "668fd05c001c7c2bc58f",
  coursesStorageId: "668fd02f0022ef781b02",
  databaseId: "668fc1590028eb686fb6",
  userCollectionId: "669011d1002a6af7e7f2",
  surveysCollectionId: "668fcb140000008d1207",
  eventsCollectionId: "668fca200019cbb6b7a6",
  messagesCollectionId: "668fc6fd0039f925afc7",
  tagsCollectionId: "668fc5f2000325d26822",
  videoCollectionId: "668fc472002bb64206e0",
  statsCollectionId: "66903d1a00329bd5db09",
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

export async function uploadFile(file, type) {
  if (!file) return;

  const { mimeType, ...rest } = file;
  const asset = { type: mimeType, ...rest };

  try {
    const uploadedFile = await storage.createFile(
      appwriteConfig.profileStorageId,
      ID.unique(),
      asset
    );

    const fileUrl = await getFilePreview(uploadedFile.$id, type);
    return fileUrl;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getFilePreview(fileId, type) {
  let fileUrl;

  try {
    if (type === "video") {
      fileUrl = storage.getFileView(appwriteConfig.profileStorageId, fileId);
    } else if (type === "image") {
      fileUrl = storage.getFilePreview(
        appwriteConfig.profileStorageId,
        fileId,
        2000,
        2000,
        "top",
        100
      );
    } else {
      throw new Error("Invalid file type");
    }

    if (!fileUrl) throw new Error("No file URL");

    return fileUrl;
  } catch (error) {
    throw new Error(error);
  }
}

export async function createVideoPost(form) {
  try {
    const [thumbnailUrl, videoUrl] = await Promise.all([
      uploadFile(form.thumbnail, "image"),
      uploadFile(form.video, "video"),
    ]);

    const newPost = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      ID.unique(),
      {
        title: form.title,
        thumbnail: thumbnailUrl,
        video: videoUrl,
        prompt: form.prompt,
        creator: form.userId,
      }
    );

    return newPost;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getAllPosts() {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId
    );

    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getUserPosts(userId) {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      [Query.equal("creator", userId)]
    );

    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
}

export async function searchPosts(query) {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      [Query.search("title", query)]
    );

    if (!posts) throw new Error("Something went wrong");

    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getLatestPosts() {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      [Query.orderDesc("$createdAt"), Query.limit(7)]
    );

    return posts.documents;
  } catch (error) {
    throw new Error(error);
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

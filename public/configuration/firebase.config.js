const  { initializeApp } = require("@firebase/app");
const {getStorage, uploadBytes, getDownloadURL, ref} = require('@firebase/storage')



const firebaseConfig = {
  apiKey: "AIzaSyBKkK2jGSHDUYq_696VLYltp2eR4iDGOWQ",
  authDomain: "hospital-storage-fe433.firebaseapp.com",
  projectId: "hospital-storage-fe433",
  storageBucket: "gs://hospital-storage-fe433.appspot.com/",
  messagingSenderId: "225798061432",
  appId: "1:225798061432:web:9b9f1147f998cf392b5c8d",
  measurementId: "G-FY6M13LV2Q"
};

initializeApp(firebaseConfig);
const storage = getStorage()

const fireBaseUploading = async(originalname,buffer)=>{
  let date = Date.now()
  const storageRef = ref(storage, `files/${originalname + " " + date}`);
  const snapshot = await uploadBytes(storageRef,buffer);
  const downloadURL = await getDownloadURL(snapshot.ref);
  return downloadURL
}

const firebaseChatUploading = async (files) => {
  const fileURLs = [];
  for (const file of files) {
    const date = Date.now();
    const storageRef = ref(storage, `files/${file.originalname}-${date}`);
    const snapshot = await uploadBytes(storageRef, file.buffer);
    const downloadURL = await getDownloadURL(snapshot.ref);
    fileURLs.push(downloadURL);
  }

  return fileURLs;
}

module.exports = {fireBaseUploading,firebaseChatUploading}
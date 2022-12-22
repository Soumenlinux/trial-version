// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase , ref, set,get, child} from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA_q_vPvfDeDRpY3aHOtx4aJQaA2ilpQoo",
  authDomain: "crud-92909.firebaseapp.com",
  databaseURL: "https://crud-92909-default-rtdb.firebaseio.com",
  projectId: "crud-92909",
  storageBucket: "crud-92909.appspot.com",
  messagingSenderId: "162218278094",
  appId: "1:162218278094:web:1d8438ccd6f08e9294e49f",
  measurementId: "G-SLMW0604M1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);



///write data function 
function writeUserData(userId, name, email, imageUrl){
    const db= getDatabase();
    const reference = ref(db,'users/'+ userId);
    set(reference,{
        username:name,
        email:email,
        profile_picture: imageUrl
    
    });
}
///user 
writeUserData("1"," maity","soumen@idreameducation.org","backend developer");
writeUserData("2"," linux","soumenmaity858@gmail.com","software developer");


// read data
const dbRef = ref(getDatabase());
get(child(dbRef, `users/`)).then((snapshot) => {
  if (snapshot.exists()) {
    console.log(snapshot.val());
  } else {
    console.log("No data available");
  }
}).catch((error) => {
  console.error(error);
});



///mvc read

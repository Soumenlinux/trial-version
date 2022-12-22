import express from 'express'
const app= express();
import router from './routes/route.js';

import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database';

app.use(express.json());
app.use('/', router);

const config=initializeApp({
    apiKey: "AIzaSyA_q_vPvfDeDRpY3aHOtx4aJQaA2ilpQoo",
    authDomain: "crud-92909.firebaseapp.com",
    databaseURL: "https://crud-92909-default-rtdb.firebaseio.com",
    projectId: "crud-92909",
    storageBucket: "crud-92909.appspot.com",
    messagingSenderId: "162218278094",
    appId: "1:162218278094:web:1d8438ccd6f08e9294e49f",
    measurementId: "G-SLMW0604M1"
});

const db=getDatabase(config);

app.listen(8000, ()=>{
  console.log('server is running on http://localhost:8000')
})
import express from 'express'
const app= express();
import router from './routes/route.js';
import db from './db/db.js';
app.use(express.json());
app.use('/', router);

app.set(db);

app.listen(8000, ()=>{
  console.log('server is running on http://localhost:8000')
})


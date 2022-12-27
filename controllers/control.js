
import { getDatabase, ref, set, child, remove, get, onValue } from "firebase/database";

///add data
const addData = async (req, res) => {
  const { userId, name, age, email } = req.body;

  try {
    const db = getDatabase();
    await set(ref(db, "users/" + userId), {
      username: name,
      age: age,
      email: email,
    });

    return res.status(201).send({ masg: "added successfully" });
  } catch (err) {
    return res.send({ msg: "data not available" }).status(404);
  }
};

/// get data
 const getData = async (req, res) => {


try {
 const dbRef = getDatabase();
  const response= await new Promise((resolve,reject)=>{
    try {
      onValue(ref(dbRef,"users/"),(snapshot)=>{
        try {
          resolve(snapshot.val())
        } catch (error) {
          reject({"error":error})
        }
       
      },{
        onlyOnce:true
      })
    } catch (error) {
      reject({"error":error})
    }
  });

  
  if(!response){
    return res.status(404).json({"msg":"not found"})
}
else if(typeof response == "object" && response["error"]!= undefined){
  return res.status(400).json({"msg":"bad request"})
}
return res.send(response).status(200)

}
 catch (error) {
  return res.status(500).json({"msg":"internal server error"})
}

}
  
////getspecificdata

const getOneData = async (req, res) => {
  const userId = req.params.id;

  try {
    const dbRef = getDatabase();
     const response= await new Promise((resolve,reject)=>{
       try {
         onValue(ref(dbRef,`users/${userId}`),(snapshot)=>{
           try {
             resolve(snapshot.val())
           } catch (error) {
             reject({"error":error})
           }
          
         },{
           onlyOnce:true
         })
       } catch (error) {
         reject({"error":error})
       }
     });
   
     
     if(!response){
       return res.status(404).json({"msg":"not found"})
   }
   else if(typeof response == "object" && response["error"]!= undefined){
     return res.status(400).json({"msg":"bad request"})
   }
   return res.send(response).status(200)
   
   }
    catch (error) {
     return res.status(500).json({"msg":"internal server error"})
   }
   
   }


////deleted specific data

const deleteData = async (req, res) => {
  const userId = req.params.id;
  const dbRef = ref(getDatabase());
  try {
    const data = await get(child(dbRef, `users/${userId}/`));
    if (data.exists()) {
      remove(ref(getDatabase(), `users/${userId}/`));
      return res.send({ msg: "data deleted" }).status(201);
    }
    return res.send({ msg: "Not Found" }).status(404);

  }catch (error) {
    return res.send({ msg: "Bad request" }).status(400);
  }
};

///update data using id
const updateData = async (req, res) => {
  const userId = req.params.id;
  const { name, age, email } = req.body;
  const dbRef = ref(getDatabase());
  try {
    const data = await get(child(dbRef, `users/${userId}/`));
    if (data.exists()) {
      await set(ref(getDatabase(), "users/" + userId), {
        username: name,
        age: age,
        email: email,
      });
      return res.send({ msg: "updated data.." }).status(201);
    } 
    return res.send({ msg: "Not Found" }).status(404);
  } catch (err) {
    return res.send({ msg: "bad request" }).status(400);
  }
};

export { addData, getData, deleteData, updateData, getOneData };

///error handle and response

///this code write by soumen@maity

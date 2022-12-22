
import { getDatabase,ref, set,get,child,remove} from "firebase/database";


// import { getDatabase } from "firebase/database";

// const database = getDatabase();



///add data
 const addData = async (req, res) => {
    const { userId,name,age,email} = req.body;
    
    try {
        const db = getDatabase();
        set(ref(db, 'users/' + userId), {
            username: name,
            age:age,
            email: email,
           
          });
    } catch (err) {
      console.log(err);
    }
    return res.status(201).send('added successfully');
  };


/// get data
  const getData= async(req,res)=>{
    try{
        const dbRef = ref(getDatabase());
        get(child(dbRef, `users/`)).then((snapshot) => {
          if (snapshot.exists()) {
            console.log(snapshot.val());

           return res.send(snapshot.val()).status(201)

          } else {
            console.log("No data available");
          }
        }) 
        }
        catch(error) {
            console.error(error)
    }
        
    
    }
  



    ////deleted data

const deleteData= async (req,res)=>{
    const userId =await req.params.id;
    try{
     remove(ref(getDatabase(),`users/${userId}/`));

     res.send("Data is deleted").status(201);

    }catch(err){
      console.log(err)
    }
    
}



const updateData = async(req,res)=>{

        // update(ref(getDatabase(),`users/${userId}/`));
        const userId = req.params.id;
    const {name,age,email}=req.body
        try {
            const db = getDatabase();
            set(ref(db, 'users/' + userId), {
                username: name,
                age:age,
                email: email,
            })

              return res.send("updated data..").status(201)
        } catch (err) {
          console.log(err);
        }
    }



export {addData,getData,deleteData,updateData};
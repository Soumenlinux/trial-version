import { getDatabase, ref, set, get, child, remove } from "firebase/database";

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
    return res.send({ msg: "data not available" }).status(500);
  }
};

/// get data
const getData = async (req, res) => {
  const dbRef = ref(getDatabase());

  await get(child(dbRef, `users/`)).then((snapshot) => {
    if (snapshot.exists()) {
      // console.log(snapshot.val());
      return res.send(snapshot.val()).status(201);
    } else {
      // console.log("No data available");
      return res.send({ msg: "Data not available" }).status(500);
    }
  });
};

////getspecificdata

const getOneData = async (req, res) => {
  const userId = req.params.id;
  const dbRef = ref(getDatabase());
  try {
    await get(child(dbRef, `users/${userId}/`)).then((snapshot) => {
      if (snapshot.exists()) {
        return res.send(snapshot.val()).status(201);
      } else {
        return res.send({ msg: "data is not available" }).status(500);
      }
    });
  } catch (error) {
    return res.send({ msg: "Bad request" }).status(400);
  }
};

////deleted specific data

const deleteData = async (req, res) => {
  const userId = req.params.id;
  const dbRef = ref(getDatabase());
  try {
    await get(child(dbRef, `users/${userId}/`)).then((snapshot) => {
      if (snapshot.exists()) {
        remove(ref(getDatabase(), `users/${userId}/`));
        return res.send({ msg: "data deleted" }).status(201);
      } else {
        return res.send({ msg: "data is not available" }).status(500);
      }
    });
  } catch (error) {
    return res.send({ msg: "Bad request" }).status(400);
  }
};

///update data using id
const updateData = async (req, res) => {
  const userId = req.params.id;
  const { name, age, email } = req.body;
  const dbRef = ref(getDatabase());
  try {
    await get(child(dbRef, `users/${userId}/`)).then((snapshot) => {
      if (snapshot.exists()) {
        set(ref(getDatabase(), "users/" + userId), {
          username: name,
          age: age,
          email: email,
        });
        return res.send({ msg: "updated data.." }).status(201);
      } else{
        return res.send({ msg: "data is not available" }).status(500);
      }
    });
  } catch (err) {
    return res.send({ msg: "bad request" });
  }
};

export { addData, getData, deleteData, updateData, getOneData };

///error handle and response

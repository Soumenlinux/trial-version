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
    return res.send({ msg: "data not available" }).status(404);
  }
};

/// get data
const getData = async (req, res) => {
  const dbRef = ref(getDatabase());
  try {
    const data = await get(child(dbRef, `users/`));
    // const rawData = await data.toJSON();
    // console.log(rawData[1].age)

    if (data.exists()) {
      return res.send(data).status(200);
    }
    return res.send({ msg: "Not Found" }).status(404);
  } catch (err) {
    return res.send({ msg: "bad request.." }).send(400);
  }
};

////getspecificdata

const getOneData = async (req, res) => {
  const userId = req.params.id;
  const dbRef = ref(getDatabase());
  try {
    const data = await get(child(dbRef, `users/${userId}/`));

    // const rawData =  await data.toJSON();
    // console.log(rawData.email)

    if (data.exists()) {
      return res.send(data).status(200);
    } 
    return res.send({ msg: "Not Found" }).status(404);
  } catch (error) {
    return res.send({ msg: "Bad request" }).status(400);
  }
};

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

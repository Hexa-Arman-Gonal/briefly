const { dbConnection } = require("../configs/db");
exports.createUser = async (
  res,
  name,
  username,
  password,
  email,
  phonenumber
) => {
  const db = await dbConnection();
  const usersCollection = db.collection("users");
  const isUserExist = await usersCollection.findOne({
    username,
    email,
    phonenumber,
  });

  if (isUserExist) {
    res.writeHead(401, { "Content-Type": "application/json" });
    res.write(JSON.stringify({ message: "This User Is Exist" }));
    res.end();
  } else {
    const newTime = new Date();
    const min = 1000000000;
    const max = 9999999999;
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    const randomNumberExpireTime = Date.now() + 7 * 24 * 60 * 60 * 1000;
    await usersCollection.insertOne({
      name,
      username,
      password,
      email,
      phonenumber,
      randomnumber: randomNumber,
      randomNumberExpireTime,
      createdAt: newTime,
      updatedAt: newTime,
    });
    res.writeHead(201, { "Content-Type": "application/json" });
    res.write(
      JSON.stringify({
        message:
          "User Created Successfully\nUse This UID For Create Shorten Link\nRemember That And This Number will expire within the next 7 days",
        UID: randomNumber,
      })
    );
    res.end();
  }
};

exports.loginUser = async (res, username, password, email) => {
  const db = await dbConnection();
  const usersCollection = db.collection("users");
  const isUserExist = await usersCollection.countDocuments({
    username,
    password,
    email,
  });

  if (isUserExist) {
    const newTime = new Date();
    const min = 1000000000;
    const max = 9999999999;
    const randomnumber = Math.floor(Math.random() * (max - min + 1)) + min;
    const randomNumberExpireTime = Date.now() + 7 * 24 * 60 * 60 * 1000;
    await usersCollection.updateOne(
      { username, password, email },
      {
        $set: {
          randomnumber: randomnumber,
          randomNumberExpireTime,
          updatedAt: newTime
        },
      }
    );
    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(
      JSON.stringify({
        message:
          "Welcome Back\nGet This UID And Remember It\nThis Number will expire within the next 7 days",
        UID: randomnumber,
      })
    );
    res.end();
  } else {
    res.writeHead(401, { "Content-Type": "application/json" });
    res.write(JSON.stringify({ messgae: "This User Dosen't Exist !!" }));
    res.end();
  }
};

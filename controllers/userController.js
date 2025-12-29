const userModel = require("../models/User");
exports.register = async (req, res) => {
  let body = "";

  req.on("data", (data) => {
    body = body + data;
  });

  req.on("end", async () => {
    const { name, username, password, email, phonenumber } = JSON.parse(body);
    await userModel.createUser(res, name, username, password, email, phonenumber);
  });
};

exports.login = async (req, res) => {
  let body = "";

  req.on("data", (data) => {
    body = body + data;
  });

  req.on("end", async () => {
    const { username, password, email } = JSON.parse(body);
    await userModel.loginUser(res, username, password, email);
  });
};

const { dbConnection } = require("../configs/db");
const url = require("url");
exports.shortenLink = async (res, UID, link, userExpireTime) => {
  const db = await dbConnection();
  const linksCollection = db.collection("links");
  const usersCollection = db.collection("users");
  const isUid = await usersCollection.findOne({ randomnumber: Number(UID) });
  if (isUid) {
    const parsedUrl = url.parse(link);
    const splitedUrl = parsedUrl.pathname.split("/");
    const shortCode = Math.floor(Math.random() * 90000) + 10000;
    splitedUrl[splitedUrl.length - 1] = shortCode;
    const newUrl = splitedUrl.join("/");
    const shortedUrl = `${parsedUrl.protocol}//${parsedUrl.host}${newUrl}`;
    const expireTime =
      Date.now() + Number(userExpireTime) * 24 * 60 * 60 * 1000;
    const newTime = Date.now();
    await linksCollection.insertOne({
      originalUrl: link,
      shortedUrl,
      expireTime,
      UID,
      click: 0,
      createdAt: newTime,
      updatedAt: newTime,
    });
    res.writeHead(201, { "Content-Type": "application/json" });
    res.write(
      JSON.stringify({
        messgae: "Your Link Is Shorten",
        shortedUrl,
        expireTime,
      })
    );
    res.end();
  } else {
    res.writeHead(401, { "Content-Type": "application/json" });
    res.write(JSON.stringify({ message: "Your UID Is Not Valid" }));
    res.end();
  }
};

exports.sendLinks = async (res, UID) => {
  const db = await dbConnection();
  const linksCollection = db.collection("links");
  const allLinks = await linksCollection.find({ UID }).toArray();

  if (allLinks.length != 0) {
    let links = [];
    allLinks.forEach((link) => {
      links.push({
        originalUrl: link.originalUrl,
        shortedUrl: link.shortedUrl,
        expireTime: link.expireTime,
      });
    });

    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(JSON.stringify({ links }));
    res.end();
  } else {
    res.writeHead(401, { "Content-Type": "application/json" });
    res.write(
      JSON.stringify({ message: "This UID Isn't Valid Or Dosen't Url Here" })
    );
    res.end();
  }
};

exports.removeLink = async (req, res, UID, shortedUrl) => {
  const db = await dbConnection();
  const linksCollection = db.collection("links");
  const usersCollection = db.collection("users");

  const isUser = await usersCollection.findOne({ randomnumber: Number(UID) });
  if (isUser) {
    const isUrl = await linksCollection.findOne({ shortedUrl });
    if (isUrl) {
      const deletedLink = await linksCollection.findOneAndDelete({
        shortedUrl,
      });
      res.writeHead(200, { "Content-Type": "application/json" });
      res.write(
        JSON.stringify({
          message: "Url Removed Successfully",
          url: deletedLink,
        })
      );
      res.end();
    } else {
      res.writeHead(401, { "Content-Type": "application/json" });
      res.write(
        JSON.stringify({
          message: "This Url Isn't Valid Or Dosen't Url Here",
        })
      );
      res.end();
    }
  } else {
    res.writeHead(401, { "Content-Type": "application/json" });
    res.write(JSON.stringify({ message: "This UID Isn't Valid" }));
    res.end();
  }
};

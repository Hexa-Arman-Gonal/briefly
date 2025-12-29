const url = require("url");
const linkModel = require("../models/Link");
exports.shortenLink = async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const UID = parsedUrl.query.UID;

  let body = "";
  req.on("data", (data) => {
    body = body + data;
  });
  req.on("end", () => {
    const { link, expireTime } = JSON.parse(body);
    linkModel.shortenLink(res, UID, link, expireTime);
  });
};
exports.sendLinks = async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const UID = parsedUrl.query.UID;
  linkModel.sendLinks(res, UID);
};
exports.removeLink = async (req, res) => {
  let body = "";

  req.on("data", (data) => {
    body = body + data;
  });

  req.on("end", async () => {
    const { UID, shortedUrl } = JSON.parse(body);
    linkModel.removeLink(req, res, UID, shortedUrl);
  });
};

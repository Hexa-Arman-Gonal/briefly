// Third Party MiddleWares
require("dotenv").config();
// Core Modules
const http = require("http");
// Local MiddleWares
require("./configs/db");
const userController = require("./controllers/userController");
const urlShorterController = require("./controllers/urlShorterController");

const server = http.createServer((req, res) => {
  if (req.method === "POST" && req.url === "/api/register") {
    userController.register(req, res);
  } else if (req.method === "POST" && req.url === "/api/login") {
    userController.login(req, res);
  } else if (
    req.method === "POST" &&
    req.url.startsWith("/api/links/shorten")
  ) {
    urlShorterController.shortenLink(req, res);
  } else if (
    req.method === "GET" &&
    req.url.startsWith("/api/links/all-links")
  ) {
    urlShorterController.sendLinks(req, res);
  } else if (req.method === "DELETE" && req.url === "/api/links/delete-link") {
    urlShorterController.removeLink(req, res);
  } else {
    res.writeHead(404, { "content-type": "application/json" });
    res.write(JSON.stringify({ message: `${req.url} Not Found !!` }));
    res.end();
  }
});

const port = process.env.PORT;

server.listen(port, (err) => {
  if (err) {
    throw new Error(err);
  } else {
    console.log(`Server Running On Port ${port}`);
  }
});

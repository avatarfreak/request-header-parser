const express = require("express"),
  app = express(),
  bodyParser = require("body-parser");

// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/whoami/", (req, res) => {
  const ip = req.connection.remoteAddress;
  const parseData = {
    ipaddress: ip.split(":").reverse()[0],
    language: req.headers["accept-language"],
    software: req.headers["user-agent"]
  };
  res.json(parseData);
});

app.use(express.static("public"));
app.get("/", (request, response) => {
  response.sendFile(`${__dirname}/views/index.html`);
});

const portNumber = process.env.PORT || 8080;
app.listen(portNumber, () => {
  console.log(`listening on port ${portNumber}`);
});

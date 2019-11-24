const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const Chatkit = require("@pusher/chatkit-server");

const keys = require("./keys/keys");

const app = express();

const chatkit = new Chatkit.default({
  instanceLocator: process.env.INSTANCE_LOCATOR || keys.INSTANCE_LOCATOR,
  key: process.env.KEY || keys.KEY
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use(express.static(path.join(__dirname, "build")));

app.post("/user", (req, res) => {
  const { username } = req.body;

  chatkit
    .createUser({
      name: username,
      id: username
    })
    .then(() => res.sendStatus(201))
    .catch(error => {
      if (error.error_type === "services/chatkit/user_already_exists") {
        res.sendStatus(200);
      } else {
        res.status(error.status).json(error);
      }
    });
});

app.post("/authenticate", (req, res) => {
  //const { grant_access } = req.body;
  // res.json(chatkit.authenticate({ grant_type, userId: req.query.user_id }));
  const authData = chatkit.authenticate({
    userId: req.query.user_id
  });

  res.status(authData.status).send(authData.body);
});

// Handles any requests that don't match the ones above
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/build/index.html"));
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, err => {
  if (err) {
    console.error(err);
  } else {
    console.log(`Running on port ${PORT}`);
  }
});

const express = require("express");
const app = express();

const connection = require("./config/connect");

// importer cors
const cors = require("cors");
app.use(cors());

const formateur = require("./routes/formateurs");
app.use("/formateur", formateur);
const formation = require("./routes/formations");
app.use("/formation", formation);
const user = require("./routes/users");
app.use("/user", user);

console.log("hello developpeurs nodejs");

app.get("/hello", (req, res) => {
  // envoyer les données au navigateur
  console.log("hello les devs angular node js");

  res.send("hello les devs angular node js");
});

// recuperer les images depuis le fichier uploads

app.use("/getimages", express.static("./uploads"));

// 2eme methode avec arrow function
app.listen(3000, () => {
  console.log("server work");
});

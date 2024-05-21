const express = require("express");
const app = express();

const connection = require("./config/connect");


app.get("/", (req, res) => {
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

const express = require("express");

const router = express.Router();
router.use(express.json());

const connection = require("../config/connect");

const multer = require("multer");

filename = "";
const mystorage = multer.diskStorage({
  // cb:callback c'est une fonction qui permet de rediriger l'image vers la distination (uploads)
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    let f1 = Date.now() + "." + file.mimetype.split("/")[1];
    cb(null, f1);
    filename = f1;
  },
});

const uploadStorage = multer({ storage: mystorage });

router.post("/ajouter", uploadStorage.any("image"), (req, res) => {
  const data = req.body;

  data.image = filename;

  const sql = "insert into formations set ?";
  connection.query(sql, data, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      filename = "";
      res.json({ message: "formation ajouté avec succès" });
    }
  });
});

router.get("/getall", (req, res) => {
  const sql =
    "select formations.id, formations.title, formations.description, formations.date, formations.image,  formations.id_formateur,formateurs.name, formateurs.prenom, formateurs.email  from formations left join formateurs on formations.id_formateur=formateurs.id";
  connection.query(sql, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

router.get("/getbyid/:id", (req, res) => {
  let myid = req.params.id;
  const sql = "select * from formations where id= ?";
  connection.query(sql, myid, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

router.delete("/delete/:id", (req, res) => {
  let myid = req.params.id;
  const sql = "delete from formations where id= ?";
  connection.query(sql, myid, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json({ message: "formation a été bien supprimé" });
    }
  });
});

router.put("/update/:id", uploadStorage.any("image"), (req, res) => {
  let data = req.body;
  let myid = req.params.id;
  if (filename) {
    data.image = filename;
  }

  const sql = "update formations set ? where id=? ";
  connection.query(sql, [data, myid], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.json({ message: "la formation a été bien modifiée" });
      filename = "";
    }
  });
});
module.exports = router;

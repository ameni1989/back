const express = require("express");

const router = express.Router();
router.use(express.json());

const connection = require("../config/connect");
router.post("/ajouter", (req, res) => {
  const data = req.body;

  const sql = "insert into formateurs set ?";
  connection.query(sql, data, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json("Formateur ajouté avec succès");
    }
  });
});

router.get("/getall", (req, res) => {
  const sql = "select * from formateurs";
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
  const sql = "select * from formateurs where id= ?";
  connection.query(sql, myid, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result[0]);
    }
  });
});

router.delete("/delete/:id", (req, res) => {
  let myid = req.params.id;
  const deleteFormations = "delete from formations where id_formateur =" + myid;
  const deleteFormateur = "delete from formateurs where id =" + myid;

  connection.query(deleteFormations, myid, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      connection.query(deleteFormateur, myid, (err, result) => {
        if (err) {
          res.json(err);
        } else {
          res.json({
            message: "Formateur et ses formations ont été supprimés",
          });
        }
      });
    }
  });
});

router.put("/update/:id", (req, res) => {
  let data = req.body;
  let myid = req.params.id;

  const sql = "update formateurs set ? where id=? ";
  connection.query(sql, [data, myid], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.json({ message: "le formateur a été bien modifié" });
    }
  });
});
module.exports = router;

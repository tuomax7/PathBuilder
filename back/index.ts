import express from "express";
const app = express();

app.use(express.static("build"));

import bodyParser from "body-parser";

import cors from "cors";
app.use(cors());

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
import denv from "dotenv";

const dotenv = denv.config().parsed;

import mysql from "mysql";

import { Path } from "../types/types";

let db: mysql.Connection;

function handleDisconnect() {
  if (dotenv) {
    const db_config = {
      host: dotenv.HOST,
      user: dotenv.USER,
      password: dotenv.PASSWORD,
      database: dotenv.DATABASE,
    };

    db = mysql.createConnection(db_config);

    db.connect(function (err) {
      if (err) {
        console.log("error when connecting to db:", err);
        setTimeout(handleDisconnect, 2000);
      }
    });

    db.on("error", function (err) {
      console.log("db error", err);
      if (err.code === "PROTOCOL_CONNECTION_LOST") {
        handleDisconnect();
      } else {
        throw err;
      }
    });
  } else {
    console.log(
      "error when connecting to db: dotenv configurations are not defined"
    );
  }
}

handleDisconnect();

app.get("/api/waypoints/get", (req, res) => {
  const sqlSelect = "SELECT * FROM waypoints;";
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

app.get("/api/paths/get", (req, res) => {
  const sqlSelect = "SELECT * FROM paths;";
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

app.post("/api/waypoints/insert", (req, res) => {
  const name: string = req.body.name;
  const pathID: number = req.body.pathID;
  const sqlInsert = "INSERT INTO waypoints (name, pathID) VALUES (?,?);";
  db.query(sqlInsert, [name, pathID], (err, result) => {});

  const sqlSelect = "SELECT @@IDENTITY AS 'ID';";
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

app.post("/api/paths/insert", (req, res) => {
  const name: string = req.body.name;
  const likes: number = req.body.likes;
  const distance: number = req.body.distance;
  const duration: number = req.body.duration;
  const sqlInsert =
    "INSERT INTO paths (name, likes, distance, duration) VALUES (?,?,?,?);";
  db.query(sqlInsert, [name, likes, distance, duration], (err, result) => {});

  const sqlSelect = "SELECT @@IDENTITY AS 'pathID';";
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

app.put("/api/paths/:pathID/like", (req, res) => {
  const body: Path = req.body;
  const pathID: number = Number(req.params.pathID);
  const newLikes: number = body.likes + 1;

  const sqlUpdate = "UPDATE paths SET likes = ? WHERE ID = ?;";
  db.query(sqlUpdate, [newLikes, pathID], (err, result) => {
    res.send({ ...body, likes: newLikes });
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

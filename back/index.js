const express = require("express");
const app = express();

const bodyParser = require("body-parser");

const cors = require("cors");
app.use(cors());

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

require("dotenv").config();

const mysql = require("mysql");
const db = mysql.createConnection({
  host: "localhost",
  user: process.env.USERNAME,
  password: process.env.USERPASS,
  database: "pathbuilder",
  socketPath: "/tmp/mysql.sock",
});

app.get("/api/path/get", (req, res) => {
  const sqlSelect = "SELECT * FROM waypoints;";
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

app.post("/api/waypoints/insert", (req, res) => {
  const name = req.body.name;
  const rating = req.body.rating;
  const pathID = req.body.pathID;
  const sqlInsert =
    "INSERT INTO waypoints (name, rating, pathID) VALUES (?,?,?);";
  db.query(sqlInsert, [name, rating, pathID], (err, result) => {});

  const sqlSelect = "SELECT @@IDENTITY AS 'ID';";
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

app.post("/api/paths/insert", (req, res) => {
  const name = req.body.name;
  const rating = req.body.rating;
  const sqlInsert = "INSERT INTO paths (name, rating) VALUES (?,?);";
  db.query(sqlInsert, [name, rating], (err, result) => {});

  const sqlSelect = "SELECT @@IDENTITY AS 'pathID';";
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

app.listen(3001, () => {
  console.log("Running in 3001");
});

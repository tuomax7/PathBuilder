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

app.get("/api/get", (req, res) => {
  const sqlSelect = "SELECT * FROM waypoints;";
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

app.post("/api/insert", (req, res) => {
  const name = req.body.name;
  const rating = req.body.rating;
  const sqlInsert = "INSERT INTO waypoints (name, rating) VALUES (?,?);";
  db.query(sqlInsert, [name, rating], (err, result) => {});
});

app.listen(3001, () => {
  console.log("Running in 3001");
});

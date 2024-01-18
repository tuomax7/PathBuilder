"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.static("build"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
let paths = [];
let waypoints = [];
app.get("/api/waypoints", (req, res) => {
    res.send(waypoints);
});
app.get("/api/paths", (req, res) => {
    res.send(paths);
});
app.get("/api/paths/:pathID", (req, res) => {
    const pathID = Number(req.params.pathID);
    const path = paths.find(p => p.ID === pathID);
    if (path) {
        const wps = waypoints.filter(wp => wp.pathID === pathID);
        res.send(Object.assign(Object.assign({}, path), { waypoints: wps }));
    }
});
app.post("/api/waypoints", (req, res) => {
    const name = req.body.name;
    const pathID = req.body.pathID;
    waypoints = waypoints.concat({ name, pathID });
    res.send({ name, pathID });
});
app.post("/api/paths", (req, res) => {
    const name = req.body.name;
    const exhausting = req.body.exhausting;
    const nature = req.body.nature;
    const fun = req.body.fun;
    const distance = req.body.distance;
    const duration = req.body.duration;
    const pathToAdd = {
        ID: paths.length + 1,
        name,
        exhausting,
        nature,
        fun,
        distance,
        duration,
        waypoints: []
    };
    paths = paths.concat(pathToAdd);
    res.send({ pathID: pathToAdd.ID });
});
app.put("/api/paths/:pathID/fun", (req, res) => {
    const body = req.body;
    const pathID = Number(req.params.pathID);
    const newFunCount = body.fun + 1;
    paths = paths.map(p => p.ID === pathID ? Object.assign(Object.assign({}, p), { fun: newFunCount }) : p);
    const updated = paths.find(p => p.ID === pathID);
    res.send(updated);
});
app.put("/api/paths/:pathID/nature", (req, res) => {
    const body = req.body;
    const pathID = Number(req.params.pathID);
    const newNaturalCount = body.nature + 1;
    paths = paths.map(p => p.ID === pathID ? Object.assign(Object.assign({}, p), { natural: newNaturalCount }) : p);
    const updated = paths.find(p => p.ID === pathID);
    res.send(updated);
});
app.put("/api/paths/:pathID/exhausting", (req, res) => {
    const body = req.body;
    const pathID = Number(req.params.pathID);
    const newExhaustingCount = body.exhausting + 1;
    paths = paths.map(p => p.ID === pathID ? Object.assign(Object.assign({}, p), { exhausting: newExhaustingCount }) : p);
    const updated = paths.find(p => p.ID === pathID);
    res.send(updated);
});
/*

// DISCONTINUED MYSQL DATABASE CONFIGS

import denv from "dotenv";

const dotenv = denv.config().parsed;

import mysql from "mysql";

let db: mysql.Connection;

let db_config: mysql.ConnectionConfig;

function handleConnect() {
  if (dotenv) {
    db_config =
      process.env.NODE_ENV === "dev"
        ? {
            host: dotenv.HOST_DEV,
            user: dotenv.USER_DEV,
            password: dotenv.PASSWORD_DEV,
            database: dotenv.DATABASE_DEV,
          }
        : {
            host: dotenv.HOST,
            user: dotenv.USER,
            password: dotenv.PASSWORD,
            database: dotenv.DATABASE,
          };
    db = mysql.createConnection(db_config);

    db.connect(function (err) {
      if (err) {
        console.log("error when connecting to db:", err);
        setTimeout(handleConnect, 2000);
      }
    });

    db.on("error", function (err) {
      console.log("db error", err);
      if (err.code === "PROTOCOL_CONNECTION_LOST") {
        handleConnect();
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

handleConnect();

app.get("/api/waypoints", (req, res) => {
  const sqlSelect = "SELECT * FROM waypoints;";
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

app.get("/api/paths", (req, res) => {
  const sqlSelect = "SELECT * FROM paths;";
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

app.get("/api/paths/:pathID", (req, res) => {
  const pathID: number = Number(req.params.pathID);
  const pathSelect = "SELECT * FROM paths WHERE ID = ?;";

  const waypointSelect = "SELECT * FROM waypoints WHERE pathID = ?;";

  let waypoints: WayPoint[];

  db.query(waypointSelect, [pathID], (err, result) => {
    waypoints = Object.values(JSON.parse(JSON.stringify(result)));
  });

  db.query(pathSelect, [pathID], (err, result) => {
    const paths = Object(JSON.parse(JSON.stringify(result)));

    const waypointedPaths = paths.map((path: Path) => ({
      ...path,
      waypoints,
    }));

    res.send(waypointedPaths);
  });
});

app.post("/api/waypoints", (req, res) => {
  const name: string = req.body.name;
  const pathID: number = req.body.pathID;

  const sqlInsert = "INSERT INTO waypoints (name, pathID) VALUES (?,?);";
  db.query(sqlInsert, [name, pathID], (err, result) => {});

  const sqlSelect = "SELECT @@IDENTITY AS 'ID';";
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

app.post("/api/paths", (req, res) => {
  const name: string = req.body.name;
  const exhausting: number = req.body.exhausting;
  const nature: number = req.body.nature;
  const fun: number = req.body.fun;
  const distance: number = req.body.distance;
  const duration: number = req.body.duration;
  const sqlInsert =
    "INSERT INTO paths (name, distance, duration, exhausting, nature, fun) VALUES (?,?,?,?,?,?);";
  db.query(
    sqlInsert,
    [name, distance, duration, exhausting, nature, fun],
    (err, result) => {}
  );

  const sqlSelect = "SELECT @@IDENTITY AS 'pathID';";
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

app.put("/api/paths/:pathID/fun", (req, res) => {
  const body: Path = req.body;
  const pathID: number = Number(req.params.pathID);
  const newFunCount: number = body.fun + 1;

  const sqlUpdate = "UPDATE paths SET fun = ? WHERE ID = ?;";
  db.query(sqlUpdate, [newFunCount, pathID], (err, result) => {
    res.send({ ...body, fun: newFunCount });
  });
});

app.put("/api/paths/:pathID/nature", (req, res) => {
  const body: Path = req.body;
  const pathID: number = Number(req.params.pathID);
  const newNaturalCount: number = body.nature + 1;

  const sqlUpdate = "UPDATE paths SET nature = ? WHERE ID = ?;";
  db.query(sqlUpdate, [newNaturalCount, pathID], (err, result) => {
    res.send({ ...body, nature: newNaturalCount });
  });
});

app.put("/api/paths/:pathID/exhausting", (req, res) => {
  const body: Path = req.body;
  const pathID: number = Number(req.params.pathID);
  const newExhaustingCount: number = body.exhausting + 1;

  const sqlUpdate = "UPDATE paths SET exhausting = ? WHERE ID = ?;";
  db.query(sqlUpdate, [newExhaustingCount, pathID], (err, result) => {
    res.send({ ...body, exhausting: newExhaustingCount });
  });
});

*/
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

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
const dotenv_1 = __importDefault(require("dotenv"));
const dotenv = dotenv_1.default.config().parsed;
const mysql_1 = __importDefault(require("mysql"));
let db;
function handleDisconnect() {
    if (dotenv) {
        const db_config = {
            host: dotenv.HOST,
            user: dotenv.USER,
            password: dotenv.PASSWORD,
            database: dotenv.DATABASE,
        };
        db = mysql_1.default.createConnection(db_config);
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
            }
            else {
                throw err;
            }
        });
    }
    else {
        console.log("error when connecting to db: dotenv configurations are not defined");
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
    const name = req.body.name;
    const pathID = req.body.pathID;
    const sqlInsert = "INSERT INTO waypoints (name, pathID) VALUES (?,?);";
    db.query(sqlInsert, [name, pathID], (err, result) => { });
    const sqlSelect = "SELECT @@IDENTITY AS 'ID';";
    db.query(sqlSelect, (err, result) => {
        res.send(result);
    });
});
app.post("/api/paths/insert", (req, res) => {
    const name = req.body.name;
    const exhausting = req.body.exhausting;
    const nature = req.body.nature;
    const fun = req.body.fun;
    const distance = req.body.distance;
    const duration = req.body.duration;
    const sqlInsert = "INSERT INTO paths (name, distance, duration, exhausting, nature, fun) VALUES (?,?,?,?,?,?);";
    db.query(sqlInsert, [name, distance, duration, exhausting, nature, fun], (err, result) => { });
    const sqlSelect = "SELECT @@IDENTITY AS 'pathID';";
    db.query(sqlSelect, (err, result) => {
        res.send(result);
    });
});
app.put("/api/paths/:pathID/fun", (req, res) => {
    const body = req.body;
    const pathID = Number(req.params.pathID);
    const newFunCount = body.fun + 1;
    const sqlUpdate = "UPDATE paths SET fun = ? WHERE ID = ?;";
    db.query(sqlUpdate, [newFunCount, pathID], (err, result) => {
        res.send(Object.assign(Object.assign({}, body), { fun: newFunCount }));
    });
});
app.put("/api/paths/:pathID/nature", (req, res) => {
    const body = req.body;
    const pathID = Number(req.params.pathID);
    const newNaturalCount = body.nature + 1;
    const sqlUpdate = "UPDATE paths SET nature = ? WHERE ID = ?;";
    db.query(sqlUpdate, [newNaturalCount, pathID], (err, result) => {
        res.send(Object.assign(Object.assign({}, body), { nature: newNaturalCount }));
    });
});
app.put("/api/paths/:pathID/exhausting", (req, res) => {
    const body = req.body;
    const pathID = Number(req.params.pathID);
    const newExhaustingCount = body.exhausting + 1;
    const sqlUpdate = "UPDATE paths SET exhausting = ? WHERE ID = ?;";
    db.query(sqlUpdate, [newExhaustingCount, pathID], (err, result) => {
        res.send(Object.assign(Object.assign({}, body), { exhausting: newExhaustingCount }));
    });
});
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

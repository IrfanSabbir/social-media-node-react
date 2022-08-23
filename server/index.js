"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
var express_1 = __importDefault(require("express"));
var mysql2_1 = __importDefault(require("mysql2"));
var app = express_1.default();
//mysql setting
var connection = mysql2_1.default.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'docker',
    password: 'docker',
    database: 'test'
});
connection.connect(function (err) {
    if (err)
        throw err;
    console.log("Connected!");
    var sql_murmurs = "CREATE TABLE IF NOT EXISTS murmurs      (id int NOT NULL AUTO_INCREMENT primary key,      text varchar(255) NOT NULL,      like_count int DEFAULT 0,      creator int NOT NULL)";
    connection.query(sql_murmurs, function (err, result) {
        if (err)
            throw err;
    });
    var sql_follow = "CREATE TABLE IF NOT EXISTS follow      (id int NOT NULL AUTO_INCREMENT primary key,      followed_to int NOT NULL,      followed_by int NOT NULL)";
    connection.query(sql_follow, function (err, result) {
        if (err)
            throw err;
        // console.log('created')
    });
    var sql_like = "CREATE TABLE IF NOT EXISTS like_murmurs    (id int NOT NULL AUTO_INCREMENT primary key,    user_id int NOT NULL,    post_id int NOT NULL)";
    connection.query(sql_like, function (err, result) {
        if (err)
            throw err;
    });
    // connection.query('SELECT * FROM user;', function (err, result) {
    //   if (err) throw err;
    //   console.log("Result: " + JSON.stringify(result, null, 2));
    // });
});
//cors setting
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"); //
    next();
});
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
var murmurs_1 = __importDefault(require("./router/murmurs"));
var user_1 = __importDefault(require("./router/user"));
// Get example
var router = express_1.default.Router();
app.use('/api/murmurs', murmurs_1.default);
app.use('/api/me', user_1.default);
//Post example
router.post('/api/postTest', function (req, res) {
    res.send({ hello: 'world' });
});
app.use(router);
app.listen(3001, function () { console.log('Example app listening on port 3001!'); });

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
var express_1 = __importDefault(require("express"));
var create_table_1 = __importDefault(require("./config/create_table"));
var cors_1 = __importDefault(require("cors"));
var app = express_1.default();
//mysql table creation on the fly
create_table_1.default();
//cors setting
app.use(cors_1.default());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"); //
    next();
});
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
var murmurs_1 = __importDefault(require("./router/murmurs"));
var user_1 = __importDefault(require("./router/user"));
var router = express_1.default.Router();
app.use('/api/murmurs', murmurs_1.default);
app.use('/api/me', user_1.default);
app.use('*', function (req, res) {
    res.status(404).json({
        message: "Wrong URL! Doesnt exist"
    });
});
app.listen(3001, function () { console.log('Murmurs app listening on port 3001!'); });

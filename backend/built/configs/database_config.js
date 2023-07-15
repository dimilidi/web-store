"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConnect = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var dbConnect = function () {
    mongoose_1.default.set("strictQuery", false);
    mongoose_1.default
        .connect(process.env.DB_CONN)
        .then(function () { return console.log("Database connected"); })
        .catch(function () { return console.log("Failed to connect to the database"); });
};
exports.dbConnect = dbConnect;

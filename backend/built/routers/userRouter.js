"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var express_async_handler_1 = __importDefault(require("express-async-handler"));
var userController_1 = require("../controllers/userController");
var app = (0, express_1.Router)();
app.get("/seed", (0, express_async_handler_1.default)(userController_1.seedUsers));
app.post("/login", (0, express_async_handler_1.default)(userController_1.login));
app.post("/register", (0, express_async_handler_1.default)(userController_1.register));
exports.default = app;

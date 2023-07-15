"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var express_async_handler_1 = __importDefault(require("express-async-handler"));
var auth_1 = __importDefault(require("../middlewares/auth"));
var orderController_1 = require("../controllers/orderController");
var app = (0, express_1.Router)();
app.post('/create', auth_1.default, (0, express_async_handler_1.default)(orderController_1.createOrder));
app.get('/newOrderForCurrentUser', auth_1.default, (0, express_async_handler_1.default)(orderController_1.getOrder));
app.post('/pay', auth_1.default, (0, express_async_handler_1.default)(orderController_1.payOrder));
app.get('/track/:id', (0, express_async_handler_1.default)(orderController_1.trackOrder));
exports.default = app;

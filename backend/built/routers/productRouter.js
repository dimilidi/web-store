"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var express_async_handler_1 = __importDefault(require("express-async-handler"));
var productController_1 = require("../controllers/productController");
var app = (0, express_1.Router)();
app.get("/seed", (0, express_async_handler_1.default)(productController_1.seedProducts));
app.get('/', (0, express_async_handler_1.default)(productController_1.getProducts));
app.get('/tags', (0, express_async_handler_1.default)(productController_1.getTags));
app.get('/tags/:tagName', (0, express_async_handler_1.default)(productController_1.getProductsByTag));
app.get('/search/:searchTerm', (0, express_async_handler_1.default)(productController_1.getProductsBySearchTerm));
app.get('/:id', (0, express_async_handler_1.default)(productController_1.getProductsById));
exports.default = app;

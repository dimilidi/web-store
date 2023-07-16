"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var productRouter_1 = __importDefault(require("./routers/productRouter"));
var userRouter_1 = __importDefault(require("./routers/userRouter"));
var orderRouter_1 = __importDefault(require("./routers/orderRouter"));
var database_config_1 = require("./configs/database_config");
var path_1 = __importDefault(require("path"));
// DB CONNECT
(0, database_config_1.dbConnect)();
// CREATE EXPRESS SERVER 
var app = (0, express_1.default)();
// MIDDLEWARES
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    credentials: true,
    origin: ["http://localhost:4200"]
}));
//app.use('/', express.static('/build'))
// ROUTERS
app.use('/products', productRouter_1.default);
app.use('/users', userRouter_1.default);
app.use('/orders', orderRouter_1.default);
// set the public folder that represents the frontend to static
app.use(express_1.default.static('public'));
//catch-all route handler redirecting to the frontend rounts
app.get('*', function (req, res) {
    res.sendFile(path_1.default.join(__dirname, 'public', 'index.html'));
});
var port = process.env.PORT || 5000;
app.listen(port, function () {
    console.log("Surver running on http://localhost:" + port);
});

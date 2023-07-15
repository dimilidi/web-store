"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = require("jsonwebtoken");
exports.default = (function (req, res, next) {
    var token = req.headers.access_token;
    if (!token)
        return res.status(401).send();
    try {
        var decodedUser = (0, jsonwebtoken_1.verify)(token, process.env.TOKEN_KEY);
        req.user = decodedUser;
    }
    catch (error) {
        res.status(401).send();
    }
    return next();
});

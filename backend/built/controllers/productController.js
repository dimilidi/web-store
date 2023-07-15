"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductsById = exports.getProductsByTag = exports.getTags = exports.getProductsBySearchTerm = exports.getProducts = exports.seedProducts = void 0;
var data_1 = require("../data");
var Product_1 = __importDefault(require("../models/Product"));
// SEED PRODUCTS DATA INTO DB
/** @type {import("express").RequestHandler} */
function seedProducts(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var foodsCount;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Product_1.default.countDocuments()];
                case 1:
                    foodsCount = _a.sent();
                    if (foodsCount > 0) {
                        res.send("Seed is already done!");
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, Product_1.default.create(data_1.sample_products)];
                case 2:
                    _a.sent();
                    res.send("Seed Is Done!");
                    return [2 /*return*/];
            }
        });
    });
}
exports.seedProducts = seedProducts;
// GET PRODUCTS
function getProducts(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var products;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Product_1.default.find()];
                case 1:
                    products = _a.sent();
                    res.send(products);
                    return [2 /*return*/];
            }
        });
    });
}
exports.getProducts = getProducts;
// GET PRODUCT BY SEARCH TERM
function getProductsBySearchTerm(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var searchRegex, products;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    searchRegex = new RegExp(req.params.searchTerm, "i");
                    return [4 /*yield*/, Product_1.default.find({ name: { $regex: searchRegex } })];
                case 1:
                    products = _a.sent();
                    res.send(products);
                    return [2 /*return*/];
            }
        });
    });
}
exports.getProductsBySearchTerm = getProductsBySearchTerm;
// GET TAGS
/*Input: Documents in the 'Product' collection

------- Step 1: Unwind -------
Unwinding 'tags' array:
[
  { name: 'Product 1', tags: ['tag1', 'tag2'] },
  { name: 'Product 2', tags: ['tag1', 'tag3'] },
  { name: 'Product 3', tags: ['tag2', 'tag3'] },
  ...
]

------- Step 2: Group -------
Grouping by 'tags' and counting occurrences:
[
  { _id: 'tag1', count: 2 },
  { _id: 'tag2', count: 2 },
  { _id: 'tag3', count: 2 },
  ...
]

------- Step 3: Project -------
Projecting and renaming fields:
[
  { name: 'tag1', count: 2 },
  { name: 'tag2', count: 2 },
  { name: 'tag3', count: 2 },
  ...
]

------- Step 4: Sort -------
Sorting tags by count in descending order:
[
  { name: 'tag1', count: 2 },
  { name: 'tag2', count: 2 },
  { name: 'tag3', count: 2 },
  ...
]

------- Step 5: Create 'All' -------
Creating 'All' object with count of all documents:
{ name: 'All', count: 10 }

------- Step 6: Prepend -------
Prepending 'All' object to tags array:
[
  { name: 'All', count: 10 },
  { name: 'tag1', count: 2 },
  { name: 'tag2', count: 2 },
  { name: 'tag3', count: 2 },
  ...
]

------- Step 7: Send -------
Sending the resulting tags array as the response.
 */
function getTags(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var tags, all;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, Product_1.default.aggregate([
                        {
                            $unwind: "$tags", //  transforms the array tags field into a stream of separate documents
                        },
                        {
                            $group: {
                                _id: "$tags",
                                count: { $sum: 1 },
                            },
                        },
                        {
                            $project: {
                                _id: 0,
                                name: "$_id",
                                count: "$count",
                            },
                        },
                    ]).sort({ count: -1 })];
                case 1:
                    tags = _b.sent();
                    _a = {
                        name: "All"
                    };
                    return [4 /*yield*/, Product_1.default.countDocuments()];
                case 2:
                    all = (_a.count = _b.sent(),
                        _a);
                    tags.unshift(all);
                    res.send(tags);
                    return [2 /*return*/];
            }
        });
    });
}
exports.getTags = getTags;
// GET TAGS mongoose query version
/*export async function getTags(req: any, res: any) {
       // Retrieve all documents and select only the 'tags' field
       const tags = await Product.find().select('tags').exec();
  
       // Create an object to store tag counts
       const tagCountMap = {};
     
       // Iterate over the retrieved documents and their 'tags' arrays
       tags.forEach((product) => {
         product.tags.forEach((tag: string) => {
           // Increment the count for each tag
           tagCountMap[tag] = (tagCountMap[tag] || 0) + 1;
         });
       });
     
       // Convert the tagCountMap object into an array of objects with 'name' and 'count' properties
       const tagCounts = Object.entries(tagCountMap).map(([name, count]) => ({
         name,
         count,
       }));
     
       // Prepare the 'All' object with the count of all documents
       const all = {
         name: 'All',
         count: await Product.countDocuments()
       };
     
       // Prepend the 'all' object to the tagCounts array
       tagCounts.unshift(all);
     
       // Send the resulting tagCounts array as the response
       res.send(tagCounts);

}*/
// GET PRODUCT BY TAG
function getProductsByTag(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var products;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Product_1.default.find({ tags: req.params.tagName })];
                case 1:
                    products = _a.sent();
                    res.send(products);
                    return [2 /*return*/];
            }
        });
    });
}
exports.getProductsByTag = getProductsByTag;
// GET PRODUCT BY TAG
function getProductsById(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var products;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Product_1.default.findById(req.params.id)];
                case 1:
                    products = _a.sent();
                    res.send(products);
                    return [2 /*return*/];
            }
        });
    });
}
exports.getProductsById = getProductsById;

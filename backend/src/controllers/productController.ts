import { sample_products } from "../data";
import Product from "../models/Product";
import { v2 as cloudinary } from "cloudinary";

// SEED PRODUCTS DATA INTO DB
/** @type {import("express").RequestHandler} */
export async function seedProducts(req: any, res: any) {
  const productsCount = await Product.countDocuments();
  if (productsCount > 0) {
    res.send("Seed is already done!");
    return;
  }

  await Product.create(sample_products);
  res.send("Seed Is Done!");
}

// CREATE PRODUCT
export async function createProduct(req: any, res: any) {
  const {
    name,
    price,
    tags,
    imageUrl,
    date,
    origins,
    favourite,
    stars,
    numRatings,
    averageRating,
  } = req.body;

  // cloudinary configuration
  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_SECRET,
  });

  const upload = await cloudinary.uploader.upload(imageUrl);

  const product = await Product.create({
    name,
    price,
    tags,
    origins,
    imageUrl: upload.secure_url,
    date,
    favourite,
    stars,
    numRatings,
    averageRating,
  });

  res.status(201).json("Product created");
}

// UPDATE PRODUCT
export async function updateProduct(req: any, res: any) {
  const productId = req.params.id;
  const updateData = req.body;

  const product = await Product.findByIdAndUpdate(productId, updateData, {
    new: true, 
  });

  if (!product) {
    return res.status(404).json({ error: "Product not found." });
  }

  return res.status(200).json(product);
}


// DELETE PRODUCT
export async function deleteProduct(req: any, res: any) {
  const productId = req.params.id;

  const product = await Product.findByIdAndDelete(productId);

  if (!product) {
    return res.status(404).json({ error: "Product not found." });
  }

  return res.status(204).json({message: "Product deleted successfully." });
}


// GET PRODUCTS
export async function getProducts(req: any, res: any) {
  const products = await Product.find();

  res.send(products);
}

// GET PRODUCT BY SEARCH TERM
export async function getProductsBySearchTerm(req: any, res: any) {
  const searchRegex = new RegExp(req.params.searchTerm, "i");
  const products = await Product.find({ name: { $regex: searchRegex } });
  res.send(products);
}

// UPDATE PRODUCT STARS
export async function submitUserRating(req: any, res: any) {
  const { stars, productId } = req.body;

  const product = await Product.findById(productId);

  if (!product) {
    return res.status(404).json({ error: "Product not found." });
  }

  // Calculate the updated average rating and number of ratings
  const newNumRatings = product.numRatings + 1;
  const newAverageRating =
    (product.averageRating * product.numRatings + stars) / newNumRatings;

  // Update the product's stars, numRatings, and averageRating
  product.stars = stars;
  product.numRatings = newNumRatings;
  product.averageRating = newAverageRating;

  await product.save();

  return res.status(200).json(product);
}

// GET TAGS
export async function getTags(req: any, res: any) {
  const tags = await Product.aggregate([
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
  ]).sort({ count: -1 });

  const all = {
    name: "All",
    count: await Product.countDocuments(),
  };

  tags.unshift(all);
  res.send(tags);
}

// GET PRODUCT BY TAG
export async function getProductsByTag(req: any, res: any) {
  const products = await Product.find({ tags: req.params.tagName });
  res.send(products);
}

// GET PRODUCT BY ID
export async function getProductsById(req: any, res: any) {
  const products = await Product.findById(req.params.id);
  res.send(products);
}

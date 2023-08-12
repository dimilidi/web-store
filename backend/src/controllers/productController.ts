import { sample_products } from "../data";
import Product from "../models/Product";

// SEED PRODUCTS DATA INTO DB
/** @type {import("express").RequestHandler} */
export async function seedProducts(req: any, res: any) {
  const foodsCount = await Product.countDocuments();
  if (foodsCount > 0) {
    res.send("Seed is already done!");
    return;
  }

  await Product.create(sample_products);
  res.send("Seed Is Done!");
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
export async function getProductsByTag(req: any, res: any) {
  const products = await Product.find({ tags: req.params.tagName });
  res.send(products);
}

// GET PRODUCT BY TAG
export async function getProductsById(req: any, res: any) {
  const products = await Product.findById(req.params.id);
  res.send(products);
}

import { log } from "console";
import Favourite from "../models/Favourite";
import Product from "../models/Product";
import User from "../models/User";

// ADD TO FAVOURITES
export async function addToFavouriteProducts(req: any, res: any) {
  const { userId, productId } = req.body;

  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }

  const product = await Product.findById(productId);
  if (!product) {
    throw new Error("Product not found");
  }

  // Check if the product is already in the user's favorites
  const existingFavorite = await Favourite.findOne({
    user: userId,
    product: productId,
  });

  if (existingFavorite) {
    // Product is already in favorites, remove it
    await Favourite.findByIdAndRemove(existingFavorite._id);
    // Update the product's 'favorite' field to false
    await Product.findByIdAndUpdate(productId, { favorite: false });
    res.status(200).json({ message: "Product removed from favorites successfully" });
  } else {
    // Product is not in favorites, add it
    const newFavorite = new Favourite({
      user: userId,
      product: productId,
    });

    await newFavorite.save();
    // Update the product's 'favorite' field to true
    await Product.findByIdAndUpdate(productId, { favorite: true });
    res.status(200).json( newFavorite );
  }

}

// GET FAVOURITES
export async function getFavourites(req: any, res: any) {
  const userId = req.user.id;

  const favourites = await Favourite.find({ user: userId })
    .populate("product", "name price")
    .exec();
console.log('FAV:',favourites);

  res.status(200).json(favourites);
}

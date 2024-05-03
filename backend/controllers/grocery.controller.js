import Grocery from "../models/grocery.model.js";
import asyncHandler from "../middlewares/asyncHandler.js";

const getGroceries = asyncHandler(async (req, res) => {
  try {
    const keyword = req.query.keyword
      ? { name: { $regex: req.query.keyword, $options: "i" } }
      : {};
    const groceries = await Grocery.find({ ...keyword });

    if (groceries) {
      res.status(200).json(groceries);
    } else {
      res.status(404);
      throw new Error("Groceries not found");
    }
  } catch (error) {
    console.log(error);
  }
});

const getTopGroceries = asyncHandler(async (req, res) => {
  try {
    const groceries = await Grocery.find({}).sort({ rating: -1 }).limit(3);

    if (groceries) {
      res.status(200).json(groceries);
    } else {
      res.status(404);
      throw new Error("Groceries not found");
    }
  } catch (error) {
    console.log(error);
  }
});

const addGrocery = asyncHandler(async (req, res) => {
  try {
    const { name, description, price, image, countInStockInKgs } = req.body;

    const grocery = await Grocery.create({
      name,
      description,
      price,
      image:
        "http://t2.gstatic.com/images?q=tbn:ANd9GcTu1UGeQ8Ugo88Y2FM5jLZyhUteeNUXIc-z1yQ26iUV6oaaKzr-facufB7XEixPkGWFja689Q",
      countInStockInKgs,
    });
    if (grocery) {
      res.status(201).json({
        _id: grocery._id,
        name: grocery.name,
        description: grocery.description,
        price: grocery.price,
        image: grocery.image,
        countInStockInKgs: grocery.countInStockInKgs,
      });
    } else {
      res.status(400);
      throw new Error("Invalid grocery data");
    }
  } catch (error) {
    console.log(error);
  }
});

const getGroceryById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const grocery = await Grocery.findById(id);
  if (grocery) {
    res.status(200).json(grocery);
  } else {
    res.status(404);
    throw new Error("Grocery not found");
  }
});

const deleteGroceryById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const grocery = await Grocery.findById(id);
  if (grocery) {
    const deletedGrocery = await Grocery.findByIdAndDelete(id);
    res.json(deletedGrocery);
  } else {
    res.status(404);
    throw new Error("Grocery not found");
  }
});

const updateGroceryById = asyncHandler(async (req, res) => {
  const grocery = await Grocery.findById(req.params.id);
  console.log(req.body);
  if (grocery) {
    grocery.name = req.body.name || grocery.name;
    grocery.description = req.body.description || grocery.description;
    grocery.price = req.body.price || grocery.price;
    grocery.image = req.body.image || grocery.image;
    grocery.countInStockInKgs =
      req.body.countInStockInKgs || grocery.countInStockInKgs;
    const updatedGrocery = await grocery.save();
    res.json({
      _id: updatedGrocery._id,
      name: updatedGrocery.name,
      description: updatedGrocery.description,
      price: updatedGrocery.price,
      image: updatedGrocery.image,
      countInStockInKgs: updatedGrocery.countInStockInKgs,
    });
  } else {
    res.status(404);
    throw new Error("Grocery not found");
  }
});

const addReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  console.log(req.body);
  const user = req.user;
  const grocery = await Grocery.findById(req.params.id);
  if (grocery) {
    const alreadyReviewed = grocery.reviews.find(
      (review) => review.userId.toString() === user._id.toString()
    );
    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Grocery already reviewed");
    }
    const review = {
      userId: user._id,
      name: user.name,

      rating,
      comment,
    };
    grocery.reviews.push(review);
    grocery.numReviews = grocery.reviews.length;
    grocery.rating =
      grocery.reviews.reduce((acc, item) => Number(item.rating) + acc, 0) /
      grocery.reviews.length;
    await grocery.save();
    res.status(201).json({ message: "Review added" });
  } else {
    res.status(404);
    throw new Error("Grocery not found");
  }
});

export {
  getGroceries,
  getTopGroceries,
  addGrocery,
  getGroceryById,
  deleteGroceryById,
  updateGroceryById,
  addReview,
};

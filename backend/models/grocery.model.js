import mongoose from "mongoose";

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    userId: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

const grocerySchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: false },
    price: { type: Number, required: true },
    image: { type: String, required: false },
    rating: { type: Number, required: true, default: 0 },
    reviews: [reviewSchema],
    numReviews: { type: Number, required: true, default: 0 },
    countInStockInKgs: { type: Number, required: true, default: 0 },
  },
  {
    timestamps: true,
  }
);

const Grocery = mongoose.model("Grocery", grocerySchema);

export default Grocery;

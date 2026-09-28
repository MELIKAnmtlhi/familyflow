import mongoose from "mongoose";

const GroceryShoppingSchema = new mongoose.Schema({
  Saturday: [{ id: Number, name: String, isBought: Boolean }],
  Sunday: [{ id: Number, name: String, isBought: Boolean }],
  Monday: [{ id: Number, name: String, isBought: Boolean }],
  Tuesday: [{ id: Number, name: String, isBought: Boolean }],
  Wednesday: [{ id: Number, name: String, isBought: Boolean }],
  Thursday: [{ id: Number, name: String, isBought: Boolean }],
  Friday: [{ id: Number, name: String, isBought: Boolean }],
});

export default mongoose.models.GroceryShopping || mongoose.model("GroceryShopping", GroceryShoppingSchema);
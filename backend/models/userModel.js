import mongoose from "mongoose";

//creating user db
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique:true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cartData: { type: Object, default: {} },
  },
  { minimize: false },
);


const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel ;
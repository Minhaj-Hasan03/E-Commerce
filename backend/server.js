import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";



//App config
const app = express();
const port = process.env.PORT || 4000; //port comes from dotenv file, if not found then port will be 4000



connectDB();
connectCloudinary();

//middleware

app.use(express.json()); //requset will pass in json format
app.use(cors());

//api endpoints user
app.use("/api/user", userRouter);

//api endpoints product
app.use("/api/product", productRouter );


//api endpoints cart
app.use("/api/cart", cartRouter );



//order endopoint
app.use("/api/order", orderRouter );

app.get("/", (req, res) => {
  res.send("Api Working");
});

app.listen(port, "0.0.0.0", () => {
    console.log("Server is started on PORT : " + port);
});
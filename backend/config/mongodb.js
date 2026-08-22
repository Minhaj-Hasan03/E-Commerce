import mongoose from "mongoose";


const connectDB = async ()=>{

    mongoose.connection.on('connected', ()=>{
        console.log("mongodb connected");
        
})

     try {
    await mongoose.connect(`${process.env.MONGODB_URI}/e-commerce`); 
    console.log("Database connected successfully");
  } catch (err) {
    console.error(err.message);
  }
}

export default connectDB ;
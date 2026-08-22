import {v2 as cloudinary} from 'cloudinary'
import productModel from '../models/productModel.js';




//Creating the function for Prouudct 



//Function of Add 
const addProduct = async (req,res)=>{
  try {
    const {name, description, price,  category, subcategory, sizes, bestseller} = req.body ;// this feild data come from form

   const image1 = req.files.image1 && req.files.image1[0];
   const image2 = req.files.image2 && req.files.image2[0];
   const image3 = req.files.image3 && req.files.image3[0];
   const image4 = req.files.image4 && req.files.image4[0];

   //We have to upload image in Cloudinary
   //Creating the url of cloudinary 

   const images = [image1, image2, image3, image4].filter((item)=>item !== undefined );

   const imageUrl =await Promise.all( images.map( async (item)=>{

      
      const result =await cloudinary.uploader.upload(item.path , {resource_type:'image'})
      
      return await result.secure_url ;
   }));


   const productData = {
      name,
      description,
      price:Number(price),
      image:imageUrl,
      category,
      subcategory,
      sizes:JSON.parse(sizes),
      bestseller: bestseller ==="true"?true :false ,
      date: Date.now()

   }


   const product = new productModel(productData);
   await product.save() ;

   console.log(product);
   console.log( imageUrl );

   res.json({success:true , message:"product Added"})

  } catch (error) {
      console.log(error);
      res.json({success:false, message : error.message })
      
  }

   
   

}



//function for list product
const listProduct = async (req,res)=>{
   try {
      const products = await productModel.find({});

   res.json({success:true , products })
}
   catch (error) {
      res.json({success:false, message:error.message})
   }
}






//function for remove product 
const removeProduct = async (req,res)=>{
   
   try {
      await productModel.findByIdAndDelete(req.body.id );

   res.json({success:true , message:"Product remove succesfully"})
   } catch (error) {
      res.json({success:false, message:error.message})
   }
}



//function for single product info
const singleProduct = async (req, res)=>{
   try {
      const {productId} = req.body ;
      const product = await productModel.findById(productId) ;
      res.json({success:true , message:"Sucessfully showed the singel product", product })



   } catch (error) {
      res.json({success:false, message :error.message })
   }
}



export {addProduct,listProduct,removeProduct,singleProduct} 
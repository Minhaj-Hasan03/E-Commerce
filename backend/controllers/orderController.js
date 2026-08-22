import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";



///placeing order on cod mehtod 

const placeOrder = async (req,res)=>{
   try {
     const {userId, items, amount, address } = req.body ;


    const orderData = {
        userId,
        items,
        address,
        amount,
        paymentMethod:"COD",
        payment:false,
        date:Date.now()
    }


    const newOrder = new orderModel(orderData);
    await newOrder.save();


    await userModel.findByIdAndUpdate(userId, {cartData:{}})

    res.json({success:true, message : "Order Placed "})
   } catch (error) {
    res.json({success:false, message:error.message });
   }
}





///placeing order on Stripe mehtod 

const placeOrderStripe = async (req,res)=>{
    
}



///placeing order on Razor pay

const placeOrderRazor = async (req,res)=>{
    
}




//All ordre data for admin panel 
const allOrders = async (req,res)=>{
    try {
        const order = await orderModel.find({});

        res.json({success:true, order } ) ;
    } catch (error) {
        res.json({success:false, message:error.message } ) ;
    }
}


//user order data for frontend
const userOrders = async (req,res)=>{
    try {
        const {userId} = req.body;

        const orders =await orderModel.find({userId});
        res.json({success:true, orders })

    } catch (error) {   
        res.json({success:false, message:error.message } );
        
    }
}



//update order status from admin panel
const updateStatus = async (req,res)=>{
    try {
        const {orderId, status} = req.body ;


        const order = await orderModel.findByIdAndUpdate(orderId, {status});
        if (!order) {
      return res.json({
        success: false,
        message: "Order not found"
      });
    }

         
        

        res.json({success:true, message:"Status Updated Sccessful"})
    } catch (error) {
        res.json({success:false, message:error.message})
    }
}




export {placeOrder, placeOrderRazor, placeOrderStripe, userOrders, allOrders , updateStatus }
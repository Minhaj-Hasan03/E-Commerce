import userModel from "../models/userModel.js"



//user product add 
const addToCart = async (req, res)=>{
    try {
        const {userId, itemId, size} = req.body 


        const userData = await userModel.findById(userId);
        let cartData = userData.cartData ;


        if(cartData[itemId]){
            if(cartData[itemId][size]){
                cartData[itemId][size] += 1 ;
            }
            else{
                cartData[itemId][size] = 1 ;
            }
        }else{
            cartData[itemId] = {};
            cartData[itemId][size] = 1 ;
        }


        await userModel.findByIdAndUpdate(userId, {cartData} ) ;
        res.json({success:true, message : "Added to cart"})
    } catch (error) {
        res.json({success:false, message : error.message } ) ;
    }
}







//user update cart
const updateCart = async (req, res)=>{
    try {
        const {userId, itemId , size , quantity } = req.body ;

        if( quantity === 0 ){}

        const userData = await userModel.findById(userId);
        let cartData = userData.cartData ;

        cartData[itemId][size] = quantity ;


        await userModel.findByIdAndUpdate(userId, {cartData} ) ;
        res.json({success:true, message : "Cart Updated"})

    } catch (error) {
        res.json({success:false, message : error.message } ) ;
    }
}







//get user cart
const getUserCart = async (req, res)=>{
    try {
        
        const {userId} = req.body ;

        const userData = await userModel.findById(userId);
        let cartData = userData.cartData ;


        res.json({success:true , cartData });
    } catch (error) {
        res.json({success:false, message : error.message } ) ;
    }
}




export {addToCart, updateCart, getUserCart }
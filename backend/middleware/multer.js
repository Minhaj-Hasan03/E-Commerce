import multer from 'multer'

//This is  mainly use for upload multiple image, file , pdf 
const storage = multer.diskStorage({
    

    filename: function(req,file, callback ){
        callback(null, file.originalname )
    }
})

const upload = multer({storage})

export default upload
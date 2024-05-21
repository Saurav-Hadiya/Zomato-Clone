const Location=require('../Model/locationDB');

exports.getLocation=(req,res)=>{
    
    Location.find()
        .then(response=>{
            res.status(200).json({
                Message:"Location Data fetched successfully",
                Location:response
            })
        })
        .catch(err=>{
            res.status(500).json({Error:err})
        })

}
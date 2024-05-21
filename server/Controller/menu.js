const Menu= require('../Model/menuDB');

exports.getMenuByRestaurantId=(req,res)=>{
    const resId = req.params.resId;

    Menu.find({restaurantId:resId})
        .then(response=>{
            res.status(200).json({
                message: "Menu Fetched Successfully By Restaurant Id",
                menuItems: response
            })
        })
        .catch(err=>{
            res.status(500).json({error:err});
        })
}
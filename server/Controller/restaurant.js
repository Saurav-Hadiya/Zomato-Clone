const Restaurant=require('../Model/restaurantDB');

exports.getRestaurant=(req,res)=>{

    Restaurant.find()
        .then(response=>{
            res.status(200).json({
                Message:"Restaurant Data fetched successfully",
                Restaurant:response
            })
        })
        .catch(err=>{
            res.status(500).json({Error:err})
        })
        
}

exports.getRestaurantByLocationId=(req,res)=>{

    const locId=req.params.locId;

    Restaurant.find({city:locId})
        .then(response=>{
            res.status(200).json({
                Message:"Restaurant Data fetched successfully",
                Restaurant:response
            })
        })
        .catch(err=>{
            res.status(500).json({Error:err})
        })
        
}

exports.getRestaurantById=(req,res)=>{

    const id=req.params.id;

    Restaurant.findById(id)
        .then(response=>{
            res.status(200).json({
                Message:"Restaurant Data fetched successfully By Id",
                Restaurant:response
            })
        })
        .catch(err=>{
            res.status(500).json({Error:err})
        })
        
}

exports.filteredRestaurant=(req,res)=>{

    let {location,mealtype,lcost,hcost,cuisine,sort,page} = req.body;

    sort = sort ? sort : 1;   //1:Ascending order , -1:Descending order
    page = page ? page : 1;
    
    const itemsperPage = 2;     //No. of restaurants in a page
    const firstIndex = itemsperPage*page-itemsperPage;
    const lastIndex = itemsperPage*page;

    var filterObj={};       // empty object
    
    location && (filterObj["city"]=location);                            // Inserting a location data passed from the body to the filter object.
    mealtype && (filterObj["type.mealtype"]=mealtype);                  //Inserting a mealtype data passed from the body to the filter object.
    lcost && hcost && (filterObj["cost"] = {$gte:lcost,$lte:hcost});   //Inserting a range of cost passed from the body to the filter object.
    cuisine && (filterObj["Cuisine.cuisine"]={$in:cuisine});          //Inserting a multiple cuisine data passed from the body to the filter object.
    
    // console.log(filterObj);                                                         
    Restaurant.find(filterObj).sort({cost:sort})
        .then(response=>{
            const filteredResponse = response.slice(firstIndex,lastIndex);
            res.status(200).json({
                Message:"Restaurant Filtered successfully ",
                Restaurant:filteredResponse
            })
        })
        .catch(err=>{
            res.status(500).json({Error:err})
        })
        
}
import React from "react";
import navigation from "./nav";

class Quicksearch extends React.Component {

    showFilter=(ss)=>{
        this.props.navigate(`/filter?mealtype=${ss}`);
    }

    render() {

        const { mealData } = this.props;
        console.log(mealData)
                
        return (
            <div>
            
                <h2 className="container mt-5 heading-p">Quick Searches</h2>
                <h5 className="container heading-s mt-2">Discover restaurants by type of meal</h5>

                <div className="container d-flex flex-wrap justify-content-between align-items-center  border-primary ">

                    {mealData.map(meal => {
                        return (
                            <div className="d-flex shadow my-3 cards" onClick={()=>this.showFilter(meal._id)}>
                                <div className="h-100 card-l">
                                    {/* <!-- card Image --> */}
                                    <img src={`./images/card-${meal.image}`} alt="images_mealtype" className="img-fluid img-qs" />
                                </div>
                                <div className=" ps-3 pt-3 h-100 card-r">
                                    <h5 className="heading-p">{meal.name}</h5>
                                    <p className="heading-s">{meal.content}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }

}

export default navigation(Quicksearch);
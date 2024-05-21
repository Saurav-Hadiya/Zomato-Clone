import React from "react";
import Banner from "./banner";
import Quicksearch from "./quickSearch";
import '../Style/frontpage.css';
import axios from "axios";

class Homepage extends React.Component {

    constructor(){
        super();
        this.state={
            loc:[],
            meal:[]
        }
    }

    componentDidMount(){

        // Location API
        axios({
            url:'http://localhost:5500/location',
            method:'get',
            headers: { 'Content-Type' : 'application/JSON' }
        })
            .then(res=>{
                this.setState({loc:res.data.Location});
            })
            .catch(err=>console.log(err))

        // Mealtype API
        axios({
            url:"http://localhost:5500/mealtype",
            method:"get",
            headers:{"Content-Type":"application/JSON"}
        })
            .then(res=>{
                this.setState({meal:res.data.Mealtype});
            })
            .catch(err=>console.log(err))
    }

    render() {

        const {loc, meal}=this.state;
        return (
            <div>

                {/* <!--Banner Part (upper part)--> */}
                <Banner locationData={loc} />

                {/* <!--Quick Searches Part (lower)--> */}
                <Quicksearch mealData={meal} />

            </div>
        )
    }
 
}

export default Homepage
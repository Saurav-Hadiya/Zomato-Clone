import React from "react";
import axios from "axios";
import queryString from "query-string";
import "../Style/filter.css";
import navigation from "./nav";

class Filter extends React.Component {

    constructor() {
        super();
        this.state = {
            loc: [],
            restaurant: [],
            cuisine: [],
            sort: 1,
            page: 1,
            mealt: []
        }
    }

    componentDidMount() {
        const que = queryString.parse(window.location.search);
        const { mealtype } = que;
        const int = parseInt(mealtype);

        const filterData = {
            mealtype: int
        }

        //post mealtype API
        axios({
            url: "http://localhost:5500/filter",
            method: "post",
            headers: { "Content-Type": "application/JSON" },
            data: filterData
        })
            .then(res => {
                this.setState({ restaurant: res.data.Restaurant, mealtype: int })
            })
            .catch(err => console.log(err));


        // GET location API
        axios({
            url: "http://localhost:5500/location",
            method: "get",
            headers: { 'Content-Type': 'application/JSON' }
        })
            .then(res => {
                this.setState({ loc: res.data.Location })
            })
            .catch(err => console.log(err));

        // Mealtype 
        axios({
            url: `http://localhost:5500/meal/${int}`,
            method: "get",
            headers: { "Content-Type": "application/JSON" },
        })
            .then(res => {
                this.setState({ mealt: res.data.mealtype })
            })
            .catch(err => console.log(err));

    }

    //Post location API
    handleLocation = (e) => {
        const { lcost, hcost, cuisine, sort, page, mealtype } = this.state;
        const locId = e.target.value;

        const filterData = {
            location: locId,
            lcost,
            hcost,
            cuisine: cuisine.length > 0 ? cuisine : undefined,
            sort,
            page,
            mealtype
        }

        axios({
            url: "http://localhost:5500/filter",
            method: "post",
            headers: { "Content-Type": "application/JSON" },
            data: filterData
        })
            .then(res => {
                this.setState({ restaurant: res.data.Restaurant, location: locId })
            })
            .catch(err => console.log(err));


    }

    // handle Cost
    handleCost = (lcost, hcost) => {
        const { location, cuisine, sort, page, mealtype } = this.state;

        const filterData = {
            location,
            lcost,
            hcost,
            cuisine: cuisine.length > 0 ? cuisine : undefined,
            sort,
            page,
            mealtype
        }

        axios({
            url: "http://localhost:5500/filter",
            method: "post",
            headers: { "Content-Type": "application/JSON" },
            data: filterData
        })
            .then(res => {
                this.setState({ restaurant: res.data.Restaurant, lcost, hcost })
            })
            .catch(err => console.log(err));
    }

    // handle Cuisine
    handleCuisine = (i) => {
        const { location, lcost, hcost, sort, page, mealtype } = this.state;

        const tempCuisine = this.state.cuisine.slice();

        if (tempCuisine.indexOf(i) === -1) {
            tempCuisine.push(i);
        }
        else {
            tempCuisine.splice(tempCuisine.indexOf(i), 1);
        }

        const filterData = {
            location,
            lcost,
            hcost,
            cuisine: tempCuisine.length > 0 ? tempCuisine : undefined,
            sort,
            page,
            mealtype
        }

        axios({
            url: "http://localhost:5500/filter",
            method: "post",
            headers: { "Content-Type": "application/JSON" },
            data: filterData
        })
            .then(res => {
                this.setState({ restaurant: res.data.Restaurant, cuisine: tempCuisine })
            })
            .catch(err => console.log(err));

    }

    handleSort = (sort) => {
        const { location, lcost, hcost, cuisine, page, mealtype } = this.state;

        const filterData = {
            location,
            lcost,
            hcost,
            cuisine: cuisine.length > 0 ? cuisine : undefined,
            sort,
            page,
            mealtype
        }

        axios({
            url: "http://localhost:5500/filter",
            method: "post",
            headers: { "Content-Type": "application/JSON" },
            data: filterData
        })
            .then(res => {
                this.setState({ restaurant: res.data.Restaurant, sort })
            })
            .catch(err => console.log(err));

    }

    handlePage = (page) => {
        const { location, lcost, hcost, cuisine, sort, mealtype } = this.state;

        const filterData = {
            location,
            lcost,
            hcost,
            cuisine: cuisine.length > 0 ? cuisine : undefined,
            sort,
            page,
            mealtype
        }

        axios({
            url: "http://localhost:5500/filter",
            method: "post",
            headers: { "Content-Type": "application/JSON" },
            data: filterData
        })
            .then(res => {
                this.setState({ restaurant: res.data.Restaurant, page })
            })
            .catch(err => console.log(err));

    }

    handlePageNav = (pageNav) => {
        const { location, lcost, hcost, cuisine, sort, mealtype, page } = this.state;

        const filterData = {
            location,
            lcost,
            hcost,
            cuisine: cuisine.length > 0 ? cuisine : undefined,
            sort,
            page: page + (pageNav),
            mealtype
        }

        axios({
            url: "http://localhost:5500/filter",
            method: "post",
            headers: { "Content-Type": "application/JSON" },
            data: filterData
        })
            .then(res => {
                this.setState({ restaurant: res.data.Restaurant, page: page + (pageNav) })
            })
            .catch(err => console.log(err));
    }

    selectRestaurant = (ss) => {
        this.props.navigate(`/detail?restaurant=${ss}`);
    }

    render() {

        const { loc, restaurant, mealt } = this.state;
       
        return (

            <div>

                {/* <!--Navbar--> */}
                <nav className="navbar " data-bs-theme="" style={{ backgroundColor: "red", height:"70px" }}>
                    <div className="container">
                        <div className="navbar-brand text-danger circle">
                            <h2 className="logo">e!</h2>
                        </div>
                        {/* <form className="d-flex nav-form">
                            <button type="button" className="btn text-white px-3 ms-0 ">Login</button>
                            <button type="button" className="btn btn-outline-light">Create an account</button>
                        </form> */}
                    </div>
                </nav>

                {/* <!--Filter Page--> */}
                <div className="container mb-5">
                    <h2 className="filter-heading mt-3">{mealt.name} Places </h2>

                    {/* <!--Filters--> */}
                    <div className="filter-box mt-2 pb-4">
                        <h5 className="filter-heading mt-2">Filters</h5>

                        <p className="filter-subheading">Select Location</p>

                        <select className="form-control selectLocation" onChange={this.handleLocation}>

                            <option value="0" disabled selected>Select Location</option>
                            {loc.map((item, index) => {
                                return (
                                    <option value={item.city_id} key={index}>{item.name}</option>
                                )
                            })}

                        </select>

                        <p className="filter-subheading mt-4">Cuisine</p>

                        <input type="checkbox" id="North_Indian" name="Cuisine" value="North Indian" onChange={() => this.handleCuisine(1)} /> <label for="North_Indian" className="filter-content">North Indian</label> <br />
                        <input type="checkbox" id="South_Indian" name="Cuisine" value="South Indian" onChange={() => this.handleCuisine(2)} /> <label for="South_Indian" className="filter-content">South Indian</label> <br />
                        <input type="checkbox" id="Chinese" name="Cuisine" value="Chinese" onChange={() => this.handleCuisine(3)} /> <label for="Chinese" className="filter-content">Chinese</label> <br />
                        <input type="checkbox" id="Fast_Food" name="Cuisine" value="Fast Food" onChange={() => this.handleCuisine(4)} /> <label for="Fast_Food" className="filter-content">Fast Food</label> <br />
                        <input type="checkbox" id="Street_Food" name="Cuisine" value="Street Food" onChange={() => this.handleCuisine(5)} /> <label for="Street_Food" className="filter-content">Street Food</label> <br />

                        <p className="filter-subheading mt-4">Cost For Two</p>

                        <input type="radio" id="500" name="costfortwo" value="Less than 500" onChange={() => this.handleCost(1, 500)} /> <label for="500" className="filter-content">Less than `500</label> <br />
                        <input type="radio" id="1000" name="costfortwo" value="500 to 1000" onChange={() => this.handleCost(500, 1000)} /> <label for="1000" className="filter-content">` 500 to ` 1000</label> <br />
                        <input type="radio" id="1500" name="costfortwo" value="1000 to 1500" onChange={() => this.handleCost(1000, 1500)} /> <label for="1500" className="filter-content">` 1000 to ` 1500</label> <br />
                        <input type="radio" id="2000" name="costfortwo" value="1500 to 2000" onChange={() => this.handleCost(1500, 2000)} /> <label for="2000" className="filter-content">` 1500 to ` 2000</label> <br />
                        <input type="radio" id="2000+" name="costfortwo" value="2000+" onChange={() => this.handleCost(2000, 5000)} /> <label for="2000+" className="filter-content">` 2000+</label> <br />

                        <h5 className="filter-heading mt-4">Sort</h5>

                        <input type="radio" id="ltoh" name="Sort" value="Price low to high" onChange={() => this.handleSort(1)} /> <label for="ltoh" className="filter-content">Price low to high</label> <br />
                        <input type="radio" id="htol" name="Sort" value="Price high to low" onChange={() => this.handleSort(-1)} /> <label for="htol" className="filter-content">Price high to low</label> <br />

                    </div>

                    {/* <!--Filter Result--> */}
                    <div className="result-box mt-2">

                        {/* <!--Result--> */}

                        {restaurant.length != 0 ?
                            restaurant.map(res => {
                                return (
                                    <div className="results" onClick={() => this.selectRestaurant(res._id)}>
                                        <div className="d-flex">
                                            <div className="lt-box">
                                                <img src={res.thumb} alt="item" className="img-fluid img-qs" />
                                            </div>
                                            <div className="rt-box">
                                                <h4 className="result-heading">{res.name}</h4>
                                                <p className="result-subheading">{res.city_name}</p>
                                                <p className="result-text">{res.address}</p>
                                            </div>
                                        </div>

                                        <hr style={{ color: "grey" }} />

                                        <div className="d-flex">
                                            <div className="ll-box">
                                                <p className="result-text">CUISINES:</p>
                                                <p className="result-text">COST FOR TWO:</p>
                                            </div>
                                            <div className="rl-box">
                                                <p className="result-text-blue">{res.Cuisine.map(response => `${response.name} `)}</p>
                                                <p className="result-text-blue">₹{res.cost}</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }) : <div><h1>No Results found... </h1></div>
                        }

                        {/* <!--Pagination--> */}
                        <div className="mt-5">
                            <ul className="pagination justify-content-center">
                                <li className="page-item" onClick={() => this.handlePageNav(-1)}>
                                    <a className="page-link" href="#">
                                        <span> &lt; </span>
                                    </a>
                                </li>
                                <li className="page-item" onClick={() => this.handlePage(1)}><a className="page-link" href="#">1</a></li>
                                <li className="page-item" onClick={() => this.handlePage(2)}><a className="page-link" href="#">2</a></li>
                                <li className="page-item" onClick={() => this.handlePage(3)}><a className="page-link" href="#">3</a></li>
                                <li className="page-item" onClick={() => this.handlePage(4)}><a className="page-link" href="#">4</a></li>
                                <li className="page-item" onClick={() => this.handlePage(5)}><a className="page-link" href="#">5</a></li>
                                <li className="page-item" onClick={() => this.handlePageNav(1)}>
                                    <a className="page-link" href="#">
                                        <span> &gt; </span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default navigation(Filter);
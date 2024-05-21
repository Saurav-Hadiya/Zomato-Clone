import React from "react";
import axios from 'axios';
import navigation from "./nav";

class Banner extends React.Component {

    constructor() {
        super();
        this.state = {
            rest: [],
            inputText: undefined,
            suggestion: []
        }
    }

    handleLocation = (e) => {

        const location = e.target.value;

        axios({
            url: `http://localhost:5500/rest/${location}`,
            method: 'get',
            headers: { 'Content-Type': 'application/JSON' }
        })
            .then(res => {
                this.setState({ rest: res.data.Restaurant });
            })
            .catch(err => console.log(err))
    }

    handleInput = (event) => {
        const { rest } = this.state;
        const inputText = event.target.value;

        let suggestion = [];
        suggestion = rest.filter(item => item.name.toLowerCase().includes(inputText.toLowerCase()));
        this.setState({ inputText, suggestion })

    }

    showSuggestion = () => {
        const { inputText, suggestion } = this.state

        if (suggestion.length == 0 && inputText == undefined) {
            return null;
        }

        if (suggestion.length > 0 && inputText == "") {
            return null;
        }

        if (suggestion.length == 0 && inputText) {
            return (
                <li>No Results Found !!</li>
            )
        }

        return (
            suggestion.map((item, index) => (
                <li key={index} className="suggList" onClick={() => this.selectRestaurant(item._id)}>
                    <img src={item.thumb} alt="restaurant-image" className="suggImg" />
                    <span>
                        <div className="suggName">{item.name}</div>
                        <div className="suggLoc">{item.address}</div>
                    </span>
                </li>
            ))
        )
    }

    selectRestaurant = (num) => {
        this.props.navigate(`/detail?restaurant=${num}`);
    }

    render() {

        const { locationData } = this.props

        return (
            <div>

                <header className="container-fluid" id="cover">

                    <nav className="row pt-3 " >
                        <div className="col-9 ">
                        </div>
                        <div className="col-1 ">
                            {/* <button type="button" className="btn  text-light ms-5"><h6>Login</h6></button> */}
                        </div>
                        <div className="col-2 ">
                            {/* <button type="button" className="btn btn-outline-light px-3 ms-0 "><h6>Create an account</h6></button> */}
                        </div>
                    </nav>

                    <div className="bg-light d-flex justify-content-center align-items-center mx-auto mt-4" id="logo">
                        <h1 className=" mb-2 ms-2 text-danger">e!</h1>
                    </div>

                    <div className="container d-flex justify-content-center align-items-center text-light my-3 ">
                        <h1>Find the best restaurants, cafés, and bars</h1>
                    </div>

                    <div className=" d-flex flex-wrap align-items-center justify-content-center my-4 mx-auto " style={{ width: "852px" }}>
                        <select name="location" className="py-2  px-2 border border-success text-dark" onChange={this.handleLocation} style={{ width: "250px", color: "#636F88" }}  >
                            <option value="0" disabled selected >Please type a location</option>
                            {locationData.map(item => {
                                return (
                                    <option value={item.city_id}>{item.name}</option>
                                )
                            })}
                        </select>

                        <div>

                            <i className="bi bi-search bg-light justify-content-center align-items-center " style={{ position: "absolute", top: "17.9em", left: "40em", color: "#636F88" }}></i>
                            <input type="search" name="search" className="py-2 ms-4 px-5 " onChange={this.handleInput} placeholder=" Search for restaurants" style={{ width: "550px", color: "#636F88" }} />

                            <ul className="suggestionBox">{this.showSuggestion()}</ul>
                        </div>

                    </div>

                </header>

            </div>
        )
    }
}

export default navigation(Banner);
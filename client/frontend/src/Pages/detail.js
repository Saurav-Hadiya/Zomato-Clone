import React from "react";
import axios from "axios";
import queryString from "query-string";
import "../Style/detail.css"
import Modal from 'react-modal';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

class Details extends React.Component {

    constructor() {
        super();
        this.state = {
            restaurant: [],
            restId: undefined,
            galleryModal: false,
            menuModal: false,
            menu: [],
            subtotal: 0,
            formModal: false

        }
    }

    componentDidMount() {
        const que = queryString.parse(window.location.search);
        const rest = que.restaurant;
        axios(
            {
                url: `http://localhost:5500/restaurants/${rest}`,
                method: "get",
                headers: { "Content-Type": "application/JSON" }
            }
        )
            .then(res => {
                this.setState({ restaurant: res.data.Restaurant, restId: rest })
            })
            .catch(err => console.log(err))
    }

    handleModal = (state, value) => {

        const { restId } = this.state;

        if (state == "menuModal" && value == true) {
            axios(
                {
                    url: `http://localhost:5500/menu/${restId}`,
                    method: "get",
                    headers: { "Content-Type": "application/JSON" }
                }
            )
                .then(res => {
                    this.setState({ menu: res.data.menuItems })
                })
                .catch(err => console.log(err))
        }

        this.setState({ [state]: value });

    }

    addItems = (index, calculation) => {
        var total = 0;
        const items = [...this.state.menu];
        const item = items[index];

        if (calculation == "add") {
            item.qty += 1;
        }
        else {
            item.qty -= 1;
        }

        items[index] = item;

        items.map((ss) => {
            total += ss.qty * ss.price;
        })

        this.setState({ map: items, subtotal: total })
    }

    // Payment
    initPayment = (data)=>{
        const options = {
            key: "rzp_test_IqR6IbViHRVkXQ",
            amount: data.amount,
            currency: data.currency,
            description: "Test Transaction",
            order_id: data.id,

            handler: async (response) => {
                try{
                    const verifyLink = "http://localhost:5500/api/payment/verify";
                    const {data} = await axios.post(verifyLink, response);
                
                }catch(error){
                    console.log(error);
                }
            }
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
    }

    handlePayment = async () => {

        const {subtotal} = this.state;

        try{
            const orderLink = "http://localhost:5500/api/payment/orders";
            const { data } = await axios.post(orderLink, {amount: subtotal});

            this.initPayment(data.data);
        }  catch(error){
            console.log(error);
        }

    }

    render() {
        const { restaurant, galleryModal, menuModal, menu, subtotal, formModal } = this.state
        return (
            <div>

                {/* <!--Navbar--> */}
                <nav className="navbar " data-bs-theme="" style={{ backgroundColor: "red",height:"70px"  }}>
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

                <div className="container">

                    <div className="bannerCover">
                        <img src={restaurant.thumb} alt="Restaurant-img" className="banner" />
                        <input type="button" value="Click to see Image Gallery" className="gallery_button" onClick={() => this.handleModal("galleryModal", true)} />
                    </div>

                    <h2 className="heading mt-4">{restaurant.name}</h2>

                    <div className="order">
                        <button className="btn btn-danger order-btn" onClick={() => this.handleModal("menuModal", true)}>Place Online Order</button>
                    </div>

                    {/* Tabs */}
                    <div className="tabs">

                        <div className="tab me-5">
                            <input type="radio" id="tab-1" name="detail" defaultChecked />
                            <label htmlFor="tab-1" className="lbl-1">Overview</label>

                            <div className="content">
                                <div className="about">About this place</div>

                                <div className="head">Cuisine</div>
                                <div className="value">
                                    {restaurant && restaurant.Cuisine && restaurant.Cuisine.map(cu => `${cu.name} `)}
                                </div>

                                <div className="head">Average Cost</div>
                                <div className="value">₹{restaurant.cost} for two people (approx.)</div>
                            </div>
                        </div>

                        <div className="tab ">
                            <input type="radio" id="tab-2" name="detail" />
                            <label htmlFor="tab-2" className="lbl-2">Contact</label>

                            <div className="content">

                                <div className="value mt-3">Phone Number</div>
                                <div className="value-red">+91 {restaurant.contact_number}</div>

                                <div className="head mt-4">{restaurant.name}</div>
                                <div className="value">{restaurant.address}</div>
                            </div>
                        </div>

                    </div>
                </div>

                <Modal
                    isOpen={galleryModal}
                    style={customStyles}
                >
                    <div onClick={() => this.handleModal("galleryModal", false)} className="closeIcon"><i class="bi bi-x-lg"></i></div>
                    <div>
                        <Carousel showStatus={false} showIndicators={false} showThumbs={false}>
                            <div>
                                <img src={restaurant.thumb} alt="restaurant" className="gallery_img" />
                            </div>
                            <div>
                                <img src="https://source.unsplash.com/840x560?restaurant-food" alt="restaurant" className="gallery_img" />
                            </div>
                            <div>
                                <img src="https://source.unsplash.com/840x560?restaurant-view" alt="restaurant" className="gallery_img" />
                            </div>
                        </Carousel>
                    </div>

                </Modal>

                <Modal
                    isOpen={menuModal}
                    style={customStyles}
                >
                    <div onClick={() => { this.handleModal("menuModal", false); this.setState({subtotal:0}) }} className="closeIcon"><i class="bi bi-x-lg"></i></div>

                    <div >
                        <h2 className="heading mt-4 ms-4">{restaurant.name}</h2>

                        {/* Menu items */}
                        {menu?.map((item, index) => {
                            return (
                                <div className="d-flex menu">
                                    <div className="menuBody">
                                        <h5 className="fontColor">{item.name}</h5>
                                        <h5 className="fontColor">₹ {item.price}</h5>
                                        <p className="item-details">{item.description}</p>
                                    </div>

                                    <div className="menuImage">
                                        <img src={`./images/card-${item.image}`} alt="restaurant" className="item_image" />

                                        {
                                            item.qty == 0 ? <div className="menuBtn" >
                                                <button onClick={() => this.addItems(index, "add")}>Add</button>
                                            </div> :
                                                <div className="menuBtn">
                                                    <button onClick={() => this.addItems(index, "sub")}>-</button>
                                                    <span className="qty"> {item.qty} </span>
                                                    <button onClick={() => this.addItems(index, "add")}>+</button>
                                                </div>
                                        }

                                    </div>
                                </div>
                            )
                        })}

                        {/* Payment details */}
                        <div className=" payment">
                            <h4 className="total fontColor">Subtotal:₹ {subtotal}</h4>
                            <button className="btn btn-danger payment_button" onClick={() => { this.handleModal("menuModal", false); this.handleModal("formModal", true) }}>Pay Now</button>
                        </div>
                    </div>
                </Modal>

                <Modal
                    isOpen={formModal}
                    style={customStyles}
                >
                    <div onClick={() => {this.handleModal("formModal", false); this.setState({subtotal:0})}} className="closeIcon"><i class="bi bi-x-lg"></i></div>
                    <div>
                        <h2 className="heading mt-4 ms-3">{restaurant.name}</h2>

                        <div className="form ms-3 mt-3" style={{ width: "25em"}}>
                            
                                <label htmlFor="name" className="form-label mt-3">Name</label>
                                <input type="text" className="form-control" id="name" placeholder="Enter your name" style={{ border: "2px solid #CACFD8"}} />
                                
                                <label htmlFor="mobile" className="form-label mt-3">Mobile Number</label>
                                <input type="tel" className="form-control " id="mobile" placeholder="Enter mobile number" style={{ border: "2px solid #CACFD8"}} />

                                <label for="address" className="form-label mt-3">Address</label>
                                <textarea className="form-control" id="address" rows="5" placeholder="Enter your address" style={{ border: "2px solid #CACFD8"}}></textarea>

                                <button className="btn btn-danger" style={{ float: "right", marginTop: "30px"}} onClick={this.handlePayment}>Proceed</button>

                        </div>

                    </div>
                </Modal>
            </div>
        )
    }
}

export default Details;
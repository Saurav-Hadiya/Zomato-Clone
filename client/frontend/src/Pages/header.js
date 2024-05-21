import React from "react";
import Modal from 'react-modal';
import axios from "axios";

const customStyles = {
    overlay: {
        backgroundColor: "rgba(0,0,0,0.8)"
    },
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

class Header extends React.Component {
    constructor() {
        super();
        this.state = {
            loginModal: false,
            signupModal: false,
            // result: null,
            name: null,
            email: null,
            password: null,
            Login: null
        }
    }

    // For Modal
    handleModal = (state, value) => {
        this.setState({ [state]: value });
    }

    google = () => {
        window.open("http://localhost:5500/auth/google", "_self");
    }

    logout = () => {
        window.open("http://localhost:5500/auth/logout", "_self");
    }

    handleLogin = (e) => {
        const { email, password } = this.state;

        e.preventDefault();
        axios.post("http://localhost:5500/login", { email, password })
            .then(response => {
                if (response.data.Message === "success") {
                    this.setState({ Login: response.data.login, loginModal: false })
                }
                else {
                    alert("User are not exist...");
                }
            })
            .catch(error => console.log(error));
    }

    handleSignup = (e) => {
        const { name, email, password } = this.state;

        e.preventDefault();
        axios.post("http://localhost:5500/signup", { name, email, password })
            .then(response => {
                if(response.data.Message==="exist"){
                    alert("Email id already exist...")
                }
                else{
                    alert("Account is created successfully, Now you can login");
                    this.setState({signupModal:false})
                }
            })

    }

    render() {
        const { loginModal, signupModal, Login } = this.state;
        const user = this.props.user;
        return (
            <div>
                <div className="position-absolute end-0 me-5 z-3">

                    {console.log(user)}

                    {!user && !Login ? (
                        <form class="d-flex nav-form">
                            <button type="button" className="btn text-white px-3 ms-0 " onClick={() => { this.handleModal('loginModal', true) }}>Login</button>
                            <button type="button" className="btn btn-outline-light" onClick={() => { this.handleModal('signupModal', true) }}>Create an account</button>
                        </form>
                            
                    ) : (
                        <form class="d-flex nav-form">
                            <img src={Login ? "./images/profile.jpg" : user.photos[0].value} className="circle" alt="ProfilePic" />
                            <p className="text-white mx-3 mt-2">{Login ? Login[0].name : user.displayName}</p>
                            <button type="button" className="btn btn-outline-light mt-1" style={{ width: "96px", height: "38px" }} onClick={this.logout}>Logout</button>
                        </form>
                    )}

                    <Modal
                        isOpen={loginModal}
                        style={customStyles}
                    >

                        <div onClick={() => this.handleModal('loginModal', false)} className="closeIcon "><i class="bi bi-x-lg"></i></div>
                        <h4 style={{ color: "#192F60" }} className="fw-bold d-inline ms-2">Login</h4>

                        <div style={{ backgroundColor: "#FFFFFF" }}>
                            <div>

                                <form className="row g-3 formModal mx-1" style={{ color: "#192F60", fontWeight:"bold" }} onSubmit={this.handleLogin}>
                                    <div class="mb-1 mt-4">
                                        <label for="email" className="form-label">Email address</label>
                                        <input type="email" className="form-control " id="email" placeholder="Enter Email" onChange={(e) => this.setState({ email: e.target.value })} required />
                                    </div>
                                    <div class="mb-1">
                                        <label for="password" className="form-label">Password</label>
                                        <input type="password" className="form-control" id="password" placeholder="Enter Password" onChange={(e) => this.setState({ password: e.target.value })} required />
                                    </div>
                                    <button type="submit" class="btn btn-success mb-3 ">SIGN IN</button>
                                </form>

                                <button type="button" className="btn justify-content-center gbutton mx-2 mb-2" onClick={this.google}>
                                    <img src="./images/google-logo.png" alt="Google Logo" className="me-2" style={{ width: '20px', height: '20px' }} />
                                    Sign in with Google
                                </button>

                                <hr />
                                <div >
                                    <span style={{color:"#192F60"}}>Don't have account? </span>
                                    <button type="button" className="btn text-danger mb-1" style={{marginLeft: "-11px", border:"none"}} onClick={() => { this.handleModal('loginModal', false); this.handleModal('signupModal',true) }}>Sign UP</button>
                                </div>

                            </div>
                        </div>
                    </Modal>

                    <Modal
                        isOpen={signupModal}
                        style={customStyles}
                    >

                        <div onClick={() => this.handleModal('signupModal', false)} className="closeIcon"><i class="bi bi-x-lg"></i></div>
                        <h4 style={{ color: "#192F60" }} className="fw-bold d-inline  ms-2">Sign Up</h4>

                        <div style={{ backgroundColor: "#FFFFFF" }}>
                            <div>

                                <form className="row g-3 formModal mx-1" style={{ color: "#192F60", fontWeight:"bold" }} onSubmit={this.handleSignup}>
                                    <div class="mb-1 mt-4">
                                        <label for="name" className="form-label">Name</label>
                                        <input type="text" className="form-control" id="name" placeholder="Enter your name" onChange={(e) => this.setState({ name: e.target.value })} required />
                                    </div>
                                    <div class="mb-1">
                                        <label for="email" className="form-label">Email address</label>
                                        <input type="email" className="form-control" id="email" placeholder="Enter email" onChange={(e) => this.setState({ email: e.target.value })} required />
                                    </div>
                                    <div class="mb-1">
                                        <label for="password" className="form-label">Password</label>
                                        <input type="password" className="form-control" id="password" placeholder="Enter password" onChange={(e) => this.setState({ password: e.target.value })} required />
                                    </div>
                                    <button type="submit" class="btn btn-success mb-3 ">Create an account</button>

                                    <hr />
                                    <div  className="mt-0">
                                        <span style={{color:"#192F60"}}>Already have an account?</span>
                                        <button type="button" className="btn text-danger mb-1" style={{marginLeft: "-9px", border:"none"}} onClick={() => { this.handleModal('signupModal', false); this.handleModal('loginModal',true) }}>Login</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </Modal>

                </div>
            </div>
        )
    }
}

export default Header;
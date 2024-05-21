import { BrowserRouter,Routes, Route } from "react-router-dom";
import Homepage from './home';
import Filter from './filter';
import Details from "./detail";
import Header from "./header";
import { useEffect,useState } from "react";
import "../index.css"

const Router = ()=>{

    const [user, setUser] = useState(null);

    useEffect(() => {
        const getUser = () => {
            fetch("http://localhost:5500/auth/login/success", {
                method: "GET",
                credentials: "include",
                headers: {
                    Accept: "application/JSON",
                    "Content-Type": "application/JSON",
                    "Access-Control-Allow-Credentials": true
                }
            })
            .then((response) => {
                if(response.status === 200) return response.json();
                throw new Error ("Authentication Failed");
            })
            .then((resObject) => {
                setUser(resObject.user);
            })
            .catch((err) => {
                console.log(err);
            })
        };
        getUser();
    }, []);
    
    return(
        <BrowserRouter >
            <Header user = {user} />
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/filter" element={<Filter />} />
                <Route path="/detail" element={<Details />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router;
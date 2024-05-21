const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const route = require('./Route/index');
const dotenv = require("dotenv");
const cookieSession = require("cookie-session");
const passport = require("passport");
const paymentRoute = require("./Controller/payment");
const authRoute = require("./Controller/auth");
const passportSetup = require("./Controller/passport");

const Port = 5500;
const HostName = "localhost";
const mongoAtlas = "mongodb+srv://sauravhadiya21:XxwChTgjtovSNcQ7@cluster0.epjzcrs.mongodb.net/Zomato_Clone?retryWrites=true&w=majority&appName=Cluster0";

const corsOptions = {
    origin: 'http://localhost:3000',
    methods:"GET, POST, PUT, DELETE, PATCH",
    credentials: true,
    optionSuccessStatus: 200,
    allowedHeaders: "X-Requested-With,content-type, x-token, Access-Control-Allow-Credentials"
}

dotenv.config();

const app = express();

app.use(cookieSession({ name: "session", keys: ["Zomato"], maxAge: 24*60*60*1000 }))

app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());
app.use(cors(corsOptions));
app.options("*",cors());
app.use("/", route);
app.use("/api/payment", paymentRoute);
app.use("/auth",authRoute);

mongoose.connect(mongoAtlas, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(response => {
        app.listen(Port, HostName, () => {
            console.log(`server is running at ${HostName} ${Port}`);
        })
    })
    .catch(err => {
        console.log(err);
    }) 
const User = require('../Model/userDB');

exports.postSignUp = (req, res) => {
    const { email, password, name } = req.body;

    const userData = new User({
        email,
        password,
        name
    });

    User.find({ email })
        .then(user => {
            console.log(user)
            if (user.length > 0) {
                res.status(200).json({
                    Message: "exist"
                })
            }
            else {
                userData.save()
                    .then((response) => {
                        res.status(200).json({
                            Message: "User Details Saved Successfully",
                            signup: response
                        });
                    })
                    .catch(err => {
                        res.status(500).json({ error: err });
                    })
            }
        })

    // userData.save()
    //     .then((response)=>{
    //         res.status(200).json({
    //             Message: "User Details Saved Successfully",
    //             signup: response
    //         });
    //     })
    //     .catch(err=>{
    //         res.status(500).json({error:err});
    //     })
}

exports.postlogin = (req, res) => {
    const { email, password } = req.body;

    User.find({
        email,
        password
    })
        .then(response => {

            if (response.length > 0) {
                res.status(200).json({
                    Message: "success",
                    login: response,
                    isAuthenticated: true
                })
            } else {
                res.status(200).json({
                    Message: "User Details Not Found",
                    login: response,
                    isAuthenticated: false
                })
            }
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
}
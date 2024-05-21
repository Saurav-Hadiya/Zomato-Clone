const passport = require("passport");
var GoogleStrategy = require("passport-google-oauth2").Strategy;

passport.use(new GoogleStrategy({
    clientID: "31759535794-e65i653m600t2arbj2h3fftc1470b4g7.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:5500/auth/google/callback",
    passReqToCallback: true
},
    function (request, accessToken, refreshToken, profile, done) {
        done(null, profile);
    }
));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
})
const GoogleStrategy = require('passport-google-ouath20').Strategy
const mongoose = require('mongoose')
const User = require('../models/User')

module.exports = function(passport) {
    passport.use
    (new GoogleStrategy(
        {
        clientId : process.env.GOOGLE_CLIENT_ID,
        clientSecret : process.env.GOOGLE_CLIENT_SECRET,
        callBackURL : '/auth/google/callback'
    },
     async (accessToken, refreshToken, profile, done) => {
        console.log(profile)
       }
    )

    )
    passport.serialixeUser((user, done) => {
        done(null, user.if)
    })

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => done(err, user))
    })

}

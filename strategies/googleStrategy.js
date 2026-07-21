// configs/passport.js
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");

module.exports = new GoogleStrategy(
    {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:4000/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
        try {
            const email = profile.emails[0].value;
            let user = await User.findOne({ email });
            console.log("user ------->>>>",user);

            if (user) return done(null, user);

            const familyName = profile.name.familyName || "";
            const name = `${profile.name.givenName} ${familyName}`.trim();
            const username = name
                .replace(/\s+/g, "_")
                .toLowerCase()
                .replace(/[^\w]/g, "") + Math.floor(Math.random() * 9000);
            const avatar = profile.photos?.[0]?.value || "/img/avatar/defualtPic.png";

            user = await User.create({
                name,
                username,
                email,
                avatar,
                password: "google_oauth_" + Math.random().toString(36).slice(2),
                roles: ["USER"],
            });

            done(null, user);
        } catch (error) {
            done(error, null);
        }
    }
);
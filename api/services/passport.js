var FacebookStrategy = require("passport-facebook");
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
module.exports = require("passport");
module.exports.use(new FacebookStrategy({
    clientID: "290363011350715",
    clientSecret: "24ba159a124f0f14ec670db3225c8405",
    callbackURL: "/signup/loginFacebook/",
    profileFields: ['id', 'displayName', 'photos', 'email'],
    enableProof: false
  },
  function (accessToken, refreshToken, profile, done) {
    if (!_.isEmpty(profile)) {
      SignUp.findOne({
        "oauthLogin.socialId": profile.id + ""
      }).exec(function (err, data) {
        console.log(profile);
        if (err) {
          done(err, false);
        } else {
          usertemp = {
            "oauthLogin": [{
              "socialId": profile.id + "",
              "socialProvider": profile.provider
            }],
            "status": 1
          };
          if (profile.displayName) {
            usertemp.firstName = profile.displayName.split(" ")[0];
            usertemp.lastName = profile.displayName.split(" ")[1];
          }
          if (profile.photos && profile.photos.length > 0) {
            usertemp.image = profile.photos[0].value;
          }
          if (profile.emails && profile.emails.length > 0) {
            usertemp.email = profile.emails[0].value;
          }
          if (_.isEmpty(data)) {
            var signup = SignUp(usertemp);
            signup.save(function (err, data2) {
              done(err, data2);
            });
          } else {
            done(err, data);
          }

        }
      });

    } else {
      done("There is an Error", false);
    }
  }
));



module.exports.use(new GoogleStrategy({
    clientID: "96922746997-plgbvoveug5cjn00qr4a3stioc4r1tic.apps.googleusercontent.com",
    clientSecret: "zanvS3-t7EDa7V0cgi8kTLBK",
    callbackURL: "/signup/loginGoogleCallback"
  },
  function (token, tokenSecret, profile, done) {
    console.log(" this is google profile");
    console.log(profile);
    if (!_.isEmpty(profile)) {
      console.log(" queryy ");
      SignUp.findOne({
        "oauthLogin.socialId": profile.id + ""
      }).exec(function (err, data) {
        if (err) {
          done(err, false);
        } else {
          usertemp = {
            "oauthLogin": [{
              "socialId": profile.id + "",
              "socialProvider": profile.provider
            }],
            "status": 1
          };
          if (profile.displayName) {
            usertemp.firstName = profile.displayName.split(" ")[0];
            usertemp.lastName = profile.displayName.split(" ")[1];
            usertemp.name = usertemp.firstName + " " + usertemp.lastName;
          }
          if (profile.photos && profile.photos.length > 0) {
            usertemp.profilePic = profile.photos[0].value;
          }
          if (profile.emails && profile.emails.length > 0) {
            usertemp.email = profile.emails[0].value;
          }
          if (_.isEmpty(data)) {
            var signup = SignUp(usertemp);
            signup.save(function (err, data2) {
              done(err, data2);
            });
          } else {
            done(err, data);
          }
        }
      });
    } else {
      done("There is an Error", false);
    }
  }
));

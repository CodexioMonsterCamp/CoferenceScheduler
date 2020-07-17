const User = require("../models/user");
const bcrypt = require("bcryptjs");
const {emailRegex} = require("../util/emailRegex")


exports.getLogin = (req, res, next) => {
    let errMessage = req.flash("error");

    if (errMessage.length > 0) {
        errMessage = errMessage[0]
    } else {
        errMessage = null
    }
    let successMessage = req.flash("success");

    if (successMessage.length > 0) {
        successMessage = successMessage[0]
    } else {
        successMessage = null
    }
    res.render("login", {
        pageTitle: 'Login page',
        isLoggedIn: req.session.isLoggedIn,
        path: "/login",
        errorMessage: errMessage,
        successMessage: successMessage
    })
}
exports.getSignup = (req, res, next) => {

    let message = req.flash("error");

    if (message.length > 0) {
        message = message[0]
    } else {
        message = null
    }
    res.render("signup", {
        pageTitle: 'Signup page',
        isLoggedIn: req.session.isLoggedIn,
        path: "/signup",
        errorMessage: message
    })
}


exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({email: email}).then(user => {
        if (!user) {
            req.flash("error", "Invalid email or password...");
            return res.redirect("/login");
        }
        bcrypt.compare(password, user.password).then(doMatch => {
            if (doMatch) {
                req.session.isLoggedIn = true;
                req.session.user = user;
                return req.session.save(err => {
                    res.redirect("/");
                });
            }
            req.flash("error", "Invalid credentials...");
            res.redirect("/login");
        }).catch(err => {
            console.log(err);
            res.redirect("/login");
        });
    }).catch(err => console.log("postLogin error"));
};


exports.postSignup = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    const role = req.body.role;

    let emailCheck = email.trim()
    const found = email.match(emailRegex)

    if (found === null || emailCheck !== found[0]) {
        req.flash("error", "Email can only be in format: email@email.provider")
        res.redirect("/signup")
    }
     else {
        User.findOne({email: email}).then(userDoc => {
            if (userDoc) {
                req.flash("error", "This email has already been used to create registration.");
                return res.redirect("/signup");
            }

            if (password !== confirmPassword) {
                req.flash("error", "Different passwords");
                return res.redirect("/signup");
            }
            return bcrypt.hash(password, 12).then(hashedPassword => {

                const user = new User({
                    email: email,
                    password: hashedPassword,
                    role: role,
                    conferenceOwner: {
                        conferences: []
                    },
                    conferenceAttendee: {
                        conferences: []
                    }
                });
                return user.save();
            }).then(result => {
                req.flash("success", "You have successfully signed in. Please login to continue...")
                res.redirect("/login");
            });

        }).catch(err => console.log(err));
    }


};

exports.logout = (req, res, next) => {
    req.session.destroy(err => {
        res.redirect("/");
    })
};

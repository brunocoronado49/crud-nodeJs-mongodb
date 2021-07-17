const User = require('../models/User');
const passport = require('passport');

const usersExport = {};

// Render signin form
usersExport.renderSigninForm = (req, res) => res.render('users/signin');

// Render signUp form
usersExport.renderSignUpForm = (req, res) => res.render('users/signup');

// Validate signIn form
usersExport.signIn = passport.authenticate('local', {
    successRedirect: '/notes',
    failureRedirect: '/users/signin',
    failureFlash: true
});

// Validate signUp form
usersExport.signUp = async (req, res) => {
    const errors = [];
    const {name, email, password, confirmPassword} = req.body;

    if(password != confirmPassword) {
        errors.push({text: 'Las contraseñas no coinciden.'});
    }

    if(password.length < 4) {
        errors.push({text: 'La contraseña debe ser mayor a 4 digitos.'});
    }

    if(errors.length > 0) {
        res.redner('/users/signun', {
            errors,
            name,
            email,
            password,
            confirmPassword
        });
    } else {
        // Look email coincidence
        const emailUser = await User.findOne({email: email});

        if(emailUser) {
            req.flas('error_msg', 'El correo ya esta en uso.');
            res.redirect('/users/signup');
        } else {
            // Saving new user
            const newUser = new User({name, email, password});
            newUser.password = await newUser.encryptPassword(password);
            await newUser.save();
            req.flash('success_msg', 'Usuario registrado exitosamente.');
            res.redirect('/users/signin');
        }
    }
}

// Logout session
usersExport.logout = (req, res) => {
    req.logout();
    req.flash('success_msg', 'Saliste de la app');
    res.redirect('/users/signin');
}

module.exports = usersExport;
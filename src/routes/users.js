const express = require('express');
const router = express.Router();
const passport = require('passport');

const User = require('../models/User');

module.exports = router;

router.get('/users/signin', (req, res) => {
    res.render('users/signin');
});

router.post('/users/signinSave', passport.authenticate('local', {
    successRedirect: '/notes',
    failureRedirect: '/users/signin',
    failureFlash: true
}));

router.get('/users/signup', (req, res) => {
    res.render('users/signup');
});

router.post('/users/signupSave', async (req, res) => {
    const {name, email, password, confirmPassword} = req.body;
    const errors = [];
    if(password != confirmPassword) {
        errors.push({text: 'Las contraseñas no coinciden!'});
    }
    if(password.length < 6) {
        errors.push({text: 'La contraseña debe ser mayor o igual a 6 caracteres!'});
    }
    if(errors.length > 0) {
        res.render('users/signup', {errors, name, email, password, confirmPassword});
    } else {
        const emailUser = await User.findOne({email: email});
        if(emailUser) {
            req.flash('error_msg', 'Correo ya en uso!');
            res.redirect('/users/signup');
        }
        const newUser = new User({name, email, password});
        newUser.password = await newUser.encryptPassword(password);
        await newUser.save();
        req.flash('success_msg', 'Registrado exitosamente!');
        res.redirect('/users/signin');
    }
});

router.get('/users/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});
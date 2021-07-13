const express = require('express');
const router = express.Router();

module.exports = router;

router.get('/users/signIn', (req, res) => {
    res.render('users/signin');
});

router.get('/users/signUp', (req, res) => {
    res.render('users/signup');
})
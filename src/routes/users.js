const express = require('express');
const router = express.Router();

const {
    renderSigninForm,
    renderSignUpForm,
    signIn,
    signUp,
    logout,
} = require('../controllers/usersController');

router.get('/users/signin', renderSigninForm);

router.post('/users/signinSave',signIn);

router.get('/users/signup', renderSignUpForm);

router.post('/users/signupSave', signUp);

router.get('/users/logout', logout);

module.exports = router;
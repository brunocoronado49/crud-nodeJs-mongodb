const User = require('../models/User');

const admin = {};

admin.createAdminUser = async () => {
    const userFound = User.findOne({email: 'admin@localhost'});

    if(userFound) return;

    const newUser = new User({
        username: 'admin',
        email: 'admin@localhost',
    });

    newUser.password = await newUser.encryptPassword('adminpassword');

    const admin = await newUser.save();

    console.log('Admin creado: ', admin);
}

module.exports = admin;
const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');

const User = require('./models/user');

mongoose.connect(keys.mongoURI);

const app = express();

require('./routes/homeRoutes')(app);

// Testing user creation
let testUser = new User({
    firstName: 'Haley',
    lastName: 'Adamson',
    email: 'haleyadamson@gmail.com',
    birthDate: new Date('05/11/1993'),
    password: 'password'
});

//  save test user
testUser.save(function(err) {
    if (err) throw err;

    // fetch user and test password verification
    User.findOne({ email: 'haleyadamson@gmail.com' }, function(err, user) {
        if (err) throw err;

        // test matching password
        user.comparePassword('password', function(err, isMatch) {
            if (err) throw err;
            console.log('password: ', isMatch);
        });

        // test failing password
        user.comparePassword('notpassword', function(err, isMatch) {
            if (err) throw err;
            console.log('notpassword: ', isMatch);
        });
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);

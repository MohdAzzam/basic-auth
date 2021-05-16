'use strict';
const base64 = require('base-64');
const bcrypt = require('bcrypt');
const User = require('../model/user');

module.exports = async (req, res, next) => {
    let basicHeaderParts = req.headers.authorization.split(' ');  // ['Basic', 'sdkjdsljd=']
    let encodedString = basicHeaderParts.pop();  // sdkjdsljd=
    let decodedString = base64.decode(encodedString); // "username:password"
    // console.log(decodedString);
    let [username, password] = decodedString.split(':'); // username, password

    const user = await User.findOne({ username: username })
    if(user){
        const valid = await bcrypt.compare(password, user.password);
            if (valid) {
                // console.log(user);
                req.user = user;
                next();
                // res.status(200).json(user);
            }
            else {
                next('User Name or Password Not Found')
                // throw new Error('Invalid User')
            }
    }else{
        next('User Name or Password Not Found')
    }
    // console.log(user);
    // console.log(valid);

}

const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const router = express.Router();

const authConfig = require('../config/auth');

const createToken = (params = {}) => jwt.sign(params, authConfig.secret, {
    expiresIn: 86400.0,
});

const registerNewUser = async (req, res) => {
    const { email } = req.body;

    try {
        if (await User.findOne({ email })) {
            return res.status(400).send({ error: 'Usuário já existe' });
        }

        const user = await User.create(req.body);
        user.password = undefined;
        return res.send({ user, auth: true, token: createToken({ id: user.id }) });

    } catch (err) {
        console.log(err);
        return res.status(400).send({
            error: 'Registration fail'
    });
  }
};

const deleteUser = async (req, res) => {
    const { email } =  req.params;

    try {
        if (await User.findOne({ email })) {
            console.log(await User.findOne({email}));
            const user = await User.deleteOne({'email': email} );
            return res.status(200).send(user);
        }
    } catch(err) {
        console.log(err);
        return res.status(400).send({
            error: 'Delete fail'
        });   
    }

}

const showUser = async (req, res) => {
    const users = await User.find()
    res.send(users);
}

router.post('/register', registerNewUser);
router.get('/showUsers', showUser);
router.delete('/deleteUser/:email', deleteUser);
module.exports = (app) => app.use('/auth', router);

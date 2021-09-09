const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const cryptojs = require('crypto-js');
require('dotenv').config();

exports.signup = (req, res, next) => {
    const hashedEmail = cryptojs.HmacSHA512(req.body.email, process.env.SECRET_CRYPTOJS).toString(cryptojs.enc.Base64); // Ajout de crypto
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email: hashedEmail,
                password: hash
            });
            user.save()
                .then(() => res.status(201).json({message: "Utilisateur crée"}))
                .catch(error => res.status(400).json({error}));
        })
        .catch(error => res.status(500).json({error}));
};

exports.login = (req, res, next) => {
    const hashedEmail = cryptojs.HmacSHA512(req.body.email, process.env.SECRET_CRYPTOJS).toString(cryptojs.enc.Base64); // Ajout de crypto
    User.findOne({email: hashedEmail})
        .then(user => {
            if (!user) {
                return res.status(401).json({error: "Utilisateur non trouvé !"});
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({error: "Mot de passe incorrect !"});
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            {userId: user._id},
                            process.env.TOKEN,
                            {expiresIn: '24h'}
                        )
                    });
                })
                .catch(error => res.status(500).json({error}));
        })
        .catch(error => res.status(500).json({error}));
};

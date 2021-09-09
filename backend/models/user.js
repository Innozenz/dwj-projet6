// Création d'un model user avec mongoose, on importe donc mongoose
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// On crée notre schéma de données dédié à l'utilisateur
const userSchema = mongoose.Schema({
    // L'email doit être unique
    email: {
        type: String,
        unique: true,
        required: [true, "Veuillez entrer votre adresse email"],
    },
    // enregistrement du mot de passe
    password: {
        type: String,
        required: [true, "Veuillez choisir un mot de passe"]
    }
});

userSchema.plugin(uniqueValidator);

// On exporte ce schéma sous forme de modèle : le modèle s'appellera user et on lui passe le shéma de données
module.exports = mongoose.model('User', userSchema);

// Pour s'assurer que deux utilisateurs ne peuvent pas utiliser la même adresse e-mail
// nous utiliserons le mot clé unique pour l'attribut email du schéma d'utilisateur userSchema.

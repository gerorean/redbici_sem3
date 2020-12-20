var mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
var Reserva = require('./reserva');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const saltRounds = 10;  //salt para aleatoriedad


const Token = require('../models/token');
const mailer = require('../mailer/mailer');
var Schema = mongoose.Schema;

const validateEmail = function(email){
    const re = /^\w+([\.~]?\w+)*@\w+([\.~]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
}

var usuarioSchema = new Schema({
    nombre: {
        type: String,
        trim: true,
        required: [true, 'El nombre el obligatorio']
    },
    email:{
        type: String,
        trim: true,
        rquired: [true, 'El email es requrido'],
        lowercase: true,
        unique: true,
        validate: [validateEmail, 'Por favor, ingrese un email válido'],
        match: [/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/]
    },
    password: {
        type: String,
        required: [true, 'El password es obligatorio'],
    },
    passwordResetToken: String,
    passwordResetTokenExpires: Date,
    verificado: {
        type: Boolean,
        default: false
    }
});

usuarioSchema.plugin(uniqueValidator, { message: 'El {PATH} ya existe con otro usuario.'}); //PATH referencia a atributo email

usuarioSchema.pre('save', function(next){
    if(this.isModified('password')){
        this.password = bcrypt.hashSync(this.password, saltRounds);
    }
    next();
});

usuarioSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.password);
}

usuarioSchema.methods.enviar_email_bienvenida = function (cb) {
  const token = new Token({ _userID: this.id, token: crypto.randomBytes(16).toString('hex') });
  const email_destination = this.email;
  token.save(function (err) {
    if (err) { return console.log(err.message); }

    const mailOptions = {
      from: 'no-reply@redbicicletas.com',
      to: email_destination,
      subject: 'Verificación de cuenta',
      text: 'Hola,\n\n' + 'Por favor para verificar su cuenta haga click en el siguiente link: \n' + 'http://localhost:5000' + '\/token/confirmation\/' + token.token + '\n'
    };
    mailer.sendMail(mailOptions, function (err) {
      if (err) { return console.log(err.message); }
      console.log('Se ha enviado un email de bienvenida a:' + email_destination);
    });
  });
}

module.exports = mongoose.model('Usuario', usuarioSchema);
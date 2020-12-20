var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bicicletaSchema = new Schema({
    code: Number,
    color: String,
    modelo: String,
    ubicacion:{
        type: [Number], index: { Type: '2dsphere', sparse: true}  ////lista de numeros, creamos indice de tipo geografico 2dsphere
    }
});

bicicletaSchema.statics.createInstance = function(code, color, modelo, ubicacion){
    return new this({
        code: code,
        color: color,
        modelo: modelo,
        ubicacion: ubicacion
    });
};

bicicletaSchema.methods.toString = function(){
    return 'code: ' +  this.id + ' | color: ' + this.color;
};

bicicletaSchema.statics.allBicis = function(cb){
    return this.find({}, cb);
};

bicicletaSchema.statics.add = function(aBici, cb){
    return this.create(aBici, cb);
}

bicicletaSchema.statics.findByCode = function (aCode, cb) {
    return this.findOne({ code: aCode }, cb);
};

bicicletaSchema.statics.removeByCode = function (aCode, cb) {
    return this.deleteMany({ }, cb);
};

module.exports = mongoose.model('Bicicleta', bicicletaSchema);
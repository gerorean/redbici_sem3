var Bicicleta = require('../../models/bicicleta');

// exports.bicicleta_list = function (req, res) { 
//     res.status(200).json({
//         bicicletas: bicicletas
//     });
// }
exports.bicicleta_list = function (req, res) {
    Bicicleta.find({}, function (err, bicicletas) {
      res.status(200).json({
        bicicletas: bicicletas
      });
    });
}  

exports.bicicleta_create = function (req, res) {
    var bici = new Bicicleta({ code: req.body.id, color: req.body.color, modelo: req.body.modelo });
    bici.ubicacion = [req.body.lat, req.body.lng];
    Bicicleta.add(bici, function (err, newBici) {
      res.status(200).json({
        bicicleta: newBici
      });
    });
}

exports.bicicleta_update= function (req, res) { 
    var bici = Bicicleta.findById(req.params.id);
    bici.id = req.body.id;
    bici.color = req.body.color;
    bici.modelo = req.body.modelo;
    bici.ubicacion = [req.body.lat, req.body.lng];
    res.status(202).json({
        bicicleta: bici
    });
}

exports.bicicleta_delete = function (req, res) { 
    Bicicleta.removeById(req.body.id);
    res.status(204).send();
}

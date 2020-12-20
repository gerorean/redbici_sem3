var express = require('express');
var router = express.Router();
var usuarioController = require('../../controllers/api/usuarioControllerAPI');

router.get('/', usuarioController.usuario_list);
router.post('/create', usuarioController.usuario_create);
router.post('/reservar', usuarioController.usuario_reservar);
// router.get('/create', usuarioController.usuario_create_get);
// router.post('/:id/update', usuarioController.update);
// router.get('/:id/update', usuarioController.update_get);
// router.post('/:id/delete', usuarioController.delete);

module.exports = router;
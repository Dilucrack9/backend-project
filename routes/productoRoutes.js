const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController');

router.post('/productos', productoController.createProducto);
router.get('/productos', productoController.getAllProductos);
router.get('/productos/:id', productoController.getProductoById);
router.put('/productos/:id', productoController.updateProducto);
router.delete('/productos/:id', productoController.deleteProducto);

router.get('/productos/ordenados', productoController.getOrdenados);
router.get('/productos/filtrados', productoController.getFiltrados);

module.exports = router;

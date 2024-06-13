const Producto = require('../models/producto');
const { Op } = require('sequelize');

exports.createProducto = async (req, res) => {
  try {
    const producto = await Producto.create(req.body);
    res.status(201).json(producto);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllProductos = async (req, res) => {
  try {
    const productos = await Producto.findAll();
    res.status(200).json(productos);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getProductoById = async (req, res) => {
  try {
    const producto = await Producto.findByPk(req.params.id);
    if (producto) {
      res.status(200).json(producto);
    } else {
      res.status(404).json({ message: 'Producto no encontrado' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateProducto = async (req, res) => {
  try {
    const producto = await Producto.findByPk(req.params.id);
    if (producto) {
      await producto.update(req.body);
      res.status(200).json(producto);
    } else {
      res.status(404).json({ message: 'Producto no encontrado' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteProducto = async (req, res) => {
  try {
    const producto = await Producto.findByPk(req.params.id);
    if (producto) {
      await producto.destroy();
      res.status(204).json({ message: 'Producto eliminado' });
    } else {
      res.status(404).json({ message: 'Producto no encontrado' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getOrdenados = async (req, res) => {
  const { criterio } = req.query;
  if (!criterio) return res.status(400).json({ message: 'Criterio de ordenación no proporcionado' });

  const validCriterios = ['nombre', 'precio', 'cantidad'];
  if (!validCriterios.includes(criterio)) return res.status(400).json({ message: 'Criterio no válido' });

  try {
    const productos = await Producto.findAll({ order: [[criterio, 'ASC']] });
    res.status(200).json(productos);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getFiltrados = async (req, res) => {
  const { precio, categoria } = req.query;
  const whereClause = {};
  if (precio) whereClause.precio = { [Op.gt]: precio };
  if (categoria) whereClause.categoria = categoria;

  try {
    const productos = await Producto.findAll({ where: whereClause });
    res.status(200).json(productos);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

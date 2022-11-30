import { ProductsModel } from '../models/products.js';
import { CategoryModel } from '../models/categories.js';

export const checkBodyProduct = async (req, res, next) => {
    const { nombre, id, descripcion, stock, precio, categoryId } = req.body;

    if (!nombre || !id || !descripcion || !stock || !precio || !categoryId)
        return res.status(400).json({
            msg: 'Faltan algunos campos por llenar'
        });
    
    const category = await CategoryModel.findById(categoryId);

    if (!category)
        return res.status(400).json({
            msg: 'No existe la categoria'
        });
    
    next();
};

export const getAllProducts = async (req, res) => {
    try {
        const { categoryId } = req.query;

        const query = {};

        if (categoryId) {
            query.categoryId = categoryId;
        }
        const products = await ProductsModel.find(query);
        res.json({
            data: products
        });
    } catch (err) {
        res.status(500).json({
            error: err.massage
        });
    }
};

export const getProductById = async (req, res) => {
  try {
    const {id} = req.params;
    const product = await ProductsModel.findById(id);
    if(!product)
      return res.status(404).json({
        msg: 'No se encuentra el producto!'
      });

      res.json({
        data: product,
      })
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { nombre, id, descripcion, stock, precio, categoryId } = req.body;

      const newProduct = await ProductsModel.create({
      id,
      nombre, 
      precio,
      descripcion,
      stock,
      categoryId
    });
      
    res.status(201).json({
      data: newProduct,
    })
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion, stock, precio, categoryId } = req.body;

    const product = await ProductsModel.findById(id);
    if(!product)
      return res.status(404).json({
        msg: 'No se encontro el Producto',
      });
    const productUpdated = await ProductsModel.findByIdAndUpdate(
      id,
      { nombre, descripcion, stock, precio, categoryId },
      { new: true }
    );
    res.json({
      msg: 'Producto Actualizado',
      data: productUpdated
    });
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        await ProductsModel.findByIdAndDelete(id);
        res.json({
            msg: 'Producto Borrado!'
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
};

   
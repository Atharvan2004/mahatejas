import { asyncErrorHandler } from "../middleware/asyncErrorHandler.js";
import { User } from "../models/Users.js";
import { findProductById } from "../utils/findProduct.js";
import { Order } from "../models/Orders.js";
import { Multimotor, Airplane, Fpv, Propeller, Esc } from "../models/Mutimotors.js"
import { mailSend } from "../utils/sendEmail.js";
import { model } from "mongoose";
const models = [Multimotor, Airplane, Fpv, Propeller, Esc];
const models_obj = {Multimotor, Airplane, Fpv, Propeller, Esc};


const getAllUsers = asyncErrorHandler(async (req, res, next) => {
    if (req.isAdmin) {
        const users = await User.find();
        if (!users) {
            res.status(404).json("User not found");
        }

        res.status(200).json({
            success: true,
            users,
        });

    } else {
        res.status(400).json("Not an admin")
    }
})

const getAllOrders = asyncErrorHandler(async (req, res, next) => {
    if (req.isAdmin) {
        const orders = await Order.find();
        if (!orders) {
            res.status(404).json("User not found");
        }
        res.status(200).json({
            success: true,
            orders,
        });
    } else {
        res.status(400).json("Not an admin")
    }

});

const getAllProducts = asyncErrorHandler(async (req, res, next) => {
    if (req.isAdmin) {
        const productArray = []
        for (let i of models) {
            const a = await i.find();
            productArray.push(a)
        }
        res.status(200).json({
            success: true,
            productArray,
        });
    } else {
        res.status(400).json("Not an admin")
    }

});

const getOrder = asyncErrorHandler(async (req, res, next) => {
    if (req.isAdmin) {
        const id = req.params.id;
        const order = await Order.findById(id);
        if (!order) {
            res.status(404).json("User not found");
        }
        res.status(200).json({
            success: true,
            order,
        });
    } else {
        res.status(400).json("Not an admin")
    }

});

const updateOrder = asyncErrorHandler(async (req, res, next) => {

    if (req.isAdmin) {
        const order = await Order.findById(req.params.id);
        if (!order) {
            res.status(404).json("User not found");
        }
        const updatedStatus = req.params.status;
        order.status = updatedStatus;
        order.save().then(mailSend);
        res.status(200).json({
            success: true,
            order,
        });
    } else {
        res.status(400).json("Not an admin")
    }

});

const createProduct = asyncErrorHandler(async (req, res, next) => {

    if (req.isAdmin) {
        const product = {
            type: req.body.type,
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            kv: req.body.kv,
            weight: req.body.weight,
            min_quantity: req.body.min_quantity,
            category: req.body.category,
            image_url: req.body.image_url
        }
        const selectedModel = models_obj[req.body.type]
        await selectedModel.insertMany(product).then((err) => {
            res.status(200).json({
                success: true,
                product,
            });
        });
    } else {
        res.status(400).json("Not an admin")
    }




});

const deleteProduct = asyncErrorHandler(async (req, res, next) => {
    if (req.isAdmin) {
        const id = req.params.id
        const product = await findProductById(id);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }
        await product.deleteOne();

        res.status(200).json({
            success: true,
            message: "Product deleted successfully."
        });
    } else {
        res.status(400).json("Not an admin")
    }

});

const updateProduct = asyncErrorHandler(async (req, res, next) => {
    if (req.isAdmin) {
        const productId = req.params.id;
        const existingProduct = await findProductById(productId);


        if (req.body.type) {
            existingProduct.type = req.body.type;
        }
        if (req.body.name) {
            existingProduct.name = req.body.name;
        }
        if (req.body.description) {
            existingProduct.description = req.body.description;
        }
        if (req.body.price) {
            existingProduct.price = req.body.price;
        }
        if (req.body.kv) {
            existingProduct.kv = req.body.kv;
        }
        if (req.body.weight) {
            existingProduct.weight = req.body.weight;
        }
        if (req.body.min_quantity) {
            existingProduct.min_quantity = req.body.min_quantity;
        }
        if (req.body.category) {
            existingProduct.category = req.body.category;
        }
        if (req.body.image_url) {
            existingProduct.image_url = req.body.image_url;
        }

        await existingProduct.save().catch((err) => {
            res.status(400).json("Error in updating " + err);
        });

        res.status(200).json({
            success: true,
            existingProduct
        })
    } else {
        res.status(400).json("Not an admin")
    }

});

export { getAllOrders, getAllUsers, getOrder, updateOrder, createProduct, deleteProduct, updateProduct, getAllProducts }

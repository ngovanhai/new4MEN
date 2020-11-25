const Products = require("../models/productsModel")

const productCtrl = {
    getProduct: async (req, res) => {
        try {
            const products = await Products.find()
            res.json(products)
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    getOneProduct: async (req, res) => {
        try {
            const product = await Products.findById(req.params.id)
            res.json(product)
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    createProduct: async (req, res) => {
        try {
            const { product_id, tittle, gia, mota, image, phanloai, soluong, sale } = req.body;
            //if (!image) return res.status(400).json({ msg: "No image upload" })

            const product = await Products.findOne({ product_id })
            if (product)
                return res.status(400).json({ msg: "This product already exists." })
            const newProduct = new Products({
                product_id, tittle, gia, mota, image, phanloai, soluong, sale
            })
            // res.json(req.body)
            await newProduct.save()
            res.json({ msg: "Created a product" })

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    deleteProduct: async (req, res) => {
        try {
            await Products.findByIdAndDelete(req.params.id)
            res.json({ msg: "Deleted a Product" })
        } catch (err) {
            return res.status(500).json({ msg: "loi" })
        }
    },
    updateProduct: async (req, res) => {
        try {
            const { tittle, gia, mota, image, phanloai, soluong, sale } = req.body;
            if (!image) return res.status(400).json({ msg: "No image upload" })
            await Products.findOneAndUpdate({ _id: req.params.id }, {
                tittle, gia, mota, image, phanloai, soluong, sale
            })
            res.json({ msg: "Updated a Product" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },


}
module.exports = productCtrl;
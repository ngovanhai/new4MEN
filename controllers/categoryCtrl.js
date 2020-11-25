const Category = require('../models/categoryModel')

const categoryCtrl = {
    getCategories: async (req, res) => {
        try {
            const categories = await Category.find()
            res.json(categories)
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    createCategory: async (req, res) => {
        try {
            // chỉ có admin mới có quyền thêm sửa xóa
            const { name } = req.body;
            const category = await Category.findOne({ name })
            if (category) return res.status(400).json({ msg: "this category already exits" })

            const newCategory = new Category({ name })
            await newCategory.save()
            res.status(400).json({ msg: "Category da tao" })
        }
        catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    deleteCategory: async (req, res) => {
        try {
            await Category.findByIdAndDelete(req.params.id)
            res.json({ msg: "delete a Category" })

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    updateCtegory: async (req, res) => {
        try {
            const { name } = req.body;
            await Category.findByIdAndUpdate({ _id: req.params.id }, { name })
            res.json({ msg: "Update Category" })
        } catch (error) {

        }
    }
}

module.exports = categoryCtrl;
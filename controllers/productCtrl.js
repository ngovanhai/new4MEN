const Products = require("../models/productsModel");
const fullTextSearch = require('fulltextsearch');
const {  removeAccents } = require("../ultils/function");
var fullTextSearchVi = fullTextSearch.vi;

class APIfeature{
    constructor(query,queryStrings){
        this.query = query;
        this.queryStrings = queryStrings;
    }
    filtering(){
        const queryObject = {...this.queryStrings} 
        const excludeFields = ['page','sort','limit']
        excludeFields.forEach(el => delete(queryObject[el]))
        if(queryObject.phanloai !== ""){
            let queryStr = JSON.stringify(queryObject)
            queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match)
             //    gte = greater than or equal
             //    lte = lesser than or equal
             //    lt = lesser than
             //    gt = greater than
             this.query.find(JSON.parse(queryStr))
             return this;
        }else{
            this.query.find()
            return this;
        }
       
      
    }
    filteringClient(){
        const queryObject = {...this.queryStrings} 
        const excludeFields = ['page','sort','limit']
        excludeFields.forEach(el => delete(queryObject[el]))
        if( queryObject.phanloai == "khuyen-mai"){
            this.query = this.query.find({"sale":{$ne:0}})
            return this;
        }
        if(queryObject.phanloai == "moi-nhat"){
            this.query = this.query.sort('-createdAt')
            return this;
        }else if(queryObject.phanloai !== ""){
            let queryStr = JSON.stringify(queryObject)
           queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match)
            //    gte = greater than or equal
            //    lte = lesser than or equal
            //    lt = lesser than
            //    gt = greater than
            this.query.find(JSON.parse(queryStr))
            return this;
        }else{
            this.query.find()
            return this;
        }  
    }
    sorting(){
        if(this.queryStrings.sort && this.queryStrings.sort !== ""){
            const sortBy = this.queryStrings.sort.split(',').join(' ')
            this.query = this.query.sort(sortBy)
        }else{
            this.query = this.query.sort('-createdAt')
        }
        return this;
    }
    paginating(){
        const page = this.queryStrings.page * 1 || 1
        const limit = this.queryStrings.limit * 1 || 9
        const skip = (page -1) * limit;
        this.query = this.query.skip(skip).limit(limit)
        return this;

    }
}

const productCtrl = {
    getProduct: async (req, res) => {
        try {
            if(req.query.search){
            const products = await Products.find()
            res.status(200).json(products)
            }  
            const feature = new APIfeature(Products.find(),req.query).filteringClient().paginating()
            const products = await feature.query
            const test = new  APIfeature(Products.find(),req.query).filteringClient()
            const count =  await test.query
            res.status(200).json({
                products:products,
                count: Math.ceil( count.length/9)
            })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    searchProducts: async(req,res) =>{
        try {
            var filter = {};
            if (req.query.search != '') {
                filter.name = new RegExp(fullTextSearchVi(req.query.search), "i");
            }
            let q = req.query.search;
            let totalProducts = await Products.find()
            let matchProducts = totalProducts.filter((product) =>{
                return (
                    removeAccents(product.tittle).toLowerCase().indexOf(removeAccents(q).toLowerCase()) !== -1
                )
            })
           console.log(matchProducts);
           res.status(200).json(matchProducts)
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    getProductsAdmin: async (req,res) =>{
        try {
            const feature = new APIfeature(Products.find(),req.query).filtering().sorting().paginating()
            const products = await feature.query
            const FullProducts = await Products.find()
            res.status(200).json({
                status : 'success',
                result : products.length,
                countFullProducts : FullProducts.length,
                products:products})
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
const Oder = require('../models/cartOderModel')

class APIfeature{
    constructor(query,queryStrings){
        this.query = query;
        this.queryStrings = queryStrings;
    }
    paginating(){
      
        const page = this.queryStrings.page * 1 || 1
        const limit = this.queryStrings.limit * 1 || 9
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit)
        return this;
    }
}

const oderCtrl = {
    getOder: async (req, res) => {
        try {
            const feature = new APIfeature(Oder.find(),req.query).paginating()
            const order = await feature.query
            const FullOder = await Oder.find()
            res.status(200).json({
                status : 'success',
                result : order.length,
                countFullOrder : FullOder.length,
                order:order})
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
        // try {
        //     const oder = await Oder.find()
        //     res.json(oder);
        // } catch (err) {
        //     return res.status(500).json({ msg: err.message })
        // }

    },
    createOder: async (req, res) => {
        try {
            const { name, idOder, address, email, oder, phone, total, check } = req.body
            const newOder = new Oder({
                name, idOder, address, email, oder, phone, total, check
            })
            await newOder.save();
            res.status(200).json({ status: true })

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    updateCheck: async (req, res) => {
        try {
            const oder = await Oder.find({ idOder: req.params.id })
            let check = !oder[0].check;
            const order = await Oder.findOneAndUpdate({ idOder: req.params.id }, {
                check
            })
            res.status(200).json({ status: true,check :order})
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }

}

module.exports = oderCtrl
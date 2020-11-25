const Oder = require('../models/cartOderModel')

const oderCtrl = {
    getOder: async (req, res) => {
        try {
            const oder = await Oder.find()
            res.json(oder)
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }

    },
    createOder: async (req, res) => {
        try {
            const { name, idOder, address, email, oder, phone, total, check } = req.body
            const newOder = new Oder({
                name, idOder, address, email, oder, phone, total, check
            })

            await newOder.save();
            res.json(req.body)
            res.status(400).json({ msg: "tao thanh cong" })

        } catch (err) {

        }
    },
    updateCheck: async (req, res) => {
        try {
            const oder = await Oder.find({ idOder: req.params.id })
            let check = !oder[0].check
            await Oder.findOneAndUpdate({ idOder: req.params.id }, {
                check
            })
            res.status(400).json({ msg: " update thanh cong" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }

}

module.exports = oderCtrl
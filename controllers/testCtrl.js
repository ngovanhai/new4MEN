const Test = require('../models/testModel')
const testCtrl = {
    getTest: async (req, res, next) => {
        try {
            const test = await Test.find()
            res.json(test)
        } catch (err) {
            return res.status(500).json({ msg: "nono" })
        }
    },
    createTest: async (req, res) => {
        try {
            const { name } = req.body;
            const newTest = new Test({ name })
            await newTest.save()
            // const newTest = new Test({ name })
            // await newTest.save()
            res.status(400).json({ msg: "TEST da tao" })
        }
        catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }
}

module.exports = testCtrl
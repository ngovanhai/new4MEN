const router = require('express').Router()
const cloudinary = require('cloudinary')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')
const fs = require('fs')




cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})

router.post('/upload', (req, res) => {
    try {
        // kiem tra xem co file up len co hay k
        if (!req.files || Object.keys(req.files).length === 0)
            return res.status(400).send('no file were uploaded')

        const fileImages = req.files;
        // kiem tra xem dung luong file
        const image = []
        const check = async () => {
            for (fileImage in fileImages) {
                if (fileImages[fileImage].size > 4096 * 4096) {
                    removeTmp(fileImages[fileImage].tempFilePath);
                    return res.status(400).json({ msg: "size too large" })
                }
                //kiem tra dinh dang file
                if (fileImages[fileImage].mimetype !== 'image/jpeg' && fileImages[fileImage].mimetype !== 'image/png') {
                    removeTmp(fileImages[fileImage].tempFilePath)
                    return res.status(400).json({ msg: "File format is incorrect." })
                }
                image.push(fileImages[fileImage])
            }
        }
        check()
        const upload = async () => {
            const imageUrls = await Promise.all(image.map(async fileimage => {
                const result = await cloudinary.v2.uploader.upload(fileimage.tempFilePath, { folder: "4men" });
                const image = {
                    public_id: result.public_id,
                    url: result.secure_url
                }
                removeTmp(fileimage.tempFilePath)
                return image;
            }))
            return imageUrls;

        }
        upload().then((x) => res.json(x))
    } catch (err) {
        res.status(500).json({ msg: err.message })
    }
})
router.post('/destroy', (req, res) => {
    try {
        const { public_id } = req.body
        console.log(public_id)
        if (!public_id) res.status(400).json({ msg: "No image Selected" })
        cloudinary.v2.uploader.destroy(public_id, async (err, result) => {
            if (err) throw err;
            res.json({ msg: "Delete Image" })
        })
    } catch (err) {
        res.status(500).json({ msg: err.message })
    }

})
const removeTmp = (path) => {
    fs.unlink(path, err => {
        if (err) throw err;
    })
}

module.exports = router
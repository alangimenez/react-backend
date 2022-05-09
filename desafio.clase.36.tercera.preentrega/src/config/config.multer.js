const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => { cb(null, 'src/public') },
    filename: (req, file, cb) => {
        const extension = file.mimetype.split('/')[1];
        cb(null, `${req.user.id}-${Date.now()}.${extension}`)
    }
})

const upload = multer({ storage })

module.exports = upload;
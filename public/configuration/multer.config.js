const multer = require('multer');

const multerStorage = multer({storage:multer.memoryStorage()})


module.exports = {multerStorage}
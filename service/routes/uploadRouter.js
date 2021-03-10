const express = require("express");
const multer = require('multer');
const storage = multer.diskStorage({
    destination:function(req, file, cb){
        cb(null, '../resources/uploads');
    },
    filename: function (req, file, cb){
        cb(null, file.originalname);
    }
})
const upload = multer({ storage: storage});
//const upload = multer({ dest: '../resources/uploads' });
const uploadsRouter = express.Router();

uploadsRouter.route('/')
  .post(upload.single('image'), (req, res, next) => {
    try {
      const featuredImage = req.file;
      // by this point the file has been saved or an error has occurred.
      // if req.file exists, the save was successful
      if (!featuredImage) {
        res.status(400);
        res.send({ error: 'No file selected' });
      } else {
        res.send({ message: 'Success' });
      }
    } catch (err) {
      next(err);
    }
  });

module.exports = uploadsRouter;
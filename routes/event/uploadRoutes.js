const path = require('path');
const express = require('express');
const multer = require('multer');
const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },  
});

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png|pdf|mp4|mov|avi/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb('Images, PDFs, and videos only!');
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

router.post('/', upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'pdf', maxCount: 1 },
  { name: 'pdf2', maxCount: 1 },
  { name: 'pdf3', maxCount: 1 },
  { name: 'video', maxCount: 1 },
  { name: 'icone', maxCount: 1 },
  { name: 'video2', maxCount: 1 }


]), (req, res) => {
  const image = req.files['image'] ? req.files['image'][0] : null;
  const pdf = req.files['pdf'] ? req.files['pdf'][0] : null;
  const pdf2 = req.files['pdf2'] ? req.files['pdf2'][0] : null;
  const pdf3 = req.files['pdf3'] ? req.files['pdf3'][0] : null;
  const video = req.files['video'] ? req.files['video'][0] : null;
  const icone = req.files['icone'] ? req.files['icone'][0] : null;
  const video2 = req.files['video2'] ? req.files['video2'][0] : null;

  const responseData = {};

  if (image) {
    responseData.imageUrl = `${image.filename}`;
  }
  if (pdf) {
    responseData.pdfUrl = `${pdf.filename}`;
  }
  if (pdf2) {
    responseData.pdfUrl2 = `${pdf2.filename}`;
  }
  if (pdf3) {
    responseData.pdfUrl3 = `${pdf3.filename}`;
  }
  if (video) {
    responseData.googleDriveVideoUrl = `${video.filename}`;
  }
  if (icone) {
    responseData.iconeUrl = `${icone.filename}`;
  }
  if (video2) {
    responseData.googleDriveVideoUrl2 = `${video2.filename}`;
  }

  res.json(responseData);
 

});


module.exports = router;

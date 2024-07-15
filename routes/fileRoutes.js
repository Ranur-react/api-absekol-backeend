const express = require('express');
const router = express.Router();
const { upload, uploadFile, downloadFile } = require('../controllers/fileController');



/**
 * @swagger
 * /api/files/upload:
 *   post:
 *     summary: Upload a file
 *     description: Upload a file to the server.
 *     tags:
 *       - Files
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: file
 *         type: file
 *         description: The file to upload.
 *     responses:
 *       201:
 *         description: File uploaded successfully.
 *       400:
 *         description: Bad request.
 *       401:
 *         description: Unauthorized.
 */

// Rute untuk upload file
router.post('/upload', upload.single('file'), uploadFile);


/**
 * @swagger
 * /api/files/download/{fileName}:
 *   get:
 *     summary: Download a file
 *     description: Download a file from the server.
 *     tags:
 *       - Files
 *     produces:
 *       - application/octet-stream
 *     parameters:
 *       - in: path
 *         name: fileName
 *         required: true
 *         type: string
 *         description: The name of the file to download.
 *     responses:
 *       200:
 *         description: File downloaded successfully.
 *       404:
 *         description: File not found.
 *       401:
 *         description: Unauthorized.
 */

// Rute untuk download file
router.get('/download/:fileName', downloadFile);

module.exports = router;

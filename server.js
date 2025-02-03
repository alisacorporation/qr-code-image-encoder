const express = require('express');
const multer = require('multer');
const QRCode = require('qrcode');
const path = require('path');
const app = express();
const PORT = 3003;

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// Serve static files
app.use(express.static('uploads'));
app.use(express.static('.'));

// Handle photo upload and QR code generation
app.post('/upload', upload.single('photo'), async (req, res) => {
    const photoUrl = `http://${req.hostname}:${PORT}/${req.file.path}`;
    const qrCodeUrl = await QRCode.toDataURL(photoUrl);
    res.json({ qrCodeUrl });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on http://0.0.0.0:${PORT}`);
});

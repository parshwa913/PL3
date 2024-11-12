const express = require('express');
const multer = require('multer');
const mysql = require('mysql2');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', 
  password: 'qweasd', 
  database: 'file_management'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

const uploadFolder = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadFolder);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 }, 
  fileFilter: (req, file, cb) => {
    const allowedFileTypes = /jpeg|jpg|png|pdf/;
    const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());

    if (extname) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPEG, PNG, PDF are allowed.'));
    }
  }
});

app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  const { filename, originalname, mimetype, size } = req.file;
  const query = 'INSERT INTO files (filename, originalname, mimetype, size) VALUES (?, ?, ?, ?)';
  db.execute(query, [filename, originalname, mimetype, size], (err, result) => {
    if (err) {
      console.error('Error saving file metadata:', err);
      return res.status(500).send('Error saving file metadata.');
    }

    res.status(200).send({ message: 'File uploaded successfully', filename });
  });
});

app.get('/download/:filename', (req, res) => {
  const filePath = path.join(__dirname, 'uploads', req.params.filename);

  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).send('File not found.');
    }

    res.download(filePath, (downloadErr) => {
      if (downloadErr) {
        console.error('Error downloading file:', downloadErr);
        res.status(500).send('Error downloading file.');
      }
    });
  });
});

app.get('/files', (req, res) => {
  const query = 'SELECT * FROM files';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error retrieving files:', err);
      return res.status(500).send('Error retrieving files.');
    }
    res.status(200).json(results);
  });
});

app.use((err, req, res, next) => {
  console.error('Error occurred:', err.message); 
  
  if (err instanceof multer.MulterError) {
    return res.status(400).send(err.message);
  }
  if (err.message === 'Invalid file type. Only JPEG, PNG, PDF are allowed.') {
    return res.status(400).send(err.message);
  }
  res.status(500).send('An unknown error occurred');
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

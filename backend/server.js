const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const multer = require('multer');

const app = express();
app.use(cors());
app.use(express.json());

const dotenv = require('dotenv');
const result = dotenv.config();

if (result.error) {
  console.error(result.error);
  process.exit(1);
}

const { DB_URI } = process.env;

// Connect to MongoDB
mongoose.connect(DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1);
  });

// Create a Photo schema
const photoSchema = new mongoose.Schema({
  photo: String,
  caption: String,
});

const Photo = mongoose.model('Photo', photoSchema);

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Define API routes
app.post('/api/photos', upload.single('photo'), async (req, res) => {
  try {
    const { caption } = req.body;
    const newPhoto = new Photo({
      photo: req.file.filename,
      caption: caption,
    });
    await newPhoto.save();
    res.status(201).json({ message: 'Photo submitted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred' });
  }
});

app.get('/api/photos', async (req, res) => {
  try {
    const photos = await Photo.find();
    res.status(200).json(photos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred' });
  }
});

// Serve uploaded images
app.use('/uploads', express.static('uploads'));

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

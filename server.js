require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Feedback model
const Feedback = require('./models/feedback');

// Connect to MongoDB
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/iqac_db';
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => {
  console.error('❌ MongoDB connection error:', err.message);
  process.exit(1);
});

// Health route
app.get('/', (req, res) => res.send('IQAC backend is running'));

// Store feedback (plain text response to match frontend)
app.post('/feedback', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const fb = new Feedback({ name, email, message });
    await fb.save();
    res.send('✅ Feedback submitted successfully!');
  } catch (err) {
    console.error(err);
    res.status(500).send('❌ Error saving feedback');
  }
});

// List feedbacks (JSON)
app.get('/feedback', async (req, res) => {
  try {
    const all = await Feedback.find().sort({ submittedAt: -1 });
    res.json(all);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch feedbacks' });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));

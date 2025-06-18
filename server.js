const express = require('express');
const fetch = require('node-fetch'); // npm i node-fetch@2
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Your API keys (keep these private here)
const webapiKey = 'AIzaSyARwd8ABocjWMQ8lWluWncBfNX4CVh3I3c';
const webcseKey = 'c74c7f15b306e48b4';
const imgapiKey = 'AIzaSyDVnku8Z8GME3KPC7hMIVvKQBEcWEZi0Dk';
const imgcseKey = '561acb8306257404f';

// Serve static files (like index.html, style.css, client.js)
app.use(express.static(path.join(__dirname, 'public')));

// API endpoint for web search
app.get('/api/websearch', async (req, res) => {
  const query = req.query.q;
  if (!query) return res.status(400).json({ error: 'Missing query parameter' });

  const url = `https://www.googleapis.com/customsearch/v1?key=${webapiKey}&cx=${webcseKey}&q=${encodeURIComponent(query)}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Google API error');
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Web search error:', error);
    res.status(500).json({ error: 'Failed to fetch web search results' });
  }
});

// API endpoint for image search
app.get('/api/imagesearch', async (req, res) => {
  const query = req.query.q;
  if (!query) return res.status(400).json({ error: 'Missing query parameter' });

  const url = `https://www.googleapis.com/customsearch/v1?key=${imgapiKey}&cx=${imgcseKey}&q=${encodeURIComponent(query)}&searchType=image&num1000`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Google API error');
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Image search error:', error);
    res.status(500).json({ error: 'Failed to fetch image search results' });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});

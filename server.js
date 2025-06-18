const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

const BING_API_KEY = 'YOUR_BING_API_KEY_HERE';  // <- replace this!

app.use(express.static('public'));

app.get('/search', async (req, res) => {
  const query = req.query.q;
  if (!query) return res.status(400).send('missing query');
  
  try {
    const response = await axios.get('https://api.bing.microsoft.com/v7.0/search', {
      headers: { 'Ocp-Apim-Subscription-Key': BING_API_KEY },
      params: { q: query }
    });

    const results = (response.data.webPages?.value || []).map(item => ({
      name: item.name.toLowerCase(),
      url: item.url,
      snippet: item.snippet.toLowerCase()
    }));

    res.json(results);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('error fetching results');
  }
});

app.listen(PORT, () => console.log(`schlingus search running on http://localhost:${PORT}`));

const express = require('express');
const app = express();
const port = 3000;

// Données d'exemple
const data = Array.from({ length: 100 }, (_, i) => ({ id: i + 1, name: `Item ${i + 1}` }));

app.get('/items', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const results = {};

  if (endIndex < data.length) {
    results.next = {
      page: page + 1,
      limit: limit
    };
  }

  if (startIndex > 0) {
    results.previous = {
      page: page - 1,
      limit: limit
    };
  }

  results.items = data.slice(startIndex, endIndex);
  res.json(results);
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
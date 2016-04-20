const express = require('express');
const app = express();
const path = require('path');

app.use('/public', express.static('public'));
app.use('/subjects', express.static('subjects'));

// viewed at http://localhost:8080
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(3000, () => console.info('Server running on port 3000'));
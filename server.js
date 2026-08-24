const express = require('express');
const app = express();
const port = 3001;

app.get('/login', (req, res) => {
  res.send(`
    <html>
      <body>
        <a href="#" role="link">Get started</a>
        <h1 role="heading">Installation</h1>
      </body>
    </html>
  `);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

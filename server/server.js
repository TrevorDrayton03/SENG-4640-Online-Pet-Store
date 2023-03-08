const express = require('express');
const app = express();
const path = require('path');

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '..', 'build')));

app.get('/data', (req, res) => {
  const data = {
    message: 'Hello World!',
    lists: ["Dogs", "Cats"],
    items: {
      Dogs: [{ name: "chase" }, { name: "joe" }],
      Cats: [{ name: "boomer" }, { name: "cheddar" }],
    }
  };
  res.json(data);
});

app.get('/hello', (req, res) => {
  res.send("HELLO!");
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});

const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'views')));

app.post('/register', (req, res) => {
  const { name, email, phone } = req.body;
  res.send(`
    <html>
      <head><title>Registration Successful</title></head>
      <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 40px auto;">
        <h2>Registration Successful 🎉</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <a href="/">Go back</a>
      </body>
    </html>
  `);
});

app.listen(PORT, () => console.log(`App running on http://localhost:${PORT}`));

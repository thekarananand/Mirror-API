const express = require("express");
const cors    = require("cors");
const app     = express();
const port    = 3000;

// Read appName env variable
const appName = process.env.APP_NAME || "< No APP_NAME found >";

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// All Routes
app.all("*", (req, res) => {
  res.json({
    status    :  "Healthy",
    appName   :  appName,
    route     :  req.originalUrl,
    method    :  req.method,
    headers   :  req.headers,
    payload   :  req.body
  });
});

// Main
app.listen(port, () => {
  console.log(`🚀 Listening on PORT: ${port}`);
});
const express = require("express");
const cors    = require("cors");
const app     = express();
const port    = 8000;

// Read appName env variable
const appName = process.env.APP_NAME || "< No APP_NAME found >";

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// All Routes
app.all("*", (req, res) => {
    const responseData = {
    status    : "Healthy",
    appName   : appName,
    route     : req.originalUrl,
    method    : req.method,
    headers   : req.headers,
    payload   : req.body
  };
  console.log("📦 Response JSON:", JSON.stringify(responseData, null, 2));
  res.json(responseData);
});

// Main
app.listen(port, () => {
  console.log(`🚀 Listening on PORT: ${port}`);
});

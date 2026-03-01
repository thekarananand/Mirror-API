const express = require("express");
const cors    = require("cors");
const fetch   = require("node-fetch");

// Declare app
const app     = express();

// Read PORT env variable
const port    = process.env.PORT     || 8000;

// Read appName env variable
const appName = process.env.APP_NAME || "< No APP_NAME found >";

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Network Test
const network_test_api = "https://ipinfo.io/json"
const network_test = async () => {
  try {
    const response = await fetch(network_test_api);
    const data = await response.json();
    return [true, data?.ip || null];
  } catch {
    return [false, null];
  }
};


// All Routes
app.all("*", async(req, res) => {
  
  const [isInternetReachable, publicIp] = await network_test();
  
  const responseData = {
    status  : "Healthy",
    env     : {
      appName   : appName,
    },
    network : {
      isInternetReachable   : isInternetReachable,
      publicIp              : publicIp
    },
    request : {
      route     : req.originalUrl,
      method    : req.method,
      headers   : req.headers,
      payload   : req.body
    }
  };
  console.log("📦 Response JSON:", JSON.stringify(responseData, null, 2));
  res.json(responseData);
});

// Main
app.listen(port, () => {
  console.log(`🚀 Listening on ${ !process.env.PORT ? "DEFAULT " : "" }PORT: ${port}`);
});

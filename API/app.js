const express = require("express");
const cors    = require("cors");
const https   = require("https");

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
const network_test = () => {
  return new Promise((resolve) => {
    https.get(network_test_api, (resp) => {
      let data = "";
      resp.on("data", (chunk) => {
        data += chunk;
      });
      resp.on("end", () => {
        try {
          const parsed = JSON.parse(data);
          resolve([true, parsed.ip || null]);
        } catch (err) {
          resolve([false, null]);
        }
      });
    }).on("error", () => {
      resolve([false, null]);
    });
  });
};


// All Routes
app.all("*", (req, res) => {
  
  const [isInternetReachable, publicIp] = network_test();
  
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
  console.log(`🚀 Listening on ${ !(process.env.PORT) && "DEFAULT "}PORT: ${port}`);
});

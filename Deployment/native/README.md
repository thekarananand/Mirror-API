# Native Deployment

Follow the following steps to deploy the API as a Systemd Service:

 - **Step 0** : Install Node. [Link to official Node.js Installer](https://nodejs.org/en/download/)
 
 - **Step 1**: Head to the directory where you want to install the API.
 
  ```sh
  cd /path/to/install/api
  ```

 - **Step 2**: Copy and Run the Script.
 
  ```sh
  # Set Variables
  export API_PATH="$(pwd)"
  export RAW_PATH="https://raw.githubusercontent.com/thekarananand/Mirror-API/refs/heads/main"
  
  # Download Files and Service
  wget ${RAW_PATH}/Deployment/native/mirror-api.service -O ${API_PATH}/mirror-api.service
  wget ${RAW_PATH}/API/app.js -O ${API_PATH}/app.js
  wget ${RAW_PATH}/API/package.json -O ${API_PATH}/package.json
  
  # Configure Service
  sed -i "s|WorkingDirectory=API_PATH|WorkingDirectory=${API_PATH}|" ${API_PATH}/mirror-api.service
  sudo cp ${API_PATH}/mirror-api.service /etc/systemd/system/mirror-api.service
  
  # Install Dependencies
  cd "${API_PATH}"
  npm install --production
  
  # Setup and Start systemd service
  sudo systemctl daemon-reload
  sudo systemctl start mirror-api.service
  sudo systemctl enable mirror-api.service
  
  # Finish
  echo "Deployment complete!"
  ```
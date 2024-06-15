#!/bin/bash

# Navigate to my-node-app and start the server
cd my-node-app
npm start &

# Navigate to my-react-app and start the server
cd ../my-react-app
npm start
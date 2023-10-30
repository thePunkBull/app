# Code Generator and Verifier

## Overview
This React application allows users to generate random alphanumeric codes, download them in a JSON file, and verify them using a Merkle tree. The application provides a simple and user-friendly interface for generating codes, creating a Merkle tree, and verifying codes.

## Features
- **Generate Codes**: Users can generate a specified number of random alphanumeric codes.
- **Download Codes**: Users can download the generated codes as a JSON file. The JSON file includes additional fields for each code, indicating its availability and associated wallet address.
- **Create Merkle Tree**: Users can create a Merkle tree from the generated codes, which helps in verifying the authenticity of the codes later.
- **Verify Codes**: Users can input a code to verify its authenticity against the generated Merkle tree.

## How to Run the Application
1. Ensure you have [Node.js](https://nodejs.org/) installed on your machine.
2. Clone this repository to your local machine.
3. Navigate to the project directory in your terminal.
4. Run `npm install` to install the required dependencies.
5. Run `npm start` to start the application.
6. Open your browser and go to [http://localhost:3000](http://localhost:3000) to use the application.

## How to Use the Application
1. **Generate Codes**: Enter the number of codes you want to generate in the input field and click the "Generate Codes" button.
2. **Download Codes**: After generating the codes, click the "Download Codes" button to download them as a JSON file.
3. **Create Merkle Tree**: Click the "Generate Merkle Tree" button to create a Merkle tree from the generated codes.
4. **Verify Codes**: Enter a code in the "Enter code to verify" input field and click the "Verify Code" button to check if the code is valid.

## Technologies Used
- React
- MerkleTree (merkletreejs)
- crypto-js
- CSS

## Author
PunkBull
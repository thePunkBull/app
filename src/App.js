import React, { useState } from 'react';
import MerkleTree from 'merkletreejs';
import sha256 from 'crypto-js/sha256';
import CryptoJS from 'crypto-js';
import { Buffer } from 'buffer';
import './App.css';

window.Buffer = Buffer;

function App() {
  const [numCodes, setNumCodes] = useState(5);
  const [codes, setCodes] = useState([]);
  const [root, setRoot] = useState('');
  const [tree, setTree] = useState(null);
  const [codeToCheck, setCodeToCheck] = useState('');
  const [verificationResult, setVerificationResult] = useState(null);

  const generateRandomCode = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    let lettersCount = 0;
    let numbersCount = 0;

    for (let i = 0; i < 6; i++) {
      const randomChar = characters.charAt(Math.floor(Math.random() * characters.length));
      result += randomChar;

      if (isNaN(parseInt(randomChar, 10))) {
        lettersCount += 1;
      } else {
        numbersCount += 1;
      }
    }

    if (lettersCount === 6 || numbersCount === 6) {
      return generateRandomCode();
    }

    return result;
  };

  const generateCodes = () => {
    const generatedCodes = Array.from({ length: numCodes }, generateRandomCode);
    setCodes(generatedCodes);
    setRoot('');
    setTree(null);
  };

  const generateMerkleTree = () => {
    const leaves = codes.map(x => Buffer.from(sha256(x).toString(CryptoJS.enc.Hex), 'hex'));
    const tree = new MerkleTree(leaves, sha256, { sortPairs: true });
    const root = tree.getRoot().toString('hex');
    setRoot(root);
    setTree(tree);
  };

  const verifyCode = () => {
    if (tree) {
      const leaf = Buffer.from(sha256(codeToCheck).toString(CryptoJS.enc.Hex), 'hex');
      const proof = tree.getProof(leaf);
      const isValid = tree.verify(proof, leaf, tree.getRoot());
      setVerificationResult(isValid);
    } else {
      setVerificationResult(null);
    }
  };

  const downloadCodes = () => {
    const formattedCodes = codes.map((code, index) => ({
      ID: index + 1,
      Code: code,
      Available: true,
      WalletAddress: ""
    }));
    const data = JSON.stringify(formattedCodes, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'codes.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="container">
      <div>
        <input
          className="input"
          type="number"
          value={numCodes}
          onChange={(e) => setNumCodes(Math.min(2000, Math.max(1, parseInt(e.target.value, 10))))}
        />
        <button className="button" onClick={generateCodes}>Generate Codes</button>
        {codes.length > 0 && (
          <button className="button" onClick={downloadCodes}>Download Codes</button>
        )}
        {!tree && codes.length > 0 && (
          <button className="button" onClick={generateMerkleTree}>Generate Merkle Tree</button>
        )}
      </div>
      {root && <div className="root-display">Root: {root}</div>}
      <div>
        <input
          className="code-input"
          type="text"
          value={codeToCheck}
          onChange={(e) => setCodeToCheck(e.target.value)}
          placeholder="Enter code to verify"
        />
        <button className="button" onClick={verifyCode}>Verify Code</button>
      </div>
      <div className="verification-result">
        {verificationResult !== null && (
          <span>{verificationResult ? 'Code is valid!' : 'Code is invalid!'}</span>
        )}
      </div>
    </div>
  );
}

export default App;

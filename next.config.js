const fs = require('fs');

const isProduction = process.env.NODE_ENV === 'production';

let nearampPrivateKey;

if (isProduction) {
  try {
    const syncDataBuffer = fs.readFileSync('.env.private_key', 'utf8');
    if (syncDataBuffer) {
      nearampPrivateKey = syncDataBuffer.replace(/_/g, '\n');
    }
  } catch (e) {
    console.log(`Warning reading file .env.private_key`);
  }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: isProduction
    ? {
        NEARAMP_PRIVATE_KEY: nearampPrivateKey,
      }
    : {},
};

module.exports = nextConfig;

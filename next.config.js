const fs = require('fs');
const { withSentryConfig } = require('@sentry/nextjs');

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

const sentryWebpackPluginOptions = {
  silent: true,
};

// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins
module.exports = isProduction
  ? withSentryConfig(nextConfig, sentryWebpackPluginOptions)
  : nextConfig;

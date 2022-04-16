const fs = require('fs');
const { withSentryConfig } = require('@sentry/nextjs');

const isProduction = process.env.NODE_ENV === 'production';

const env = {};

if (process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview') {
  env.NEXT_PUBLIC_HOST = `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
}

if (process.env.NEXT_PUBLIC_VERCEL_ENV === 'production') {
  env.NEXT_PUBLIC_HOST = `https://${process.env.HOST}`;
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env,
};

const sentryWebpackPluginOptions = {
  silent: true,
  authToken: process.env.SENTRY_AUTH_TOKEN,
  org: process.env.SENTRY_ORG_SLUG,
  project: process.env.SENTRY_PROJECT_ID,
};

// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins
module.exports = isProduction
  ? withSentryConfig(nextConfig, sentryWebpackPluginOptions)
  : nextConfig;

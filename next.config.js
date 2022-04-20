const fs = require('fs');
const { withSentryConfig } = require('@sentry/nextjs');

const env = {};

// this context corresponds to the previews we build for pull/merge requests.
if (process.env.CONTEXT === 'deploy-preview') {
  // DEPLOY_PRIME_URL representS the primary URL for an individual deploy, or a group of them, like branch deploys and Deploy Previews
  env.NEXT_PUBLIC_HOST = `https://${process.env.DEPLOY_PRIME_URL}`;
}

// this context corresponds to the main branch builds
const isProductionContext = process.env.CONTEXT === 'production';

if (isProductionContext) {
  // URL corresponds to the main url of the project
  env.NEXT_PUBLIC_HOST = `https://${process.env.URL}`;
}

// for dev env, set the NEXT_PUBLIC_HOST in the .env.development.local file itself

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

// if SITE_NAME is ambassadors-dao, it is production, i.e. on mainnet
// if SITE_NAME is ambassadors-dao-dev, it is development, i.e. on testnet
const isMainnetSite = process.env.SITE_NAME === 'ambassadors-dao';

// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins
module.exports =
  isProductionContext && isMainnetSite
    ? withSentryConfig(nextConfig, sentryWebpackPluginOptions)
    : nextConfig;

#!/usr/bin/env bash
# Check if we're running in a Netlify environment
# See https://www.netlify.com/docs/continuous-deployment/#environment-variables
# This line is for testing
# export DEPLOY_PRIME_URL="yes" 
if [ ! -z "${DEPLOY_PRIME_URL}" ]; then
  echo "Running netlify-setup.sh"
  echo -e "${NEARAMP_PRIVATE_KEY}" > .env.private_key
  
  chmod og-rwx .env.private_key
fi;
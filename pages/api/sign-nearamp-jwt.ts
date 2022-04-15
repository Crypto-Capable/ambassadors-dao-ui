import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import { withSentry } from '@sentry/nextjs';

const PRIVATE_KEY = JSON.parse(process.env.NEARAMP_PRIVATE_KEY).privateKey; // RSA Private Key

function generateJWT() {
  // valid for 10 minutes = 600 seconds
  const exp = Math.floor(Date.now() / 1000) + 600; // token expiry window
  const token = jwt.sign({ exp }, PRIVATE_KEY, { algorithm: 'RS256' });
  return token;
}

// to make our DAO invite only, we can ask for a referral token and verify if it exists
// if yes, send the JWT otherwise send an empty response.
const signNearampJWT = (_: NextApiRequest, res: NextApiResponse) => {
  res.status(200).send(JSON.stringify(generateJWT()));
};

export default withSentry(signNearampJWT);

import logger from '@/logger';
import { createHash, createHmac } from 'crypto';

const { VERCEL_URL, QSTASH_TOKEN } = process.env;

const qStashCall = async (
  body: any,
  initalDelay: string = '10s',
  timeout: string = '60000'
) => {
  console.log('here too')
  try {
    const callbackUrl = `https://${VERCEL_URL}/api/webhooks/qstash`;
    const response = await fetch(
      `https://qstash.upstash.io/v1/publish/${callbackUrl}`,
      {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${QSTASH_TOKEN}`,
          'Upstash-Timeout': timeout,
          'Upstash-delay': initalDelay,
          'Upstash-Content-Based-Deduplication': 'true',
          'Upstash-Retries': '2'
        }),
        body: JSON.stringify({
          body
        })
      }
    );
    console.log(response, 'response from qstash')
    if (response.status !== 201) {
      const error = await response.json();
      throw new Error(error.detail);
    }

    const json = await response.json();
    console.log(json, 'json from qstash')
    return json;
  } catch (error) {
    console.log(error, 'error from qstash')
    logger.error(error, `QStash send error for ${body.url}`);
  }
};

function verify(
  jwt: string,
  signingKey: string,
  body: string | null,
  url: string
): void {
  const split = jwt.split('.');
  if (split.length != 3) {
    throw new Error('Invalid JWT');
  }
  const [header, payload, signature] = split;

  if (
    signature !=
    createHmac('sha256', signingKey)
      .update(`${header}.${payload}`)
      .digest('base64url')
  ) {
    throw new Error('Invalid JWT signature');
  }
  // Now the jwt is verified and we can start looking at the claims in the payload
  const p: {
    sub: string;
    iss: string;
    exp: number;
    nbf: number;
    body: string;
  } = JSON.parse(Buffer.from(payload, 'base64url').toString());

  if (p.iss !== 'Upstash') {
    throw new Error(`invalid issuer: ${p.iss}, expected "Upstash"`);
  }
  if (p.sub !== url) {
    throw new Error(`invalid subject: ${p.sub}, expected "${url}"`);
  }

  const now = Math.floor(Date.now() / 1000);
  if (now > p.exp) {
    throw new Error('token has expired');
  }
  if (now < p.nbf) {
    throw new Error('token is not yet valid');
  }

  if (body != null) {
    if (
      p.body.replace(/=+$/, '') !=
      createHash('sha256').update(body).digest('base64url')
    ) {
      throw new Error('body hash does not match');
    }
  }
}

const verifyQstashSignature = (
  signature: string,
  currentSigningKey: string,
  nextSigningKey: string,
  bodyString: string,
  url: string
) => {
  try {
    // Try to verify the signature with the current signing key and if that fails, try the next signing key
    // This allows you to roll your signing keys once without downtime
    try {
      verify(signature, currentSigningKey, bodyString, url);
    } catch (err) {
      console.error(
        `Failed to verify signature with current signing key: ${err}`
      );
      verify(signature, nextSigningKey, bodyString, url);
    }
  } catch (err) {
    console.error(`Failed to verify signature with next signing key: ${err}`);
    throw new Error('Invalid signature');
  }
};


export { qStashCall, verifyQstashSignature };

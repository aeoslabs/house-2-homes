import logger from '@/logger';

const { VERCEL_URL, EDGE_FUNCTION_API_KEY } = process.env;
const FUNCTION_DOMAIN = VERCEL_URL
  ? `https://${VERCEL_URL}`
  : 'http://localhost:3000';
const X_API_KEY = String(EDGE_FUNCTION_API_KEY) || '';

type AcceptedPaths =
  | 'generate-background'
  | 'subject-workflow'
  | 'store-subject'
  | 'generate-background-sync'
  | 'upscale-sync'
  | 'asset-error'
  | 'generate-thumbnail'
  | 'v2/generation-workflow';

const edgeClientPost = async (
  path: AcceptedPaths,
  body: Record<string, any>
) => {
  try {
    const data = await fetch(`${FUNCTION_DOMAIN}/api/${path}`, {
      headers: {
        'x-api-key': X_API_KEY,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(body)
    });

    const json = await data.json();

    return json;
  } catch (error) {
    logger.error(error, 'Edge fetch error');
    throw error;
  }
};

export const edgeClientPostFullUrl = async (
  url: string,
  body: Record<string, any>
) => {
  try {
    const data = await fetch(url, {
      headers: {
        'x-api-key': X_API_KEY,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(body)
    });

    const json = await data.json();

    return json;
  } catch (error) {
    logger.error(error, 'Edge fetch error');
    throw error;
  }
};

export default edgeClientPost;

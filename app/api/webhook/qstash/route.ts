import logger from '@/logger';
import { edgeClientPostFullUrl } from '@/utils/edge-client-post';
import { verifyQstashSignature } from '@/utils/qstash';
import { NextResponse } from 'next/server';

const { QSTASH_CURRENT_SIGNING_KEY, QSTASH_NEXT_SIGNING_KEY, VERCEL_URL } =
  process.env;

export async function POST(req: Request) {
  try {
    const signature = req.headers.get('upstash-signature')!;
    const currentSigningKey = String(QSTASH_CURRENT_SIGNING_KEY);
    const nextSigningKey = String(QSTASH_NEXT_SIGNING_KEY);
    const bodyString = await req.text();
    const currentUrl = `https://${VERCEL_URL}/api/webhooks/qstash`;

    verifyQstashSignature(
      signature,
      currentSigningKey,
      nextSigningKey,
      bodyString,
      currentUrl
    );

    const {
      body: { url, ...rest }
    } = JSON.parse(bodyString);

    const upstashRetryCount = Number(req.headers.get('Upstash-Retried')) + 1;

    logger.info(
      {
        url,
        upstashRetryCount
      },
      '/api/webhooks/qstash endpoint hit'
    );

    await edgeClientPostFullUrl(url, rest);

    return NextResponse.json({ success: true, message: 'Success' });
  } catch (error) {
    logger.error(error, '/api/webhook/qstash endpoint error');
    return NextResponse.json(
      { success: false, message: 'Something went wrong' },
      {
        status: 500
      }
    );
  }
}

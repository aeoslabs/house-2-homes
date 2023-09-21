import logger from '@/logger';
import { NextResponse } from 'next/server';

export function GET(req: Request) {
  logger.error(req.url, '/api/error endpoint hit');
  const body = { success: false, message: 'Error' };
  return NextResponse.json(body, { status: 500 });
}
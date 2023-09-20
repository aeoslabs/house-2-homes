import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

import type { NextRequest } from 'next/server'


export async function middleware(req: NextRequest) {
    const res = NextResponse.next()
    const supabase = createMiddlewareClient({ req, res })
    await supabase.auth.getSession()
    return res
}


// // middleware.ts
// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';
// import { supabaseAdmin } from './utils/supabase-admin-client';

// export const middleware = async (request: NextRequest) => {
//     const ipFromCloudflare = request.headers.get('cf-connecting-ip');

//     if (
//         request.nextUrl.pathname.startsWith('/api/webhooks') ||
//         request.nextUrl.pathname.startsWith('/api/stripe') ||
//         request.nextUrl.pathname.startsWith('/api/cron')
//     ) {
//         return NextResponse.next();
//     }

//     if (
//         request.nextUrl.pathname.startsWith('/api/generate-background') ||
//         request.nextUrl.pathname.startsWith('/api/subject-workflow') ||
//         request.nextUrl.pathname.startsWith('/api/store-subject') ||
//         request.nextUrl.pathname.startsWith('/api/generate-background-sync') ||
//         request.nextUrl.pathname.startsWith('/api/upscale-sync') ||
//         request.nextUrl.pathname.startsWith('/api/asset-error') ||
//         request.nextUrl.pathname.startsWith('/api/generate-thumbnail') ||
//         request.nextUrl.pathname.startsWith('/api/ai-text/create-all') ||
//         request.nextUrl.pathname.startsWith('/api/ai-text/download-text') ||
//         request.nextUrl.pathname.startsWith('/api/ai-text/create-masked') ||
//         request.nextUrl.pathname.startsWith('/api/v2/generation-workflow')
//     ) {
//         const authHeader = request.headers.get('x-api-key');
//         if (authHeader === String(process.env.EDGE_FUNCTION_API_KEY)) {
//             return NextResponse.next();
//         }
//         return NextResponse.rewrite(new URL('/api/error', request.url));
//     }

//     const authHeader = request.headers.get('Authorization');
//     const requestHeaders = new Headers(request.headers);

//     if (request.nextUrl.pathname.startsWith('/api/get-region')) {
//         requestHeaders.set('cf-connecting-ip', ipFromCloudflare || '');
//         return NextResponse.next();
//     }

//     if (authHeader) {
//         const jwt = authHeader.replace('Bearer ', '');
//         const { data, error } = await supabaseAdmin.auth.getUser(jwt);

//         if (error) {
//             return NextResponse.rewrite(new URL('/api/error', request.url));
//         }

//         const id = data.user?.id || '';
//         const email = data.user?.email || '';

//         requestHeaders.set('x-uid', id);
//         requestHeaders.set('x-email', email);

//         const response = NextResponse.next({
//             request: {
//                 headers: requestHeaders
//             }
//         });
//         return response;
//     }

//     return NextResponse.rewrite(new URL('/api/error', request.url));
// };

// // See "Matching Paths" below to learn more
// export const config = {
//     matcher: '/api/:path*'
// };


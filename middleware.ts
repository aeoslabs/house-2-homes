import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import type { Database } from "@/types/supabase";

export async function middleware(req: NextRequest) {

    // Error, Signin, Webhook routes
    if (['/api/error', '/signin'].includes(req.nextUrl.pathname) || req.nextUrl.pathname.startsWith('/api/webhooks')) {
        return NextResponse.next();
    }

    // Internal call to another API route
    if (req.nextUrl.pathname === '/api/data') {
        const authHeader = req.headers.get('x-api-key');
        if (authHeader === String(process.env.EDGE_FUNCTION_API_KEY)) {
            return NextResponse.next();
        }
        return NextResponse.rewrite(new URL('/api/error', req.url));
    }

    // Handle Supabase authentication.
    const res = NextResponse.next();
    const supabase = createMiddlewareClient<Database>({ req, res });
    const requestHeaders = new Headers(req.headers);

    let session;
    try {
        const { data, error } = await supabase.auth.getSession();

        if (error) {
            console.error(error);
            return NextResponse.rewrite(new URL('/api/error', req.url));
        }

        session = data?.session;

    } catch (err) {
        console.error(err);
        return NextResponse.rewrite(new URL('/api/error', req.url));
    }

    const id = session?.user?.id || '';
    const email = session?.user?.email || '';

    requestHeaders.set('x-uid', id);
    requestHeaders.set('x-email', email);
    await supabase.auth.getSession();
    return NextResponse.next({
        request: {
            headers: requestHeaders
        }
    });
}
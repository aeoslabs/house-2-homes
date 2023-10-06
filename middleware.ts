import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import type { Database } from "@/types/supabase";

export async function middleware(req: NextRequest) {
    // Error, Signin, Webhook routes
    if (['/api/error', '/signin', '/webhook'].includes(req.nextUrl.pathname)) {
        return NextResponse.next();
    }


    if (
        req.nextUrl.pathname.startsWith('/api/replicatee')
    ) {
        const authHeader = req.headers.get('x-api-key');
        if (authHeader === String(process.env.EDGE_FUNCTION_API_KEY)) {
            return NextResponse.next();
        }
        return NextResponse.rewrite(new URL('/api/error', req.url));
    }
    // Handle Supabase authentication.

    const requestHeaders = new Headers(req.headers);

    const res = NextResponse.next();
    const supabase = createMiddlewareClient<Database>({ req, res });

    let session;


    const { data, error } = await supabase.auth.getSession();

    if (error) {
        await supabase.auth.getSession();
        return res;
    }
    session = data?.session;

    const id = session?.user?.id || '';
    const email = session?.user?.email || '';

    requestHeaders.set('x-uid', id);
    requestHeaders.set('x-email', email);

    const response = NextResponse.next({
        request: {
            headers: requestHeaders
        }
    });

    return response;

}


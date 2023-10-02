import { headers } from "next/headers";

export function extractUserDetailsFromHeaders() {
    const headersList = headers();
    
    return {
        userId: headersList.get('x-uid') as string,
        userEmail: headersList.get('x-email') as string
    };
}
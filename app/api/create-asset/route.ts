import logger from '@/logger';
import { supabaseAdmin, supabaseStorage, } from '@/app/supabase-admin-client';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { extractUserDetailsFromHeaders } from '@/utils/server-helpers';
import { v4 } from 'uuid';


type Data = {
    success: boolean;
    message?: string;
    data?: any;
};

function base64ToBlob(base64, mimeType) {
    // Decode the Base64 string
    const byteCharacters = atob(base64);

    // Generate byte numbers for every byte in the string
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    // Convert byte numbers into an Uint8Array
    const byteArray = new Uint8Array(byteNumbers);

    // Generate a Blob from the Uint8Array with the provided MIME type
    return new Blob([byteArray], { type: mimeType });
}

export async function POST(req: Request) {

    const { image: base64String } = await req.json()

    const mimeType = base64String.split(",")[0].split(":")[1].split(";")[0];
    const base64Data = base64String.split(",")[1];


    const blob = base64ToBlob(base64Data, mimeType);

    try {
        if (!req.headers) {
            throw new Error("Headers are not defined.");
        }
        const { userId, userEmail } = extractUserDetailsFromHeaders();

        // Ensure we have the user details from middleware headers
        if (!userId || !userEmail) {
            throw new Error('User not authenticated');
        }


        //const assetPath = await uploadImage(userId, blob, mimeType)
        const assetPath = `${userId}/assets/${v4()}`;
        const { error: uploadError } = await supabaseStorage.upload(assetPath, blob, {
            contentType: mimeType,
            cacheControl: '3600',
        });
        if (uploadError) {
            throw new Error(uploadError.message);
        }

        const { data: signedData, error: signError } =
            await supabaseStorage.createSignedUrl(
                assetPath,
                60 * 60 * 24 * 365 // 1 year
            );

        if (signError) {
            throw new Error(signError.message);
        }

        const { data: assetData, error: assetError } = await supabaseAdmin
            .from('assets')
            .insert({
                user_id: userId,
                url: signedData.signedUrl
            }).select().single()

        if (assetError || !assetData) {
            logger.error(
                {
                    error: assetError,
                    data: assetData
                },
                'error in /api/upload-assets'
            );
            throw new Error('Something went wrong');
        }


        return NextResponse.json(
            {
                success: true,
                message: 'Asset added successfully',
                data: assetData
            },
            {
                status: 200
            }
        );

    } catch (error: any) {
        logger.error(error, 'error in /api/upload-assets');
        return NextResponse.json(
            {
                success: false,
                message: error.message
            }, { status: 500 }

        )
    }

}


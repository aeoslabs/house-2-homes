import { NextResponse } from "next/server";
import logger from "@/logger";
import { supabaseAdmin, supabaseStorage, updateGenerationStatus } from "@/app/supabase-admin-client";
import { v4 } from "uuid";

export async function POST(req: Request, { params }: { params: { id: string } }) {
    console.log('params', req.method, req.url)
    if (req.method !== "POST") {
        return sendErrorResponse("Method not allowed", 405);
    }

    const { id } = params

    const body = await req.json();

    if (!id) {
        logger.error(
            {
                url: req.url
            },
            '/api/webhook/[id] endpoint No id provided'
        );
        return sendErrorResponse("No id provided", 400);
    }


    if (body.status !== 'succeeded') {
        const { data: generationsData, error: generationsError } = await updateGenerationStatus(id, body.status)

        if (generationsError) {
            logger.error({ generationsError, generationsData }, 'error in /api/callback');
            throw new Error('Something went wrong while getting an image');
        }
    }

    const output = body.output[1] || body.output[0]

    if (output) {
        try {
            const { data: generationsData, error: generationsError } =
                await supabaseAdmin
                    .from('generations')
                    .select('*')
                    .eq('id', id)
                    .single();

            if (generationsError || !generationsData) {
                logger.error(
                    { generationsError, generationsData },
                    'Error fetching generation'
                );
                throw new Error('Error fetching generation');
            }

            console.log('generationsData', generationsData)
            if (generationsData && generationsData.status === 'succeeded') {
                logger.info({ id }, 'Skipping processing of already processed image');
                return NextResponse.json({
                    success: true,
                    message: "Image already processed",
                    body: { generationId: id }
                });
            }

            const userId = generationsData.user_id;

            const image = await fetch(output);
            const blob = await image.blob();

            const assetPath = `${userId}/generations/${v4()}`;
            console.log('assetPath', assetPath)
            const { error: uploadError } = await supabaseStorage.upload(assetPath, blob, {
                contentType: 'image/png',
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

            const { data: generationsUpdateData, error: generationsUpdateError } = await supabaseAdmin
                .from('generations')
                .update({
                    status: 'succeeded',
                    url: signedData.signedUrl,
                })
                .eq('id', id)
                .select('*').single()

            if (generationsUpdateError) {
                logger.error({ generationsUpdateError, generationsUpdateData }, 'error in /api/callback');
                throw new Error('Something went wrong while saving the image URL');
            }

            return NextResponse.json({
                success: true, message: "Image URL saved successfully", body: {
                    generationId: generationsUpdateData?.id
                }
            });
        }
        catch (error: any) {
            logger.error(error, 'error in /api/callback');
            return sendErrorResponse(error.message, 500);
        }
    }
}

function sendErrorResponse(message: string, status: number) {
    return NextResponse.json({ success: false, message }, { status });
}


import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { cookies } from 'next/headers';
import logger from "@/logger";
import { NextApiRequest } from "next";
import { supabaseAdmin, updateGenerationStatus } from "@/app/supabase-admin-client";

export async function POST(req: Request, { params }: { params: { id: string } }) {

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

    if (!isValidOutput(body)) {
        return sendErrorResponse("Invalid output format in the body", 400);
    }

    if (body.status !== 'success') {
        const { data: generationsData, error: generationsError } = await updateGenerationStatus(id, body.status)
        console.log(generationsData.id);
        if (generationsError) {
            logger.error({ generationsError, generationsData }, 'error in /api/callback');
            throw new Error('Something went wrong while getting an image');
        }
    }

    try {

        const { data: generationsData, error: generationsError } = await supabaseAdmin
            .from('generations')
            .update({
                status: 'success',
                url: body.output[1],
            })
            .eq('id', id)
            .select('*')

        if (generationsError) {
            logger.error({ generationsError, generationsData }, 'error in /api/callback');
            throw new Error('Something went wrong while saving the image URL');
        }

        return NextResponse.json({
            success: true, message: "Image URL saved successfully", body: {
                generationId: generationsData[0]?.id
            }
        });
    } catch (error: any) {
        logger.error(error, 'error in /api/callback');
        return sendErrorResponse(error.message, 500);
    }


}

function sendErrorResponse(message: string, status: number) {
    return NextResponse.json({ success: false, message }, { status });
}

function isValidOutput(body: any): boolean {
    return body.output && typeof body.output[1] === 'string';
}

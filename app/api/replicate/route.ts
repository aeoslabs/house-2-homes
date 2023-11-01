import { replicatePost } from "@/app/replicate-client";
import { supabaseAdmin } from "@/app/supabase-admin-client";
import logger from "@/logger";
import { RateLimitError } from "@/utils/custom-errors";
import { qStashCall } from "@/utils/qstash";
import { extractUserDetailsFromHeaders } from "@/utils/server-helpers";
import { NextResponse } from "next/server";

const {
  VERCEL_URL,
} = process.env;

export async function POST(req: Request) {
  console.log('req', req)
  // if (req.method !== "POST") {
  //   return NextResponse.json({
  //     success: false,
  //     message: "Method not allowed",
  //     status: 405
  //   });
  // }

  if (!req.headers) {
    throw new Error("Headers are not defined.");
  }
  const { userId, userEmail } = extractUserDetailsFromHeaders();

  // Ensure we have the user details from middleware headers
  if (!userId || !userEmail) {
    throw new Error('User not authenticated');
  }

  const body = await req.json();
  const { model, modelName, image, prompt, n_prompt, image_resolution } = body;
  const { data: generationsData, error: generationsError } = await supabaseAdmin
    .from('generations')
    .insert([{
      user_id: userId,
      status: "pending",
      reference_img_url: image,
      prompt
    }]).select("id").single()

  if (generationsError) {
    console.error("Error:", generationsError);
    return NextResponse.json({
      success: false,
      message: "Something went wrong",
    });
  }

  const webhook = {
    url: `https://${VERCEL_URL}/api/webhook/${generationsData.id}`,
    events: ["completed"],
  };

  try {

    const predictionResponse = await replicatePost(
      String(model),
      modelName,
      {
        image,
        prompt,
        n_prompt,
        image_resolution: '768',
        detect_resolution: '768',
        ddim_steps: 20,
        strength: 0.5,
      },
      webhook
    );
    return NextResponse.json({
      success: true,
      message: `${predictionResponse.status} prediction`,
      generationId: generationsData.id,
    });
  } catch (error) {
    if (error instanceof RateLimitError) {
      console.log('here')
      logger.info(
        error,
        "Rate limit error"
      );

      const qstashBody = {
        ...req.body,
        url: `https://${VERCEL_URL}/api/replicate`
      };
      await qStashCall(qstashBody);
    }

    return NextResponse.json({
      success: false,
      message: "Something went wrong",
    });
  }
}

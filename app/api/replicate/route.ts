import { getPredictionFromPolling, replicatePost } from "@/app/replicate-client";
import { supabaseAdmin } from "@/app/supabase-admin-client";
import { extractUserDetailsFromHeaders } from "@/utils/server-helpers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {

  if (req.method !== "POST") {
    return NextResponse.json({
      success: false,
      message: "Method not allowed",
    });
  }

  if (!req.headers) {
    throw new Error("Headers are not defined.");
  }
  const { userId, userEmail } = extractUserDetailsFromHeaders();

  // Ensure we have the user details from middleware headers
  if (!userId || !userEmail) {
    throw new Error('User not authenticated');
  }

  const body = await req.json();
  const { model, image, prompt, n_prompt } = body;
  console.log(body, "body");
  const { data: generationsData, error: generationsError } = await supabaseAdmin
    .from('generations')
    .insert([{
      user_id: userId,
      status: "pending",
      reference_img_url: image,
      prompt
    }]).select("id").single()

  if (generationsError) {
    console.log(generationsError, "generationsError");
    return NextResponse.json({
      success: false,
      message: "Something went wrong",
    });
  }

  const webhook = {
    url: `https://cd75-116-75-117-27.ngrok-free.app/api/webhook/${generationsData.id}`,
    events: ["completed"],
  };

  try {
    const predictionResponse = await replicatePost(
      String(model),
      {
        image,
        prompt,
        n_prompt,
      },
      webhook
    );
    console.log(predictionResponse)
    return NextResponse.json({
      success: true,
      message: `${predictionResponse.status} prediction`,
      generationId: generationsData.id,
    });
  } catch (error) {
    console.log(error, "err");
    return NextResponse.json({
      success: false,
      message: "Something went wrong",
    });
  }
}

import { Database } from "@/types/supabase";
import { createClient } from "@supabase/supabase-js";

const bucket = process.env.NEXT_PUBLIC_SUPABASE_BUCKET || "";

// Note: supabaseAdmin uses the SERVICE_ROLE_KEY which you must only use in a secure server-side context
// as it has admin privileges and overwrites RLS policies!

export const supabaseAdmin = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.SUPABASE_SERVICE_ROLE_KEY || "",
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  }
);

export const supabaseStorage = supabaseAdmin.storage.from(bucket);

async function updateGenerationStatus(
  id: string,
  status: string,
  url?: string
) {
  const statusUpdate = { status };
  const urlUpdate = { status, url };

  const response = await supabaseAdmin
    .from("generations")
    .update(url ? urlUpdate : statusUpdate)
    .eq("id", id)
    .select("*")
    .single();

  return response;
}

export { updateGenerationStatus };

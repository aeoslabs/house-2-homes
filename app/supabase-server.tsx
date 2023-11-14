// import { Database } from "@/types_db";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { cache } from "react";
// import { supabaseAdmin } from "@/utils/supabase-admin";

export const createServerSupabaseClient = cache(() =>
  createServerComponentClient({ cookies })
);

export async function getSession() {
  const supabase = createServerSupabaseClient();
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    return session;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

export async function getUserDetails() {
  const supabase = createServerSupabaseClient();
  try {
    const { data: userDetails } = await supabase
      .from("users")
      .select("*")
      .single();
    return userDetails;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

export const getAssetImages = async () => {
  const supabase = createServerSupabaseClient();

  const { data, error } = await supabase
    .from("assets")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return data ?? null;
};

export const getGenerationImages = async () => {
  const supabase = createServerSupabaseClient();

  const { data, error } = await supabase
    .from("generations")
    .select("*")
    .filter("status", "eq", "succeeded")
    .filter("url", "not.is", null)
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return data ?? null;
};

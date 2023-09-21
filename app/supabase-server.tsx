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

export async function getSubscription() {
  const supabase = createServerSupabaseClient();
  try {
    const { data: subscription } = await supabase
      .from("subscriptions")
      .select("*, prices(*, products(*))")
      .in("status", ["trialing", "active"])
      .single()
      .throwOnError();
    return subscription;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

export const getActiveProductsWithPrices = async () => {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from("products")
    .select("*, prices(*)")
    .eq("active", true)
    .eq("prices.active", true)
    .order("metadata->index")
    .order("unit_amount", { foreignTable: "prices" });

  if (error) {
    console.log(error.message);
  }
  return data ?? [];
};

export const getListOfIntegrations = async () => {
  const supabase = createServerSupabaseClient();

  const { data, error } = await supabase
    .from("integrations")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return data ?? [];
};

export const getIntegration = async (id: number) => {
  const supabase = createServerSupabaseClient();

  const { data, error } = await supabase
    .from("integrations")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw error;
  }

  return data ?? null;
};

export const getGeneratedImages = async () => {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from("images")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.log(error.message);
  }
  return data ?? [];
};

export const getDashboard = async (id: string) => {
  const supabase = createServerSupabaseClient();

  const { data, error } = await supabase
    .from("dashboards")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw error;
  }

  return data ?? null;
};

export const getAllDashboards = async (userId: string) => {
  const supabase = createServerSupabaseClient();

  const { data, error } = await supabase
    .from("dashboards")
    .select("*")
    .eq("user_id", userId);

  if (error) {
    throw error;
  }

  return data ?? null;
};

export const getListOfUserIntegrations = async () => {
  const supabase = createServerSupabaseClient();

  const { data, error } = await supabase
    .from("user_integrations")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return data ?? [];
};

// export const getUserIntegration = async (id: string) => {
//   // Don't use the server client here because we need to decrypt the data
//   const { data, error } = await supabaseAdmin
//     .from("decrypted_user_integrations")
//     .select("*")
//     .eq("id", id)
//     .single();

//   if (error) {
//     throw error;
//   }

//   return data
//     ? {
//         ...data,
//         api_secret: data.decrypted_api_secret,
//         username: data.decrypted_username,
//         password: data.decrypted_password,
//       }
//     : null;
// };

export const getUserIntegrationsByIntegrationId = async (
  id: string,
  user_id: string
) => {
  const supabase = createServerSupabaseClient();

  const { data, error } = await supabase
    .from("user_integrations")
    .select("*")
    .eq("integration_id", id)
    .eq("user_id", user_id);

  if (error) {
    throw error;
  }

  return data ?? null;
};

export const getListOfMetrics = async () => {
  const supabase = createServerSupabaseClient();

  const { data, error } = await supabase
    .from("metrics")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return data ?? [];
};

export const getListOfUserMetrics = async (dashboardId: string) => {
  const supabase = createServerSupabaseClient();

  const { data, error } = await supabase
    .from("user_metrics")
    .select("id,name,metric_id,created_at,info,status,metrics(slug)")
    .eq("dashboard_id", dashboardId)
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return data ?? [];
};

export const getListOfStripeData = async () => {
  const supabase = createServerSupabaseClient();

  const { data, error } = await supabase
    .from("stripe_data")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return data ?? [];
};

export const getStripeDataByMetricId = async (metricId: string) => {
  const supabase = createServerSupabaseClient();

  const { data, error } = await supabase
    .from("stripe_data")
    .select("*")
    .eq("metric_id", metricId)
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return data ?? [];
};

export const getDashboardMetricData = async (
  metricId: string,
  integration_slug: string,
  start_date: string,
  end_date: string
) => {
  const supabase = createServerSupabaseClient();

  const { data, error } = await supabase
    .from(`${integration_slug}_data`)
    .select("date,value")
    .eq("metric_id", metricId)
    .gte("date", start_date)
    .lte("date", end_date)
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return data ?? [];
};

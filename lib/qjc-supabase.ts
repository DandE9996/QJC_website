import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ??
  "https://glwmhidielyxskiwenqb.supabase.co";

const supabasePublishableKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
  "sb_publishable_OQ1CvPw5CywswKmjsoaOVA_4n5D4D5F";

export const qjcSupabase = createClient(supabaseUrl, supabasePublishableKey, {
  db: {
    schema: "QJC_website",
  },
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

import { createClient } from "@supabase/supabase-js";

// Lazy initialization to prevent build-time errors when env vars aren't set
function getSupabase() {
  return createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export { getSupabase };

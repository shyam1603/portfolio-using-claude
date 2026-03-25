import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error(
    "Missing Supabase environment variables. Please check .env.local",
  );
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Contact form submission
export const submitContact = async (
  name: string,
  email: string,
  message: string,
) => {
  try {
    const ip = await fetch("https://api.ipify.org?format=json")
      .then((res) => res.json())
      .then((data) => data.ip)
      .catch(() => null);

    const { data, error } = await supabase.from("contacts").insert([
      {
        name,
        email,
        message,
        ip_address: ip,
        user_agent: navigator.userAgent,
      },
    ]);

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error("Error submitting contact:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};

// Fetch projects
export const fetchProjects = async () => {
  try {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("featured", true)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error("Error fetching projects:", error);
    return { success: false, error };
  }
};

// Get contact count (admin only)
export const getContactCount = async () => {
  try {
    const { count, error } = await supabase
      .from("contacts")
      .select("*", { count: "exact", head: true });

    if (error) throw error;
    return { success: true, count };
  } catch (error) {
    console.error("Error fetching contact count:", error);
    return { success: false, error };
  }
};

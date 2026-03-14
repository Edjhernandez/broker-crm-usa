import { createClient } from "@/lib/supabase/server";

export async function getUser() {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) return null;

  const { data: profile, error: dbError } = await supabase
    .from("users")
    .select("displayName, photoURL")
    .eq("id", user.id)
    .single();

  if (dbError || !profile) {
    // if there's an error fetching the profile, we can return a fallback user object
    const fallbackDisplayName = user.email ? user.email.split("@")[0] : "User";
    return {
      id: user.id,
      displayName: fallbackDisplayName,
      photoURL: null,
      email: user.email,
    };
  }

  return {
    ...profile,
    id: user.id,
    email: user.email,
  };
}

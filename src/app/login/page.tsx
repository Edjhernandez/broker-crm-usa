import { authOptions } from "@/lib/auth-options";
import LoginForm from "./LoginForm";

export default function LoginPage() {
  const googleEnabled = authOptions.providers.some((p) => p.id === "google");
  return <LoginForm googleEnabled={googleEnabled} />;
}

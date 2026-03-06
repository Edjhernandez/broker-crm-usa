import { NextResponse } from "next/server";
import {
  validateResetToken,
  consumeResetToken,
} from "@/lib/passwordResetTokens";

export async function POST(request: Request) {
  try {
    const { token, password } = await request.json();

    if (!token || !password) {
      return NextResponse.json(
        { message: "Token and password are required" },
        { status: 400 },
      );
    }

    const email = validateResetToken(token);
    if (!email) {
      return NextResponse.json(
        { message: "Invalid or expired reset token" },
        { status: 400 },
      );
    }

    // Lógica para producción:
    // 1. Obtener el usuario asociado al email.
    // 2. Hashear la nueva contraseña (ej. usando bcrypt).
    // 3. Actualizar la contraseña del usuario en la DB.

    consumeResetToken(token);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Reset password API error:", error);
    return NextResponse.json(
      { message: "Error updating password" },
      { status: 500 },
    );
  }
}

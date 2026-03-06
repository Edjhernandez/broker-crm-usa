import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createResetToken } from "@/lib/passwordResetTokens";

const resend = new Resend(process.env.RESEND_API_KEY || "re_dummy_key");

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 },
      );
    }

    if (!process.env.RESEND_API_KEY) {
      console.warn(
        "RESEND_API_KEY not configured. Simulating email send to",
        email,
      );
      return NextResponse.json({ success: true, simulated: true });
    }

    const token = createResetToken(email);
    const resetUrl = `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/reset-password?token=${token}`;

    await resend.emails.send({
      from: "Broker CRM <no-reply@brokercrm.local>",
      to: [email],
      subject: "Restablece tu contraseña - Broker CRM",
      html: `
        <h1>Restablecimiento de Contraseña</h1>
        <p>Has solicitado restablecer tu contraseña para Broker CRM.</p>
        <p>Haz clic en el siguiente enlace para continuar:</p>
        <p><a href="${resetUrl}">${resetUrl}</a></p>
        <p>Si no solicitaste este cambio, puedes ignorar este correo.</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Forgot password error:", error);
    return NextResponse.json(
      { message: "Error processing request" },
      { status: 500 },
    );
  }
}

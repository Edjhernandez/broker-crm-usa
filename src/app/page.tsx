"use client";

import { jsPDF } from "jspdf";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawingRef = useRef(false);
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [policyNumber, setPolicyNumber] = useState("");
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    context.lineCap = "round";
    context.lineJoin = "round";
    context.lineWidth = 2;
    context.strokeStyle = "#111827";
  }, []);

  const getCanvasPosition = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    return {
      x: (event.clientX - rect.left) * scaleX,
      y: (event.clientY - rect.top) * scaleY,
    };
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    isDrawingRef.current = true;
    canvas.setPointerCapture(event.pointerId);

    const { x, y } = getCanvasPosition(event);
    context.beginPath();
    context.moveTo(x, y);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const { x, y } = getCanvasPosition(event);
    context.lineTo(x, y);
    context.stroke();
  };

  const finishDrawing = () => {
    if (!isDrawingRef.current) return;
    isDrawingRef.current = false;
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    context.clearRect(0, 0, canvas.width, canvas.height);
  };

  const formatIsoUtc = (date: Date) => date.toISOString();

  const getAuditMetadata = async () => {
    try {
      const response = await fetch("/api/audit-metadata", {
        method: "GET",
        cache: "no-store",
      });

      if (!response.ok) {
        return {
          submissionIp: "not available",
          submissionIpVersion: "unknown",
          submissionIpSourceHeader: "none",
          userAgent: "not available",
          acceptLanguage: "not available",
          uaPlatform: "not available",
          uaClientHints: "not available",
          uaMobile: "not available",
          reviewedAtUtc: formatIsoUtc(new Date()),
        };
      }

      return (await response.json()) as {
        submissionIp: string;
        submissionIpVersion: string;
        submissionIpSourceHeader: string;
        userAgent: string;
        acceptLanguage: string;
        uaPlatform: string;
        uaClientHints: string;
        uaMobile: string;
        reviewedAtUtc: string;
      };
    } catch {
      return {
        submissionIp: "not available",
        submissionIpVersion: "unknown",
        submissionIpSourceHeader: "none",
        userAgent: "not available",
        acceptLanguage: "not available",
        uaPlatform: "not available",
        uaClientHints: "not available",
        uaMobile: "not available",
        reviewedAtUtc: formatIsoUtc(new Date()),
      };
    }
  };

  const generatePdf = async () => {
    const canvas = canvasRef.current;
    if (!canvas || isGeneratingPdf) return;

    setIsGeneratingPdf(true);

    try {
      const signatureDataUrl = canvas.toDataURL("image/png");
      const auditMetadata = await getAuditMetadata();
      const generatedAt = new Date();
      const pdf = new jsPDF({ unit: "mm", format: "a4" });

      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(16);
      pdf.text("Broker CRM - Signature Form", 20, 20);

      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(11);
      pdf.text(`Client Name: ${clientName || "-"}`, 20, 36);
      pdf.text(`Client Email: ${clientEmail || "-"}`, 20, 44);
      pdf.text(`Policy Number: ${policyNumber || "-"}`, 20, 52);

      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(10);
      pdf.text("Submission IP:", 20, 60);
      pdf.text("Date Application Reviewed:", 110, 60);

      pdf.setFont("helvetica", "normal");
      const ipLines = pdf.splitTextToSize(auditMetadata.submissionIp, 80);
      pdf.text(ipLines, 20, 66);
      pdf.text(auditMetadata.reviewedAtUtc, 110, 66);
      pdf.text(`Date PDF Generated: ${formatIsoUtc(generatedAt)}`, 20, 76);
      pdf.text(
        `IP Source: ${auditMetadata.submissionIpSourceHeader} (${auditMetadata.submissionIpVersion})`,
        20,
        82,
      );

      pdf.setFont("helvetica", "bold");
      pdf.text("User-Agent:", 20, 88);
      pdf.setFont("helvetica", "normal");
      const userAgentLines = pdf.splitTextToSize(auditMetadata.userAgent, 170);
      pdf.text(userAgentLines, 20, 94);

      const acceptLanguageTitleY = 94 + userAgentLines.length * 4 + 4;
      pdf.setFont("helvetica", "bold");
      pdf.text("Accept-Language:", 20, acceptLanguageTitleY);
      pdf.setFont("helvetica", "normal");
      const acceptLanguageLines = pdf.splitTextToSize(
        auditMetadata.acceptLanguage,
        170,
      );
      const acceptLanguageValueY = acceptLanguageTitleY + 6;
      pdf.text(acceptLanguageLines, 20, acceptLanguageValueY);

      const uaPlatformTitleY =
        acceptLanguageValueY + acceptLanguageLines.length * 4 + 4;
      pdf.setFont("helvetica", "bold");
      pdf.text("Sec-CH-UA-Platform:", 20, uaPlatformTitleY);
      pdf.setFont("helvetica", "normal");
      const uaPlatformLines = pdf.splitTextToSize(
        auditMetadata.uaPlatform,
        170,
      );
      const uaPlatformValueY = uaPlatformTitleY + 6;
      pdf.text(uaPlatformLines, 20, uaPlatformValueY);

      const uaClientHintsTitleY =
        uaPlatformValueY + uaPlatformLines.length * 4 + 4;
      pdf.setFont("helvetica", "bold");
      pdf.text("Sec-CH-UA:", 20, uaClientHintsTitleY);
      pdf.setFont("helvetica", "normal");
      const uaClientHintsLines = pdf.splitTextToSize(
        auditMetadata.uaClientHints,
        170,
      );
      const uaClientHintsValueY = uaClientHintsTitleY + 6;
      pdf.text(uaClientHintsLines, 20, uaClientHintsValueY);

      const uaMobileTitleY =
        uaClientHintsValueY + uaClientHintsLines.length * 4 + 4;
      pdf.setFont("helvetica", "bold");
      pdf.text("Sec-CH-UA-Mobile:", 20, uaMobileTitleY);
      pdf.setFont("helvetica", "normal");
      const uaMobileLines = pdf.splitTextToSize(auditMetadata.uaMobile, 170);
      const uaMobileValueY = uaMobileTitleY + 6;
      pdf.text(uaMobileLines, 20, uaMobileValueY);

      const signatureTop = uaMobileValueY + uaMobileLines.length * 4 + 8;

      pdf.setDrawColor(180);
      pdf.rect(20, signatureTop, 170, 55);
      pdf.setFontSize(10);
      pdf.text("Signature", 22, signatureTop + 5);

      pdf.addImage(
        signatureDataUrl,
        "PNG",
        24,
        signatureTop + 8,
        162,
        43,
        undefined,
        "FAST",
      );

      const safeName = (clientName || "client")
        .trim()
        .replace(/\s+/g, "-")
        .toLowerCase();
      pdf.save(`signature-form-${safeName}.pdf`);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  return (
    <main className="min-h-screen bg-zinc-50 p-6 text-zinc-900">
      <section className="mx-auto w-full max-w-3xl rounded-xl border border-zinc-200 bg-white p-6">
        <h1 className="text-xl font-semibold">Prueba de campo signature</h1>
        <p className="mt-2 text-sm text-zinc-600">
          Formulario demo para generar PDF con datos y firma.
        </p>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <label className="flex flex-col gap-1 text-sm">
            Nombre cliente
            <input
              type="text"
              value={clientName}
              onChange={(event) => setClientName(event.target.value)}
              className="rounded-md border border-zinc-300 px-3 py-2 outline-none focus:border-zinc-500"
              placeholder="Ej. Juan Pérez"
            />
          </label>
          <label className="flex flex-col gap-1 text-sm">
            Email cliente
            <input
              type="email"
              value={clientEmail}
              onChange={(event) => setClientEmail(event.target.value)}
              className="rounded-md border border-zinc-300 px-3 py-2 outline-none focus:border-zinc-500"
              placeholder="Ej. cliente@email.com"
            />
          </label>
          <label className="flex flex-col gap-1 text-sm sm:col-span-2">
            Número de póliza
            <input
              type="text"
              value={policyNumber}
              onChange={(event) => setPolicyNumber(event.target.value)}
              className="rounded-md border border-zinc-300 px-3 py-2 outline-none focus:border-zinc-500"
              placeholder="Ej. POL-2026-001"
            />
          </label>
        </div>

        <div className="mt-4 rounded-lg border border-dashed border-zinc-300 bg-zinc-50 p-3">
          <canvas
            ref={canvasRef}
            width={900}
            height={260}
            className="h-56 w-full rounded-md border border-zinc-300 bg-white touch-none"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={finishDrawing}
            onPointerLeave={finishDrawing}
            onPointerCancel={finishDrawing}
            aria-label="Área para firma manuscrita"
            aria-describedby="signature-instructions"
          />
          <p
            id="signature-instructions"
            className="mt-2 text-xs text-zinc-600"
          >
            Use el mouse, lápiz o el dedo para dibujar su firma en el recuadro
            anterior. Si no puede firmar aquí, continúe y firme el documento por
            otro medio.
          </p>
        </div>

        <div className="mt-4 flex gap-3">
          <button
            type="button"
            onClick={clearSignature}
            className="rounded-md border border-zinc-300 px-4 py-2 text-sm font-medium hover:bg-zinc-100"
          >
            Limpiar firma
          </button>
          <button
            type="button"
            onClick={generatePdf}
            disabled={isGeneratingPdf}
            className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isGeneratingPdf ? "Generando..." : "Generar PDF"}
          </button>
        </div>
      </section>
    </main>
  );
}

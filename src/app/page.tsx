"use client";

import { useEffect, useRef } from "react";

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawingRef = useRef(false);

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

  return (
    <main className="min-h-screen bg-zinc-50 p-6 text-zinc-900">
      <section className="mx-auto w-full max-w-3xl rounded-xl border border-zinc-200 bg-white p-6">
        <h1 className="text-xl font-semibold">Prueba de campo signature</h1>
        <p className="mt-2 text-sm text-zinc-600">
          Firma dentro del recuadro para validar cómo se ve el campo.
        </p>

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
          />
        </div>

        <div className="mt-4 flex gap-3">
          <button
            type="button"
            onClick={clearSignature}
            className="rounded-md border border-zinc-300 px-4 py-2 text-sm font-medium hover:bg-zinc-100"
          >
            Limpiar firma
          </button>
        </div>
      </section>
    </main>
  );
}

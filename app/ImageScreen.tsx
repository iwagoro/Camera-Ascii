"use client";

import { useContext, useEffect, useRef } from "react";
import { AsciiContext } from "./AsciiProvider";
import AsciiEffect from "./AsciiEffect/AsciiEffect";

export default function ImageScreen() {
    const { image, fontSize, bright, contrast, gamma, resolution } = useContext(AsciiContext);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        const image1 = new Image();
        image1.src = image || "";
        image1.onload = function initialize() {
            canvas.width = image1.width;
            canvas.height = image1.height;
            let effect = new AsciiEffect(ctx, canvas.width, canvas.height, image1, fontSize[0], bright[0], contrast[0], gamma[0]);
            effect.draw(resolution[0]);
        };
        return () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        };
    }, [image, fontSize, bright, contrast, gamma, resolution]);

    return (
        <div className="bg-black">
            <div style={{ display: "flex", justifyContent: "center" }}>
                <canvas ref={canvasRef} id="canvas1"></canvas>
            </div>
        </div>
    );
}

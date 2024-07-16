"use client";
import React, { useState, useRef, useContext, useEffect } from "react";
import Webcam from "react-webcam";
import { AsciiContext } from "./AsciiProvider";
import AsciiEffect from "./AsciiEffect/AsciiEffect";
export default function CameraScreen() {
    const { fontSize, bright, contrast, gamma, resolution } = useContext(AsciiContext);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const camera = useRef(null);
    const [image, setImage] = useState(null);

    useEffect(() => {
        const copyFrame = () => {
            const canvas = canvasRef.current;
            if (!canvas) return;
            const ctx = canvas.getContext("2d");
            if (!ctx) return;

            const video1 = document.getElementById("camera") as HTMLVideoElement;
            if (!video1) return;
            if (video1.videoWidth > 0 && video1.videoHeight > 0) {
                canvas.width = video1.videoWidth;
                canvas.height = video1.videoHeight;

                let effect = new AsciiEffect(ctx, canvas.width, canvas.height, video1, fontSize[0], bright[0], contrast[0], gamma[0]);
                effect.draw(resolution[0]);
            }
        };

        if (camera) {
            intervalRef.current = setInterval(copyFrame, 1000 / 30);
        }

        // Cleanup on unmount
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [fontSize, bright, contrast, gamma, resolution]);

    return (
        <div className="bg-black">
            <Webcam id="camera" className="w-1 h-1" />
            <canvas ref={canvasRef} id="canvas1" className="w-full h-full"></canvas>
        </div>
    );
}

"use client";

import { useContext, useEffect, useRef } from "react";
import { AsciiContext } from "./AsciiProvider";
import AsciiEffect from "./AsciiEffect/AsciiEffect";

export default function VideoScreen() {
    const { video, fontSize, bright, contrast, gamma, resolution } = useContext(AsciiContext);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const copyFrame = () => {
            const canvas = canvasRef.current;
            if (!canvas) return;
            const ctx = canvas.getContext("2d");
            if (!ctx) return;

            const video1 = document.getElementById("video") as HTMLVideoElement;
            if (!video1) return;
            if (video1.videoWidth > 0 && video1.videoHeight > 0) {
                canvas.width = video1.videoWidth;
                canvas.height = video1.videoHeight;

                let effect = new AsciiEffect(ctx, canvas.width, canvas.height, video1, fontSize[0], bright[0], contrast[0], gamma[0]);
                effect.draw(resolution[0]);
            }
        };

        if (video) {
            intervalRef.current = setInterval(copyFrame, 1000 / 30);
        }

        // Cleanup on unmount
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [video, fontSize, bright, contrast, gamma, resolution]);

    return (
        <div className="bg-black">
            <div style={{ display: "flex", justifyContent: "center" }}>
                <video id="video" src={video || ""} style={{ display: "none" }} autoPlay loop></video>
                <canvas ref={canvasRef} id="canvas1" className="w-full h-full"></canvas>
            </div>
        </div>
    );
}

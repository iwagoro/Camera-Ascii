"use client";
import React, { useState, useRef, useContext, useEffect } from "react";
import Webcam from "react-webcam";
import { AsciiContext } from "./AsciiProvider";
import AsciiEffect from "./AsciiEffect/AsciiEffect";

export default function CameraScreen() {
    const { on, fontSize, bright, contrast, gamma, resolution } = useContext(AsciiContext);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const camera = useRef(null);
    const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);
    const [smoothedVolume, setSmoothedVolume] = useState(0);
    const smoothingFactor = 0.5; // 0から1の範囲で、0に近いほどスムーズ

    useEffect(() => {
        const audioContext = new window.AudioContext();
        const analyserNode = audioContext.createAnalyser();
        analyserNode.fftSize = 256;

        setAnalyser(analyserNode);

        navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
            const source = audioContext.createMediaStreamSource(stream);
            source.connect(analyserNode);
        });

        return () => {
            audioContext.close();
        };
    }, []);

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

                if (analyser) {
                    const dataArray = new Uint8Array(analyser.fftSize);
                    analyser.getByteTimeDomainData(dataArray);

                    // 音量（振幅）の計算
                    const rms = Math.sqrt(dataArray.reduce((sum, value) => sum + (value - 128) ** 2, 0) / dataArray.length);

                    // 音量のなだらかな変化を計算（指数移動平均）
                    const smoothed = smoothedVolume * (1 - smoothingFactor) + rms * smoothingFactor;
                    setSmoothedVolume(smoothed);

                    // 音量に基づいて明るさを調整
                    const dynamicBright = bright[0] + smoothed / 16;
                    let effect = new AsciiEffect(ctx, canvas.width, canvas.height, video1, fontSize[0], dynamicBright, contrast[0], gamma[0]);
                    effect.draw(resolution[0]);
                }
            }
        };

        if (camera) {
            intervalRef.current = setInterval(copyFrame, 1000 / 30);
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [fontSize, bright, contrast, gamma, resolution, analyser, smoothedVolume]);

    return (
        <div className="bg-black h-full">
            {on ? (
                <div className="w-full h-full flex justify-center">
                    <Webcam ref={camera} id="camera" className="w-1 h-1" />

                    <canvas ref={canvasRef} id="canvas1" className="h-full"></canvas>
                </div>
            ) : null}
        </div>
    );
}

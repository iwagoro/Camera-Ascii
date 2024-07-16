"use client";
import React, { ChangeEvent, useContext } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { AsciiContext } from "./AsciiProvider";
import { useSearchParams } from "next/navigation";

const BRIGHT_MIN = 0;
const BRIGHT_MAX = 2;
const BRIGHT_STEP = 0.01;
const GAMMA_MIN = 0;
const GAMMA_MAX = 2;
const GAMMA_STEP = 0.01;
const RESOLUTION_MIN = 1;
const RESOLUTION_MAX = 200;
const FONTSIZE_MIN = 1;
const FONTSIZE_MAX = 100;

export default function Sliders() {
    const { image, setImage, video, setVideo, bright, setBright, gamma, setGamma, resolution, setResolution, fontSize, setFontSize } = useContext(AsciiContext);
    const searchParams = useSearchParams();
    const method = searchParams.get("method");

    const onUpload = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = (e: any) => {
            const base64 = e.currentTarget?.result as string;
            if (method === "image") setImage(base64);
            if (method === "video") setVideo(base64);
        };
        reader.readAsDataURL(file);
    };

    return (
        <div className="w-full h-full flex flex-col gap-5">
            <div>
                <Label>Upload Image</Label>
                <Input
                    type="file"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        onUpload(e);
                    }}
                />
            </div>
            <div>
                <Label>Bright</Label>
                <div className="flex items-center gap-2">
                    <Slider className="mt-2" min={BRIGHT_MIN} max={BRIGHT_MAX} value={bright} step={BRIGHT_STEP} onValueChange={(value) => setBright(value)} />
                    <span className="text-xl">{bright[0]}</span>
                </div>
            </div>
            <div>
                <Label>Gamma</Label>
                <div className="flex items-center gap-2">
                    <Slider className="mt-2" min={GAMMA_MIN} max={GAMMA_MAX} value={gamma} step={GAMMA_STEP} onValueChange={(value) => setGamma(value)} />
                    <span className="text-xl">{gamma[0]}</span>
                </div>
            </div>
            <div>
                <Label>Resolution</Label>
                <div className="flex items-center gap-2">
                    <Slider className="mt-2" min={RESOLUTION_MIN} max={RESOLUTION_MAX} value={resolution} onValueChange={(value) => setResolution(value)} />
                    <span className="text-xl">{resolution[0]}</span>
                </div>
            </div>
            <div>
                <Label>Font Size</Label>
                <div className="flex items-center gap-2">
                    <Slider className="mt-2" min={FONTSIZE_MIN} max={FONTSIZE_MAX} value={fontSize} onValueChange={(value) => setFontSize(value)} />
                    <span className="text-xl">{fontSize[0]}</span>
                </div>
            </div>
        </div>
    );
}

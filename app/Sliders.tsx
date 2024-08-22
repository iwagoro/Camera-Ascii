"use client";

import React, { useContext } from "react";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { AsciiContext } from "./AsciiProvider";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Input } from "@/components/ui/input";

// 環境変数を読み込むユーティリティ関数
const getEnvVariable = (key: string, defaultValue: number): number => {
    return process.env[key] ? parseFloat(process.env[key] as string) : defaultValue;
};

// 環境変数の読み込み
const BRIGHT_MIN = getEnvVariable("NEXT_PUBLIC_BRIGHT_MIN", 0);
const BRIGHT_MAX = getEnvVariable("NEXT_PUBLIC_BRIGHT_MAX", 2);
const BRIGHT_STEP = getEnvVariable("NEXT_PUBLIC_BRIGHT_STEP", 0.01);

const GAMMA_MIN = getEnvVariable("NEXT_PUBLIC_GAMMA_MIN", 0);
const GAMMA_MAX = getEnvVariable("NEXT_PUBLIC_GAMMA_MAX", 2);
const GAMMA_STEP = getEnvVariable("NEXT_PUBLIC_GAMMA_STEP", 0.01);

const SATURATION_MIN = getEnvVariable("NEXT_PUBLIC_SATURATION_MIN", 0);
const SATURATION_MAX = getEnvVariable("NEXT_PUBLIC_SATURATION_MAX", 2);
const SATURATION_STEP = getEnvVariable("NEXT_PUBLIC_SATURATION_STEP", 0.01);

const RESOLUTION_MIN = getEnvVariable("NEXT_PUBLIC_RESOLUTION_MIN", 0);
const RESOLUTION_MAX = getEnvVariable("NEXT_PUBLIC_RESOLUTION_MAX", 200);
const RESOLUTION_STEP = getEnvVariable("NEXT_PUBLIC_RESOLUTION_STEP", 1);

const FONTSIZE_MIN = getEnvVariable("NEXT_PUBLIC_FONT_SIZE_MIN", 0);
const FONTSIZE_MAX = getEnvVariable("NEXT_PUBLIC_FONT_SIZE_MAX", 20);
const FONTSIZE_STEP = getEnvVariable("NEXT_PUBLIC_FONT_SIZE_STEP", 1);

const HUE_MIN = getEnvVariable("NEXT_PUBLIC_HUE_MIN", 0);
const HUE_MAX = getEnvVariable("NEXT_PUBLIC_HUE_MAX", 3);
const HUE_STEP = getEnvVariable("NEXT_PUBLIC_HUE_STEP", 0.1);

const SOUND_ACTIVE_SENSITIVITY_MIN = getEnvVariable("NEXT_PUBLIC_SOUND_SENSITIVITY_MIN", 0);
const SOUND_ACTIVE_SENSITIVITY_MAX = getEnvVariable("NEXT_PUBLIC_SOUND_SENSITIVITY_MAX", 3);
const SOUND_ACTIVE_SENSITIVITY_STEP = getEnvVariable("NEXT_PUBLIC_SOUND_SENSITIVITY_STEP", 0.1);

interface CustomSliderProps {
    label: string;
    min: number;
    max: number;
    step?: number;
    value: number[];
    onValueChange: (value: number[]) => void;
}

const CustomSlider: React.FC<CustomSliderProps> = ({ label, min, max, step, value, onValueChange }) => (
    <div>
        <Label>{label}</Label>
        <div className="flex items-center gap-2">
            <Slider className="mt-2" min={min} max={max} step={step} value={value} onValueChange={onValueChange} />
            <span className="text-xl">{value[0]}</span>
        </div>
    </div>
);

export default function Sliders() {
    const {
        bright,
        setBright,
        gamma,
        setGamma,
        resolution,
        setResolution,
        fontSize,
        setFontSize,
        soundActiveSensitivity,
        setSoundActiveSensitivity,
        saturation,
        setSaturation,
        hue,
        setHue,
        symbols,
        setSymbols,
    } = useContext(AsciiContext);

    return (
        <Sheet>
            <SheetTrigger>
                <Menu size={24} />
            </SheetTrigger>
            <SheetContent>
                <div className="w-full h-full flex flex-col gap-5">
                    <CustomSlider label="Bright" min={BRIGHT_MIN} max={BRIGHT_MAX} step={BRIGHT_STEP} value={bright} onValueChange={setBright} />
                    <CustomSlider label="Gamma" min={GAMMA_MIN} max={GAMMA_MAX} step={GAMMA_STEP} value={gamma} onValueChange={setGamma} />
                    <CustomSlider label="Saturation" min={SATURATION_MIN} max={SATURATION_MAX} step={SATURATION_STEP} value={saturation} onValueChange={setSaturation} />
                    <CustomSlider label="Hue" min={HUE_MIN} max={HUE_MAX} step={HUE_STEP} value={hue} onValueChange={setHue} />
                    <CustomSlider label="Resolution" min={RESOLUTION_MIN} max={RESOLUTION_MAX} step={RESOLUTION_STEP} value={resolution} onValueChange={setResolution} />
                    <CustomSlider label="Font Size" min={FONTSIZE_MIN} max={FONTSIZE_MAX} step={FONTSIZE_STEP} value={fontSize} onValueChange={setFontSize} />
                    <CustomSlider
                        label="Sound Active Sensitivity"
                        min={SOUND_ACTIVE_SENSITIVITY_MIN}
                        max={SOUND_ACTIVE_SENSITIVITY_MAX}
                        step={SOUND_ACTIVE_SENSITIVITY_STEP}
                        value={soundActiveSensitivity}
                        onValueChange={setSoundActiveSensitivity}
                    />
                    <div>
                        <Label>symbols</Label>
                        <div className="flex items-center gap-2">
                            <Input value={symbols} onChange={(e) => setSymbols(e.target.value)} />
                        </div>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}

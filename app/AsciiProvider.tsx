"use client";

import { createContext, useState } from "react";

export const AsciiContext = createContext(
    {} as {
        on: boolean;
        setOn: (on: boolean) => void;
        bright: number[];
        setBright: (bright: number[]) => void;
        gamma: number[];
        setGamma: (gamma: number[]) => void;
        contrast: number[];
        setContrast: (contrast: number[]) => void;
        fontSize: number[];
        setFontSize: (fontSize: number[]) => void;
        resolution: number[];
        setResolution: (resolution: number[]) => void;
        soundActiveSensitivity: number[];
        setSoundActiveSensitivity: (soundActiveSensitivity: number[]) => void;
        saturation: number[];
        setSaturation: (saturation: number[]) => void;
        hue: number[];
        setHue: (hue: number[]) => void;
        symbols: string;
        setSymbols: (symbols: string) => void;
    }
);

export default function AsciiProvider({ children }: { children: React.ReactNode }) {
    const birght_default = process.env.NEXT_PUBLIC_BRIGHT_DEFAULT ? parseFloat(process.env.NEXT_PUBLIC_BRIGHT_DEFAULT) : 1;
    const gamma_default = process.env.NEXT_PUBLIC_GAMMA_DEFAULT ? parseFloat(process.env.NEXT_PUBLIC_GAMMA_DEFAULT) : 1;
    const contrast_default = process.env.NEXT_PUBLIC_CONTRAST_DEFAULT ? parseFloat(process.env.NEXT_PUBLIC_CONTRAST_DEFAULT) : 1;
    const fontSize_default = process.env.NEXT_PUBLIC_FONT_SIZE_DEFAULT ? parseFloat(process.env.NEXT_PUBLIC_FONT_SIZE_DEFAULT) : 12;
    const resolution_default = process.env.NEXT_PUBLIC_RESOLUTION_DEFAULT ? parseFloat(process.env.NEXT_PUBLIC_RESOLUTION_DEFAULT) : 30;
    const soundActiveSensitivity_default = process.env.NEXT_PUBLIC_SOUND_ACTIVE_SENSITIVITY_DEFAULT ? parseFloat(process.env.NEXT_PUBLIC_SOUND_ACTIVE_SENSITIVITY_DEFAULT) : 0;
    const saturation_default = process.env.NEXT_PUBLIC_SATURATION_DEFAULT ? parseFloat(process.env.NEXT_PUBLIC_SATURATION_DEFAULT) : 1;
    const hue_default = process.env.NEXT_PUBLIC_HUE_DEFAULT ? parseFloat(process.env.NEXT_PUBLIC_HUE_DEFAULT) : 1;
    const symbols_default = process.env.NEXT_PUBLIC_SYMBOLS_DEFAULT ? process.env.NEXT_PUBLIC_SYMBOLS_DEFAULT : "aiueo";

    const [on, setOn] = useState(false);
    const [bright, setBright] = useState([birght_default]);
    const [gamma, setGamma] = useState([gamma_default]);
    const [contrast, setContrast] = useState([contrast_default]);
    const [fontSize, setFontSize] = useState([fontSize_default]);
    const [resolution, setResolution] = useState([resolution_default]);
    const [soundActiveSensitivity, setSoundActiveSensitivity] = useState([soundActiveSensitivity_default]);
    const [saturation, setSaturation] = useState([saturation_default]);
    const [hue, setHue] = useState([hue_default]);
    const [symbols, setSymbols] = useState(symbols_default);

    return (
        <AsciiContext.Provider
            value={{
                on,
                setOn,
                bright,
                setBright,
                gamma,
                setGamma,
                contrast,
                setContrast,
                fontSize,
                setFontSize,
                resolution,
                setResolution,
                soundActiveSensitivity,
                setSoundActiveSensitivity,
                saturation,
                setSaturation,
                hue,
                setHue,
                symbols,
                setSymbols,
            }}
        >
            {children}
        </AsciiContext.Provider>
    );
}

"use client";

import { createContext, useState } from "react";

export const AsciiContext = createContext(
    {} as {
        image: string | null;
        setImage: (image: string | null) => void;
        video: string | null;
        setVideo: (video: string | null) => void;
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
    }
);

export default function AsciiProvider({ children }: { children: React.ReactNode }) {
    const [image, setImage] = useState<string | null>(null);
    const [video, setVideo] = useState<string | null>(null);
    const [bright, setBright] = useState([1]);
    const [gamma, setGamma] = useState([1]);
    const [contrast, setContrast] = useState([1]);
    const [fontSize, setFontSize] = useState([12]);
    const [resolution, setResolution] = useState([30]);

    return (
        <AsciiContext.Provider value={{ image, setImage, video, setVideo, bright, setBright, gamma, setGamma, contrast, setContrast, fontSize, setFontSize, resolution, setResolution }}>
            {children}
        </AsciiContext.Provider>
    );
}

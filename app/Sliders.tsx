"use client";
import React, { useContext } from "react";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { AsciiContext } from "./AsciiProvider";
import { useSearchParams } from "next/navigation";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

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
    const { bright, setBright, gamma, setGamma, resolution, setResolution, fontSize, setFontSize } = useContext(AsciiContext);
    const searchParams = useSearchParams();
    const method = searchParams.get("method");

    return (
        <Sheet>
            <SheetTrigger>
                <Menu size={24} />
            </SheetTrigger>
            <SheetContent>
                <div className="w-full h-full flex flex-col gap-5">
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
            </SheetContent>
        </Sheet>
    );
}

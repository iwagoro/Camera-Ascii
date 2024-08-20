"use client";
import { useContext } from "react";
import { AsciiContext } from "./AsciiProvider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useTheme } from "next-themes";
import Sliders from "./Sliders";

export default function Header() {
    const { on, setOn } = useContext(AsciiContext);
    const { theme, setTheme } = useTheme();
    return (
        <div className="w-full flex h-auto items-center justify-between">
            <h1 className="text-2xl font-bold p-3">Ascii Camera</h1>
            <div className="flex p-3 gap-4">
                <div className="flex items-center space-x-2">
                    <Switch id="airplane-mode" value={on ? "off" : "on"} onCheckedChange={(value) => setOn(value)} />
                    <Label htmlFor="airplane-mode">Ascii Effect</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <Switch id="airplane-mode" value={theme === "dark" ? "off" : "on"} onCheckedChange={(value) => setTheme(value ? "dark" : "light")} />
                    <Label htmlFor="airplane-mode">Dark Mode</Label>
                </div>
                <Sliders />
            </div>
        </div>
    );
}
